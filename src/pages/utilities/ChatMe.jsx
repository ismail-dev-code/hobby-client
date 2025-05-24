import React, { useState } from "react";
import Swal from "sweetalert2";
import Navbar from "../../components/Navbar";

const ChatMe = () => {
  const [messages, setMessages] = useState([
    { role: "system", content: "You are a helpful assistant." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Empty message",
        text: "Please enter something to ask.",
      });
      return;
    }

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("https://hobby-server-sigma.vercel.app/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API error:", errorData);
        Swal.fire({
          icon: "error",
          title: "API Error",
          text: errorData.error || response.statusText,
        });
        setLoading(false);
        return;
      }

      const data = await response.json();
      const botMessage = data.choices[0].message;
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Fetch error:", error);
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Failed to connect to the chatbot. Try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="max-w-md mx-auto mt-12 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Chat Me 🤖</h2>

      <div
        style={{ height: "300px", overflowY: "auto" }}
        className="border p-3 mb-4 rounded bg-gray-50"
      >
        {messages
          .filter((msg) => msg.role !== "system")
          .map((msg, idx) => (
            <div
              key={idx}
              className={`mb-2 p-2 rounded ${
                msg.role === "user"
                  ? "bg-blue-200 text-right"
                  : "bg-gray-300 text-left"
              }`}
            >
              {msg.content}
            </div>
          ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          className="flex-grow border rounded p-2"
          placeholder="Ask me anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !loading) handleSend();
          }}
          disabled={loading}
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-blue-600 text-white px-4 rounded disabled:opacity-50"
        >
          {loading ? "Loading..." : "Send"}
        </button>
      </div>
    </div>
    </>
  );
};

export default ChatMe;

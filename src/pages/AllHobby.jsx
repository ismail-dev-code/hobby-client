import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const AllHobby = () => {
  const [hobbies, setHobbies] = useState([]);

  useEffect(() => {
    fetch("https://hobby-server-sigma.vercel.app/all-group")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setHobbies(data);
      })
      .catch((error) => {
        console.error("Failed to fetch hobbies:", error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-4 w-10/12 mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center md:mb-12">
          All Hobbies
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {hobbies.map((hobby) => (
            <div
              key={hobby._id}
              className="p-4 border rounded shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold">
                {hobby.groupName || "Unnamed Hobby"}
              </h3>
              <p className="text-gray-600">
                {hobby.description || "No description provided."}
              </p>
              <p className="text-sm text-gray-500">
                Created by: {hobby.userName}
              </p>
              <p className="text-sm text-gray-500"> {hobby.userEmail}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllHobby;

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { FcMoneyTransfer } from "react-icons/fc";

const CurrencyConverter = () => {
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("BDT");
  const [amount, setAmount] = useState("1");

  const [convertedAmount, setConvertedAmount] = useState(null);
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRates = async () => {
      try {
        setLoading(true);
        const apiUrl = `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`;
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch exchange rate.");
        const data = await response.json();
        setRates(data.rates);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchRates();
  }, [baseCurrency]);

  const handleConvert = () => {
    setError("");
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount)) {
      setError("Please enter a valid amount.");
      return;
    }

    if (!rates[targetCurrency]) {
      setError("Target currency not available.");
      return;
    }

    const result = (rates[targetCurrency] * numericAmount).toFixed(2);
    setConvertedAmount(result);
  };

  const currencyList = Object.keys(rates).sort();

  return (
    <>
      <Navbar />
      <div className="min-h-screen py-10 px-4">
        <div className="max-w-xl mx-auto shadow-lg rounded-2xl p-6 md:p-8">
          <div className="flex justify-center items-center flex-col">
            <h1> <FcMoneyTransfer size={40} /> </h1>
            <h2 className="text-xl md:text-2xl font-bold text-center mb-6">
           Currency Converter
          </h2>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <label className="block font-medium mb-1">Amount</label>
              <input
                type="number"
                className="w-full p-3 rounded border  focus:outline-none focus:ring-2 focus:ring-blue-400 "
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">From</label>
              <select
                className="w-full p-3 rounded border  "
                value={baseCurrency}
                onChange={(e) => setBaseCurrency(e.target.value)}
              >
                {currencyList.map((cur) => (
                  <option key={cur} value={cur}>
                    {cur}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium mb-1">To</label>
              <select
                className="w-full p-3 rounded border"
                value={targetCurrency}
                onChange={(e) => setTargetCurrency(e.target.value)}
              >
                {currencyList.map((cur) => (
                  <option key={cur} value={cur}>
                    {cur}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white cursor-pointer font-semibold py-3 rounded transition duration-200"
                onClick={handleConvert}
                disabled={loading}
              >
                {loading ? "Loading..." : "Convert"}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
          )}

          {convertedAmount && (
            <div className="mt-6 text-center">
              <p className="text-xl font-semibold">
                {amount} {baseCurrency} ={" "}
                <span className="text-blue-600 dark:text-blue-400">
                  {convertedAmount} {targetCurrency}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CurrencyConverter;

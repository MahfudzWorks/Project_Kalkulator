import React, { useState } from "react";
import Footer from "./components/Footer";

const App = () => {
  const [input, setInput] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleClick = (value) => {
    setInput((prev) => {
      const operators = ["+", "-", "*", "/", "."];
      const lastChar = prev.slice(-1);

      if (prev.length >= 18) {
        return prev;
      }

      if (operators.includes(value) && operators.includes(lastChar)) {
        return prev;
      }

      if (prev === "0" && !isNaN(value)) {
        return value;
      }

      return prev + value;
    });
  };

  const handleClear = () => {
    setInput("");
  };

  const handleDelete = () => {
    setInput(input.slice(0, -1));
  };

  const handleCalculate = () => {
    try {
      setInput(eval(input).toString());
    } catch {
      setInput("Error");
    }
  };

  const handleSquare = () => {
    try {
      setInput(Math.pow(Number(input), 2).toString());
    } catch {
      setInput("Error");
    }
  };

  const handleSqrt = () => {
    try {
      setInput(Math.sqrt(Number(input)).toString());
    } catch {
      setInput("Error");
    }
  };

  const handlePercent = () => {
    try {
      setInput((Number(input) / 100).toString());
    } catch {
      setInput("Error");
    }
  };

  const handleInverse = () => {
    try {
      setInput((1 / Number(input)).toString());
    } catch {
      setInput("Error");
    }
  };

  const buttons = [
    "7",
    "8",
    "9",
    "/",
    "4",
    "5",
    "6",
    "*",
    "1",
    "2",
    "3",
    "-",
    "0",
    ".",
    "=",
    "+",
  ];

  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-center min-h-screen gap-6 transition-colors duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black"
          : "bg-gradient-to-br from-gray-200 via-gray-100 to-white"
      }`}
    >
      <div
        className={`rounded-2xl shadow-2xl p-4 w-80 transition-colors duration-500 ${
          darkMode ? "bg-gray-900" : "bg-white"
        }`}
      >
        <div className="flex justify-between mb-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-1 rounded-lg text-sm font-semibold shadow-md transition-colors duration-300
              bg-gradient-to-r from-indigo-500 to-purple-500 text-white active:scale-95"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>

          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="px-3 py-1 rounded-lg text-sm font-semibold shadow-md transition-colors duration-300
              bg-gradient-to-r from-pink-500 to-orange-500 text-white active:scale-95"
          >
            {showAdvanced ? "Hide ◀" : "More ▶"}
          </button>
        </div>

        <div
          className={`rounded-xl p-4 mb-4 text-2xl font-mono tracking-wider shadow-inner text-right transition-colors duration-500 ${
            darkMode ? "bg-black text-white" : "bg-gray-100 text-gray-800"
          }`}
        >
          {input || "0"}
        </div>

        {showAdvanced && (
          <div className="grid grid-cols-4 gap-3 mb-3 animate-fade-in">
            <button
              onClick={handleSquare}
              className="bg-purple-500 text-white py-3 rounded-xl text-lg font-bold shadow-lg active:scale-95"
            >
              x²
            </button>
            <button
              onClick={handleSqrt}
              className="bg-purple-500 text-white py-3 rounded-xl text-lg font-bold shadow-lg active:scale-95"
            >
              √x
            </button>
            <button
              onClick={handlePercent}
              className="bg-purple-500 text-white py-3 rounded-xl text-lg font-bold shadow-lg active:scale-95"
            >
              %
            </button>
            <button
              onClick={handleInverse}
              className="bg-purple-500 text-white py-3 rounded-xl text-lg font-bold shadow-lg active:scale-95"
            >
              1/x
            </button>
          </div>
        )}

        <div className="grid grid-cols-4 gap-3">
          <button
            onClick={handleClear}
            className="col-span-2 bg-red-500 text-white py-3 rounded-xl text-lg font-bold shadow-lg active:scale-95"
          >
            C
          </button>
          <button
            onClick={handleDelete}
            className="bg-yellow-500 text-white py-3 rounded-xl text-lg font-bold shadow-lg active:scale-95"
          >
            DEL
          </button>
          <button
            onClick={() => handleClick("/")}
            className="bg-blue-500 text-white py-3 rounded-xl text-lg font-bold shadow-lg active:scale-95"
          >
            ÷
          </button>

          {buttons.map((btn, i) => (
            <button
              key={i}
              onClick={() =>
                btn === "=" ? handleCalculate() : handleClick(btn)
              }
              className={`py-3 rounded-xl text-lg font-bold shadow-lg active:scale-95 transition-colors duration-300 ${
                btn === "="
                  ? "bg-green-500 text-white col-span-1"
                  : isNaN(btn) && btn !== "."
                  ? "bg-blue-500 text-white"
                  : darkMode
                  ? "bg-gray-700 text-white"
                  : "bg-gray-200 text-gray-900"
              }`}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
      <div className="hidden sm:block w-64">
        <Footer darkMode={darkMode} />
      </div>
    </div>
  );
};

export default App;

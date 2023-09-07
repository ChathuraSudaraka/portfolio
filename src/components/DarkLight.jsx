import React, { useState, useEffect } from "react";

const DarkLight = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Function to toggle dark/light mode
  const toggleMode = () => {
    setDarkMode(!darkMode);
  };

  // Effect to set the dark/light mode class on the body element
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="fixed bottom-5 left-5">
      <button
        className={`bg-blue-500 hover:bg-blue-900 text-white font-bold opacity-90 py-0 px-0 rounded-full ${
          darkMode ? "dark:bg-gray-900" : ""
        }`}
        onClick={toggleMode}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-10 h-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    </div>
  );
};

export default DarkLight;

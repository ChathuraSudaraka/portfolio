import React, { useEffect, useState } from "react";
import useThemeSwitcher from "./hooks/useThemeSwitcher";
import Moon from "/assets/moon.svg";
import Sun from "/assets/sun.svg";

const DarkLight = () => {
  const [mode, setMode] = useThemeSwitcher();
  const [themeTransition, setThemeTransition] = useState("");

  useEffect(() => {
    // Apply the transition class for a smooth theme change effect
    if (themeTransition) {
      setTimeout(() => {
        setThemeTransition("");
      }, 500); // Adjust the duration (in milliseconds) as needed
    }
  }, [themeTransition]);

  const toggleTheme = () => {
    setThemeTransition("transition-all duration-500");
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <div className={`bg-slate-400 ${themeTransition}`}>
      <div className="fixed top-28 right-0 bg-white rounded-l-full shadow-lg p-1">
        <button
          className={`w-12 h-12 flex items-center justify-center rounded-full border-2 ${
            mode === "dark" ? "border-gray-600" : "border-yellow-500"
          } hover:bg-opacity-50`}
          onClick={toggleTheme}
        >
          <img
            src={mode === "dark" ? Sun : Moon}
            alt={mode === "dark" ? "Light Mode" : "Dark Mode"}
            className="w-8 h-8 transform transition-transform"
            style={{
              transform: mode === "dark" ? "rotate(0deg)" : "rotate(360deg)",
            }}
          />
        </button>
      </div>
    </div>
  );
};

export default DarkLight;

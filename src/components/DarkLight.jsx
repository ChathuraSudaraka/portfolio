import React, { useState } from "react";
import useThemeSwitcher from "./hooks/useThemeSwitcher";
import { Moon, Sun } from "./hooks/CustomTag";

const DarkLight = () => {
  const [mode, setMode] = useThemeSwitcher();
  const [themeTransition, setThemeTransition] = useState("");

  const toggleTheme = () => {
    setThemeTransition("transition-all duration-500");
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const rotateStyle = {
    transition: "transform 2s linear infinite",
    animation: "rotate 2s linear infinite",
  };

  const lightButtonStyle = {
    backgroundColor: "lightblue",
    borderColor: "lightblue",
    color: "black",
    transition:
      "background-color 0.5s ease, border-color 0.5s ease, color 0.5s ease", // Add transition properties
  };

  const darkButtonStyle = {
    backgroundColor: "darkblue",
    borderColor: "darkblue",
    color: "white",
    transition:
      "background-color 0.5s ease, border-color 0.5s ease, color 0.5s ease", // Add transition properties
  };

  return (
    <div className={`bg-slate-400 ${themeTransition}`}>
      <style>
        {`
          @keyframes rotate {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
      <div className="fixed top-28 right-0 w-16 bg-white rounded-l-full shadow-lg p-1">
        <button
          className={`w-12 h-12 flex items-center justify-center rounded-full border-2 hover:bg-opacity-50 rotate-icon`}
          onClick={toggleTheme}
          style={mode === "dark" ? darkButtonStyle : lightButtonStyle}
        >
          {mode === "dark" ? <Moon /> : <Sun />}
        </button>
      </div>
    </div>
  );
};

export default DarkLight;

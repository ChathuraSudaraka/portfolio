import React, { useState } from "react";
import useThemeSwitcher from "./hooks/useThemeSwitcher";
import { Moon, Sun } from "./hooks/CustomTag";

const DarkLight = () => {
  const [mode, setMode] = useThemeSwitcher();
  const [themeTransition, setThemeTransition] = useState("");
  const [rotation, setRotation] = useState(0);

  const toggleTheme = () => {
    setThemeTransition("transition-all duration-500");
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
    setRotation((prevRotation) => prevRotation + 360); // Rotate by 360 degrees
  };

  return (
    <div className={`bg-slate-400 ${themeTransition}`}>
      <div className="fixed top-28 right-0 w-16 bg-white rounded-l-full shadow-lg p-1">
        <button
          className={`w-12 h-12 flex items-center justify-center rounded-full border-2 hover:bg-opacity-50`}
          onClick={toggleTheme}
          style={{
            backgroundColor: mode === "dark" ? "darkblue" : "lightblue",
            borderColor: mode === "dark" ? "darkblue" : "lightblue",
            color: mode === "dark" ? "white" : "black",
            transition: "background-color 0.5s ease, border-color 0.5s ease, color 0.5s ease",
            transform: `rotate(${rotation}deg)`, // Apply rotation here
          }}
        >
          {mode === "dark" ? <Moon /> : <Sun />}
        </button>
      </div>
    </div>
  );
};

export default DarkLight;

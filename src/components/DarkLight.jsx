import React, { useEffect, useState } from "react";
import useThemeSwitcher from "./hooks/useThemeSwitcher";
import Moon from "/assets/moon.svg";
import Sun from "/assets/sun.svg";
import imageCompression from "browser-image-compression";

async function handleImageUpload(event) {
  const imageFile = event.target.files[0];

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
  };
  try {
    const compressedFile = await imageCompression(imageFile, options);
    console.log(compressedFile.size / 1024 / 1024);
  } catch (error) {
    console.log(error);
  }
}

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
  }, [mode, themeTransition]);

  const toggleTheme = () => {
    setThemeTransition("transition-all duration-500");
    setMode(mode === "light" ? "dark" : "light");
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

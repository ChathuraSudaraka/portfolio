import React from "react";
import useThemeSwitcher from "./hooks/useThemeSwitcher";
import { Moon, Sun } from "./hooks/CustomTag";
import { motion } from "framer-motion";

const DarkLight = () => {
  const [mode, setMode] = useThemeSwitcher();

  const toggleTheme = () => setMode(prevMode => (prevMode === "light" ? "dark" : "light"));

  return (
    // Container remains unchanged or adjust as needed
    <div className="fixed z-10 top-28 right-0 w-16">
      <motion.button
        onClick={toggleTheme}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9, rotate: 360 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="w-12 h-12 flex items-center justify-center rounded-full shadow-lg focus:outline-none"
        style={{
          backgroundColor: mode === "dark" ? "darkblue" : "lightblue",
          border: `2px solid ${mode === "dark" ? "darkblue" : "lightblue"}`,
          color: mode === "dark" ? "white" : "black",
        }}
      >
        {mode === "dark" ? <Moon /> : <Sun />}
      </motion.button>
    </div>
  );
};

export default DarkLight;

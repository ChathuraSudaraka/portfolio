import React from "react";
import useThemeSwitcher from "../../hooks/useThemeSwitcher";
import { Moon, Sun } from "../../hooks/CustomTag";
import { motion } from "framer-motion";

const DarkLight = () => {
  const [mode, setMode] = useThemeSwitcher();

  const toggleTheme = () => setMode(prevMode => (prevMode === "light" ? "dark" : "light"));

  return (
    <div className="fixed z-10 top-28 right-0 w-16">
      <motion.button
        onClick={toggleTheme}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9, rotate: 360 }}
        transition={{ type: "spring", stiffness: 300 }}
        className={`w-12 h-12 flex items-center justify-center rounded-full shadow-lg focus:outline-none backdrop-blur-sm
          ${mode === "dark" 
            ? "bg-black/80 text-cyan-400 border-2 border-cyan-400 shadow-cyan-500/30" 
            : "bg-white/80 text-teal-500 border-2 border-teal-500 shadow-teal-500/30"
          }`}
      >
        {mode === "dark" ? <Moon /> : <Sun />}
      </motion.button>
    </div>
  );
};

export default DarkLight;

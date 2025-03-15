import React, { useState, useEffect } from "react";
import useThemeSwitcher from "../../hooks/useThemeSwitcher";
import { motion, AnimatePresence } from "framer-motion";
import { FaMoon, FaSun } from "react-icons/fa";

const DarkLight = () => {
  const [mode, setMode] = useThemeSwitcher();
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  // Initial mounting animation and mobile detection
  useEffect(() => {
    setIsMounted(true);

    // Check if mobile view and update state
    const checkMobileView = () => setIsMobileView(window.innerWidth < 768);
    checkMobileView(); // Initial check
    window.addEventListener("resize", checkMobileView);

    return () => {
      setIsMounted(false);
      window.removeEventListener("resize", checkMobileView);
    };
  }, []);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  // Stars for dark mode
  const renderStars = () => {
    return Array.from({ length: 5 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-yellow-200 rounded-full"
        initial={{ opacity: 0 }}
        animate={{
          opacity: mode === "dark" ? [0, 1, 0] : 0,
          scale: mode === "dark" ? [0, 1, 0] : 0,
          x: mode === "dark" ? [0, i % 2 === 0 ? -15 : 15] : 0,
          y: mode === "dark" ? [0, -15] : 0,
        }}
        transition={{
          duration: 1 + i * 0.2,
          repeat: Infinity,
          repeatDelay: i * 0.5,
          delay: i * 0.2,
          ease: "easeInOut",
        }}
        style={{
          top: `${50 + i * 5}%`,
          left: `${50 + (i - 2) * 10}%`,
        }}
      />
    ));
  };

  // Animated rays for light mode
  const renderRays = () => {
    return Array.from({ length: 8 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute bg-amber-300 origin-center"
        initial={{ opacity: 0, height: "1px", width: "8px" }}
        animate={{
          opacity: mode === "light" ? [0.5, 1, 0.5] : 0,
          height: "2px",
          width: "12px",
          scale: mode === "light" ? [0.8, 1.2, 0.8] : 0.8,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 0.1,
          ease: "easeInOut",
        }}
        style={{
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) rotate(${
            i * 45
          }deg) translateX(16px)`,
        }}
      />
    ));
  };

  return (
    <motion.div
      className="fixed z-40 top-6 right-4 md:right-8 md:top-10"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: isMounted ? 1 : 0,
        scale: isMounted ? 1 : 0.8,
        y: isMounted ? 0 : -20,
      }}
      transition={{
        duration: 0.5,
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      <motion.div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Tooltip/Label - hidden on mobile */}
        <AnimatePresence>
          {isHovered && !isMobileView && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6, y: 10, x: "-50%" }}
              animate={{ opacity: 1, scale: 1, y: 0, x: "-50%" }}
              exit={{
                opacity: 0,
                scale: 0.6,
                y: 2,
                x: "-50%",
                transition: { duration: 0.15 },
              }}
              className="px-3 py-1.5 whitespace-pre rounded-lg backdrop-blur-md border text-sm font-medium shadow-xl absolute left-1/2 -translate-x-1/2 w-fit
                bg-white/30 dark:bg-neutral-800/70 border-white/30 dark:border-neutral-700/70 text-neutral-800 dark:text-white
                -bottom-10 top-auto"
            >
              {mode === "dark" ? "Light Mode" : "Dark Mode"}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rotate-45
                  bg-white/30 dark:bg-neutral-800/70 border-white/30 dark:border-neutral-700/70
                  -top-1 border-t border-l"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Button with background pulse effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          initial={false}
          animate={{
            backgroundColor:
              mode === "dark"
                ? "rgba(0, 191, 255, 0.1)"
                : "rgba(255, 191, 0, 0.1)",
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        {/* Main button */}
        <motion.button
          onClick={toggleTheme}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9, rotate: mode === "dark" ? -30 : 30 }}
          className={`relative h-12 w-12 rounded-full flex items-center justify-center backdrop-blur-sm shadow-lg overflow-hidden transition-all duration-500 z-10
            ${
              mode === "dark"
                ? "bg-neutral-800/90 text-white border border-cyan-900/50 shadow-cyan-500/20"
                : "bg-amber-50/90 text-gray-900 border border-amber-300/50 shadow-amber-500/20"
            }`}
        >
          {/* Animated stars in dark mode */}
          {mode === "dark" && renderStars()}

          {/* Animated rays in light mode */}
          {mode === "light" && renderRays()}

          {/* Icon with rotation and morphing animation */}
          <motion.div
            initial={false}
            animate={{
              rotate: mode === "dark" ? [0, 360] : [0, -360],
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 0.6,
              type: "spring",
              stiffness: 200,
            }}
            className="relative z-10"
          >
            {mode === "dark" ? (
              <FaMoon className="w-5 h-5 text-cyan-400" />
            ) : (
              <FaSun className="w-5 h-5 text-amber-500" />
            )}
          </motion.div>
        </motion.button>

        {/* Ring effect on theme change */}
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className={`absolute inset-0 rounded-full ${
              mode === "dark" ? "bg-cyan-400/20" : "bg-amber-400/20"
            }`}
          />
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default DarkLight;

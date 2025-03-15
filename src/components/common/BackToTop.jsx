import React, { useState, useEffect } from "react";
import { FiArrowUp } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.pageYOffset > 100);
    window.addEventListener("scroll", handleScroll);

    // Check if mobile view and update state
    const checkMobileView = () => setIsMobileView(window.innerWidth < 768);
    checkMobileView(); // Initial check
    window.addEventListener("resize", checkMobileView);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkMobileView);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed z-40 bottom-6 right-4 md:right-8 md:bottom-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.8,
            y: 20,
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
                    -top-10 bottom-auto"
                >
                  Back to top
                  <motion.div
                    className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rotate-45
                      bg-white/30 dark:bg-neutral-800/70 border-white/30 dark:border-neutral-700/70
                      -bottom-1 top-auto border-b border-r"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Button with background pulse effect */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                backgroundColor: "rgba(59, 130, 246, 0.1)",
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
              onClick={scrollToTop}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9, rotate: -30 }}
              className="relative h-12 w-12 rounded-full flex items-center justify-center backdrop-blur-sm shadow-lg overflow-hidden transition-all duration-500 z-10
                bg-neutral-50/90 dark:bg-neutral-800/90 text-blue-500 dark:text-blue-400 border border-blue-200/50 dark:border-blue-900/50 shadow-blue-500/20"
            >
              {/* Arrow animation */}
              <motion.div
                animate={{
                  y: [0, -4, 0],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                className="relative z-10"
              >
                <FiArrowUp className="w-5 h-5" />
              </motion.div>

              {/* Wave effect */}
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 border-2 rounded-full border-blue-400/30 dark:border-blue-500/30"
                  animate={{
                    scale: [1, 1.5, 2],
                    opacity: [0.1, 0.3, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.4,
                    repeatType: "loop",
                    ease: "easeOut",
                  }}
                />
              ))}
            </motion.button>

            {/* Click effect */}
            <AnimatePresence>
              {isVisible && (
                <motion.div
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 0, opacity: 1 }}
                  exit={{ scale: 3, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 rounded-full bg-blue-400/20"
                />
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;

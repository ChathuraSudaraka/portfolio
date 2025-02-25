import React, { useState, useEffect } from "react";
import { FiArrowUp } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.pageYOffset > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 180 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{
            duration: 0.3,
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          onClick={scrollToTop}
          title="Scroll to top"
          className="fixed bottom-4 right-4 h-12 w-12
                     bg-gray-100/70 dark:bg-gray-800/50
                     text-gray-600 dark:text-gray-200
                     rounded-full shadow-lg backdrop-blur-sm
                     border border-gray-200/50 dark:border-gray-700/30
                     hover:bg-gray-200/80 dark:hover:bg-gray-700/60
                     hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]
                     dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)]
                     focus:outline-none focus:ring-2 
                     focus:ring-gray-300 dark:focus:ring-gray-500
                     group"
        >
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            className="flex items-center justify-center h-full"
          >
            <FiArrowUp className="w-5 h-5 group-hover:stroke-2" />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;

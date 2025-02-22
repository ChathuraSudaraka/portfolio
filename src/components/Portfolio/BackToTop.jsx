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
            damping: 20
          }}
          onClick={scrollToTop}
          title="Scroll to top"
          className="fixed bottom-8 right-8 p-3 bg-gradient-to-r from-blue-500 to-blue-600 
                     text-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
                     backdrop-blur-[2px] border border-white/10
                     hover:shadow-[0_8px_30px_rgba(59,130,246,0.5)]
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                     group"
        >
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          >
            <FiArrowUp className="w-6 h-6 group-hover:stroke-2" />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
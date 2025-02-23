import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CatchGame = () => {
  const [score, setScore] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setPosition({
          x: Math.random() * (window.innerWidth - 100),
          y: Math.random() * (200) + 100
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const handleCatch = () => {
    setScore(prev => prev + 1);
  };

  return (
    <div className="relative w-full h-[300px] my-8">
      {!isPlaying ? (
        <motion.button
          onClick={() => setIsPlaying(true)}
          className="px-4 py-2 bg-primary/10 rounded-lg text-primary hover:bg-primary/20 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Play Catch The Star
        </motion.button>
      ) : (
        <>
          <div className="absolute top-0 left-4 text-lg font-medium">
            Score: {score}
          </div>
          <AnimatePresence>
            <motion.div
              key={`${position.x}-${position.y}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              style={{
                position: 'absolute',
                left: position.x,
                top: position.y,
              }}
              className="cursor-pointer"
              onClick={handleCatch}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 text-primary"
              >
                ⭐
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </>
      )}
    </div>
  );
};

export default CatchGame;

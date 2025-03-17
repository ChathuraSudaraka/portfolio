import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GradientButton from '../ui/gradient-button';

const CatchGame = () => {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('catchGameHighScore')) || 0;
  });
  const [timeLeft, setTimeLeft] = useState(30);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const gameAreaRef = useRef(null);

  useEffect(() => {
    // Timer logic
    if (isPlaying) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsPlaying(false);
            // Update high score if current score is higher
            if (score > highScore) {
              setHighScore(score);
              localStorage.setItem('catchGameHighScore', score.toString());
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Star movement logic
      const moveInterval = setInterval(moveTarget, 1000);

      return () => {
        clearInterval(timer);
        clearInterval(moveInterval);
      };
    }
  }, [isPlaying, score, highScore]);

  const moveTarget = () => {
    if (gameAreaRef.current) {
      const area = gameAreaRef.current.getBoundingClientRect();
      // Add padding to keep star inside boundaries
      const padding = 40;
      setPosition({
        x: Math.random() * (area.width - padding * 2) + padding,
        y: Math.random() * (area.height - padding * 2) + padding,
      });
    }
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setIsPlaying(true);
    moveTarget();
  };

  const handleCatch = () => {
    setScore(prev => prev + 1);
    moveTarget();
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {!isPlaying ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          {score > 0 && (
            <div className="space-y-2 bg-white/10 dark:bg-black/10 rounded-xl p-4 backdrop-blur-sm">
              <p className="text-2xl font-bold text-primary">Game Over!</p>
              <div className="flex justify-center gap-4">
                <span className="text-gray-600 dark:text-gray-400">Score: {score}</span>
                <span className="text-gray-600 dark:text-gray-400">Best: {highScore}</span>
              </div>
            </div>
          )}
          <GradientButton onClick={startGame} className="px-8 py-3">
            {score > 0 ? "Play Again" : "Start Game"}
          </GradientButton>
        </motion.div>
      ) : (
        <div className="relative">
          {/* Game Stats */}
          <div className="absolute -top-12 left-0 right-0 flex justify-between items-center text-sm">
            <div className="bg-primary/10 dark:bg-primary/20 px-4 py-2 rounded-full">
              <span className="text-primary font-medium">Score: {score}</span>
            </div>
            <div className="bg-primary/10 dark:bg-primary/20 px-4 py-2 rounded-full">
              <span className="text-primary font-medium">Time: {timeLeft}s</span>
            </div>
          </div>

          {/* Game Area */}
          <motion.div
            ref={gameAreaRef}
            className="relative h-[300px] rounded-2xl overflow-hidden backdrop-blur-sm bg-white/5 dark:bg-black/5 border border-gray-200/20 dark:border-gray-800/20"
          >
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
                className="cursor-pointer touch-none select-none"
                onClick={handleCatch}
              >
                <motion.div
                  className="relative group"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <div className="absolute inset-0 rounded-full bg-primary/20 blur-md group-hover:bg-primary/30 transition-colors" />
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="relative w-8 h-8 flex items-center justify-center text-2xl"
                  >
                    ⭐
                  </motion.div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CatchGame;

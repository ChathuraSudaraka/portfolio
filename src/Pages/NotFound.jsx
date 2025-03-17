import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CatchGame from "../components/common/CatchGame";
import HoverBorderGradient from "../components/ui/hover-border-gradient";

const NotFound = () => {
  const [showGame, setShowGame] = useState(false);

  const handleShowGame = () => {
    setShowGame(true);
  };

  useEffect(() => {
    document.title = "404 - Page Not Found";
  }, []);

  return (
    <section
      className="relative min-h-screen bg-white dark:bg-black"
      id="notfound"
    >
      {/* Main background grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] dark:bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)]" />
      {/* Global gradient blobs */}
      <div className="fixed top-0 right-0 h-[500px] w-[500px] bg-primary/10 rounded-full blur-3xl" />
      <div className="fixed bottom-0 left-0 h-[500px] w-[500px] bg-violet-500/10 rounded-full blur-3xl" />
      {/* Initial Centered View */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: showGame ? 0 : 1, y: showGame ? -50 : 0 }}
        className={`container relative flex items-center justify-center min-h-screen ${
          showGame ? "hidden" : ""
        }`}
      >
        <div className="text-center space-y-8">
          {/* Status Badge */}
          <div className="inline-flex items-center space-x-2 bg-primary/10 dark:bg-primary/20 px-4 py-2 rounded-full">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
            </span>
            <p className="text-sm font-medium text-red-500">Page Not Found</p>
          </div>

          {/* Main Title */}
          <motion.h1
            className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-pink-500"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            4<span className="text-primary">0</span>4
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            The page you're looking for doesn't exist or has been moved.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <HoverBorderGradient
              onClick={handleShowGame}
              className="px-6 py-3 bg-transparent hover:bg-primary/5 text-gray-900 dark:text-white"
            >
              Play a game
            </HoverBorderGradient>
            <HoverBorderGradient
              as={Link}
              to="/"
              className="px-6 py-3 bg-transparent hover:bg-primary/5 text-gray-900 dark:text-white"
            >
              Back to Home
            </HoverBorderGradient>
          </motion.div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: showGame ? 1 : 0, y: showGame ? 0 : 0 }}
        className={`container relative ${!showGame ? "hidden" : ""}`}
      >
        <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 p-4">
          {/* Left Side - Updated 404 Content */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex-1 lg:max-w-xl w-full"
          >
            <div className="text-center space-y-8">
              {/* Status Badge */}
              <div className="inline-flex items-center space-x-2 bg-primary/10 dark:bg-primary/20 px-4 py-2 rounded-full">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
                </span>
                <p className="text-sm font-medium text-red-500">
                  Page Not Found
                </p>
              </div>

              {/* Main Title */}
              <motion.h1
                className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-pink-500"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                4<span className="text-primary">0</span>4
              </motion.h1>

              {/* Description */}
              <motion.p
                className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                The page you're looking for doesn't exist or has been moved.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-wrap justify-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <HoverBorderGradient
                  as={Link}
                  to="/blog"
                  className="px-6 py-3 bg-transparent hover:bg-primary/5 text-gray-900 dark:text-white"
                >
                  blog
                </HoverBorderGradient>
                <HoverBorderGradient
                  as={Link}
                  to="/"
                  className="px-6 py-3 bg-transparent hover:bg-primary/5 text-gray-900 dark:text-white"
                >
                  Back to Home
                </HoverBorderGradient>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Game with enhanced container */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex-1 lg:max-w-xl w-full"
          >
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-14 left-0 right-0 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 px-4 py-2 rounded-full"
                >
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-gradient-to-r from-primary to-secondary" />
                  </span>
                  <p className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                    Let's Play a Game
                  </p>
                </motion.div>
              </div>

              {/* Game container with enhanced styling */}
              <div className="bg-white/5 dark:bg-black/5 backdrop-blur-sm rounded-3xl border border-gray-200/20 dark:border-gray-800/20 p-8 shadow-xl">
                <CatchGame />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
      {/* Add animation keyframes */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default NotFound;

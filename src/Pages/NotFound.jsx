import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HoverBorderGradient } from "../components/ui/hover-border-gradient";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black px-4">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-8xl font-bold text-black dark:text-white mb-4">
            404
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h2 className="text-2xl font-medium text-black dark:text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="space-x-6 flex justify-center"
        >
          <HoverBorderGradient
            as={Link}
            to="/"
            containerClassName="inline-block text-black dark:text-white flex items-center"
            duration={2}
          >
            Back to Home
          </HoverBorderGradient>

          <HoverBorderGradient
            as={Link}
            to="/blog"
            containerClassName="inline-block text-black dark:text-white flex items-center"
            duration={2}
            clockwise={false}
          >
            View Blog
          </HoverBorderGradient>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;

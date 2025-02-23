import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HoverBorderGradient } from "../components/ui/hover-border-gradient";

const NotFound = () => {
  return (
    <section className="relative min-h-screen bg-white dark:bg-black flex items-center justify-center" id="notfound">
      {/* Main background grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] dark:bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)]" />
      
      {/* Global gradient blobs */}
      <div className="fixed top-0 right-0 h-[500px] w-[500px] bg-primary/10 rounded-full blur-3xl" />
      <div className="fixed bottom-0 left-0 h-[500px] w-[500px] bg-violet-500/10 rounded-full blur-3xl" />

      <div className="container relative flex items-center justify-center">
        <div className="w-full max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center space-y-8"
          >
            {/* Status Badge */}
            <div className="flex items-center justify-center space-x-2 bg-primary/10 dark:bg-primary/20 px-4 py-2 rounded-full">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <p className="text-sm font-medium text-red-500">Page Not Found</p>
            </div>

            {/* Main Title with enhanced gradient */}
            <h1 className="text-8xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-pink-500">
              4<span className="text-primary">0</span>4
            </h1>

            {/* Description */}
            <p className="text-lg text-center text-gray-600 dark:text-gray-400 max-w-xl leading-relaxed px-4">
              The page you're looking for doesn't exist or has been moved.
            </p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-4 px-4"
            >
              <HoverBorderGradient
                as={Link}
                to="/"
                className="px-6 py-3 bg-transparent hover:bg-primary/5 text-gray-900 dark:text-white"
                duration={2}
              >
                Back to Home
              </HoverBorderGradient>

              <HoverBorderGradient
                as={Link}
                to="/blog"
                className="px-6 py-3 bg-transparent hover:bg-primary/5 text-gray-900 dark:text-white"
                duration={2}
                clockwise={false}
              >
                View Blog
              </HoverBorderGradient>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Add animation keyframes */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
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

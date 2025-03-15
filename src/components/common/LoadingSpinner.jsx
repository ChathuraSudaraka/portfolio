import React from "react";
import { FiCode } from "react-icons/fi";

const LoadingSpinner = () => (
  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center w-screen h-screen bg-gradient-to-b from-black to-gray-900 dark:from-gray-900 dark:to-black">
    <div className="flex flex-col items-center">
      <div className="relative mb-6">
        {/* Logo or icon in the center */}
        <div className="text-primary text-4xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <FiCode />
        </div>

        {/* Outer spinning circle */}
        <div className="w-20 h-20 border-2 border-primary rounded-full animate-spin opacity-75"></div>

        {/* Inner spinning circle (opposite direction) */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 border-2 border-primary rounded-full animate-spin-reverse opacity-75"></div>
      </div>

      {/* Progress bar */}
      <div className="w-48 h-1 bg-gray-800 dark:bg-gray-700 rounded-full overflow-hidden mt-2">
        <div className="h-full bg-primary rounded-full animate-progress"></div>
      </div>

      {/* Loading text */}
      <p className="mt-4 text-white text-sm font-light tracking-wider uppercase">
        Loading Experience
      </p>
    </div>
  </div>
);

export default LoadingSpinner;

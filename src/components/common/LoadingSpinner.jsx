import React from 'react';

const LoadingSpinner = () => (
  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center w-screen h-screen bg-black bg-opacity-80 dark:bg-black dark:bg-opacity-90">
    <div className="flex flex-col items-center">
      <div className="relative mb-4">
        <div className="w-24 h-24 border-t-4 border-b-4 border-primary rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-24 h-24 border-2 border-primary rounded-full opacity-30 animate-ping"></div>
      </div>
      <h1 className="text-2xl font-bold text-white mb-2">Loading Portfolio</h1>
      <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
        <div className="h-full bg-primary rounded-full animate-progress"></div>
      </div>
      <p className="mt-4 text-gray-300 font-medium">
        Preparing awesome content...
      </p>
    </div>
  </div>
);

export default LoadingSpinner;

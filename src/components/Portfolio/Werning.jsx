import React from 'react';

const VerningIn = () => {
  return (
    <div className="fixed z-10 bottom-0 left-0 right-0 text-center">
      <div className="bg-yellow-400 p-2 shadow-lg inline-flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-red-700 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01"
          />
          <circle cx="12" cy="12" r="10" />
        </svg>
        <p className="text-red-700">MY WEBSITE IS UNDER DEVELOPMENT</p>
      </div>
    </div>
  );
};

export default VerningIn;

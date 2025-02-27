import React from 'react';
import { BsStars } from "react-icons/bs";

const AIButton = ({ onClick, className = "", size = 16 }) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ai-helper-trigger ${className}`}
      title="AI Writing Assistant"
    >
      <BsStars className="text-purple-500" size={size} />
    </button>
  );
};

export default AIButton;

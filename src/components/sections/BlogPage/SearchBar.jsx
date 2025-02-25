import React from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiX } from 'react-icons/fi';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <motion.div 
      className="relative"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <FiSearch className="w-5 h-5 text-gray-400 dark:text-gray-500" />
        </div>
        <input
          type="text"
          id="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 pl-12 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl
                   text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary/50 focus:border-primary
                   transition-all duration-300 placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none"
          placeholder="Search for articles..."
        />
        {searchQuery && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-4"
            onClick={() => setSearchQuery('')}
            aria-label="Clear search"
          >
            <FiX className="w-4 h-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors" />
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default SearchBar;

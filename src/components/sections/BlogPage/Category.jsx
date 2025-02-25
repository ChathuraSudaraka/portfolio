import React from 'react';
import { motion } from 'framer-motion';

const Category = ({ categories, onFilterBlogsByCategory, selectedCategory }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mt-6">
      {categories.map((category, index) => (
        <motion.button
          key={category}
          onClick={() => onFilterBlogsByCategory(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
            ${selectedCategory === category 
              ? 'bg-primary text-white shadow-md shadow-primary/20' 
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'}
          `}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.3,
            delay: index * 0.05 
          }}
        >
          {category}
        </motion.button>
      ))}
    </div>
  );
};

export default Category;

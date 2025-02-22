import React, { useState } from "react";

const Category = ({ categories, onFilterBlogsByCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    onFilterBlogsByCategory(category);
  };

  return (
    <div className="w-full max-w-6xl p-8 mx-auto mt-8 mb-8 gap-3 flex flex-wrap justify-center border border-black dark:border-border-color rounded-lg">
      <button
        key="all"
        onClick={() => handleCategoryClick("All")}
        className={`${
          selectedCategory === "All"
            ? "text-gray-900 bg-primary border border-gray-300 focus:outline-none hover:bg-primary font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-primary dark:text-white dark:border-primary dark:hover:bg-primary dark:hover:border-gray-600"
            : "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600"
        } px-4 py-2 rounded-lg shadow-md hover:shadow-lg focus:outline-none transition duration-300 ease-in-out`}
        aria-label="All categories"
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryClick(category)}
          className={`${
            selectedCategory === category
              ? "text-gray-900 bg-primary border border-gray-300 focus:outline-none hover:bg-primary font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-primary dark:text-white dark:border-gray-600 dark:hover:bg-primary dark:hover:border-gray-600"
              : "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600"
          } ml-4 px-4 py-2 rounded-lg shadow-md hover:shadow-lg focus:outline-none transition duration-300 ease-in-out`}
          aria-label={`Filter by ${category}`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default Category;

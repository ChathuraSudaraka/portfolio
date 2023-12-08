import React, { useState } from "react";

const categories = [
  "All",
  "Technology",
  "Entertainment",
  "Travel",
  "Food",
  "Fashion",
  "Sports",
];

const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    // perform additional actions based on the selected category if needed
  };

  return (
    <div className="w-full max-w-3xl p-8 mx-auto mt-8 flex flex-wrap justify-center border border-bgShade dark:border-border-color rounded-lg">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryClick(category)}
          className={`${
            selectedCategory === category
              ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          } text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default Category;

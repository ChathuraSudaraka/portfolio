import React from "react";

const Article = () => {
  return (
    <div className="dark:bg-custom-blue">
      <div className="lg:mx-12 mx-4 py-32" id="experience">
        <div className="mb-20">
          <p className="text-xl text-headingcolor dark:text-white font-semibold mb-5">
            My Article
          </p>
          <h2 className="md:text-5xl text-4xl text-headingcolor dark:text-white font-bold">
            My Blogs
          </h2>
        </div>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {/* Blog Post 1 */}
            <div className="dark:shadow-lg dark:shadow-blue-500/50 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
              <h4 className="text-xl dark:text-white font-semibold mb-2">Happy Blog Day</h4>
              <img
                src="https://hicaps.com.ph/wp-content/uploads/2022/01/blog-examples-for-students.jpg"
                alt="Image Alt Text"
                className="w-full h-auto mb-2" 
              />
              <p className="text-gray-700 dark:text-gray-300">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              </p>
            </div>

            {/* Blog Post 2 */}
            <div className="dark:shadow-lg dark:shadow-blue-500/50 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
              <h4 className="text-xl dark:text-white font-semibold mb-2">Happy Blog Day</h4>
              <img
                src="https://hicaps.com.ph/wp-content/uploads/2022/01/blog-examples-for-students.jpg"
                alt="Image Alt Text"
                className="w-full h-auto mb-2" 
              />
              <p className="text-gray-700 dark:text-gray-300">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              </p>
            </div>

            {/* Blog Post 3 */}
            <div className="dark:shadow-lg dark:shadow-blue-500/50 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
              <h4 className="text-xl dark:text-white font-semibold mb-2">Happy Blog Day</h4>
              <img
                src="https://hicaps.com.ph/wp-content/uploads/2022/01/blog-examples-for-students.jpg"
                alt="Image Alt Text"
                className="w-full h-auto mb-2" 
              />
              <p className="text-gray-700 dark:text-gray-300">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;

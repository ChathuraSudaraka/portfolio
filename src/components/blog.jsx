import React from "react";

const Article = () => {
  return (
    <div className="dark:bg-custom-blue" id="blog">
      <div className="lg:mx-12 mx-4 py-10 lg:py-32">
        <div className="mb-10 lg:mb-20">
          <p className="text-xl dark:text-white text-headingcolor font-semibold mb-3">
            My Article
          </p>
          <h2 className="md:text-4xl text-3xl lg:text-5xl dark:text-white text-headingcolor font-bold">
            My Blogs
          </h2>
        </div>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {/* Blog Post 1 */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
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
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
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
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
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

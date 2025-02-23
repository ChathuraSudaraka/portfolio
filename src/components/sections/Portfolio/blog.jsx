// Article.js
import React from "react";
import { Link } from "react-router-dom";
import { blogs } from "../../../context/data";
import { FaBlog } from "react-icons/fa";

const Article = () => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="">
      <div className="lg:mx-12 mx-4 py-32" id="blog">
        <div className="mb-20 flex flex-col sm:flex-row md:items-center justify-between gap-5">
          <div>
            <p className="text-xl dark:text-white text-headingcolor font-semibold mb-5">
              My Article
            </p>
            <h2 className="md:text-5xl dark:text-white text-4xl text-headingcolor font-bold">
              My Blogs
            </h2>
          </div>
          <div className="flex items-center">
            <Link
              to="/blog"
              onClick={scrollToTop}
              className="relative items-center justify-center inline-block p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 rounded-lg shadow-2xl group"
            >
              <span className="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 dark:bg-red-500 bg-[#9D76C1] rounded-full blur-md ease"></span>
              <span className="absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease">
                <span className="absolute bottom-0 left-0 w-24 h-24 -ml-10 dark:bg-purple-500 bg-[#5B0888] rounded-full blur-md"></span>
                <span className="absolute bottom-0 right-0 w-24 h-24 -mr-10 dark:bg-pink-500 bg-[#713ABE] rounded-full blur-md"></span>
              </span>

              <span className="relative text-white flex items-center">
                <FaBlog className="w-8 h-8 inline-block mr-2" />
                Visit My Blogs
              </span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
          {blogs.slice(0, 6).map((blog) => (
            <div
              key={blog.id}
              className="flex flex-col flex-grow"
              data-aos="fade-up"
              data-aos-offset="150"
            >
              <div className="flex-1 dark:bg-custom-dark-blue bg-bgcom border border-bgShade dark:border-border-color rounded-t-lg rounded-b-none overflow-hidden shadow-lg">
                <div className="flex flex-wrap no-underline hover:no-underline">
                  <img
                    src={blog.image}
                    className="h-64 w-full rounded-t pb-6"
                    alt={`Blog ${blog.id} Image`}
                  />
                  <p className="w-full dark:text-blue-800 text-gray-600 text-xs md:text-sm px-6 uppercase">
                    {blog.category}
                  </p>
                  <div className="w-full font-bold text-xl dark:text-white text-gray-900 px-6">
                    {blog.title}
                  </div>
                  <p className="text-gray-800 dark:text-gray-300 font-serif text-base px-6 mb-5 line-clamp-4 text-justify">
                    {Array.from({ length: 20 }, (_, index) => (
                      <span key={index} className="mb-4">
                        {blog[`content${index + 1}`]}
                      </span>
                    ))}
                    {Array.from({ length: 20 }, (_, index) => (
                      <span key={index} className="list-item-animation">
                        {blog[`listItem${index + 1}`]}
                      </span>
                    ))}
                    {Array.from({ length: 20 }, (_, index) => (
                      <span key={index} className="list-item-animation">
                        {blog[`topic${index + 1}`]}
                      </span>
                    ))}
                  </p>
                </div>
                <Link
                  onClick={scrollToTop}
                  to={`/blog/${blog.id}`}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 ml-6 mb-5 px-4 rounded-lg inline-flex items-center"
                >
                  Read More
                </Link>
              </div>
              <hr className="w-48 h-1 mx-auto bg-gray-400 border-0 rounded dark:bg-gray-700" />
              <div className="flex-none mt-auto border border-bgShade dark:border-border-color dark:bg-custom-dark-blue bg-white rounded-b-lg rounded-t-none overflow-hidden shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <img
                    className="w-8 h-8 rounded-full mr-4 avatar"
                    data-tippy-content="Author Name"
                    src="/assets/icon.png"
                    alt={`Avatar of Author ${blog.id}`}
                  />
                  <p className="text-gray-600 dark:text-white text-xs md:text-sm">
                    {blog.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Article;

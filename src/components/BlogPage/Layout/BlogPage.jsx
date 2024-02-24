import React from "react";
import { Link, useParams } from "react-router-dom";
import { blogs } from "./data";
import BlogFooter from "./BlogFooter";
import { NextIcon, PreviousIcon } from "../../Portfolio/hooks/CustomTag";
import CommentArea from "../Pages/Comment-Area/CommentArea";

const BlogPage = () => {
  const { id } = useParams();
  const blog = blogs.find((blog) => blog.id === parseInt(id));

  if (!blog) {
    return (
      <div class="bg-gray-100 h-screen flex items-center justify-center">
        <div class="max-w-md bg-white p-8 rounded-md shadow-md">
          <h2 class="text-3xl font-bold text-gray-800 mb-4">Blog Not Found</h2>
          <p class="text-gray-600 mb-4">
            Sorry, the blog you are looking for could not be found. Please check
            the URL or try again later.
          </p>
          <a href="/BlogApp" class="text-blue-500 hover:underline">
            Go to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="contents">
      <div className="bg-bgShade dark:bg-custom-blue min-h-screen">
        {/* Header */}
        <header className="text-white py-4 fixed w-full z-10 trans">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/">
              <button className="ml-4 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 transition duration-300 ease-in-out">
                Home
                {/* <PreviousIcon/> */}
              </button>
            </Link>
            <div className="flex">
              <Link to="/BlogApp">
                <button className="mr-4 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 transition duration-300 ease-in-out">
                  Blog Page
                  {/* <NextIcon/> */}
                </button>
              </Link>
            </div>
          </div>
        </header>

        {/* Blog Content */}
        <div className="relative overflow-hidden bg-cover bg-no-repeat bg-[50%] h-[500px]">
          <img
            src={blog.imageSrc}
            alt={`Blog ${blog.id} Image`}
            className="w-full h-auto object-cover object-center"
          />
        </div>

        <div className="w-100 mx-auto px-4 sm:max-w-2xl md:max-w-3xl md:px-12 lg:max-w-7xl xl:max-w-[1600px] xl:px-62 py-10">
          <div className="text-base">
            <div className="block rounded-t-lg border border-black dark:border-border-color bg-[hsla(0,0%,100%,0.55)] px-6 py-12 dark:bg-[hsla(0,0%,5%,0.55)] dark:shadow-lg md:py-16 md:px-12 mt-[-170px] backdrop-blur-[30px]">
              <h1 className="dark:text-primary font-bold tracking-tight">
                {blog.category}
              </h1>
              <h1 className="dark:text-primary mt-2 mb-16 text-2xl font-bold tracking-tight md:text-3xl xl:text-4xl">
                {blog.title}
              </h1>
              <div className="mt-4 text-gray-700 text-justify dark:text-gray-300 font-serif">
                {Array.from({ length: 20 }, (_, index) => (
                  <p key={index} className="mb-4">
                    {blog[`content${index + 1}`]}
                  </p>
                ))}
              </div>
              <div className="mt-8 text-gray-700 text-justify dark:text-gray-300 font-serif">
                {Array.from({ length: 20 }, (_, index) => (
                  <ul key={index} className="list-item-animation">
                    {blog[`listItem${index + 1}`]}
                  </ul>
                ))}
              </div>
              <div className="mt-8 text-gray-700 text-justify dark:text-gray-300 font-serif">
                {Array.from({ length: 20 }, (_, index) => (
                  <ul key={index} className="list-item-animation">
                    {blog[`topic${index + 1}`]}
                  </ul>
                ))}
              </div>
            </div>
            <hr className="w-48 h-1 mx-auto bg-gray-400 border-0 rounded dark:bg-gray-700" />
            <div className="flex-none mt-auto border border-black dark:border-border-color dark:bg-[hsla(0,0%,5%,0.55)] dark:shadow-lg bg-[hsla(0,0%,100%,0.55)] rounded-b-lg rounded-t-none overflow-hidden  p-6">
              <div className="flex items-center justify-between">
                <img
                  className="w-8 h-8 rounded-full mr-4"
                  src={blog.authorAvatar}
                  alt={`Avatar of Author ${blog.id}`}
                />
                <p className="text-sm text-gray-600 dark:text-white">
                  {blog.date}
                </p>
              </div>
            </div>
          </div>
        </div>
        <CommentArea />
      </div>
      <BlogFooter />
    </div>
  );
};

export default BlogPage;

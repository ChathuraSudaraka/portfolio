// BlogCard.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../Layout/Pagination";
import { blogs } from "../../Layout/data";
import Category from "./Category";
import { CardContainer, CardItem } from "../../../ui/3d-card";

function BlogCard() {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const [filteredBlogs, setFilteredBlogs] = useState(blogs);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const onFilterBlogsByCategory = (category) => {
    if (category === "All") {
      setFilteredBlogs(blogs);
    } else {
      setFilteredBlogs(blogs.filter((blog) => blog.category === category));
    }
  };

  return (
    <section>
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
          <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Our Blog
          </h2>
          <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
            We use an agile approach to test assumptions and connect with the
            needs of your audience early and often.
          </p>
        </div>

        <Category
          categories={Array.from(new Set(blogs.map((blog) => blog.category)))}
          onFilterBlogsByCategory={onFilterBlogsByCategory}
          selectedCategory={selectedCategory}
        />

        <Pagination
          items={filteredBlogs}
          itemsPerPage={4} // Adjust as needed
          renderItem={(currentItems) => (
            <div className="grid gap-8 lg:grid-cols-2">
              {currentItems.map((blog) => (
                <CardContainer
                  key={blog.id}
                  className="bg-white rounded-lg border border-gray-200 shadow-md dark:bg-blog-component-bg dark:border-border-color overflow-hidden"
                >
                  <img
                    src={blog.imageSrc}
                    alt=""
                    className="rounded-t-lg h-72 w-full"
                  />
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-5 text-gray-500">
                      <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800 uppercase">
                        {blog.category}
                      </span>
                      <span className="text-sm">{blog.date}</span>
                    </div>
                    <CardItem
                      translateZ="50"
                      className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                    >
                      <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
                    </CardItem>
                    <CardItem
                      as="p"
                      translateZ="60"
                      className="mb-5 font-light text-gray-500 dark:text-gray-400 line-clamp-4"
                    >
                      {Array.from({ length: 20 }, (_, index) => (
                        <span key={index} className="mb-4 block">
                          {blog[`content${index + 1}`]}
                        </span>
                      ))}
                    </CardItem>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <img
                          className="w-7 h-7 rounded-full"
                          src={blog.authorAvatar}
                          alt={`Avatar of Author ${blog.id}`}
                        />
                      </div>
                      <Link
                        onClick={scrollToTop}
                        to={`/blog/${blog.id}`}
                        className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline"
                      >
                        Read more
                        <svg
                          className="ml-2 w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </CardContainer>
              ))}
            </div>
          )}
          containerClassName="containerClassName"
          pageLinkClassName="flex items-center "
        />
      </div>
    </section>
  );
}

export default BlogCard;

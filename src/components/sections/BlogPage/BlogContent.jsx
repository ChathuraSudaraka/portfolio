// BlogCard.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Category from "./Category";
import { CardContainer, CardItem } from "../../ui/3d-card";
import Pagination from "../../common/Pagination";
import { blogs } from "../../../context/data";
import SearchBar from "../../sections/BlogPage/SearchBar";

function BlogCard() {
  const [filteredBlogs, setFilteredBlogs] = useState(blogs);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    filterBlogs();
  }, [selectedCategory, searchQuery]);

  const filterBlogs = () => {
    let filtered = blogs;

    // Category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter((blog) => blog.category === selectedCategory);
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          blog.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredBlogs(filtered);
  };

  return (
    <section className="min-h-screen">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        {/* Header */}
        <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
          <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Our Blog
          </h2>
          <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
            We use an agile approach to test assumptions and connect with the
            needs of your audience early and often.
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {/* Category Filter */}
        <Category
          categories={["All", ...new Set(blogs.map((blog) => blog.category))]}
          onFilterBlogsByCategory={(category) => setSelectedCategory(category)}
          selectedCategory={selectedCategory}
        />

        {/* No Results Message */}
        {filteredBlogs.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500 dark:text-gray-400">
              No blogs found matching your criteria.
            </p>
          </div>
        )}

        {/* Blog Grid */}
        <Pagination
          items={filteredBlogs}
          itemsPerPage={4}
          renderItem={(currentItems) => (
            <div className="grid gap-8 lg:grid-cols-2">
              {currentItems.map((blog) => (
                <CardContainer
                  key={blog.id}
                  className="group hover:shadow-xl transition-shadow duration-300
                    bg-white rounded-lg border border-gray-200 shadow-md 
                    dark:bg-blog-component-bg dark:border-border-color overflow-hidden"
                >
                  <img
                    src={blog.image}
                    alt=""
                    className="rounded-t-lg h-72 w-full"
                  />
                  <div className="p-3">
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
                      className="mb-5 font-light text-gray-500 dark:text-gray-400 line-clamp-4 text-justify"
                    >
                      {Array.from({ length: 20 }, (_, index) => (
                        <span key={index} className="mb-4 block">
                          {blog.description}
                        </span>
                      ))}
                    </CardItem>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <img
                          className="w-7 h-7 rounded-full"
                          src="/assets/icon.png"
                          alt={`Avatar of Author ${blog.id}`}
                        />
                      </div>
                      <Link
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
          containerClassName="mt-8"
          pageLinkClassName="hover:text-primary-500 transition-colors duration-200"
        />
      </div>
    </section>
  );
}

export default BlogCard;

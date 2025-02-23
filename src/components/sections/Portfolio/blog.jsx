// Article.js
import React from "react";
import { Link } from "react-router-dom";
import { blogs } from "../../../context/data";
import { FaBlog } from "react-icons/fa";
import { motion } from "framer-motion";
import { CardContainer, CardBody, CardItem } from "../../ui/3d-card";

const Article = () => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <section className="relative py-20" id="blog">
      <div className="container px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-secondary/10 dark:bg-secondary/20 px-3 py-2 rounded-full mb-4">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary" />
            </span>
            <p className="text-sm font-medium text-secondary">Latest Articles</p>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            My <span className="text-secondary">Blog</span>
          </h2>

          <Link
            to="/blog"
            onClick={scrollToTop}
            className="inline-flex items-center px-4 py-2 bg-secondary/10 hover:bg-secondary/20 text-secondary rounded-full transition-colors duration-200"
          >
            <FaBlog className="w-5 h-5 mr-2" />
            <span>View All Posts</span>
          </Link>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.slice(0, 6).map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CardContainer>
                <CardBody className="relative group bg-white/50 dark:bg-black/50 border border-gray-200/50 dark:border-gray-800/50 rounded-xl p-6">
                  {/* Blog Image */}
                  <CardItem translateZ="100" className="w-full h-48 rounded-lg overflow-hidden mb-6">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </CardItem>

                  {/* Content */}
                  <div className="space-y-4">
                    <span className="text-xs font-medium text-secondary bg-secondary/10 px-2.5 py-1 rounded-full">
                      {blog.category}
                    </span>

                    <CardItem translateZ="50" className="space-y-2">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {blog.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                        {blog.content1}
                      </p>
                    </CardItem>

                    <CardItem translateZ="60" className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <img
                          src="/assets/icon.png"
                          alt="Author"
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {blog.date}
                        </span>
                      </div>

                      <Link
                        to={`/blog/${blog.id}`}
                        onClick={scrollToTop}
                        className="text-secondary hover:text-secondary/80 transition-colors duration-200"
                      >
                        Read More →
                      </Link>
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Article;

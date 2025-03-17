import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiEdit3, FiArrowRight, FiBookOpen } from "react-icons/fi";
import { HoverBorderGradient } from "../../ui/hover-border-gradient";
import GradientButton from "../../ui/gradient-button";

const BlogHero = () => {
  const startYear = 2022;
  const currentYear = new Date().getFullYear();
  const experienceYears =
    (currentYear - startYear + (new Date().getMonth() >= 9 ? 1 : 0)).toFixed(
      1
    ) + "+";

  const articleCount = "10+";
  const TechnicalTopics = "5+";
  return (
    <section
      id="blog-hero"
      className="relative py-20 sm:py-24 lg:py-32 overflow-hidden"
    >
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        {/* Hero content with animations */}
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
          {/* Text content */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge - Similar to contact section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="inline-flex items-center space-x-2 bg-primary/10 dark:bg-primary/20 px-4 py-2 rounded-full mb-6"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              <p className="text-sm font-medium text-primary">
                Ideas & Insights
              </p>
            </motion.div>

            {/* Main heading with gradient */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
              Explore My <span className="text-primary">Blog</span> &{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Thoughts
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
              Dive into articles on web development, UI/UX design, and the
              latest tech trends. Sharing knowledge and experiences from my
              journey as a developer.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center lg:justify-start">
              <Link to="/blog">
                <HoverBorderGradient className="w-full sm:w-auto px-6 py-3 bg-transparent hover:bg-primary/5 text-gray-900 dark:text-white">
                  <span className="flex items-center justify-center gap-2">
                    Explore Articles <FiBookOpen className="text-lg" />
                  </span>
                </HoverBorderGradient>
              </Link>

              <Link to="/blog/create">
                <GradientButton
                  as={Link}
                  className="w-full sm:w-auto px-6 py-3 flex items-center justify-center gap-2"
                >
                  Write with Me
                  <FiArrowRight className="text-lg" />
                </GradientButton>
              </Link>
            </div>
          </motion.div>

          {/* Visual element - Abstract shapes or illustration */}
          <motion.div
            className="flex-1 relative hidden lg:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="aspect-square max-w-md mx-auto relative">
              {/* Decorative elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/30 rounded-3xl transform rotate-3"></div>
              <div className="absolute inset-0 border-2 border-primary/30 dark:border-primary/20 rounded-3xl transform -rotate-3"></div>

              {/* Main visual - Blog imagery */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-primary/20 dark:bg-primary/30 rounded-full flex items-center justify-center">
                  <FiEdit3 className="w-10 h-10 text-primary" />
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                className="absolute top-10 right-10 w-12 h-12 bg-secondary/30 dark:bg-secondary/20 rounded-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute bottom-10 left-10 w-16 h-16 bg-primary/30 dark:bg-primary/20 rounded-full"
                animate={{ y: [0, 10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              />
              <motion.div
                className="absolute top-1/3 left-1/4 w-8 h-8 bg-primary/40 dark:bg-primary/30 rounded-lg transform rotate-45"
                animate={{ rotate: [45, 90, 45] }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Stats or features - Optional */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 pt-8 border-t border-gray-200 dark:border-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="text-center p-4">
            <h3 className="text-3xl font-bold text-primary mb-2">
              {/* This should be replaced with a dynamic count from your blog data */}
              {articleCount || "10+"}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Articles Published
            </p>
          </div>
          <div className="text-center p-4 border-l-0 sm:border-l border-r-0 sm:border-r border-gray-200 dark:border-gray-800">
            <h3 className="text-3xl font-bold text-secondary mb-2">
              {TechnicalTopics}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">Technical Topics</p>
          </div>
          <div className="text-center p-4">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
              {experienceYears}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">Years Experience</p>
          </div>
        </motion.div>
      </div>

      {/* Background decorative element */}
      <div className="absolute top-0 right-0 -z-10 w-1/3 h-1/3 bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -z-10 w-1/3 h-1/3 bg-gradient-to-t from-secondary/5 to-transparent rounded-full blur-3xl"></div>
    </section>
  );
};

export default BlogHero;

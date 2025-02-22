import React from "react";
import BlogCard from "../components/sections/BlogPage/BlogContent";
import Home from "../components/sections/BlogPage/BlogHome";
import Layout from "../components/Layouts/Layout";

const BlogPage = () => {
  return (
    <Layout>
      <Home />
      <BlogCard />
    </Layout>
  );
};

export default BlogPage;

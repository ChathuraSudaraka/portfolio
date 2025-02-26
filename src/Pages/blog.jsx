import React from "react";
import Home from "../components/sections/BlogPage/BlogHero";
import Layout from "../components/Layouts/Layout";
import BlogContent from "../components/sections/BlogPage/BlogContent";

const BlogPage = () => {
  return (
    <Layout>
      <Home />
      <BlogContent />
    </Layout>
  );
};

export default BlogPage;

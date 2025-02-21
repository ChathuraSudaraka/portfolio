import React from "react";
import BlogCard from "../components/BlogPage/Pages/Home/BlogContent";
import Home from "../components/BlogPage/Pages/Home/BlogHome";
import Layout from "../Layouts/Layout";

const BlogPage = () => {
  return (
    <Layout>
      <Home />
      <BlogCard />
    </Layout>
  );
};

export default BlogPage;

import React from "react";
import BlogNavbar from "../Layout/BlogNavbar";
import BlogFooter from "../Layout/BlogFooter";
import BlogPost from "../Pages/Home/BlogHome";
import BlogSlider from "../Pages/Home/BlogContent";
import Block from "../Pages/Home/Category";
import Pagination from "../Layout/Pagination";

function BlogApp() {
  return (
    <div className="bg-bgShade dark:bg-blog-bg">
      <BlogNavbar />
      <BlogPost />
      <Block />
      <BlogSlider />
      <Pagination />
      <BlogFooter />
    </div>
  );
}

export default BlogApp;

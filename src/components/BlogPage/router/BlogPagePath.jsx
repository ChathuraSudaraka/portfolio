import React from "react";
import BlogNavbar from "../Layout/BlogNavbar";
import BlogFooter from "../Layout/BlogFooter";
import BlogPost from "../Pages/Home/BlogHome";
import BlogCard from "../Pages/Home/BlogContent";

function BlogApp() {
  return (
    <div className="bg-bgShade dark:bg-blog-bg">
      <BlogNavbar />
      <BlogPost />
      <BlogCard />
      <BlogFooter />
    </div>
  );
}

export default BlogApp;

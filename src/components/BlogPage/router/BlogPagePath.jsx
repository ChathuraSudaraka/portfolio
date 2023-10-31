import React from "react";
import BlogNavbar from "../Layout/BlogNavbar";
import BlogFooter from "../Layout/BlogFooter";
import BlogPost from "../Blog";

function BlogApp() {
  return (
    <div>
      <BlogNavbar />
      <BlogPost />
      <BlogFooter />
    </div>
  );
}

export default BlogApp;

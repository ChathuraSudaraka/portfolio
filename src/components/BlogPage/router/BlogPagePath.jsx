import React from "react";
import BlogNavbar from "../Layout/BlogNavbar";
import BlogFooter from "../Layout/BlogFooter";
import BlogPost from "../Blog";
import BlogSlider from "../BlogSlider";
import Block from "../Block";

function BlogApp() {
  return (
    <div>
      <BlogNavbar />
      <BlogPost />
      <Block />
      <BlogSlider/>
      <BlogFooter />
    </div>
  );
}

export default BlogApp;

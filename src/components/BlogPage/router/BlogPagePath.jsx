import React from "react";
import BlogNavbar from "../Layout/BlogNavbar";
import BlogFooter from "../Layout/BlogFooter";
import BlogPost from "../Pages/Home/Blog";
import BlogSlider from "../Pages/Home/BlogSlider";
import Block from "../Pages/Home/Block";
import { Route, Routes } from "react-router-dom"; // Remove BrowserRouter import
import BlogAbout from "../Pages/About/BlogAbout";

function BlogApp() {
  return (
    <div>
      <BlogNavbar />
      <Routes>
        <Route path="/about" element={<BlogAbout />} />
      </Routes>
      <BlogPost />
      <Block />
      <BlogAbout/>
      <BlogSlider />
      <BlogFooter />
    </div>
  );
}

export default BlogApp;

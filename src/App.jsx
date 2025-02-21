import React from "react";
import "./App.css";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import BackToTop from "./components/Portfolio/BackToTop";
import DarkLight from "./components/Portfolio/DarkLight";
import CircleFollowMouse from "./components/Portfolio/hooks/use-follow-pointer";
import ScrollAnimation from "./components/Portfolio/hooks/ScrollAnimation";
import VerningIn from "./components/Portfolio/Werning";
import NotePad from "./components/BlogPage/Pages/Tiptap/NotePad";
import Home from "./Pages/home";
import BlogPage from "./Pages/blog";
import BlogData from "./components/BlogPage/BlogPage";
import Work from "./Pages/work";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/BlogApp/*" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogData />} />
        <Route path="/work" element={<Work />} />
        {/* <Route path="/NotePad/*" element={<NotePad />} /> */}
        <Route path="/NotePad/*" element={<NotePad />} />
      </Routes>

      {/* This library files need to every Pages */}
      {/* Buttons */}
      <BackToTop />
      <DarkLight />
      <CircleFollowMouse />
      {/* Library */}
      <ScrollAnimation />
      <VerningIn />
    </BrowserRouter>
  );
}

export default App;

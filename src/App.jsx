import React from "react";
import "./App.css";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import PortfolioApp from "./components/Portfolio/Router/PortfolioPath";
import BlogApp from "./components/BlogPage/router/BlogPagePath";
import BackToTop from "./components/Portfolio/BackToTop";
import DarkLight from "./components/Portfolio/DarkLight";
import CircleFollowMouse from "./components/Portfolio/hooks/use-follow-pointer";
import ScrollAnimation from "./components/Portfolio/hooks/ScrollAnimation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PortfolioApp />} />
        <Route path="/blog" element={<BlogApp />} />
      </Routes>

      {/* This library files need to every Pages */}
      {/* Buttons */}
      <BackToTop />
      <DarkLight />
      <CircleFollowMouse />
      {/* Library */}
      <ScrollAnimation />
    </BrowserRouter>
  );
}

export default App;

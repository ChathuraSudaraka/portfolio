import "./App.css";
import React from "react";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom"; // Import necessary components

import PortfolioApp from "./components/Portfolio/Router/PortfolioPath";
import BlogApp from "./components/BlogPage/router/BlogPagePath";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PortfolioApp />} />
        <Route path="blog" element={<BlogApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React from "react";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./Pages/home";
import BlogPage from "./Pages/Blog";
import Work from "./Pages/Work";
import NotePad from "./components/sections/BlogPage/Tiptap/NotePad";
import NotFound from "./Pages/NotFound";
import BlogData from "./Pages/BlogPage";
import DarkLight from "./components/common/DarkLight";
import BackToTop from "./components/common/BackToTop";
import CircleFollowMouse from "./hooks/use-follow-pointer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogData />} />
        <Route path="/work" element={<Work />} />
        <Route path="/NotePad/*" element={<NotePad />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <BackToTop />
      <DarkLight />
      <CircleFollowMouse />
    </BrowserRouter>
  );
}

export default App;

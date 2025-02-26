import React from "react";
import "./App.css";
import { Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import Home from "./Pages/home";
import BlogPage from "./Pages/Blog";
import CreateBlog from "./Pages/CreateBlog";
import NotFound from "./Pages/NotFound";
import BlogData from "./Pages/BlogPage";
import DarkLight from "./components/common/DarkLight";
import BackToTop from "./components/common/BackToTop";
import CircleFollowMouse from "./hooks/use-follow-pointer";
import CookieSettings from "./Pages/Legal/CookieSettings";
import PrivacyPolicy from "./Pages/Legal/PrivacyPolicy";
import TermsOfService from "./Pages/Legal/TermsOfService";
import Work from "./Pages/work";
import UseToast from "./hooks/useToast";
import Navbar from "./components/common/Navbar";

// Wrapper component to conditionally render navbar
const AppContent = () => {
  const location = useLocation();
  const showNavbar = ["/", "/blog", "/work"].includes(location.pathname);

  return (
    <div className="relative">
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/create" element={<CreateBlog />} /> {/* Add the new route */}
        <Route path="/work" element={<Work />} />
        <Route path="/blog/:id" element={<BlogData />} />
        <Route
          path="/legal/*"
          element={
            <Routes>
              <Route path="/cookie-settings" element={<CookieSettings />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            </Routes>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <BackToTop />
      <DarkLight />
      <UseToast />
      <CircleFollowMouse />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;

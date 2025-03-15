import React, { lazy, Suspense } from "react";
import "./App.css";
import { Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import DarkLight from "./components/common/DarkLight";
import BackToTop from "./components/common/BackToTop";
import CircleFollowMouse from "./hooks/use-follow-pointer";
import UseToast from "./hooks/useToast";
import Navbar from "./components/common/Navbar";
import LoadingSpinner from "./components/common/LoadingSpinner";

// Lazy load components for code splitting
const Home = lazy(() => import("./Pages/home"));
const BlogPage = lazy(() => import("./Pages/Blog"));
const CreateBlog = lazy(() => import("./Pages/CreateBlog"));
const NotFound = lazy(() => import("./Pages/NotFound"));
const BlogData = lazy(() => import("./Pages/BlogPage"));
const CookieSettings = lazy(() => import("./Pages/Legal/CookieSettings"));
const PrivacyPolicy = lazy(() => import("./Pages/Legal/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./Pages/Legal/TermsOfService"));
const Work = lazy(() => import("./Pages/work"));



// Wrapper component to conditionally render navbar
const AppContent = () => {
  const location = useLocation();
  const showNavbar = ["/", "/blog", "/work"].includes(location.pathname);

  return (
    <div className="relative">
      {showNavbar && <Navbar />}
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/create" element={<CreateBlog />} />
          <Route path="/work" element={<Work />} />
          <Route path="/blog/:id" element={<BlogData />} />
          <Route
            path="/legal/*"
            element={
              <Routes>
                <Route path="cookie-settings" element={<CookieSettings />} />
                <Route path="terms-of-service" element={<TermsOfService />} />
                <Route path="privacy-policy" element={<PrivacyPolicy />} />
              </Routes>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

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

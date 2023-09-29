import "./App.css";
import About from "./components/About";
import BackToTop from "./components/BackToTop";
import Contact from "./components/Contact";
import DarkLight from "./components/DarkLight";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Portfolio from "./components/Portfolio";
import ProgressBar from "./components/ProgressBar";
import Skills from "./components/Skills";
import Testimonial from "./components/Testimonial";
import Article from "./components/blog";
import ScrollAnimation from "./components/hooks/ScrollAnimation";
import CircleFollowMouse from "./components/hooks/use-follow-pointer";

function App() {
  return (
    <>
      <Navbar />
      <Home />
      <Skills />
      <ProgressBar/>
      <About />
      <Experience />
      <Education />
      <Portfolio />
      <Article />
      <Testimonial />
      <Contact />
      <Footer />
      {/* Buttons */}
      <BackToTop />
      <DarkLight />
      <CircleFollowMouse />
      <ScrollAnimation />
    </>
  );
}

export default App;

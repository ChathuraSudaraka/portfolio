import About from "../About";
import BackToTop from "../BackToTop";
import Contact from "../Contact";
import DarkLight from "../DarkLight";
import Education from "../Education";
import Experience from "../Experience";
import Footer from "../Footer";
import Home from "../Home";
import Navbar from "../Navbar";
import Portfolio from "../Portfolio";
import ProgressBar from "../CodingSkills";
import Skills from "../Skills";
import Testimonial from "../Testimonial";
import Article from "../blog";
import ScrollAnimation from "../hooks/ScrollAnimation";
import CircleFollowMouse from "../hooks/use-follow-pointer";


function PortfolioApp() {
  return (
    <>
      <Navbar />
      <Home />
      <Skills />
      <ProgressBar />
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
      {/* Library */}
      <ScrollAnimation />
    </>
  );
}

export default PortfolioApp;

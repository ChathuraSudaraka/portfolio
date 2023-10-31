import About from "../About";
import Contact from "../Contact";
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

function PortfolioApp() {
  return (
    <div>
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
    </div>
  );
}

export default PortfolioApp;

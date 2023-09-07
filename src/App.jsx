import "./App.css";
import About from "./components/About";
import BackToTop from "./components/BackToTop";
import Contact from "./components/Contact";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Portfolio from "./components/Portfolio";
import Skills from "./components/Skills";
import Testimonial from "./components/Testimonial";

function App() {
  return (
    <>
      <Navbar />
      <Home />
      <Skills />
      <About />
      <Experience />
      <Education />
      <Portfolio />
      <Testimonial />
      <Contact />
      <Footer />
      <BackToTop />
    </>
  );
}

export default App;

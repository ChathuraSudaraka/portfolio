import Home from "../components/Portfolio/Home";
import Skills from "../components/Portfolio/Skills";
import ProgressBar from "../components/Portfolio/CodingSkills";
import About from "../components/Portfolio/About";
import Experience from "../components/Portfolio/Experience";
import Education from "../components/Portfolio/Education";
import Portfolio from "../components/Portfolio/Portfolio";
import Article from "../components/Portfolio/blog";
import Testimonial from "../components/Portfolio/Testimonial";
import Contact from "../components/Portfolio/Contact";
import Layout from "../Layouts/Layout";

function index() {
  return (
    <Layout>
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
    </Layout>
  );
}

export default index;

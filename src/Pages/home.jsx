import Home from "../components/sections/Portfolio/Home";
import Skills from "../components/sections/Portfolio/Skills";
import CodingSkills from "../components/sections/Portfolio/CodingSkills";
import About from "../components/sections/Portfolio/About";
import Experience from "../components/sections/Portfolio/Experience";
import Education from "../components/sections/Portfolio/Education";
import Portfolio from "../components/sections/Portfolio/Portfolio";
import Article from "../components/sections/Portfolio/blog";
import Testimonial from "../components/sections/Portfolio/Testimonial";
import Contact from "../components/sections/Portfolio/Contact";
import Layout from "../components/Layouts/Layout";

function index() {
  return (
    <Layout>
      <Home />
      <Skills />
      <CodingSkills />
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

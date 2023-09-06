import proPic from "/assets/profile.png";
const About = () => {
  return (
    <div className="lg:mx-12 mx-4" id="about">
      <div className="flex flex-col sm:flex-row md:gap-24 gap-12 items-center justify-between">
        <div className="sm:w-1/2">
          <img src={proPic} alt="" className="w-full sm:w-11/12" />
        </div>
        <div className="sm:w-1/2">
          <p className="text-xl text-headingcolor font-semibold mb-5">
            My Skills
          </p>
          <h2 className="md:text-5xl text-4xl text-headingcolor font-bold">
            My Expertise
          </h2>
          <p className="mt-8 md:pr-8 mb-8">
            I'm Chathura Sudaraka, a dedicated software engineering student at
            JIAT. My journey in the world of technology is a constant pursuit of
            growth and learning. With every line of code I write, my aim is to
            create a meaningful impact. I am currently exploring various
            domains, including web development, data science, and software
            architecture, where I find joy in solving intricate problems and
            turning ideas into reality. As a perpetual student, I highly value
            open-source projects and collaborative efforts. I'm always eager to
            contribute to meaningful endeavors and collaborate with fellow
            developers worldwide.
            <br /> <br />
            Beyond coding, you'll often find me immersed in the beauty of
            nature, savoring a delightful cup of tea, or getting lost in the
            pages of captivating books. My passion for exploring new places and
            embracing diverse cultures fuels my curiosity. If you're interested,
            let's connect on GitHub and embark on this incredible journey
            together.
          </p>
          <button className="btn-primary">Contact Me</button>
        </div>
      </div>
    </div>
  );
};

export default About;

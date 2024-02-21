import { BackgroundBeams } from "../ui/background-beams";
import banner from "/assets/banner.webp";
import pdf from "/assets/file/dummy.pdf";

const Home = () => {
  const handleViewPdf = () => {
    window.open(pdf, "_blank");
  };

  return (
    <div className="" id="home">
      <div className="lg:px-12 px-4 flex flex-col md:flex-row-reverse items-center justify-between py-24 gap-5 relative antialiased">
        <div className="md:w-1/2 w-full z-10" data-aos="fade-right">
          <img src={banner} alt="" className="w-full" />
        </div>
        {/* left side */}
        <div
          className="md:w-1/2 w-full mt-5 z-10"
          data-aria-owns="fade-left"
          data-aos="fade-up"
          data-aos-offset="300"
        >
          <p className="text-xl text-headingcolor dark:text-white font-semibold mb-5">
            Hey, I am Chathura Sudaraka
          </p>
          <h1 className="md:text-6xl text-4xl font-bold text-headingcolor dark:text-white leading-snug md:leading-[76px]  mb-5">
            I'm a software engineer,{" "}
            <span className="text-primary">crafting</span> elegant solutions.
          </h1>
          <p className="text-2xl text-body dark:text-white leading-9 mb-8">
            Where Software Expertise Meets Creative Problem-Solving and
            Technological Innovation
          </p>
          <button onClick={handleViewPdf} className="btn-primary">
            Download My CV
          </button>
        </div>
        {/* rigth side */}
        <BackgroundBeams />
      </div>
    </div>
  );
};

export default Home;

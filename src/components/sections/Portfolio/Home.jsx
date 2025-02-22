// import { BackgroundBeams } from "../ui/background-beams";
import { Cover } from "../../ui/cover";
import { Highlight } from "../../ui/hero-highlight";
import { HoverBorderGradient } from "../../ui/hover-border-gradient";
import banner from "/assets/banner.webp";
import pdf from "/assets/file/dummy.pdf";
import { MdDownloadForOffline } from "react-icons/md";

const Home = () => {
  const handleViewPdf = () => {
    window.open(pdf, "_blank");
  };

  return (
    <div className="" id="home">
      <div className="lg:px-12 px-4 flex flex-col md:flex-row-reverse items-center justify-between py-32 gap-5 relative antialiased">
        <div className="md:w-1/2 w-full" data-aos="fade-right">
          <img src={banner} alt="" className="w-full" />
        </div>
        {/* left side */}
        <div
          className="md:w-1/2 w-full mt-5"
          data-aria-owns="fade-left"
          data-aos="fade-up"
          data-aos-offset="300"
        >
          <p className="text-xl text-headingcolor dark:text-white font-semibold mb-5">
            Hey, I am Chathura Sudaraka
          </p>
          <h1 className="md:text-6xl text-4xl font-bold text-headingcolor dark:text-white leading-snug md:leading-[76px]  mb-5">
            I'm a <Cover>software engineer</Cover>,{" "}
            <Highlight className="text-white">crafting</Highlight> elegant
            solutions.
          </h1>
          <p className="text-2xl text-body dark:text-white leading-9 mb-8">
            Where Software Expertise Meets Creative Problem-Solving and
            Technological Innovation
          </p>
          <div>
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              onClick={handleViewPdf}
              className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
            >
              Download My CV <MdDownloadForOffline className="ml-2" />
            </HoverBorderGradient>
          </div>
        </div>
        {/* rigth side */}
        {/* <BackgroundBeams /> */}
      </div>
    </div>
  );
};

export default Home;

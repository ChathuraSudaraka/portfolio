import banner from "/assets/banner.png";
import pdf from "/assets/file/dummy.pdf";

const Home = () => {
  const handleViewPdf = () => {
    window.open(pdf, "_blank");
  };

  return (
    <div className="bg-bgShade dark:bg-slate-500" id="home">
      <div className="lg:px-12 px-4 flex flex-col md:flex-row-reverse items-center justify-between py-24 gap-5">
        <div className="md:w-1/2 w-full">
          <img src={banner} alt="" className="w-full" />
        </div>
        {/* left side */}
        <div className="md:w-1/2 w-full mt-5">
          <p className="text-xl text-headingcolor font-semibold mb-5">
            Hey, I am Chathura Sudaraka
          </p>
          <h1 className="md:text-5xl text-4xl font-bold text-headingcolor leading-snug md:leading-[76px]  mb-5">
            Where Design Mastery Meets{" "}
            <span className="text-primary">Branding Brilliance</span> and
            Creative Innovation.
          </h1>
          <p className="text-2xl text-body leading-9 mb-8">
            Where Software Expertise Meets Creative Problem-Solving and
            Technological Innovation
          </p>
          <button onClick={handleViewPdf} className="btn-primary">
            Download My CV
          </button>
        </div>
        {/* rigth side */}
      </div>
    </div>
  );
};

export default Home;

import banner from "/assets/banner.png";
import pdf from "/assets/file/dummy.pdf";
import { motion } from "framer-motion";
import imageCompression from 'browser-image-compression';

async function handleImageUpload(event) {

  const imageFile = event.target.files[0];

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920
  }
  try {
    const compressedFile = await imageCompression(imageFile, options);
    console.log(compressedFile.size/1024/1024);
  } catch (error) {
    console.log(error);
  }

}

const Home = () => {
  const handleViewPdf = () => {
    window.open(pdf, "_blank");
  };

  const imageAnimation = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
  };

  const textAnimation = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.5 } },
  };

  return (
    <div className="bg-bgShade dark:bg-slate-500" id="home">
      <div className="lg:px-12 px-4 flex flex-col md:flex-row-reverse items-center justify-between py-24 gap-5">
        <motion.div
          variants={imageAnimation}
          initial="hidden"
          animate="visible"
          className="md:w-1/2 w-full"
        >
          <img src={banner} alt="" className="w-full" />
        </motion.div>
        {/* left side */}
        <motion.div
          variants={textAnimation}
          initial="hidden"
          animate="visible"
          className="md:w-1/2 w-full mt-5"
        >
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
        </motion.div>
        {/* right side */}
      </div>
    </div>
  );
};

export default Home;

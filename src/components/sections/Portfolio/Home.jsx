import { Cover } from "../../ui/cover";
import { Highlight } from "../../ui/hero-highlight";
import { HoverBorderGradient } from "../../ui/hover-border-gradient";
import banner from "/assets/banner.webp";
import pdf from "/assets/file/dummy.pdf";
import { FiGithub, FiLinkedin, FiTwitter, FiArrowRight } from "react-icons/fi";

const Home = () => {
  const handleViewPdf = () => {
    window.open(pdf, "_blank");
  };

  return (
    <div className="relative min-h-screen" id="home">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="min-h-screen flex items-center">
          <div className="w-full mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
              {/* Content Side */}
              <div className="space-y-8" data-aos="fade-up">
                <div className="space-y-6">
                  <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                    Transforming Ideas into
                    <br />
                    <span className="text-primary">Digital Reality</span>
                  </h1>
                  
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl">
                    Senior Software Engineer specializing in building exceptional 
                    digital experiences that combine innovation with elegance.
                  </p>
                </div>

                <div className="flex items-center gap-6">
                  <HoverBorderGradient
                    containerClassName="rounded-xl"
                    as="button"
                    onClick={handleViewPdf}
                    className="bg-primary text-white px-6 py-3 flex items-center gap-2 hover:bg-primary/90 transition-all"
                  >
                    View Resume <FiArrowRight className="text-xl" />
                  </HoverBorderGradient>

                  <div className="flex gap-4">
                    {[
                      { icon: FiGithub, link: "#", label: "Github" },
                      { icon: FiLinkedin, link: "#", label: "LinkedIn" },
                      { icon: FiTwitter, link: "#", label: "Twitter" }
                    ].map((social, index) => (
                      <a
                        key={index}
                        href={social.link}
                        aria-label={social.label}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <social.icon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Image Side */}
              <div className="relative group" data-aos="fade-left">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
                <div className="relative overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-800">
                  <img 
                    src={banner} 
                    alt="Profile" 
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>

            {/* Stats Bar - Moved to bottom */}
            <div 
              className="flex justify-center gap-8 -mb-32" 
              data-aos="fade-up"
              data-aos-delay="200"
            >
              {[
                { label: "Years Experience", value: "5+" },
                { label: "Projects Completed", value: "50+" },
                { label: "Technologies", value: "20+" }
              ].map((stat, index) => (
                <div 
                  key={index} 
                  className="text-center px-8 py-4 backdrop-blur-sm bg-white/50 dark:bg-black/50 rounded-2xl border border-gray-200 dark:border-gray-800 hover:scale-105 transition-transform duration-300"
                >
                  <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

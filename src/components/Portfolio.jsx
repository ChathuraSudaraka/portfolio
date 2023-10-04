import { useEffect, useState } from "react";

const Portfolio = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("projects.json")
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  return (
    <div className="dark:bg-custom-blue">
      <div className="lg:mx-12 mx-4 py-32" id="portfolio">
        <div className="mb-20 flex flex-col sm:flex-row md:items-center justify-between gap-5">
          <div>
            <p className="text-xl dark:text-white text-headingcolor font-semibold mb-5">
              My Skills
            </p>
            <h2 className="md:text-5xl dark:text-white text-4xl text-headingcolor font-bold">
              My Portfolio
            </h2>
          </div>
          <div className="flex items-center">
            <a
              href="https://github.com/ChathuraSudaraka"
              className="relative items-center justify-center inline-block p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 rounded-lg shadow-2xl group"
            >
              <span className="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 dark:bg-red-500 bg-[#9D76C1] rounded-full blur-md ease"></span>
              <span className="absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease">
                <span className="absolute bottom-0 left-0 w-24 h-24 -ml-10 dark:bg-purple-500 bg-[#5B0888] rounded-full blur-md"></span>
                <span className="absolute bottom-0 right-0 w-24 h-24 -mr-10 dark:bg-pink-500 bg-[#713ABE] rounded-full blur-md"></span>
              </span>

              <span className="relative text-white">
                <img
                  src="/assets/github-48.png"
                  alt="Dribbble Logo"
                  className="w-8 h-8 inline-block mr-2"
                />
                Visit My GitHub
              </span>
            </a>
          </div>
        </div>

        {/* project card */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
          data-aos="fade-up"
          data-aos-offset="300"
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="dark:shadow-lg dark:shadow-blue-500/50 shadow-xl rounded-lg dark:bg-custom-dark-blue dark:outline-slate-700 transition-transform transform hover:scale-105 hover:opacity-80"
            >
              <img
                src={project.image}
                alt=""
                className="transition-transform transform hover:scale-105 hover:opacity-80 rounded-lg"
              />
              <div className="p-8">
                <h3 className="text-2xl dark:text-white font-semibold mb-2 text-headingcolor">
                  {project.name}
                </h3>
                <p className="text-body mb-4 dark:text-dark-white">
                  {project.description}
                </p>
                <a
                  href="https://github.com/ChathuraSudaraka"
                  className="underline underline-offset-8 dark:text-white"
                >
                  View In GitHub{""}
                  <img
                    src="/assets/github-48.png"
                    alt=""
                    className="w-6 inline-block ml-3 dark:bg-white dark:border rounded-full"
                  />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;

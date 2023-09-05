const skills = [
  {
    id: 1,
    name: "Strategy & Direction",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
    image: "/assets/skills-1.png",
  },
  {
    id: 2,
    name: "Branding & Logo",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
    image: "/assets/skills-2.png",
  },
  {
    id: 3,
    name: "UI & UX Design",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
    image: "/assets/skills-3.png",
  },
  {
    id: 4,
    name: "Webflow Development",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
    image: "//assets/skills-4.png",
  },
];

const Skills = () => {
  return (
    <div className="lg:mx-12 mx-4 py-32" id="skills">
      <div className="mb-20">
        <p className="text-xl text-headingcolor font-semibold mb-5">
          My Skills
        </p>
        <h2 className="md:text-5xl text-4xl text-headingcolor font-bold">
          My Expertise
        </h2>
      </div>

      {/* skillis card */}
      <div className=" grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="bg-slate-50 p-8 rounded-lg cursor-pointer hover:-translate-y-5 transition-all duration-300"
          >
            <img
              src={skill.image}
              alt=""
              className="w-14 h-14 p-3 bg-white rounded-lg shadow-md mb-7"
            />
            <h3 className="text-2xl font-bold mb-4">{skill.name}</h3>
            <p>{skill.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;

import React from "react";

const Article = () => {
  return (
    <div className="dark:bg-custom-blue">
      <div className="lg:mx-12 mx-4 py-32" id="portfolio">
        <div className="mb-20 flex flex-col sm:flex-row md:items-center justify-between gap-5">
          <div>
            <p className="text-xl dark:text-white text-headingcolor font-semibold mb-5">
              My Article
            </p>
            <h2 className="md:text-5xl dark:text-white text-4xl text-headingcolor font-bold">
              My Blogs
            </h2>
          </div>
          <div className="flex items-center">
            <a
              href="#"
              className="relative items-center justify-center inline-block p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 rounded-lg shadow-2xl group"
            >
              <span className="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 dark:bg-red-500 bg-[#9D76C1] rounded-full blur-md ease"></span>
              <span className="absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease">
                <span className="absolute bottom-0 left-0 w-24 h-24 -ml-10 dark:bg-purple-500 bg-[#5B0888] rounded-full blur-md"></span>
                <span className="absolute bottom-0 right-0 w-24 h-24 -mr-10 dark:bg-pink-500 bg-[#713ABE] rounded-full blur-md"></span>
              </span>

              <span className="relative text-white">
                <img
                  src="/assets/blogging.png"
                  alt="Dribbble Logo"
                  className="w-8 h-8 inline-block mr-2"
                />
                Visit My Blogs
              </span>
            </a>
          </div>
        </div>
        <div className="flex flex-wrap justify-between">
          <div
            className="w-full md:w-1/3 p-2 flex flex-col flex-grow flex-shrink"
            data-aos="fade-up"
            data-aos-offset="150"
          >
            <div className="flex-1 dark:bg-custom-dark-blue bg-white rounded-t rounded-b-none overflow-hidden shadow-lg">
              <a
                href="#"
                className="flex flex-wrap no-underline hover:no-underline"
              >
                <img
                  src="https://www.gematsu.com/wp-content/uploads/2023/08/Delta-Force-Ann_08-18-23.jpg"
                  className="h-64 w-full rounded-t pb-6"
                />
                <p className="w-full dark:text-blue-800 text-gray-600 text-xs md:text-sm px-6">
                  GETTING STARTED
                </p>
                <div className="w-full font-bold text-xl dark:text-white text-gray-900 px-6">
                  Delta Force: Hawk Ops.
                </div>
                <p className="text-gray-800 dark:text-gray-300 font-serif text-base px-6 mb-5">
                  Delta Force: Hawk Ops is a new tactical shooter game that is
                  scheduled to be released in 2024. It is a reboot of the
                  classic Delta Force series and features a modern setting, a
                  focus on realism, and a number of new features that are
                  designed to make it a more immersive and challenging
                  experience for players.
                </p>

                <p className="text-gray-800 dark:text-gray-300 font-serif text-base px-6 mb-5">
                  Some of the key features of Hawk Ops include a dynamic weather
                  system, a variety of new enemy factions and vehicles, a
                  campaign mode based on the film Black Hawk Down, a deep and
                  rewarding progression system, a variety of challenging
                  missions, and a competitive multiplayer mode. Overall, Delta
                  Force: Hawk Ops is shaping up to be a promising new tactical
                  shooter game that fans of the genre should be excited about.
                </p>
              </a>
            </div>
            <hr className="w-48 h-1 mx-auto bg-gray-400 border-0 rounded dark:bg-gray-700" />
            <div className="flex-none mt-auto dark:bg-custom-dark-blue bg-white rounded-b rounded-t-none overflow-hidden shadow-lg p-6">
              <div className="flex items-center justify-between">
                <img
                  className="w-8 h-8 rounded-full mr-4 avatar"
                  data-tippy-content="Author Name"
                  src="http://i.pravatar.cc/300"
                  alt="Avatar of Author"
                />
                <p className="text-gray-600 dark:text-white text-xs md:text-sm">
                  September 30, 2023
                </p>
              </div>
            </div>
          </div>

          <div
            className="w-full md:w-1/3 p-2 flex flex-col flex-grow flex-shrink"
            data-aos="fade-up"
            data-aos-offset="150"
          >
            <div className="flex-1 bg-white dark:bg-custom-dark-blue rounded-t rounded-b-none overflow-hidden shadow-lg">
              <a
                href="#"
                className="flex flex-wrap no-underline hover:no-underline"
              >
                <img
                  src="https://i.ytimg.com/vi/9m4HUt9MAzc/maxresdefault.jpg"
                  className="h-64 w-full rounded-t pb-6"
                />
                <p className="w-full dark:text-blue-800 text-gray-600 text-xs md:text-sm px-6">
                  GETTING STARTED
                </p>
                <div className="w-full font-bold text-xl dark:text-white text-gray-900 px-6">
                  Bun JS.
                </div>
                <p className="text-gray-800 dark:text-gray-300 font-serif text-base px-6 mb-5">
                  Bun JS is a new JavaScript runtime that is designed to be
                  fast, efficient, and easy to use. It is based on the V8
                  engine, but it has been optimized for performance and memory
                  usage. Bun JS can be used to create a variety of applications,
                  including games, web servers, and machine learning models. It
                  is a good choice for applications that require high
                  performance and efficiency. Bun JS has a number of advantages
                  over other JavaScript runtimes, such as Node.js and Deno. It
                  is faster, more efficient with memory, and easier to use. If
                  you are looking for a fast, efficient, and easy-to-use
                  JavaScript runtime, then Bun JS is a good option to consider.
                </p>
              </a>
            </div>
            <hr className="w-48 h-1 mx-auto bg-gray-400 border-0 rounded dark:bg-gray-700" />
            <div className="flex-none mt-auto dark:bg-custom-dark-blue bg-white rounded-b rounded-t-none overflow-hidden shadow-lg p-6">
              <div className="flex items-center justify-between">
                <img
                  className="w-8 h-8 rounded-full mr-4 avatar"
                  data-tippy-content="Author Name"
                  src="http://i.pravatar.cc/300"
                  alt="Avatar of Author"
                />
                <p className="text-gray-600 dark:text-white text-xs md:text-sm">
                  September 30, 2023
                </p>
              </div>
            </div>
          </div>

          <div
            className="w-full md:w-1/3 p-2 flex flex-col flex-grow flex-shrink"
            data-aos="fade-up"
            data-aos-offset="150"
          >
            <div className="flex-1 dark:bg-custom-dark-blue bg-white rounded-t rounded-b-none overflow-hidden shadow-lg">
              <a
                href="#"
                className="flex flex-wrap no-underline hover:no-underline"
              >
                <img
                  src="https://www.simplilearn.com/ice9/free_resources_article_thumb/Advantages_and_Disadvantages_of_artificial_intelligence.jpg"
                  className="h-64 w-full rounded-t pb-6"
                />
                <p className="w-full dark:text-blue-800 text-gray-600 text-xs md:text-sm px-6">
                  GETTING STARTED
                </p>
                <div className="w-full font-bold text-xl dark:text-white text-gray-900 px-6">
                  AI Advances Rapidly, with New Applications Emerging.
                </div>
                <p className="text-gray-800 dark:text-gray-300 font-serif text-base px-6 mb-5">
                  AI is rapidly developing and is being used in new and exciting
                  ways. Here are some examples of the latest AI updates:
                  <li>
                    OpenAI's DALL-E 2 can generate realistic and creative images
                    from text descriptions.
                  </li>
                  <li>
                    Google AI's PaLM is a large language model that can generate
                    text, translate languages, and answer questions in an
                    informative way.
                  </li>
                  <li>
                    DeepMind's AlphaFold can predict the structure of proteins
                    with high accuracy.
                  </li>
                  <li>
                    Brain.js is a JavaScript library for creating artificial
                    neural networks.
                  </li>
                  <br />
                  AI is being used to develop new medical treatments and
                  diagnostic tools, self-driving cars and other autonomous
                  vehicles, new ways to generate and distribute energy, and new
                  ways to communicate and interact with the world around us. AI
                  has the potential to make a positive impact on the world, and
                  it is an exciting time to be involved in this field.
                </p>
              </a>
            </div>
            <hr className="w-48 h-1 mx-auto bg-gray-400 border-0 rounded dark:bg-gray-700" />
            <div className="flex-none mt-auto dark:bg-custom-dark-blue bg-white rounded-b rounded-t-none overflow-hidden shadow-lg p-6">
              <div className="flex items-center justify-between">
                <img
                  className="w-8 h-8 rounded-full mr-4 avatar"
                  data-tippy-content="Author Name"
                  src="http://i.pravatar.cc/300"
                  alt="Avatar of Author"
                />
                <p className="text-gray-600 dark:text-white text-xs md:text-sm">
                  September 30, 2023
                </p>
              </div>
            </div>
          </div>

          <div
            className="w-full md:w-1/2 p-2 flex flex-col flex-grow flex-shrink"
            data-aos="fade-up"
            data-aos-offset="150"
          >
            <div className="flex-1 dark:bg-custom-dark-blue bg-white rounded-t rounded-b-none overflow-hidden shadow-lg">
              <a
                href="#"
                className="flex flex-wrap no-underline hover:no-underline"
              >
                <img
                  src="https://media.licdn.com/dms/image/D5612AQEcjWsXGFWXmw/article-cover_image-shrink_720_1280/0/1693838388491?e=2147483647&v=beta&t=bLS3-K-ZTFNEB8TbyTCH2nm7I9gCw8xsnu7X7eyBNUs"
                  className="h-full w-full rounded-t pb-6"
                />
                <p className="w-full dark:text-blue-800 text-gray-600 text-xs md:text-sm px-6">
                  GETTING STARTED
                </p>
                <div className="w-full font-bold text-xl dark:text-white text-gray-900 px-6">
                  Technology Driving Innovation in Education.
                </div>
                <p className="text-gray-800 dark:text-gray-300 font-serif text-base px-6 mb-5">
                  Technology is transforming education in many ways. From
                  personalized learning to blended learning and the use of new
                  educational resources and platforms, technology is making
                  education more accessible and effective for all students.
                </p>
                <p className="text-gray-800 dark:text-gray-300 font-serif text-base px-6 mb-5">
                  One of the most exciting ways that technology is being used in
                  education is through personalized learning. Personalized
                  learning allows students to learn at their own pace and in
                  their own way. This is done by using data to track student
                  progress and adjust the learning experience accordingly. For
                  example, students can use adaptive learning software to get
                  immediate feedback on their work and to learn at their own
                  pace.
                </p>
                <p className="text-gray-800 dark:text-gray-300 font-serif text-base px-6 mb-5">
                  Another way that technology is being used to innovate in
                  education is through blended learning. Blended learning
                  combines online learning with traditional classroom
                  instruction. This allows students to learn at their own
                  convenience and to get the support they need from teachers and
                  peers. For example, students can use online learning platforms
                  to watch lectures and complete assignments, and then meet with
                  their teachers in class to discuss their progress and get help
                  with any challenges they are facing.
                </p>
                <p className="text-gray-800 dark:text-gray-300 font-serif text-base px-6 mb-5">
                  Technology is also being used to create new educational
                  resources and platforms. For example, there are now online
                  learning platforms that offer courses from top universities
                  around the world. There are also apps that can help students
                  learn new languages, code, and other skills. For example,
                  students can use language learning apps to practice speaking
                  and listening to a new language. They can also use code
                  learning apps to learn the basics of programming.
                </p>
                <p className="text-gray-800 dark:text-gray-300 font-serif text-base px-6 mb-5">
                  The use of technology in education is still in its early
                  stages, but it has the potential to revolutionize the way we
                  learn. By making education more personalized and accessible,
                  technology can help all students reach their full potential.
                </p>
                <p className="text-gray-800 dark:text-gray-300 font-serif text-base px-6 mb-5">
                  For example, students with learning disabilities can use
                  technology to access educational resources that are tailored
                  to their needs. Students who live in rural areas can use
                  online learning platforms to access the same quality education
                  as students who live in urban areas. And students who are
                  interested in learning new skills can use apps and online
                  courses to develop their skills at their own pace.
                </p>
                <p className="text-gray-800 dark:text-gray-300 font-serif text-base px-6 mb-5">
                  The future of education is bright. With new technologies and
                  innovative programs, students are able to learn in new and
                  exciting ways. Technology is making education more accessible,
                  effective, and personalized for all students.
                </p>
              </a>
            </div>
            <hr className="w-48 h-1 mx-auto bg-gray-400 border-0 rounded dark:bg-gray-700" />
            <div className="flex-none mt-auto dark:bg-custom-dark-blue bg-white rounded-b rounded-t-none overflow-hidden shadow-lg p-6">
              <div className="flex items-center justify-between">
                <img
                  className="w-8 h-8 rounded-full mr-4 avatar"
                  data-tippy-content="Author Name"
                  src="http://i.pravatar.cc/300"
                  alt="Avatar of Author"
                />
                <p className="text-gray-600 dark:text-white text-xs md:text-sm">
                  September 30, 2023
                </p>
              </div>
            </div>
          </div>

          <div
            className="w-full md:w-1/2 p-2 flex flex-col flex-grow flex-shrink"
            data-aos="fade-up"
            data-aos-offset="150"
          >
            <div className="flex-1 flex-row dark:bg-custom-dark-blue bg-white rounded-t rounded-b-none overflow-hidden shadow-lg">
              <a
                href="#"
                className="flex flex-wrap no-underline hover:no-underline"
              >
                <img
                  src="https://img.freepik.com/premium-photo/digital-art-selected_920634-136.jpg"
                  className="h-full w-full rounded-t pb-6"
                />
                <p className="w-full dark:text-blue-800 text-gray-600 text-xs md:text-sm px-6">
                  GETTING STARTED
                </p>
                <div className="w-full font-bold text-xl dark:text-white text-gray-900 px-6">
                  Image generator AI is a new AI technology that can democratize
                  visual content creation.
                </div>
                <p className="text-gray-800 dark:text-gray-300 font-serif text-base px-6 mb-5">
                  With AI, anyone can generate realistic and creative images
                  from text descriptions, regardless of their artistic skills or
                  technical expertise. This has the potential to revolutionize
                  the way we create and consume visual content. For example,
                  writers could use AI to generate images to illustrate their
                  articles, making them more engaging and visually appealing.
                  Businesses could use AI to generate images for marketing
                  campaigns, product catalogs, and social media posts.
                </p>
                <p className="text-gray-800 dark:text-gray-300 font-serif text-base px-6 mb-5">
                  Artists could use AI to generate new inspiration for their
                  work. Of course, there are some potential challenges that need
                  to be addressed, such as the production of unrealistic or
                  inaccurate images and the responsible use of the technology.
                  However, the potential benefits of article to image generator
                  AI are significant. AI can help us to explore new creative
                  possibilities, improve communication, personalize content, and
                  automate tasks. It can also democratize visual content
                  creation, making it possible for everyone to create
                  high-quality images, regardless of their skills or expertise.
                  As the technology continues to develop, we can expect to see
                  even more innovative and exciting applications for article to
                  image generator AI.
                </p>
              </a>
            </div>
            <hr className="w-48 h-1 mx-auto bg-gray-400 border-0 rounded dark:bg-gray-700" />
            <div className="flex-none mt-auto dark:bg-custom-dark-blue bg-white rounded-b rounded-t-none overflow-hidden shadow-lg p-6">
              <div className="flex items-center justify-between">
                <img
                  className="w-8 h-8 rounded-full mr-4 avatar"
                  data-tippy-content="Author Name"
                  src="http://i.pravatar.cc/300"
                  alt="Avatar of Author"
                />
                <p className="text-gray-600 dark:text-white text-xs md:text-sm">
                  September 30, 2023
                </p>
              </div>
            </div>
          </div>

          <div
            className="w-full md:w-2/3 p-2 flex flex-col flex-grow flex-shrink"
            data-aos="fade-up"
            data-aos-offset="150"
          >
            <div className="flex-1 dark:bg-custom-dark-blue bg-white rounded-t rounded-b-none overflow-hidden shadow-lg">
              <a
                href="#"
                className="flex flex-wrap no-underline hover:no-underline"
              >
                <img
                  src="https://www.travel-british-columbia.com/wp-content/uploads/2022/02/Northern-Lights-Prince-George-NBC-header.jpg"
                  className="h-full w-full rounded-t pb-6"
                />
                <p className="w-full dark:text-blue-800 text-gray-600 text-xs md:text-sm px-6">
                  GETTING STARTED
                </p>
                <div className="w-full font-bold text-xl dark:text-white text-gray-900 px-6">
                  Seeing the Northern Lights in Norway: A Magical Experience.
                </div>
                <p className="text-gray-800 dark:text-gray-300 font-serif text-base px-6 mb-5">
                  The Northern Lights, also known as the aurora borealis, are a
                  truly magical sight to behold. They are a natural light
                  display that is caused by the interaction of charged particles
                  from the sun with the Earth's atmosphere.
                </p>
                <p className="text-gray-800 dark:text-gray-300 font-serif text-base px-6 mb-5">
                  Norway is one of the best places in the world to see the
                  Northern Lights. The country's high latitude and long winter
                  nights provide ideal conditions for viewing this natural
                  wonder.
                </p>
                <p className="text-gray-800 dark:text-gray-300 font-serif text-base px-6 mb-5">
                  If you are lucky enough to see the Northern Lights in Norway,
                  you will experience a truly unforgettable sight. The Northern
                  Lights are a reminder of the beauty and wonder of the natural
                  world.
                </p>
                <p className="text-gray-800 dark:text-gray-300 font-serif text-base px-6 mb-5">
                  To see the Northern Lights in Norway, it is important to check
                  the aurora forecast before you go. This will help you to know
                  when and where the Northern Lights are most likely to be seen.
                  It is also important to dress warmly, as the Northern Lights
                  are often seen at night, and the temperatures can be very
                  cold.
                </p>
                <p className="text-gray-800 dark:text-gray-300 font-serif text-base px-6 mb-5">
                  If you are patient and willing to go away from city lights,
                  you will be rewarded with a truly magical sight. The Northern
                  Lights are a truly unforgettable experience, and they are a
                  must-see for any visitor to Norway.
                </p>
              </a>
            </div>
            <hr className="w-48 h-1 mx-auto bg-gray-400 border-0 rounded dark:bg-gray-700" />
            <div className="flex-none mt-auto dark:bg-custom-dark-blue bg-white rounded-b rounded-t-none overflow-hidden shadow-lg p-6">
              <div className="flex items-center justify-between">
                <img
                  className="w-8 h-8 rounded-full mr-4 avatar"
                  data-tippy-content="Author Name"
                  src="http://i.pravatar.cc/300"
                  alt="Avatar of Author"
                />
                <p className="text-gray-600 text-xs dark:text-white md:text-sm">
                  September 30, 2023
                </p>
              </div>
            </div>
          </div>

          <div
            className="w-full md:w-1/3 p-2 flex flex-col flex-grow flex-shrink"
            data-aos="fade-up"
            data-aos-offset="150"
          >
            <div className="flex-1 dark:bg-custom-dark-blue bg-white rounded-t rounded-b-none overflow-hidden shadow-lg">
              <a
                href="#"
                className="flex flex-wrap no-underline hover:no-underline"
              >
                <img
                  src="https://cloudfront-us-east-2.images.arcpublishing.com/reuters/HKXN7M4EVJJAZGLQRV2GHY6WLE.jpg"
                  className="h-full w-full rounded-t pb-6"
                />
                <p className="w-full dark:text-blue-800 text-gray-600 text-xs md:text-sm px-6">
                  GETTING STARTED
                </p>
                <div className="w-full font-bold text-xl dark:text-white text-gray-900 px-6">
                  War in Ukraine: A Devastating Toll on People and the Global
                  Economy
                </div>
                <p className="text-gray-800 dark:text-gray-300 font-serif text-base px-6 mb-5">
                  The war in Ukraine is having a devastating impact on the
                  global economy. Energy prices have soared, food prices have
                  risen, and supply chains have been disrupted. This is putting
                  a strain on businesses and consumers around the world, and it
                  is particularly impacting low-income countries.
                </p>
                <p className="text-gray-800 dark:text-gray-300 font-serif text-base px-6 mb-5">
                  The war has also created uncertainty about the global economy,
                  which is leading to a decline in investment. This is impacting
                  economic growth and job creation.
                </p>
                <p className="text-gray-800 dark:text-gray-300 font-serif text-base px-6 mb-5">
                  The international community must work together to mitigate the
                  impact of the war and to support the people of Ukraine. This
                  includes providing humanitarian aid, supporting the Ukrainian
                  economy, and working to end the war as soon as possible.
                </p>
              </a>
            </div>
            <hr className="w-48 h-1 mx-auto bg-gray-400 border-0 rounded dark:bg-gray-700" />
            <div className="flex-none mt-auto dark:bg-custom-dark-blue bg-white rounded-b rounded-t-none overflow-hidden shadow-lg p-6">
              <div className="flex items-center justify-between">
                <img
                  className="w-8 h-8 rounded-full mr-4 avatar"
                  data-tippy-content="Author Name"
                  src="https://imgv3.fotor.com/images/cover-photo-image/a-beautiful-girl-with-gray-hair-and-lucxy-neckless-generated-by-Fotor-AI.jpg"
                  alt="Avatar of Author"
                />
                <p className="text-gray-600 dark:text-white text-xs md:text-sm">
                  September 30, 2023
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;

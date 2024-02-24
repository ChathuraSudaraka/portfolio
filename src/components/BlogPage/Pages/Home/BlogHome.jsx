import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="" id="home">
      <div className="lg:px-12 px-4 flex flex-col md:flex-row-reverse items-center justify-between py-32 gap-5">
        <div className="mx-auto max-w-3xl pt-32 text-center dark:text-white">
          <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            Understand User Flow.
            <span className="sm:block"> Increase Conversion. </span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
            illo tenetur fuga ducimus numquam ea!
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/"
              className="relative items-center justify-center inline-block p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 rounded-lg shadow-2xl group"
            >
              <span className="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 dark:bg-red-500 bg-[#9D76C1] rounded-full blur-md ease"></span>
              <span className="absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease">
                <span className="absolute bottom-0 left-0 w-24 h-24 -ml-10 dark:bg-purple-500 bg-[#5B0888] rounded-full blur-md"></span>
                <span className="absolute bottom-0 right-0 w-24 h-24 -mr-10 dark:bg-pink-500 bg-[#713ABE] rounded-full blur-md"></span>
              </span>
              <span className="relative text-white flex items-center">
                Visit My Portfolio
              </span>
            </Link>
            <Link
              to="/NotePad"
              className="relative items-center justify-center inline-block p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 rounded-lg shadow-2xl group"
            >
              <span className="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 dark:bg-red-500 bg-[#9D76C1] rounded-full blur-md ease"></span>
              <span className="absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease">
                <span className="absolute bottom-0 left-0 w-24 h-24 -ml-10 dark:bg-purple-500 bg-[#5B0888] rounded-full blur-md"></span>
                <span className="absolute bottom-0 right-0 w-24 h-24 -mr-10 dark:bg-pink-500 bg-[#713ABE] rounded-full blur-md"></span>
              </span>

              <span className="relative text-white flex items-center">
                Write a Article
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

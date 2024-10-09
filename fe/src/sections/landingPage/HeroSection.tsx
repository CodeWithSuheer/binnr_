import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <>
      <section className="relative w-full px-5 sm:px-8 lg:px-10 xl:px-0">
        <div className="max-w-5xl xl:max-w-6xl xxl:max-w-7xl mx-auto">
          <div className="flex justify-center items-center min-h-[100vh]">
            <div className="mt-10 content text-center">
              <h2 className="max-w-2xl mx-auto text-4xl xs:text-4xl md:text-5xl lg:text-6xl xxl:text-7xl font-bold bg-clip-text text-transparent bg-[linear-gradient(to_right,#b3b3b3,#808080,#333333,#808080,#333333,#808080,#b3b3b3)] bg-[length:200%_auto] animate-gradient">
                A New, Convenient Way to Handle Your Trash
              </h2>

              <p className="max-w-lg mx-auto mt-5 mb-7 text-md font-normal text-gray-800">
                Door-to-door trash pickup, powered by your community. Fast,
                reliable, and eco-friendly.
              </p>

              <div className="main_button pt-10">
                <Link
                  to="/"
                  className="py-2.5 px-5 text-center text-white bg-gray-800 hover:bg-[#303030] rounded-md shadow "
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>

        <a
          title="scroll"
          href="#why"
          className="mouse_icon absolute bottom-3 left-1/2 transform -translate-x-1/2 text-gray-800 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            className="text-gray-600"
            viewBox="0 0 16 16"
          >
            <path
              fill="currentColor"
              d="M8 3a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 3m4 8a4 4 0 0 1-8 0V5a4 4 0 1 1 8 0zM8 0a5 5 0 0 0-5 5v6a5 5 0 0 0 10 0V5a5 5 0 0 0-5-5"
            />
          </svg>
        </a>
      </section>
    </>
  );
};

export default HeroSection;

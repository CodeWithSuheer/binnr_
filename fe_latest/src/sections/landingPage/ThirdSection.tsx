import { MdOutlineArrowOutward } from "react-icons/md";

const ThirdSection = () => {
  return (
    <>
      <section className="relative px-4 xl:px-0 py-0">
        <div className="max-w-5xl xl:max-w-6xl xxl:max-w-7xl mx-auto ">
          <div className="grid grid-cols-1 gap-0 lg:grid-cols-3 min-h-[70vh]">
            <div className="border left_side flex justify-center items-center flex-col">
              <div className="content px-4 lg:px-6 py-8 bg-gray-200 border-b border-gray-500 w-full flex-1">
                <h2 className="pr-2 md:pr-24 text-3xl md:text-4xl xl:text-5xl font-medium">
                  Get Started
                </h2>
              </div>

              <div className="content px-4 lg:px-6 py-6 xl:py-8 bg-gray-200 flex-1">
                <p className="pr-2 md:pr-20 text-gray-800 text-md md:text-[1rem] font-normal">
                  Create your account, choose a plan that suits you, and explore
                  our easy-to-use interface.
                </p>

                <p className="mt-8 lg:mt-12 xl:mt-14 pr-20 cursor-pointer text-md md:text-[1rem] font-medium flex justify-start items-center gap-x-1">
                  Read the docs <MdOutlineArrowOutward size={21} />
                </p>
              </div>
            </div>
            <div className="border col-span-2 flex justify-center items-center">
              <img
                width="100%"
                height="100%"
                src="https://cdn.shopify.com/s/files/1/0704/6378/2946/files/binr_img.png?v=1728131391"
                alt="main_banner_img"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ThirdSection;

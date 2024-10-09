import { MdOutlineArrowOutward } from "react-icons/md";

const ForthSection = () => {
  return (
    <>
      <section className="relative px-4 xl:px-0 py-2 lg:py-0">
        <div className="max-w-5xl xl:max-w-6xl xxl:max-w-7xl mx-auto ">
          <div className="grid grid-cols-1 gap-0 lg:grid-cols-3 min-h-[70vh]">
            <div className="border border-t-0 col-span-2 right_side flex justify-center items-center">
              <img
                width="100%"
                height="100%"
                src="https://cdn.shopify.com/s/files/1/0704/6378/2946/files/binr_img.png?v=1728131391"
                alt="main_banner_img"
                className="object-cover"
              />
            </div>
            <div className="relative border border-t-0 bg-gray-200 left_side flex justify-center items-end">
              <div className="absolute top-3 right-3 cursor-pointer">
                <MdOutlineArrowOutward size={21} />
              </div>
              <div className="content px-6 py-8">
                <h2 className="pr-2 md:pr-10 text-3xl md:text-3xl font-medium">
                  Choose Your Affiliate
                </h2>

                <p className="mt-2 pr-4 text-gray-800 text-md md:text-[1rem] font-normal">
                  Select from a list of rated affiliates and schedule a pickup
                  time that fits your lifestyle.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForthSection;

import { ThreeDCardDemo } from "./components/ThreeDCardDemo";

const How = () => {
  return (
    <>
      <section className="relative px-4 xl:px-0 py-5">
        <div className="max-w-5xl xl:max-w-6xl xxl:max-w-7xl mx-auto ">
          <div className="grid grid-cols-1 gap-y-2 lg:gap-3 xl:gap-0 lg:grid-cols-2 min-h-[90vh]">
            <div className="left_side flex justify-center lg:justify-start items-end sm:items-center min-w-[50%]">
              <div className="content px-0 sm:px-4 md:px-6 py-0 sm:py-8">
                <h2 className="pb-2 max-w-xl mx-auto text-3xl lg:text-4xl font-semibold bg-clip-text text-transparent bg-[linear-gradient(to_right,#b3b3b3,#808080,#333333,#808080,#333333,#808080,#b3b3b3)] bg-[length:200%_auto] animate-gradient">
                  Step 1: Get Started
                </h2>
                <p className="mt-2 max-w-md text-sm text-gray-900 sm:text-[1.05rem] tracking-wide">
                  Create your account, choose a plan that suits you, and explore
                  our easy-to-use interface.
                </p>
              </div>
            </div>
            <div className="right_side flex justify-center items-center min-w-[50%]">
              <ThreeDCardDemo />
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-4 xl:px-0 py-3">
        <div className="max-w-5xl xl:max-w-6xl xxl:max-w-7xl mx-auto ">
          <div className="grid grid-cols-1 gap-y-2 lg:gap-3 xl:gap-0 lg:grid-cols-2 min-h-[90vh]">
            <div className="right_side flex justify-center items-center min-w-[50%] order-last lg:order-first">
              <ThreeDCardDemo />
            </div>

            <div className="left_side flex justify-center lg:justify-start items-end sm:items-center min-w-[50%]">
              <div className="content px-0 sm:px-4 md:px-6 py-0 sm:py-8">
                <h2 className="pb-2 max-w-xl mx-auto text-3xl lg:text-4xl font-semibold bg-clip-text text-transparent bg-[linear-gradient(to_right,#b3b3b3,#808080,#333333,#808080,#333333,#808080,#b3b3b3)] bg-[length:200%_auto] animate-gradient">
                  Step 2: Choose Your Affiliate
                </h2>
                <p className="mt-2 max-w-md text-sm text-gray-900 sm:text-[1.05rem] tracking-wide">
                  Select from a list of rated affiliates and schedule a pickup
                  time that fits your lifestyle
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-4 xl:px-0 py-3">
        <div className="max-w-5xl xl:max-w-6xl xxl:max-w-7xl mx-auto ">
          <div className="grid grid-cols-1 gap-y-2 lg:gap-3 xl:gap-0 lg:grid-cols-2 min-h-[90vh]">
            <div className="left_side flex justify-center lg:justify-start items-end sm:items-center min-w-[50%]">
              <div className="content px-0 sm:px-4 md:px-6 py-0 sm:py-8">
                <h2 className="pb-2 max-w-xl mx-auto text-3xl lg:text-4xl font-semibold bg-clip-text text-transparent bg-[linear-gradient(to_right,#b3b3b3,#808080,#333333,#808080,#333333,#808080,#b3b3b3)] bg-[length:200%_auto] animate-gradient">
                  Step 3: Hassle-Free Collection
                </h2>
                <p className="mt-2 max-w-md text-sm text-gray-900 sm:text-[1.05rem] tracking-wide">
                  Leave your trash outside or schedule an in-home pickup, and
                  we'll take care of the rest. Sit back, relax, and enjoy the
                  convenience of Binnr
                </p>
              </div>
            </div>
            <div className="right_side flex justify-center items-center min-w-[50%]">
              <ThreeDCardDemo />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default How;

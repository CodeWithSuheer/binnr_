const SecondSection = () => {
  return (
    <>
      <section className="relative px-4 xl:px-0 pt-10 pb-6">
        <div className="max-w-5xl xl:max-w-6xl xxl:max-w-7xl mx-auto ">
          <div className="grid grid-cols-1 gap-y-5 lg:gap-3 xl:gap-0 lg:grid-cols-2 min-h-[80vh]">
            <div className="left_side flex justify-center lg:justify-start items-center min-w-[50%]">
              <div className="content px-0 md:px-6 py-8">
                <h2 className="pb-2 max-w-xl mx-auto text-3xl md:text-5xl lg:text-5xl font-semibold bg-clip-text text-transparent bg-[linear-gradient(to_right,#b3b3b3,#808080,#333333,#808080,#333333,#808080,#b3b3b3)] bg-[length:200%_auto] animate-gradient">
                  Why We Exist
                </h2>
                <p className="mt-2 max-w-md text-[1.05rem] tracking-wide">
                  We're a group of college students who got fed up with lugging
                  our trash across dorm buildings, only to find overflowing
                  dumpsters. It was inconvenient, messy, and, frustrating. We
                  thought, '<span className="font-semibold">There has to be a better way</span>.
                </p>
                <p className="mt-4 max-w-md text-[1.05rem] tracking-wide">
                  So, we came up with <span className="font-semibold">Binnr</span> - a simple, door-to-door,
                  affiliate-driven trash collection service. We're starting out
                  as a solution for our campus, but we aim to spread this idea
                  far beyond. <span className="font-semibold">We're making waste pickup easy, reliable, and
                  eco-friendly, one room at a time.</span>
                </p>
              </div>
            </div>
            <div className="right_side flex justify-center items-center min-w-[50%]">
              <img
                width="auto"
                height="auto"
                src="https://cdn.shopify.com/s/files/1/0704/6378/2946/files/binr_wlcm.png?v=1728131492"
                alt="main_banner_img"
                className="object-cover "
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SecondSection;

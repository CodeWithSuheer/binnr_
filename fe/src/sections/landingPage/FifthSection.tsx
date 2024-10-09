const FifthSection = () => {
  return (
    <>
      <section className="relative px-4 xl:px-0 py-2 lg:py-0">
        <div className="max-w-5xl xl:max-w-6xl xxl:max-w-7xl mx-auto ">
          <div className="grid grid-cols-1 gap-0 lg:grid-cols-2 min-h-[50vh]">
            <div className="w-full flex justify-center lg:justify-start items-center">
              <div className="w-full content px-4 lg:px-6 py-8 md:max-w-sm bg-gray-200">
                <h2 className="pr-2 md:pr-20 text-3xl md:text-3xl font-medium">
                  Hassle-Free Collection
                </h2>
                <p className="mt-2 pr-4 text-gray-800 text-md md:text-[1rem] font-normal">
                  Leave your trash outside or schedule an in-home pickup, and
                  we'll take care of the rest. Sit back, relax, and enjoy the
                  convenience of Binnr.
                </p>
              </div>
            </div>
            <div className="right_side flex justify-end items-center">
              <img
                width={500}
                height={500}
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

export default FifthSection;

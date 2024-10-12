import FaqSection from "../FaqSection";
import Footer from "../Footer";
import HeroSection from "../HeroSection";
import How from "../How";
import Pricing from "../Pricing";
import SecondSection from "../SecondSection";

const HomePageList = () => {

  return (
    <>
      {/* <Navbar /> */}
      <HeroSection />
      <div id="why">
        <SecondSection />
      </div>
      <div id="how">
        <How />
      </div>
      <div id="pricing">
        <Pricing />
      </div>
      <FaqSection />
      <Footer />
    </>
  );
};

export default HomePageList;

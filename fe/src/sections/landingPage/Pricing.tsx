import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const navigate = useNavigate();
  const tabsRef = useRef<(HTMLElement | null)[]>([]);
  const [activeTabIndex, setActiveTabIndex] = useState<number | null>(0);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);

  useEffect(() => {
    if (activeTabIndex === null) {
      return;
    }

    const setTabPosition = () => {
      const currentTab = tabsRef.current[activeTabIndex] as HTMLElement;
      setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
      setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
    };

    setTabPosition();
  }, [activeTabIndex]);

  const handleClick = () => {
    navigate("/checkout");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative">
      <div className="max-w-5xl xl:max-w-6xl xxl:max-w-7xl mx-auto ">
        <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
          {/* HEADING */}
          <div className="max-w-2xl mx-auto text-center mt-7 mb-5">
            <p className="mt-1 text-gray-800">
              Level Up with Binnr. Select Your Plan.
            </p>
          </div>

          {/* TABS */}
          <div className="flew-row w-max px-3 sm:px-6 relative mx-auto flex h-[3.5rem] rounded-xl border bg-[#F1F1F1] shadow-lg border-[#c2c2c2] backdrop-blur-sm">
            <span
              className="absolute bottom-0 top-0 -z-10 flex overflow-hidden rounded-3xl py-2 transition-all duration-300"
              style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
            >
              <span className="h-full w-full bg-gradient-to-b from-[#383838]  via-[#141414] to-[#141414] text-white font-medium px-4 py-2 rounded-2xl transition duration-300 hover:opacity-80" />
            </span>
            {allTabs.map((tab, index) => {
              const isActive = activeTabIndex === index;

              return (
                <button
                  type="button"
                  key={index}
                  ref={(el) => (tabsRef.current[index] = el)}
                  className={`${
                    isActive ? `text-[#ffffff] font-medium` : ``
                  } my-auto cursor-pointer select-none rounded-full font-medium px-4 text-center text-[#858585]`}
                  onClick={() => setActiveTabIndex(index)}
                >
                  {tab.name}
                </button>
              );
            })}
          </div>

          {/* CARDS */}
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:items-center">
            {PricingData?.map((iter, index) => (
              <div
                key={index}
                className="text-gray-900 flex flex-col border-[1px] h-[100%] bg-[#f5f5f5] shadow-lg rounded-xl p-8 border-[#c7c7c7]"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-2xl font-semibold">
                      {iter?.sections1?.mainText}
                    </p>
                    <p className="font-light text-gray-900">
                      {iter?.sections1?.subText}
                    </p>
                  </div>
                  <Icon
                    width={30}
                    icon="pepicons-pop:checkmark-filled-circle"
                  />
                </div>

                <h1 className="text-5xl mt-6 font-bold h-14">
                  {iter?.sections1?.pricing}
                  <span className="font-light text-[.9rem] text-gray-900 ml-2">
                    {iter?.sections1?.period}
                  </span>
                </h1>

                <span className="relative flex justify-center mt-5">
                  <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"></div>

                  <span className="text-sm relative z-10 text-[#858585] bg-[#f5f5f5] px-2">
                    {iter?.sections1?.borderText}
                  </span>
                </span>

                <ul className="mt-7 space-y-2.5 text-sm flex-grow">
                  {iter.list.map((temp, index) => (
                    <li key={index} className="flex gap-x-2">
                      <Icon icon="charm:tick" width={20} color="#000" />
                      <span className="text-gray-900">{temp}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={handleClick}
                  className="mt-8 rounded-lg bg-[#252525] px-8 py-2 font-medium shadow-gray-600 text-gray-100 transition hover:bg-gray-800"
                  type="submit"
                >
                  {iter.button}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;

const PricingData = [
  {
    id: 0,
    sections1: {
      mainText: "Lite",
      subText: "free plan",
      pricing: "$0",
      period: "/month",
      borderText: "",
    },
    list: [" Referral bonus", " free trial", "   priority suppor"],
    button: "Subscribe",
  },
  {
    id: 1,
    sections1: {
      mainText: "Standard",
      subText: "Standard Plan",
      pricing: "$12",
      period: "/month",
      borderText: "$96 billed annually",
    },
    list: [
      "Exclusive discounts",
      " 1 express pickup per month",
      "  2 flexible 'hold' weeks annually.",
    ],
    button: "Subscribe",
  },
  {
    id: 2,
    sections1: {
      mainText: "Binnr One Plan",
      subText: "Binnr One Plan",
      pricing: "$12",
      period: "/month",
      borderText: "$144 billed yearly",
    },
    list: [
      " Priority scheduling",
      "seasonal gift",
      "waste-free starter kit",
      " up to 3 express pickups per month",
      "community status",
      "5 'hold' weeks annually",
    ],
    button: "Subscribe",
  },
];

let allTabs = [
  {
    id: "weekly",
    name: "Weekly",
  },
  {
    id: "monthly",
    name: "Monthly",
  },
  {
    id: "yearly",
    name: "Yearly",
  },
];

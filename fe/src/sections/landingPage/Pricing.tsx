import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

const Pricing = () => {
  const navigate = useNavigate();
  const tabsRef = useRef<(HTMLElement | null)[]>([]);
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);

  const { allSubPlans = [] } = useAppSelector((state) => state.plan);
  const { user } = useAppSelector((state) => state.auth);

  // Tabs Data
  const allTabs = [
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

  // Filter plans based on the active tab
  const filteredPlans = allSubPlans?.filter((plan) => {
    if (activeTabIndex === 0) return plan.interval === "week"; // Weekly plans
    if (activeTabIndex === 1) return plan.interval === "month"; // Monthly plans
    if (activeTabIndex === 2) return plan.interval === "year"; // Yearly plans (if any)
    return false;
  });

  useEffect(() => {
    const setTabPosition = () => {
      const currentTab = tabsRef.current[activeTabIndex] as HTMLElement;
      setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
      setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
    };

    setTabPosition();
  }, [activeTabIndex]);

  const handleSubscribe = (selectedPlanId: any) => {
    // Get user, userProfile, and accessToken from localStorage
    const storedUser = localStorage.getItem("user");
    const storedUserProfile = localStorage.getItem("userProfile");
    const accessToken = localStorage.getItem("accessToken");

    // Check if user is logged in or if there are valid stored credentials
    if (!user && (!storedUser || !storedUserProfile || !accessToken)) {
      // If not logged in, store the selected plan ID and navigate to login
      localStorage.setItem("selectedPlanId", selectedPlanId);
      navigate("/login");
    } else {
      // If logged in, navigate to checkout
      localStorage.setItem("selectedPlanId", selectedPlanId); // Optional: still save the plan ID for later use
      navigate("/checkout");
    }

    handleScroll();
  };

  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative">
      <div className="max-w-5xl xl:max-w-6xl xxl:max-w-7xl mx-auto">
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
              <span className="h-full w-full bg-gradient-to-b from-[#383838] via-[#141414] to-[#141414] text-white font-medium px-4 py-2 rounded-2xl transition duration-300 hover:opacity-80" />
            </span>

            {allTabs?.map((tab, index) => {
              const isActive = activeTabIndex === index;

              return (
                <button
                  type="button"
                  key={index}
                  ref={(el) => (tabsRef.current[index] = el)}
                  className={`${
                    isActive ? "text-[#ffffff] font-medium" : ""
                  } my-auto cursor-pointer select-none rounded-full font-medium px-4 text-center text-[#858585]`}
                  onClick={() => setActiveTabIndex(index)}
                >
                  {tab.name}
                </button>
              );
            })}
          </div>

          {/* PLANS */}
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:items-center">
            {(filteredPlans?.length || 0) > 0 ? (
              filteredPlans?.map((plan) => (
                <div
                  key={plan._id}
                  className="text-gray-900 flex flex-col border-[1px] h-[100%] bg-[#f5f5f5] shadow-lg rounded-xl p-8 border-[#c7c7c7]"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-semibold">{plan.name}</p>
                      <p className="font-light text-gray-900">
                        {plan.price > 0 ? `$${plan.price}` : "Free"}
                      </p>
                    </div>
                    <Icon
                      width={30}
                      icon="pepicons-pop:checkmark-filled-circle"
                    />
                  </div>

                  <h1 className="text-5xl mt-6 font-bold h-14">
                    ${plan.price}
                    <span className="font-light text-[.9rem] text-gray-900 ml-2">
                      /{plan.interval}
                    </span>
                  </h1>

                  <ul className="mt-7 space-y-2.5 text-sm flex-grow">
                    <li className="flex gap-x-2">
                      <Icon icon="charm:tick" width={20} color="#000" />
                      <span className="text-gray-900">Priority support</span>
                    </li>
                    <li className="flex gap-x-2">
                      <Icon icon="charm:tick" width={20} color="#000" />
                      <span className="text-gray-900">Exclusive deals</span>
                    </li>
                  </ul>

                  <button
                    onClick={() => handleSubscribe(plan?._id)}
                    className="mt-8 rounded-lg bg-[#252525] px-8 py-2 font-medium shadow-gray-600 text-gray-100 transition hover:bg-gray-800"
                    type="submit"
                  >
                    Subscribe
                  </button>
                </div>
              ))
            ) : (
              <p>No plans available for this period.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;

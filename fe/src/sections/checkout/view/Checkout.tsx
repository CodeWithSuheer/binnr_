
import { useEffect, useRef, useState } from "react";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CardInput from "../../checkout/CardInput";

const Checkout: React.FC = () => {
  const tabsRef = useRef<(HTMLElement | null)[]>([]);
  const [activeTabIndex, setActiveTabIndex] = useState<number | null>(0);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);

  const stripe = useStripe();
  const elements = useElements();

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

  const handleSubmitSub = async (event: any) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    console.log("stripe", stripe);
    console.log("elements = ", elements);

    const result = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        name: "Usman",
      },
    });
    console.log("Result = ", result);
    if (result.error) {
      console.log(result.error.message);
    } else {
      console.log("You got the payment method!");
    }
  };

  return (
    <div className="lg:flex lg:items-center lg:justify-center lg:h-screen lg:py-14">
      <div className="pt-6 lg:pt-20 w-full max-w-5xl xl:max-w-6xl xxl:max-w-7xl mx-auto rounded-md">
        <div className="mt-[5rem] md:mt-[5rem] lg:mt-[15rem] xl:mt-[11rem] ml-4 sm:ml-8 flew-row w-max px-3 sm:px-6 relative flex h-[3.5rem] rounded-full border bg-[#F1F1F1] shadow-lg border-[#c2c2c2] backdrop-blur-sm">
          <span
            className="absolute bottom-0 top-0 -z-10 flex overflow-hidden rounded-full py-2 transition-all duration-300"
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

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-7">
          <div className="lg:col-span-2 text-gray-600 flex flex-col h-[100%]  rounded-xl p-4 sm:p-8">
            <div className="flex flex-col justify-center items-start">
              <p className="text-sm font-semibold">{"Try Pro Plan"}</p>
              <p className="font-extrabold my-2 text-4xl text-gray-900">
                {"14 Days Free"}
              </p>
              <p className="text-sm font-semibold">{"Then $10/month"}</p>
            </div>
            <div className="flex flex-row justify-between items-center ">
              <p className="text-[1rem] font-lighter text-black">
                {"Pro Plan"}
              </p>
              <div className="">
                <p className="font-lighter  text-sm ">{"14 Days Free"}</p>
                <p className="text-sm font-lighter mt-1">{"$10/month after"}</p>
              </div>
            </div>
            <span className="relative flex justify-center my-5">
              <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"></div>
              <span className="text-sm relative z-10 text-[#858585] bg-[#f5f5f5] px-2"></span>
            </span>
            <div className="flex flex-row justify-between items-start ">
              <p className="text-[1rem] font-lighter text-black">
                {"Subtotal"}
              </p>

              <p className="text-sm font-lighter mt-1">{"$10.00"}</p>
            </div>
            <button
              className="mt-3 w-max font-light rounded-lg bg-[#252525] p-5 py-1 maxw text-sm shadow-gray-600 text-gray-100 transition"
              type="submit"
            >
              Add Promotion code
            </button>
            <div className="mt-2 flex flex-row justify-between items-start ">
              <p className="text-[1rem] font-lighter text-black">{"Tax"}</p>

              <p className="text-sm font-lighter mt-1">{"$0.00"}</p>
            </div>
            <span className="relative flex justify-center my-5">
              <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"></div>
              <span className="text-sm relative z-10 text-[#858585] bg-[#f5f5f5] px-2"></span>
            </span>
            <div className="mt-2 flex flex-row justify-between items-start ">
              <p className="text-[1rem] font-lighter text-black">
                {"Total after trial"}
              </p>

              <p className="text-sm font-lighter mt-1">{"$10.00"}</p>
            </div>{" "}
            <div className="mt-2 flex flex-row justify-between items-start ">
              <p className="text-[1rem] font-lighter text-black">
                {"Total due today"}
              </p>

              <p className="text-sm font-lighter mt-1">{"$0.00"}</p>
            </div>
          </div>
          <div className="lg:col-span-3 p-4 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-1 mt-4">
              <div>
                <label
                  htmlFor="UserEmail"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>

                <input
                  className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border rounded-md focus:border-[#007bff] outline-none"
                  placeholder="Email"
                  type="text"
                />
              </div>

              <div>
                <label
                  htmlFor="UserEmail"
                  className="block text-sm font-medium text-gray-700"
                >
                  Country
                </label>
                <select
                  title="countries"
                  id="countries"
                  className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border rounded-md focus:border-[#007bff] outline-none"
                >
                  <option selected>Choose a country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="FR">France</option>
                  <option value="DE">Germany</option>
                </select>
              </div>
            </div>
            <div className="bg-[#ffffff] py-4 my-5 rounded-lg border-[#e4e4e4] border-[.1rem] border-solid">
              <CardInput />
            </div>

            <button
              className="mt-6 w-full font-medium rounded-lg bg-[#252525] p-2.5 text-[1rem] shadow-gray-600 text-gray-100 transition hover:bg-gray-800"
              type="submit"
              onClick={handleSubmitSub}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

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

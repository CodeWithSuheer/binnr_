import {
  useEffect,
  //  useRef,
  useState,
} from "react";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CardInput from "../../checkout/CardInput";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getSubscriptionByIdAsync } from "../../../features/planSlice";
import { createSubscriptionPlanAsync } from "../../../features/stripeSlice";
import { useNavigate } from "react-router-dom";

const Checkout: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [localUser, setLocalUser] = useState(null);

  // const tabsRef = useRef<(HTMLElement | null)[]>([]);
  // const [activeTabIndex, setActiveTabIndex] = useState<number | null>(0);
  // const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  // const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState<string>("");

  // Handle email change
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const { planData } = useAppSelector((state) => state.plan);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!user && storedUser) {
      setLocalUser(JSON.parse(storedUser));
    } else if (!user && !storedUser) {
      navigate("/");
    }
  }, [navigate, user]);

  const displayUser = user || localUser;

  useEffect(() => {
    const selectedPlanId = localStorage.getItem("selectedPlanId");

    if (selectedPlanId) {
      dispatch(getSubscriptionByIdAsync(selectedPlanId));
    }
  }, [dispatch]);

  const stripe = useStripe();
  const elements = useElements();

  // useEffect(() => {
  //   if (activeTabIndex === null) {
  //     return;
  //   }

  //   const setTabPosition = () => {
  //     const currentTab = tabsRef.current[activeTabIndex] as HTMLElement;
  //     setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
  //     setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
  //   };

  //   setTabPosition();
  // }, [activeTabIndex]);

  // HANDLE SUBMIT SUB

  // const handleSubmitSub = async (event: any) => {
  //   event.preventDefault();

  //   setIsLoading(true);

  //   const selectedPlanId = localStorage.getItem("selectedPlanId");

  //   if (!stripe || !elements) {
  //     return;
  //   }
  //   console.log("stripe", stripe);
  //   console.log("elements = ", elements);

  //   const result = await stripe.createPaymentMethod({
  //     type: "card",
  //     card: elements.getElement(CardElement),
  //     billing_details: {
  //       name: displayUser?.body?.name,
  //       email: displayUser?.body?.email,
  //     },
  //   });

  //   console.log("Result = ", result);
  //   console.log("id = ", result?.paymentMethod?.id);

  //   const formdata = {
  //     planId: selectedPlanId,
  //     paymentMethodId: result?.paymentMethod?.id,
  //   };

  //   if (result?.paymentMethod?.id && selectedPlanId) {
  //     dispatch(createSubscriptionPlanAsync(formdata)).then((res) => {
  //       console.log("res", res);
  //     });
  //   }
  //   if (result.error) {
  //     setIsLoading(false);
  //     console.log(result.error.message);
  //   } else {
  //     setIsLoading(false);
  //     console.log("You got the payment method!");
  //   }
  // };

  const handleSubmitSub = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    const selectedPlanId = localStorage.getItem("selectedPlanId");

    if (!stripe || !elements) {
      setIsLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setIsLoading(false);
      console.error("CardElement not found");
      return;
    }

    try {
      const result = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: {
          name: displayUser?.body?.name,
          email: displayUser?.body?.email,
        },
      });

      if (result.error) {
        console.error(result.error.message);
        setIsLoading(false);
        return;
      }

      const formData = {
        planId: selectedPlanId,
        paymentMethodId: result?.paymentMethod?.id,
      };

      if (result?.paymentMethod?.id && selectedPlanId) {
        await dispatch(createSubscriptionPlanAsync(formData));
      }
      console.log("Payment method successfully created:", result);
    } catch (error) {
      console.error("Error creating payment method:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-2">
      <div className="pt-6 lg:pt-3 w-full sm:max-w-4xl mx-auto rounded-md">
        {/* <div className="mt-[5rem] md:mt-[5rem] lg:mt-[15rem] xl:mt-[11rem] ml-4 sm:ml-8 flew-row w-max px-3 sm:px-6 relative flex h-[3.5rem] rounded-full border bg-[#F1F1F1] shadow-lg border-[#c2c2c2] backdrop-blur-sm">
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
        </div> */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-3 text-gray-100 bg-gradient-to-b from-[#2C5364] via-[#203A43] to-[#0F2027] flex flex-col h-[100%]  rounded-xl p-4 sm:px-5 sm:py-8">
            <div className="flex flex-col justify-center items-start">
              {planData ? (
                <>
                  <p className="font-extrabold my-2 text-3xl sm:text-4xl text-gray-100">
                    {planData.name}
                  </p>
                  <p className="text-sm font-semibold uppercase">
                    {planData.currency}
                    {planData.price}/{planData.interval}
                  </p>
                </>
              ) : (
                <p>Loading subscription plan details...</p>
              )}
            </div>
            {/* <div className="flex flex-row justify-between items-center ">
              <p className="text-[1rem] font-lighter text-black">
                {"Pro Plan"}
              </p>
              <div className="">
                <p className="font-lighter  text-sm ">{"14 Days Free"}</p>
                <p className="text-sm font-lighter mt-1">{"$10/month after"}</p>
              </div>
            </div> */}
            {/* <span className="relative flex justify-center my-5">
              <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"></div>
              <span className="text-sm relative z-10 text-[#858585] bg-[#f5f5f5] px-2"></span>
            </span> */}
            {/* <div className="flex flex-row justify-between items-start ">
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
            </div> */}
            {/* <div className="mt-2 flex flex-row justify-between items-start ">
              <p className="text-[1rem] font-lighter text-black">
                {"Total after trial"}
              </p>

              <p className="text-sm font-lighter mt-1">{"$10.00"}</p>
            </div> */}{" "}
            {/* <div className="mt-2 flex flex-row justify-between items-start ">
              <p className="text-[1rem] font-lighter text-black">
                {"Total due today"}
              </p>

              <p className="text-sm font-lighter mt-1">{"$0.00"}</p>
            </div> */}
          </div>

          <span className="relative flex justify-center my-2 lg:col-span-3">
            <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"></div>
            <span className="text-sm relative z-10 text-[#858585] bg-[#f5f5f5] px-2"></span>
          </span>

          <div className="lg:col-span-3 p-4 sm:p-3">
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
                  type="email"
                  required
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>

              {/* <div>
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
              </div> */}
            </div>
            <div className="bg-[#ffffff] py-4 my-5 rounded-lg border-[#e4e4e4] border-[.1rem] border-solid">
              <CardInput />
            </div>

            {isLoading ? (
              <button
                className="mt-6 w-full font-medium rounded-lg bg-[#252525] p-2.5 text-[1rem] shadow-gray-600 text-gray-100 transition hover:bg-gray-800 cursor-not-allowed"
                type="button"
              >
                Loading
              </button>
            ) : (
              <button
                className="mt-6 w-full font-medium rounded-lg bg-[#252525] p-2.5 text-[1rem] shadow-gray-600 text-gray-100 transition hover:bg-gray-800"
                type="submit"
                onClick={handleSubmitSub}
              >
                Subscribe
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

// let allTabs = [
//   {
//     id: "weekly",
//     name: "Weekly",
//   },
//   {
//     id: "monthly",
//     name: "Monthly",
//   },
//   {
//     id: "yearly",
//     name: "Yearly",
//   },
// ];

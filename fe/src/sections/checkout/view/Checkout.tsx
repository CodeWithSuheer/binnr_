import {
  useEffect,
  // useRef,
  //  useRef,
  useState,
} from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

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

  const { planData } = useAppSelector((state) => state.plan);

  // const tabsRef = useRef<(HTMLElement | null)[]>([]);
  // const [activeTabIndex, setActiveTabIndex] = useState<number | null>(0);
  // const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  // const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  // const [email, setEmail] = useState<string>("");

  // Handle email change
  // const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setEmail(e.target.value);
  // };

  console.log("planData", planData);

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
      <div className="pt-6 lg:pt-3 w-full sm:max-w-7xl mx-auto rounded-md">
        <div className="my-[2rem] md:mt-[5rem] lg:mt-[15rem] xl:mt-[11rem] flew-row w-max px-3 sm:px-6 relative flex h-[3.5rem] rounded-full border bg-[#F1F1F1] shadow-lg border-[#c2c2c2] backdrop-blur-sm">
          {/* <span
            className="absolute bottom-0 top-0 -z-10 flex overflow-hidden rounded-full py-2 transition-all duration-300"
            style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
          >
            <span className="h-full w-full bg-gradient-to-b from-[#383838]  via-[#141414] to-[#141414] text-white font-medium px-4 py-2 rounded-2xl transition duration-300 hover:opacity-80" />
          </span> */}
          {allTabs.map((tab, index) => {
            const isActive = planData?.interval === tab.id;
            return (
              <button
                type="button"
                key={index}
                // ref={(el) => (tabsRef.current[index] = el)}
                className={`${
                  isActive
                    ? `w-full bg-gradient-to-b from-[#383838]  via-[#141414] to-[#141414] text-white font-medium px-4 py-2 rounded-2xl transition duration-300 hover:opacity-80`
                    : ``
                } my-auto cursor-pointer select-none rounded-full font-medium px-4 text-center text-[#858585]`}
                // onClick={() => setActiveTabIndex(index)}
              >
                {tab.name}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 xl:gap-6">
          <div
            key={planData?._id}
            className="text-gray-900 flex flex-col border-[1px] h-[100%] bg-[#f5f5f5] shadow-lg rounded-xl p-8 border-[#c7c7c7]"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-2xl font-semibold">{planData?.name}</p>
              </div>
              <Icon width={30} icon="pepicons-pop:checkmark-filled-circle" />
            </div>

            <h1 className="text-4xl xl:text-5xl mt-6 font-bold h-8 lg:h-14">
              ${planData?.price}
              <span className="font-light text-[.9rem] text-gray-900 ml-2">
                /{planData?.interval}
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
          </div>

          <div className="stripe lg:col-span-3">
            <div className="mx-0 sm:mx-2 border-[#c7c7c7] border-[.1rem] text-[#111827] bg-gradient-to-b from-[#f5f5f5] via-[#f5f5f5] to-[#dadada] flex flex-col rounded-xl p-4 sm:px-5 sm:py-8">
              <div className="flex flex-col justify-center items-start">
                {planData ? (
                  <>
                    <p className="font-extrabold my-2 text-3xl sm:text-4xl text-[#111827]">
                      {planData.name}
                    </p>
                    <p className="text-sm font-semibold uppercase">
                      {planData.currency === "usd" ? "$" : ""}
                      {planData.price} / {planData.interval}
                    </p>
                  </>
                ) : (
                  <p>Loading subscription plan details...</p>
                )}
              </div>
              <div className="flex flex-row justify-between items-center ">
                <p className="text-[1rem] font-lighter">{"Pro Plan"}</p>
                <div className="">
                  <p className="font-lighter  text-sm ">{"14 Days Free"}</p>
                  <p className="text-sm font-lighter mt-1">
                    {"$10/month after"}
                  </p>
                </div>
              </div>
              <span className="relative flex justify-center my-5">
                <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"></div>
                <span className="text-sm relative z-10 text-[#858585] bg-[#f5f5f5] px-2"></span>
              </span>
              <div className="flex flex-row justify-between items-start ">
                <p className="text-[1rem] font-lighter ">{"Subtotal"}</p>

                <p className="text-sm font-lighter mt-1">{"$10.00"}</p>
              </div>
              {/* <button
              className="mt-3 w-max font-light rounded-lg bg-[#252525] p-5 py-1 maxw text-sm shadow-gray-600 text-gray-100 transition"
              type="submit"
            >
              Add Promotion code
            </button> */}
              <div className="mt-2 flex flex-row justify-between items-start ">
                <p className="text-[1rem] font-lighter ">{"Tax"}</p>

                <p className="text-sm font-lighter mt-1">{"$0.00"}</p>
              </div>
              <div className="mt-2 flex flex-row justify-between items-start ">
                <p className="text-[1rem] font-lighter ">
                  {"Total after trial"}
                </p>

                <p className="text-sm font-lighter mt-1">{"$10.00"}</p>
              </div>{" "}
              <div className="mt-2 flex flex-row justify-between items-start ">
                <p className="text-[1rem] font-lighter ">{"Total due today"}</p>

                <p className="text-sm font-lighter mt-1">{"$0.00"}</p>
              </div>
            </div>


            <div className="mx-0 sm:mx-2 py-0 sm:py-2">
              <div className="bg-[#ffffff] py-4 my-0 rounded-lg border-[#e4e4e4] border-[.1rem] border-solid">
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
    </div>
  );
};

export default Checkout;

let allTabs = [
  {
    id: "week",
    name: "Weekly",
  },
  {
    id: "month",
    name: "Monthly",
  },
  {
    id: "year",
    name: "Yearly",
  },
];

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/landingPage/LandingPage";
import NotFound from "./pages/landingPage/NotFound";
import Login from "./auth/Login";
import Navbar from "./sections/landingPage/Navbar";
import Signup from "./auth/Signup";
import ForgetPass from "./auth/ForgetPass";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";
import LgNavbar from "./sections/landingPage/LgNavbar";
import Checkout from "./sections/checkout/view/Checkout";
import UserDetails from "./sections/landingPage/UserDetails";
import useWindowWidth from "./hooks/useWindowWidth";
import VerificationScreen from "./auth/VerificationScreen";
import { useAppDispatch } from "./app/hooks";
// import ChangePassword from "./auth/ChangePassword";
import { getAllSubscriptionPlansAsync } from "./features/planSlice";
import AnimCursor from "./components/AnimCursor";

// Stripe
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import AdminDetails from "./sections/landingPage/AdminDetails";
import Subscriptions from "./sections/landingPage/SubscriptionsList";
// Styles

const stripePromise = loadStripe(
  "pk_test_51Q7FG4RvECGVGam8ifUjuHReI0K8vAX1rPUAMjQPywBVS6clKj6vaAw0wTpY37cXku9WHLScFoqIXLBmXiGqSPiI00yqLfXmc9"
);

function App() {
  const [showButton, setShowButton] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const windowWidth = useWindowWidth();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const accessToken = localStorage.getItem("accessToken");

    if (storedUser && accessToken) {
      try {
        // Parse the stored user data and update Redux state
        dispatch({
          type: "auth/loginuserAsync/fulfilled",
          payload: JSON.parse(storedUser),
        });
      } catch (error) {
        console.error("Error parsing stored user:", error);
      }
    }

    // Fetch subscription plans when the app loads
    dispatch(getAllSubscriptionPlansAsync());
  }, [dispatch]);

  return (
    <>
      <Elements stripe={stripePromise}>
        <BrowserRouter>
          <AnimCursor />
          {windowWidth >= 1024 ? <LgNavbar /> : <Navbar />}
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<LandingPage />} />

            {/* ---------- AUTH ROUTES ---------- */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forget" element={<ForgetPass />} />
            {/* <Route path="/change-password" element={<ChangePassword />} /> */}
            <Route
              path="/verification-screen"
              element={<VerificationScreen />}
            />

            {/* ---------- OTHER ROUTES ---------- */}
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/user-details" element={<UserDetails />} />
            <Route path="/admin-details" element={<AdminDetails />} />
            <Route path="/subscriptions" element={<Subscriptions />} />
          </Routes>

          {showButton && (
            <button
              type="button"
              aria-label="Scroll to top"
              onClick={handleTop}
              className="moveTop rounded-full px-3 py-3 bg-[#252525]"
            >
              <FaArrowUp size={18} className="text-gray-100" />
            </button>
          )}
        </BrowserRouter>
        <Toaster />
      </Elements>
    </>
  );
}

export default App;

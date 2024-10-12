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
import Checkout from "./sections/landingPage/Checkout";
import UserDetails from "./sections/landingPage/UserDetails";
import useWindowWidth from "./hooks/useWindowWidth";
import VerificationScreen from "./auth/VerificationScreen";
import AnimCursor from "./components/AnimCursor";


function App() {
  const [showButton, setShowButton] = useState(false);

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

  return (
    <>
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
            <Route
              path="/verification-screen"
              element={<VerificationScreen />}
            />

            {/* ---------- OTHER ROUTES ---------- */}
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/user-details" element={<UserDetails />} />
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
    </>
  );
}

export default App;

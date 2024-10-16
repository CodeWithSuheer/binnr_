import { useEffect, useState } from "react";
import { GoTrash } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import "./LandingPage.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { reset, setUser } from "../../features/authSlice";

const LgNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [state, setState] = useState(false);

  // Get user from Redux store
  const { user: userData }: { user: any } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    // Load user and token from localStorage on component mount
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("accessToken");

    if (storedUser && token) {
      // If user and token exist in localStorage, update Redux state
      dispatch(setUser(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  const navigation = [
    { title: "Why", path: "/#why" },
    { title: "How", path: "/#how" },
    { title: "Pricing", path: "/#pricing" },
  ];

  const handleLogout = () => {
    // Clear localStorage and reset Redux state on logout
    localStorage.clear();
    dispatch(reset());
    navigate("/");
    closeMenu();
  };

  const closeMenu = () => {
    setState(false);
  };

  return (
    <>
      <section className="fixed w-full mt-4 px-3 xl:px-0">
        <div className="max-w-5xl xl:max-w-6xl xxl:max-w-7xl mx-auto">
          <nav className="glassClass border w-full rounded-2xl top-0 z-20 py-4">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
              {/* Logo Section */}
              <div className="pl-6 logo flex justify-start items-center">
                <Link
                  to="/"
                  onClick={() => {
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                  className="flex items-center justify-center gap-x-2"
                >
                  <GoTrash size={20} />
                  <h4 className="text-xl font-semibold">Binnr</h4>
                </Link>
              </div>

              {/* Navigation Section */}
              <div className="mid">
                <div className="mt-8 lg:mt-0 pl-0 justify-center items-center space-y-8 lg:flex lg:space-x-10 lg:space-y-0">
                  {navigation?.map((item, idx) => {
                    return (
                      <HashLink key={idx} to={item?.path} smooth>
                        <p className="text-gray-900" onClick={closeMenu}>
                          {item?.title}
                        </p>
                      </HashLink>
                    );
                  })}

                  {/* Profile button based on user type */}
                  {userData && userData?.body?.user_type === 2 && (
                    <HashLink to="/user-details" smooth>
                      <p className="text-gray-900" onClick={closeMenu}>
                        Profile
                      </p>
                    </HashLink>
                  )}

                  {userData && userData?.body?.user_type === 1 && (
                    <HashLink to="/admin-details" smooth>
                      <p className="text-gray-900" onClick={closeMenu}>
                        Profile
                      </p>
                    </HashLink>
                  )}
                </div>
              </div>

              {/* Login/Logout Section */}
              <div className="pr-6 buttons flex justify-end items-center">
                {userData ? (
                  <ul className="flex flex-col-reverse space-x-0 lg:space-x-4 lg:flex-row">
                    <li className="mt-4 lg:mt-0">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="py-0 px-4 text-center border text-gray-900 rounded-md block lg:inline lg:border-0 hover:underline underline-offset-2"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                ) : (
                  <ul className="flex flex-col-reverse space-x-0 lg:space-x-4 lg:flex-row">
                    <li className="mt-4 lg:mt-0">
                      <Link
                        to="/login"
                        onClick={() => setState(!state)}
                        className="py-2 px-4 text-center border text-gray-900 rounded-md block lg:inline lg:border-0"
                      >
                        Login
                      </Link>
                    </li>
                    <li className="mt-8 lg:mt-0">
                      <a
                        href="/"
                        onClick={() => setState(!state)}
                        className="py-[0.6rem] px-5 text-center text-white bg-gray-700 hover:bg-[#252525] rounded-md shadow block lg:inline"
                      >
                        Get Started
                      </a>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </nav>
        </div>
      </section>
    </>
  );
};

export default LgNavbar;

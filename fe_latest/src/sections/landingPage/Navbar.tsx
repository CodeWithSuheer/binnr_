import { useEffect, useState } from "react";
import { GoTrash } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import "./LandingPage.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { reset } from "../../features/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [state, setState] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigation = [
    { title: "Why", path: "/#why" },
    { title: "How", path: "/#how" },
    { title: "Pricing", path: "/#pricing" },
  ];

  const { user: userData }: { user: any } = useAppSelector(
    (state) => state.auth
  );

  const storedUser = localStorage.getItem("accessToken");
  const user = localStorage.getItem("user");

  useEffect(() => {
    if (storedUser && storedUser.length > 0) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user, storedUser]);

  const closeMenu = () => {
    setState(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userProfile");
    localStorage.removeItem("selectedPlanId");
    localStorage.removeItem("email");
    dispatch(reset());

    navigate("/");
    closeMenu();
  };

  const handleLogoClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    closeMenu();
  };

  return (
    <>
      <section className="fixed w-full mt-4 px-3 xl:px-0">
        <div className="max-w-5xl xl:max-w-6xl xxl:max-w-7xl mx-auto">
          <nav className="glassClass border w-full rounded-2xl top-0 z-20">
            <div className="items-center px-4 max-w-screen-xl mx-auto md:px-8 lg:flex">
              <div className="flex items-center justify-between py-3 lg:py-4 lg:block">
                <Link
                  to="/"
                  onClick={handleLogoClick}
                  className="flex items-center justify-center gap-x-2"
                >
                  <GoTrash size={20} />
                  <h4 className="text-xl font-semibold">Binnr</h4>
                </Link>
                <div className="lg:hidden">
                  <button
                    type="button"
                    className="text-gray-700 outline-none p-2 rounded-md"
                    onClick={() => setState(!state)}
                  >
                    {state ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 8h16M4 16h16"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <div
                className={`flex-1 justify-between lg:flex-row lg:overflow-visible lg:flex lg:pb-0 lg:pr-0 lg:h-auto ${
                  state ? "h-screen pb-20 overflow-auto pr-4" : "hidden"
                }`}
              >
                <div className="flex-1 ">
                  <div className="mt-2 lg:mt-0 pl-0 sm:pl-16 justify-center items-center space-y-8 lg:flex lg:space-x-10 lg:space-y-0">
                    {navigation.map((item, idx) => {
                      return (
                        <HashLink key={idx} to={item.path} smooth>
                          <p
                            className="text-gray-900 my-2 py-2 pl-2"
                            onClick={closeMenu}
                          >
                            {item.title}
                          </p>
                        </HashLink>
                      );
                    })}

                    {isLoggedIn &&
                      userData &&
                      userData?.body?.user_type === 2 && (
                        <HashLink to="/user-details" smooth>
                          <p className="text-gray-900 my-2 py-2 pl-2" onClick={closeMenu}>
                            Profile
                          </p>
                        </HashLink>
                      )}

                    {isLoggedIn &&
                      userData &&
                      userData?.body?.user_type === 1 && (
                        <HashLink to="/admin-details" smooth>
                          <p className="text-gray-900 my-2 py-2 pl-2" onClick={closeMenu}>
                            Profile
                          </p>
                        </HashLink>
                      )}
                  </div>
                </div>

                {/* LOGIN & LOGOUT BUTTONS */}
                <div className="">
                  {isLoggedIn ? (
                    <ul className="flex flex-col space-x-0 lg:space-x-4 lg:flex-row">
                      <li className="">
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="py-2 px-2 text-center text-red-700 block lg:inline hover:underline underline-offset-2"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  ) : (
                    <ul className="flex flex-col space-x-0 lg:space-x-4 lg:flex-row">
                      <li className="mt-4 lg:mt-0">
                        <Link
                          to="/login"
                          onClick={() => setState(!state)}
                          className="py-2 px-4 text-center border text-gray-900 rounded-md block lg:inline lg:border-0"
                        >
                          Login
                        </Link>
                      </li>
                      <li className="mt-4 lg:mt-0">
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
            </div>
          </nav>
        </div>
      </section>
    </>
  );
};

export default Navbar;

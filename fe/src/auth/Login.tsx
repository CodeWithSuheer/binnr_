import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserProfileAsync, loginuserAsync } from "../features/authSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";

export interface LoginFormData {
  email: string;
  password: string;
  timezone: string;
}
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user, loginLoading } = useAppSelector((state) => state.auth);

  // CHECK
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (user || (accessToken && accessToken.length > 0)) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setFormData((prevFormData) => ({
      ...prevFormData,
      timezone: timezone,
    }));
  }, []);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    timezone: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    dispatch(loginuserAsync(formData)).then((res) => {
      console.log("res", res.payload);

      if (res.payload.status === 200) {
        const userType = res.payload.body.user_type;

        if (userType === 1) {
          navigate("/admin-details");
        } else if (userType === 2) {
          dispatch(getUserProfileAsync()).then(() => {
            const selectedPlanId = localStorage.getItem("selectedPlanId");

            if (selectedPlanId) {
              navigate("/checkout");
            } else {
              navigate("/user-details");
            }
          });
        }

        // Reset form fields
        setFormData({
          email: "",
          password: "",
          timezone: "",
        });
      }
    });
  };

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <section className="px-3 sm:px-4 md:px-14">
        <div className="max-w-5xl xl:max-w-4xl mx-auto">
          <div className="flex justify-center items-center flex-col-reverse sm:flex-row gap-10 md:gap-2 min-h-[100vh]">
            {/* FORM SIDE */}
            <div className="mt-10 min-w-[80%] md:min-w-[40%] text-center text-gray-900">
              <h1 className="max-w-xs sm:max-w-full mb-10 text-3xl sm:text-4xl font-bold">
                Login Your Account
              </h1>

              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                {/* EMAIL */}
                <div>
                  <input
                    className="bg-gray-50 border border-gray-300 focus:border-gray-600 focus:outline-none text-gray-900 sm:text-sm rounded-md block w-full p-3"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter Your Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>

                {/* PASSWORD */}
                <div>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 focus:border-gray-600 focus:outline-none sm:text-sm rounded-md block w-full p-3"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Enter Your Password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                  />
                </div>

                {/* TOGGLE PASSWORD VISIBILITY */}
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        aria-describedby="remember"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-0"
                        id="remember"
                        type="checkbox"
                        onChange={togglePasswordVisibility}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        className="text-gray-500 select-none cursor-pointer"
                        htmlFor="remember"
                      >
                        show password
                      </label>
                    </div>
                  </div>
                  <Link
                    to="/forget"
                    className="text-sm font-medium text-primary-600 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                {loginLoading ? (
                  <button
                    type="button"
                    disabled
                    className="w-full h-11 cursor-not-allowed items-center mx-auto bg-[#252525] text-white flex justify-center gap-x-2 tracking-wide"
                  >
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="inline w-5 h-5 text-gray-200 animate-spin fill-gray-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>{" "}
                    LOADING
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="w-full h-11 items-center mx-auto bg-[#252525] text-white flex justify-center tracking-wide"
                  >
                    LOGIN NOW
                  </button>
                )}

                <p className="text-sm font-light text-gray-900">
                  Don't have an account yet?{" "}
                  <Link
                    to="/signup"
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                    className="font-medium text-primary-600 hover:underline"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;

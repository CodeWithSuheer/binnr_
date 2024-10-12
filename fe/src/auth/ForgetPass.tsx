import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { forgetuserAsync } from "../features/authSlice";
import { useAppDispatch } from "../app/hooks";

export interface ForgetPassData {
  email: string;
}

const ForgetPass = () => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<ForgetPassData>({
    email: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(forgetuserAsync(formData)).then((res: any) => {
      if (res.payload.status === 200) {
        setFormData({
          email: "",
        });
      }
    });
  };

  return (
    <>
      <section className="px-3 sm:px-4 md:px-14">
        <div className="max-w-5xl xl:max-w-4xl mx-auto">
          <div className="flex justify-center items-center flex-col-reverse sm:flex-row gap-10 md:gap-2 min-h-[100vh]">
            {/* FORM SIDE */}
            <div className="mt-10 min-w-[80%] md:min-w-[40%] text-center text-gray-900">
              <h1 className="max-w-xs sm:max-w-full mb-10 text-3xl sm:text-4xl font-bold">
                Forget Password?
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

                <button
                  type="submit"
                  className="w-full h-11 items-center mx-auto bg-[#252525] text-white flex justify-center tracking-wide"
                >
                  RESET PASSWORD
                </button>

                <p className="text-sm font-light text-gray-900">
                  Already hvae an account?{" "}
                  <Link
                    to="/login"
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                    className="font-medium text-primary-600 hover:underline"
                  >
                    Login
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

export default ForgetPass;

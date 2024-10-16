import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { changePasswordAsync } from "../features/authSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";

export interface ChangePasswordFormData {
  old_password: string;
  newpassword: string;
  confirmpassword: string;
}
const ChangePasswordModal = ({
  closeChangePasswordModal,
}: {
  closeChangePasswordModal: any;
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user, changePassLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user?.login) {
      navigate("/user-details");
    }
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [formData, setFormData] = useState<ChangePasswordFormData>({
    old_password: "",
    newpassword: "",
    confirmpassword: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("formData", formData);
  
    dispatch(changePasswordAsync(formData)).then((res) => {
      console.log("res", res);
  
      if (res.payload.status === 200) {
        // Check if the user is an admin or a regular user
        if (user?.body?.user_type === 1) {
          navigate("/admin-details");
        } else {
          navigate("/user-details");
        }
  
        closeChangePasswordModal();
  
        // Reset form data after successful password change
        setFormData({
          old_password: "",
          newpassword: "",
          confirmpassword: "",
        });
      }
    });
  };
  

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-gray-800 bg-opacity-50">
        <div
          className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
          id="popup-modal"
        >
          <div className="relative p-4 w-full max-w-lg max-h-full">
            <div className="relative bg-white py-5 rounded-lg shadow">
              <button
                onClick={closeChangePasswordModal}
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                data-modal-hide="popup-modal"
                type="button"
              >
                <svg
                  aria-hidden="true"
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 14 14"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                {/* <svg
                  aria-hidden="true"
                  className="mx-auto mb-4 text-gray-400 w-12 h-12"
                  fill="none"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg> */}
                <h1 className="max-w-xs sm:max-w-full mb-10 text-3xl sm:text-3xl font-semibold">
                  Change Password
                </h1>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 md:space-y-6"
                >
                  {/* OLD PASSWORD */}
                  <div>
                    <input
                      className="bg-gray-50 border border-gray-300 focus:border-gray-600 focus:outline-none text-gray-900 sm:text-sm rounded-md block w-full p-3"
                      type={showPassword ? "text" : "password"}
                      id="old_password"
                      name="old_password"
                      placeholder="Enter Old Password"
                      value={formData.old_password}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          old_password: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  {/* NEW PASSWORD */}
                  <div>
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 focus:border-gray-600 focus:outline-none sm:text-sm rounded-md block w-full p-3"
                      type={showPassword ? "text" : "password"}
                      id="newpassword"
                      name="newpassword"
                      placeholder="Enter New Password"
                      value={formData.newpassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          newpassword: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  {/* CONFIRM PASSWORD */}
                  <div>
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 focus:border-gray-600 focus:outline-none sm:text-sm rounded-md block w-full p-3"
                      type={showPassword ? "text" : "password"}
                      id="confirmpassword"
                      name="confirmpassword"
                      placeholder="Confirm New Password"
                      value={formData.confirmpassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmpassword: e.target.value,
                        })
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
                  </div>

                  {changePassLoading ? (
                    <button
                      type="button"
                      disabled
                      className="w-[15rem] h-11 cursor-not-allowed rounded-md items-center mx-auto bg-[#252525] text-white flex justify-center gap-x-2 tracking-wide"
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
                      className="w-[15rem] h-11 items-center rounded-md mx-auto bg-[#252525] text-white flex justify-center tracking-wide"
                    >
                      CHANGE PASSWORD
                    </button>
                  )}
                </form>
                {/* <button
                    className="text-white bg-red-600 hover:bg-red-700 focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                    data-modal-hide="popup-modal"
                    type="button"
                  >
                    Yes, I'm sure
                  </button>
                  <button
                    onClick={closeDeleteModal}
                    className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-700 focus:z-10"
                    data-modal-hide="popup-modal"
                    type="button"
                  >
                    No, cancel
                  </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePasswordModal;

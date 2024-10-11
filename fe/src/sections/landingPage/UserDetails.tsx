import { useEffect, useState } from "react";
import { FiLock } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

const UserDetails = () => {
  const navigate = useNavigate();

  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!user && !storedUser) {
      navigate("/");
    }
  }, [navigate, user]);

  const handleChangePassword = () => {
    navigate("/change-password");
  };

  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      <section className="relative">
        <div className="max-w-3xl px-4 pt-24 py-8 sm:px-6 lg:px-8 mx-auto">
          <div className="p-0 sm:p-7">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800">Account</h2>
              <p className="mt-2 text-sm text-gray-600">
                Manage your email, password and account settings.
              </p>
            </div>
            <form>
              <div className="grid sm:grid-cols-12 gap-2 sm:gap-6">
                <div className="sm:col-span-3 flex items-center">
                  <label className="inline-block text-sm text-gray-800">
                    Username
                  </label>
                </div>
                <div className="sm:col-span-9">
                  <div className="flex items-center gap-4">
                    <img
                      alt="Avatar"
                      className="inline-block size-14 rounded-full ring-2 ring-white"
                      src="https://preline.co/assets/img/160x160/img1.jpg"
                    />
                    <span className="text-gray-800">Chase</span>
                  </div>
                </div>

                {/* EMAIL */}
                <div className="sm:col-span-3">
                  <label
                    className="inline-block text-sm text-gray-800 mt-2.5"
                    htmlFor="af-account-email"
                  >
                    Email
                  </label>
                </div>
                <div className="sm:col-span-9">
                  <input
                    className="py-2 px-3 pe-11 block w-full border border-gray-200 focus:border-gray-700 focus:outline-none shadow-sm text-sm rounded-lg"
                    id="af-account-email"
                    placeholder="rollchase@gmail.com"
                    // value="rollchase@gmail.com"
                    type="email"
                  />
                </div>

                <div className="sm:col-span-3"></div>
                <div className="sm:col-span-9">
                  <button
                    type="button"
                    onClick={handleChangePassword}
                    className="flex justify-start items-center gap-x-1 text-sm text-gray-800 font-medium cursor-pointer"
                  >
                    <FiLock /> Change Password
                  </button>
                </div>

                <div className="sm:col-span-3"></div>
                <div className="sm:col-span-9">
                  <button
                    type="button"
                    onClick={openDeleteModal}
                    className="flex justify-start items-center gap-x-1 text-sm text-red-600 font-medium cursor-pointer"
                  >
                    <GoTrash /> Delete Account
                  </button>
                </div>
              </div>

              {/* BUTTONS */}
              <div className="mt-10 flex justify-end gap-x-2">
                <button
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50"
                  type="button"
                >
                  Cancel
                </button>
                <button
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-50 disabled:pointer-events-none"
                  type="button"
                >
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* DELETE MODAL */}
      {showDeleteModal && (
        <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-gray-800 bg-opacity-50">
          <div
            className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
            id="popup-modal"
          >
            <div className="relative p-4 w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow">
                <button
                  onClick={closeDeleteModal}
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
                  <svg
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
                  </svg>
                  <h3 className="mb-5 text-md sm:text-lg font-normal text-gray-500">
                    Are you sure you want to delete this account?
                  </h3>
                  <button
                    onClick={closeDeleteModal}
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
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserDetails;

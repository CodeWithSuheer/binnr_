import { useEffect, useState } from "react";
import { FiLock } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  deleteProfileAsync,
  reset,
  updateProfileAsync,
} from "../../features/authSlice";

export interface DeleteAccountFormData {
  email: string;
}
export interface UpdateProfileFormData {
  email?: string;
  name?: string;
}

const UserDetails = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [localUser, setLocalUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Form state
  const [formData, setFormData] = useState<UpdateProfileFormData>({
    email: "",
    name: "",
  });
  const [isChanged, setIsChanged] = useState(false);

  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!user && storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setLocalUser(parsedUser);
      setFormData({ email: parsedUser.body.email, name: parsedUser.body.name });
    } else if (!user && !storedUser) {
      navigate("/");
    } else if (user) {
      setFormData({ email: user.body.email, name: user.body.name });
    }
  }, [navigate, user]);

  const displayUser = user || localUser;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!user && !storedUser) {
      navigate("/");
    }
  }, [navigate, user]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    // Check if any field has changed
    if (
      (id === "email" && value !== displayUser?.body?.email) ||
      (id === "name" && value !== displayUser?.body?.name)
    ) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  };

  const handleSaveChanges = () => {
    const updatedFields: UpdateProfileFormData = {};

    if (formData.name !== displayUser?.body?.name) {
      updatedFields.name = formData.name;
    }
    if (formData.email !== displayUser?.body?.email) {
      updatedFields.email = formData.email;
    }

    // Call the updateProfileAsync function to update the profile
    if (Object.keys(updatedFields).length > 0) {
      dispatch(updateProfileAsync(updatedFields)).then((res) => {
        if (res.payload.status === 200) {
          localStorage.setItem("user", JSON.stringify(res.payload.data)); // Update local storage
        }
      });
    }

    setIsChanged(false); // Disable the save button after update
  };

  const handleChangePassword = () => {
    navigate("/change-password");
  };

  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteAccount = () => {
    if (user && user?.body?.email) {
      dispatch(deleteProfileAsync({ email: user.body.email })).then((res) => {
        console.log("res", res);
        if (res.payload.status === 200) {
          localStorage.removeItem("user");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("userProfile");
          localStorage.removeItem("email");
          dispatch(reset());
          navigate("/");
        }
      });
    }

    closeDeleteModal();
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
                  <input
                    className="py-2 px-3 pe-11 block w-full border border-gray-200 focus:border-gray-700 focus:outline-none shadow-sm text-sm rounded-lg"
                    id="name"
                    placeholder="Username"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
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
                    id="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
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
                  onClick={() => setFormData({ name: displayUser?.body?.name, email: displayUser?.body?.email })}
                >
                  Cancel
                </button>
                <button
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-50 disabled:pointer-events-none"
                  type="button"
                  disabled={!isChanged} // Disable if no changes
                  onClick={handleSaveChanges}
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
                    onClick={handleDeleteAccount}
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

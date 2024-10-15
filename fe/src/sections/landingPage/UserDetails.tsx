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
import { RiEdit2Fill } from "react-icons/ri";
import ChangePasswordModal from "../../auth/ChangePasswordModal";

export interface DeleteAccountFormData {
  email: string;
}

export interface UpdateProfileFormData {
  name?: string;
}

const UserDetails = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [localUser, setLocalUser] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  const [newName, setNewName] = useState("");
  const [hasChanges, setHasChanges] = useState(false);

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
  

  const openChangePasswordModal = () => {
    setShowChangePasswordModal(true);
  };


  const closeChangePasswordModal = () => {
    setShowChangePasswordModal(false);
  };

  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    console.log("handleDeletemodal");
    setShowDeleteModal(false);
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

  // Open the modal to update profile
  const handleUpdateProfile = () => {
    setNewName(displayUser?.body?.name || "");
    setShowProfileModal(true);
  };

  const closeProfileModal = () => {
    setShowProfileModal(false);
  };

  const handleNameChange = (e: any) => {
    const updatedName = e.target.value;
    setNewName(updatedName);
    setHasChanges(updatedName !== displayUser?.body?.name);
  };

  // Handle saving the updated name
  const handleSaveProfile = () => {
    if (hasChanges) {
      const updatedFields = { name: newName };
      console.log(updatedFields);
      dispatch(updateProfileAsync(updatedFields)).then((res) => {
        if (res.payload.status === 200) {
          // dispatch(getUserProfileAsync());
        }
        console.log("res", res);
        setShowProfileModal(false);
      });
    }
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
                    <span
                      onClick={handleUpdateProfile}
                      className="text-gray-800 cursor-pointer capitalize flex justify-center items-center gap-x-2"
                    >
                      {displayUser?.body?.name} <RiEdit2Fill size={22} />
                    </span>
                  </div>
                </div>

                {/* EMAIL */}
                <div className="sm:col-span-3 flex items-center">
                  <label
                    className="inline-block text-sm text-gray-800"
                    htmlFor="af-account-email"
                  >
                    Email
                  </label>
                </div>
                <div className="sm:col-span-9">
                  <span className="text-sm text-gray-800">
                    {displayUser?.body?.email}
                  </span>
                </div>

                <div className="sm:col-span-3"></div>
                <div className="sm:col-span-9">
                  <button
                    type="button"
                    onClick={openChangePasswordModal}
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
              {/* <div className="mt-10 flex justify-end gap-x-2">
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
              </div> */}
            </form>
          </div>
        </div>
      </section>

      {/* CHANGE PASSWORD MODAL */}
      {showChangePasswordModal && (
        <ChangePasswordModal closeChangePasswordModal={closeChangePasswordModal} />
      )}

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

      {/* UPDATE MODAL --> Name */}
      {showProfileModal && (
        <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-gray-800 bg-opacity-50">
          <div
            className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
            id="popup-modal"
          >
            <div className="relative py-6 px-4 w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow">
                <button
                  onClick={closeProfileModal}
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

                  <div className="flex">
                    <input
                      className="mt-2 mb-5 py-3 px-2 border w-[20rem] mx-auto rounded-md"
                      type="text"
                      value={newName}
                      onChange={handleNameChange}
                      placeholder="Enter your name"
                    />
                  </div>

                  <button
                    onClick={handleSaveProfile}
                    disabled={!hasChanges}
                    className="text-white bg-gray-600 hover:bg-gray-700 focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center disabled:opacity-50"
                    type="button"
                  >
                    Update
                  </button>
                  <button
                    onClick={closeProfileModal}
                    className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-700"
                    type="button"
                  >
                    Cancel
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

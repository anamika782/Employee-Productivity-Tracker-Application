import React, { useState } from "react";
import { showSuccessToast } from "../../utils/toastConfig";

const Header = ({ data, changeUser }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const logOutUser = () => {
    localStorage.setItem("loggedInUser", "");
    changeUser("");
    showSuccessToast("Successfully logged out!");
    setIsPopupOpen(false);  // Close the popup after logout
  };

  return (
    <div className="headercolor flex justify-between items-center bg-[#ffa200] p-6 rounded-xl shadow-md shadow-black/10">
      {/* Left Section */}
      <div className="text-center flex-grow">
      
        <span className="text-2xl font-bold text-gray-100">
          {data?.firstName ? data.firstName : "Admin Dashboard"} 
        </span>
      </div>

      {/* Right Section */}
      <div className="relative">
        {/* Profile Icon Button */}
        <button
          onClick={() => setIsPopupOpen(true)}
          className="flex items-center justify-center bg-transparent text-gray-500 hover:text-gray-700 transition-all duration-200 p-3 rounded-full"
        >
          <i className="fas fa-user-circle text-3xl"></i> {/* Profile Icon */}
        </button>

        {isPopupOpen && (
          <div className="absolute top-0 right-0 mt-2 bg-white p-6 shadow-lg rounded-lg w-72 max-w-sm">
            {/* Popup Content */}
            <h2 className="text-xl font-bold text-center text-green-500 mb-4">
              Are you sure you want to log out?
            </h2>
            <p className="text-center text-gray-600 mb-6">
              You are about to log out of your admin panel. Please confirm your decision.
            </p>

            <button
              onClick={logOutUser}
              className="headercolor bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg w-full px-4 py-2 font-medium transition-all duration-200 mb-4"
            >
              Yes, Log Out
            </button>

            <button
              onClick={() => setIsPopupOpen(false)}
              className="absolute top-3 right-4 text-black hover:text-gray-700"
            >
              <i className="fas fa-times text-black"></i>
              {/* Close button */}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;

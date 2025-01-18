import React, { useState, useEffect } from "react";
import { showSuccessToast, showErrorToast } from "../../utils/toastConfig";

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    "https://images.contactout.com/profiles/7be456b2fc6e86cb35a763a6bf73ca97",
    "https://cdn.prod.website-files.com/61b9a0d531bc5ea62566a3be/625d79a7dd36161321166953_Screenshot-2021-07-07-at-3.37.28-PM%20(1).png",
    "https://www.masaischool.com/blog/content/images/2023/03/Scholarship-distribution-2.JPG",
    "https://cdn.masaischool.com/masai-website/Rectangle_22868_aedaedc08f.webp",
    "https://pbs.twimg.com/ext_tw_video_thumb/1854515919201927188/pu/img/ZmyHxEhIQrlKBQYE.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  const submitHandler = (e) => {
    e.preventDefault();
    try {
      const loginSuccess = handleLogin(email, password);

      if (loginSuccess) {
        const isAdmin = email === "admin@gmail.com";
        showSuccessToast(
          isAdmin ? "Welcome back, Admin! 👋" : "Successfully logged in!"
        );
        setEmail("");
        setPassword("");
      } else {
        showErrorToast("Invalid credentials. Please try again.");
      }
    } catch (error) {
      showErrorToast("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex h-screen w-screen bg-gray-900">
      {/* Left Section with Image Animation */}
      <div className="flex items-center justify-center w-1/2 bg-gray-800">
        <div className="relative w-full h-full">
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`slide-${index}`}
              className={`absolute w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                index === currentImage ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Right Section with Login Form */}
      <div className="flex items-center justify-center w-1/2 bg-gray-900">
        <div className="bg-gray-800 shadow-xl rounded-2xl p-12 w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-100">
            Admin/Employee
          </h2>
          <form
            onSubmit={submitHandler}
            className="flex flex-col items-center justify-center"
          >
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 mb-4 transition-all"
              type="email"
              placeholder="Enter your email"
            />
            <input
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 mb-6 transition-all"
              type="password"
              placeholder="Enter your password"
            />
            <button className="headercolor2 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02]">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

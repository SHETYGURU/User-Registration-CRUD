import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { FaPhoneAlt, FaCalendarAlt, FaUser, FaEnvelope, FaCheck } from "react-icons/fa";

const UserForm = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    dob: "",
    phone: "",
  });
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const age = calculateAge(userData.dob);
    const updatedData = { ...userData, age };

    try {
      const response = await axios.post("http://localhost:5000/api/users", updatedData);
      console.log("User created:", response.data);
      setShowSuccessDialog(true);
      setTimeout(() => setShowSuccessDialog(false), 2000);
    } catch (error) {
      console.error("Error creating user:", error.response || error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100 relative p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full sm:max-w-lg md:max-w-xl">
          <div className="flex justify-center items-center mb-6 space-x-3">
            <img src="/assets/add.gif" alt="Welcome" className="h-12 w-12" />
            <h2 className="text-3xl font-semibold text-gray-800">Add User Details</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center border-b-2 border-gray-300 py-2 focus-within:border-gray-600 transition-all duration-300">
              <FaUser className="text-gray-500 mr-3" />
              <input
                type="text"
                id="name"
                name="name"
                value={userData.name}
                onChange={handleChange}
                placeholder="Enter Name"
                className="w-full outline-none text-gray-800 placeholder-gray-500 border-none"
                required
              />
            </div>

            <div className="flex items-center border-b-2 border-gray-300 py-2 focus-within:border-gray-600 transition-all duration-300">
              <FaEnvelope className="text-gray-500 mr-3" />
              <input
                type="email"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                placeholder="Enter Email"
                className="w-full outline-none text-gray-800 placeholder-gray-500 border-none"
                required
              />
            </div>

            <div className="flex items-center border-b-2 border-gray-300 py-2 focus-within:border-gray-600 transition-all duration-300">
              <FaCalendarAlt className="text-gray-500 mr-3" />
              <input
                type="date"
                id="dob"
                name="dob"
                value={userData.dob}
                onChange={handleChange}
                className="w-full outline-none text-gray-800 placeholder-gray-500 border-none"
                required
              />
            </div>

            <div className="flex items-center border-b-2 border-gray-300 py-2 focus-within:border-gray-600 transition-all duration-300">
              <FaPhoneAlt className="text-gray-500 mr-3" />
              <input
                type="tel"
                id="phone"
                name="phone"
                value={userData.phone}
                onChange={handleChange}
                placeholder="Enter Phone Number"
                className="w-full outline-none text-gray-800 placeholder-gray-500 border-none"
                required
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-black text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-gray-800 transition-all duration-200 transform hover:scale-105"
              >
                Create User
              </button>
            </div>
          </form>

          {showSuccessDialog && (
            <>
              <div className="absolute inset-0 bg-black opacity-50 z-10" />
              <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black p-4 rounded-lg flex items-center justify-center shadow-lg z-20">
                <FaCheck className="mr-2" />
                <span>User Created!</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserForm;

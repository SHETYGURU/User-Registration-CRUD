import React, { useState } from 'react';
import { FaTachometerAlt, FaUserPlus, FaListAlt, FaHome, FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="bg-white text-black p-4 shadow-lg z-50 sticky top-0"> 
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center space-x-2">
          <img src="/assets/logo.png" alt="Logo" className="h-8" />
          <div className="text-2xl font-semibold">INI8 Labs</div>
        </div>
        <div className="hidden lg:flex space-x-6 items-center">
          <Link
            to="/home"
            className="flex items-center text-black hover:text-gray-400 transition duration-200"
          >
            <FaHome className="mr-2" />
            Home
          </Link>
          <Link
            to="/userform"
            className="flex items-center text-black hover:text-gray-400 transition duration-200"
          >
            <FaUserPlus className="mr-2" />
            Create User
          </Link>
          <Link
            to="/userlist"
            className="flex items-center text-black hover:text-gray-400 transition duration-200"
          >
            <FaListAlt className="mr-2" />
            View List
          </Link>
        </div>

        <div className="lg:hidden">
          <button onClick={toggleMobileMenu} className="text-black focus:outline-none">
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white shadow-lg rounded-b-lg mt-2 space-y-4 py-4 px-6">
          <Link
            to="/home"
            className="flex items-center text-black hover:text-gray-400 transition duration-200"
            onClick={toggleMobileMenu}
          >
            <FaHome className="mr-2" />
            Home
          </Link>
          <Link
            to="/userform"
            className="flex items-center text-black hover:text-gray-400 transition duration-200"
            onClick={toggleMobileMenu}
          >
            <FaUserPlus className="mr-2" />
            Create User
          </Link>
          <Link
            to="/userlist"
            className="flex items-center text-black hover:text-gray-400 transition duration-200"
            onClick={toggleMobileMenu}
          >
            <FaListAlt className="mr-2" />
            View List
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;

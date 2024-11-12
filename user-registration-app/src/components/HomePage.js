import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';  

const HomePage = () => {
  return (
    <div>     
       <Navbar /> 
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full text-center space-y-6 flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome to HomePage</h1>
        <p className="text-lg text-gray-600 mb-6">Create, manage users, and explore the features of the app.</p>
        
        {/* Bullet Points */}
        <ul className="text-left text-gray-600 space-y-2 text-lg mb-6">
          <li className="flex items-center">
            <span className="text-black mr-2">•</span> Create new users by entering details.
          </li>
          <li className="flex items-center">
            <span className="text-black mr-2">•</span> View the list of all users.
          </li>
          <li className="flex items-center">
            <span className="text-black mr-2">•</span> Delete users if not required.
          </li>
          <li className="flex items-center">
            <span className="text-black mr-2">•</span> Update user information in the list.
          </li>
        </ul>
        
        <Link to="/userform">
  <button className="bg-white text-black font-semibold py-2 px-6 rounded-full shadow-md hover:bg-gray-100 hover:shadow-lg transition duration-200 flex items-center justify-center">
    <img src="/assets/plus.gif" alt="Create User" className="h-6 w-6 mr-2" /> 
    Create User
  </button>
</Link>

      </div>
    </div>
    </div>

  );
};

export default HomePage;

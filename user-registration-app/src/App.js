import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";


function App() {
  return (
    <Router>
      {/* Render Navbar on every page */}

      {/* Define the routes for different pages */}
      <Routes>
      <Route path="/" element={<HomePage />} />  {/* HomePage route */}
        <Route path="/home" element={<HomePage />} />  {/* HomePage route */}
        <Route path="/userform" element={<UserForm />} />  {/* UserForm route */}
        <Route path="/userlist" element={<UserList />} />  {/* UserList route */}
      </Routes>
    </Router>
  );
}

export default App;

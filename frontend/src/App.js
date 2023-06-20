import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProfileSettings from "./pages/ProfileSettings";
import Header from "./components/Header"
import { ToastContainer } from 'react-toastify';
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "./features/auth/authSlice";


function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<ProfileSettings />} />  {/* You're using it here */}
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;


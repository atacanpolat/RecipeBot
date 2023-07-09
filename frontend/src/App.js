import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Homepage from "./pages/Homepage";
<<<<<<< Updated upstream
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProfileSettings from "./pages/ProfileSettings";
import Header from "./components/Header"
import { ToastContainer } from 'react-toastify';
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "./features/auth/authSlice";

=======
import { ToastContainer } from "react-toastify";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Generate from "./pages/Generate";
import PrivateHomePage from "./pages/PrivateHomepage";
import SearchRecipesPage from "./pages/SearchRecipesPage";
import SavedRecipesPage from "./pages/SavedRecipesPage";
import SetAvatarPage from "./pages/SetAvatarPage";
import AccountAndSettingsPage from "./pages/AccountAndSettingsPage"
>>>>>>> Stashed changes

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Homepage />} />
<<<<<<< Updated upstream
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<ProfileSettings />} />  {/* You're using it here */}
=======
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/setAvatar" element={<SetAvatarPage />} />
            <Route path="/generate" element={<Generate />} />
            <Route path="/inspiration" element={<SearchRecipesPage />} />
          </Routes>
          <ToastContainer />
        </div>
        <div className="container-private">
          <Routes>
            <Route path="/home" element={<PrivateHomePage />} />
            <Route path="/saved" element={<SavedRecipesPage />} />
            <Route path="/settings" element={<AccountAndSettingsPage />} />
>>>>>>> Stashed changes
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;


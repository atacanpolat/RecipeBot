import "./assets/css/App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Homepage from "./pages/Homepage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Generate from "./pages/Generate";
import PrivateHomePage from "./pages/PrivateHomepage";
import SearchRecipesPage from "./pages/SearchRecipesPage";
import SavedRecipesPage from "./pages/SavedRecipesPage";
import SetAvatarPage from "./pages/SetAvatarPage";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPasswordPage from "./pages/ResetPassword";
import Recipe from "./pages/Recipe";
import AccountAndSettingsPage from "./pages/AccountAndSettingsPage";
import Create from "./pages/Create";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/reset-password/:token"
              element={<ResetPasswordPage />}
            />
            <Route path="/setAvatar" element={<SetAvatarPage />} />
            <Route path="/home" element={<PrivateHomePage />} />
            <Route path="/saved" element={<SavedRecipesPage />} />
            <Route path="/generate" element={<Generate />} />
            <Route path="/create" element={<Create />} />
            <Route path="/inspiration" element={<SearchRecipesPage />} />
            <Route path="recipes/:name" element={<Recipe />} />
            <Route path="/settings" element={<AccountAndSettingsPage />} />
          </Routes>
          <ToastContainer />
        </div>
      </Router>
    </>
  );
}

export default App;

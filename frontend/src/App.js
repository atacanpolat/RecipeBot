import "./assets/css/App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import { ToastContainer } from "react-toastify";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Generate from "./pages/Generate";
import PrivateHomePage from "./pages/PrivateHomepage"
import SearchRecipesPage from "./pages/SearchRecipesPage";
import SavedRecipesPage from "./pages/SavedRecipesPage";
import SetAvatarPage from "./pages/SetAvatarPage";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route path='/setAvatar' element={<SetAvatarPage/>}/>
            <Route path="/generate" element={<Generate />} />
            <Route path="/inspiration" element={<SearchRecipesPage />}/>
          </Routes>
          <ToastContainer />
        </div>
        <div className="container-private">
          <Routes>
            <Route path="/home" element={<PrivateHomePage />} />
            <Route path="/saved" element={<SavedRecipesPage />}/>

    </div>
    </Router>
   
    </>
  );
}

export default App;


import logo from './logo.svg';
import './assets/css/App.css';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Homepage from "./pages/Homepage";
// import Hero from './components/deprecated/Hero_tw';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header"
import { ToastContainer } from 'react-toastify';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
function App() {
  return (
    <>
    <Router>
    <div className="container">
      <Routes>
        <Route path='/' element={<Homepage />}/>
        <Route path='/login' element={<SignIn />}/>
        <Route path='/register' element={<SignUp />}/>
      </Routes>
      <ToastContainer/>

    </div>
    </Router>
   
    </>
  );
}

export default App;

// Header.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { FaUser } from "react-icons/fa";

function Header() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const logoutUser = () => {
    dispatch(logout());
  };

  return (
    <header className="header">
      <NavLink exact to="/" activeClassName="active">
        Home
      </NavLink>
      <ul>
        {!user ? (
          <>
            <li>
              <NavLink to="/register" activeClassName="active">
                Register
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" activeClassName="active">
                Login
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/profile" activeClassName="active">
                <FaUser /> {user.name}
              </NavLink>
            </li>
            <li>
              <button onClick={logoutUser}>Logout</button>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;

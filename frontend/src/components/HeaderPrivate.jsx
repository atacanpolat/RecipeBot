import React from "react";
import { Button, Avatar } from "@mui/material";
import {
  useHeaderPrivateStyles,
  useHeaderPrivateTopStyles,
} from "./helpers/styles/headerStyles";
import { Link } from "react-router-dom";
import { PrimaryButton, theme } from "./helpers/themes";

import EggAltIcon from "@mui/icons-material/EggAlt";
import HomeIcon from "@mui/icons-material/Home";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "../images/logo.png";

export const HeaderPrivate = () => {
  const classes = useHeaderPrivateStyles();

  const handleLogOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("jwt");
  };

  return (
    <header className="header-private" style={{ flex: "0 0 auto" }}>
      <ul>
        <li>
          <Button startIcon={<HomeIcon />} href="/home">
            Home
          </Button>
        </li>
        <li>
          <Button startIcon={<TipsAndUpdatesIcon />} href="/inspiration">
            Search for inspiration
          </Button>
        </li>
        <li>
          <Button startIcon={<LoyaltyIcon />} href="/saved">
            Saved recipes
          </Button>
        </li>
        <li>
          <Button startIcon={<ControlPointIcon />} href="/create">
            Create a recipe
          </Button>
        </li>
        <li>
          <Button startIcon={<ManageAccountsIcon />} href="/settings">
            Account & settings
          </Button>
        </li>
        <Button
          className={classes.primaryLink}
          variant="contained"
          startIcon={<EggAltIcon />}
          href="/generate"
        >
          Generate Recipe
        </Button>
        <li>
          <Button
            startIcon={<LogoutIcon />}
            href="/"
            variant="outlined"
            style={{ marginTop: "50px" }}
            onClick={handleLogOut}
          >
            Logout
          </Button>
        </li>
      </ul>
    </header>
  );
};

export const HeaderPrivateTop = () => {
  const classes = useHeaderPrivateTopStyles();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header className="header-private-top" style={{ marginBottom: "20px" }}>
      <div className="logo">
        <Link className={`${classes.navLink} ${classes.logoLink}`} to="/">
          <img src={logo} alt="Logo" />
          RecipeBot
        </Link>
      </div>
      <div>
        <PrimaryButton
          startIcon={
            <Avatar
              src={"http://localhost:8000/" + user.avatar}
              style={{ border: `2px solid ${theme.palette.common.white}` }}
            />
          }
          href="/settings"
        >
          {user.firstName + " " + user.lastName}
        </PrimaryButton>
      </div>
    </header>
  );
};
/*
const DropdownMenu = () => {

  const handleLogOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('jwt');

  }
  return (
    <ul className="dropdown-menu">
      <li><a href="/settings">Settings</a></li>
      <li><a href="/profile">Profile</a></li>
      <li><a onClick={handleLogOut} href="/">Logout</a></li>
    </ul>
  );
};
*/
export default { HeaderPrivate, HeaderPrivateTop };

import React from "react";
import { useState } from "react";
import { Button, Avatar } from '@mui/material';
import { useHeaderPrivateStyles, useHeaderPrivateTopStyles } from "./helpers/styles/headerStyles";
import { Link } from "react-router-dom";

// icons
import EggAltIcon from "@mui/icons-material/EggAlt";
import HomeIcon from "@mui/icons-material/Home";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PersonIcon from '@mui/icons-material/Person';
import logo from "../images/logo.png";
import { PrimaryButton, theme } from "./helpers/themes";



export const HeaderPrivate = () => {
  const classes = useHeaderPrivateStyles();

  return (
    <header className="header-private" style={{flex: "0 0 auto"}}>
      {/* TODO: change links for pages*/}
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
      </ul>
    </header>
  );
};


export const HeaderPrivateTop = () => {
  const classes = useHeaderPrivateTopStyles();
  const user = JSON.parse(localStorage.getItem('user'));

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="header-private-top" style={{marginBottom:'20px'}}>
      <div className="logo">
        <a className={`${classes.navLink} ${classes.logoLink}`}>
          <img src={logo} alt="Logo" />
          <Link to="/">RecipeBot</Link>
        </a>
      </div>
      <div className="user-info">
        <PrimaryButton
          //startIcon={<Avatar src={'http://localhost:8000/' + user.avatar} style={{ border: `2px solid ${theme.palette.common.white}` }} />}
          onClick={handleDropdownToggle}
        >
          
        </PrimaryButton>
        {isDropdownOpen && <DropdownMenu />}
      </div>
    </header>
  );
};

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

export default {HeaderPrivate, HeaderPrivateTop};

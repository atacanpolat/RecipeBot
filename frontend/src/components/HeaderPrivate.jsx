import React from "react";
import Button from "@material-ui/core/Button";
import logo from "../images/logo.png";
import { makeStyles } from "@material-ui/core/styles";
import { purple, red } from "@mui/material/colors";
import theme from "./helpers/themes";
import { Link } from "react-router-dom";

// icons
import EggAltIcon from "@mui/icons-material/EggAlt";
import HomeIcon from "@mui/icons-material/Home";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

const useStyles = makeStyles(() => ({
  primaryLink: {
    [theme.breakpoints.up("lg")]: {
      margin: "40px 0 0 0",
    },
    padding: "8px 24px",
    borderRadius: "9999px",
    backgroundColor: theme.palette.violet.light,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.violet.dark,
      color: theme.palette.grey[200],
    },
    "&:focus": {
      boxShadow: `0 0 0 3px ${theme.palette.primary.light}`,
    },
    borderBottom: "none",
  },
}));

function HeaderPrivate({style}) {
  const classes = useStyles(theme);

  return (
    <header className="header-private" style={style}>
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
}

export default HeaderPrivate;

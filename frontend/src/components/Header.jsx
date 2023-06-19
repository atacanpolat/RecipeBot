import React from 'react'
import EggAltIcon from '@mui/icons-material/EggAlt';
import Button from '@material-ui/core/Button';
import logo from '../images/logo.png'
import { Link } from 'react-router-dom';
import { useHeaderStyles } from './helpers/styles/headerStyles';



const useStyles = makeStyles(() => ({
  primaryLink: {
    [theme.breakpoints.up("lg")]: {
      margin: "0",
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
  navLink: {
    fontSize: "1.125rem",
    margin: "0.5rem 0",
    [theme.breakpoints.up("lg")]: {
      fontSize: "0.875rem",
      margin: "0",
    },
    fontWeight: "600",
    letterSpacing: "0.05em",
    transition: "duration 300ms",
    paddingBottom: "0.25rem",
    borderBottom: "2px solid transparent",
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
  logoLink: {
    display: "flex",
    alignItems: "center",
    fontWeight: "900",
    borderBottom: "none",
    fontSize: "2rem",
    href: "/",
    marginLeft: "0",
    "& img": {
      width: "2.5rem",
      marginRight: "0.75rem",
    },
  },
}));

function Header() {
  const classes = useHeaderStyles();

  return (
    <header className="header">
      <div className="logo">
        <a className={`${classes.navLink} ${classes.logoLink}`}>
          <img src={logo} alt="Logo" />
          <Link to="/">RecipeBot</Link>
        </a>
      </div>
      <ul>
        <li>
          <Button className={classes.navLink} variant="text" href="/login">
            Login
          </Button>
        </li>
        <li>
          <Button className={classes.navLink} variant="text" href="/register">
            Register
          </Button>
        </li>
        <li>
          <Button
            className={classes.primaryLink}
            variant="contained"
            startIcon={<EggAltIcon />}
            href="/generate"
          >
            Generate Recipe
          </Button>
        </li>
      </ul>
    </header>
  );
}

export default Header;

import React from 'react'
import EggAltIcon from '@mui/icons-material/EggAlt';
import Button from '@material-ui/core/Button';
import logo from '../images/logo.png'
import { Link } from 'react-router-dom';
import { useHeaderStyles } from './helpers/styles/headerStyles';


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

import theme from "../themes";
import { makeStyles } from "@material-ui/core/styles";

export const useHeaderStyles = makeStyles(() => ({
    primaryLink: {
      [theme.breakpoints.up('lg')]: {
        margin: '0',
      },
      padding: '8px 24px',
      borderRadius: '9999px',
      fontWeight: 'bold',
      backgroundColor:  theme.palette.violet.light,
      transition: "background-color 300ms",
      color: theme.palette.common.white,
      '&:hover': {
        backgroundColor: theme.palette.violet.dark,
      },
      borderBottom: 'none',
    },
    actionButton: {
      position: "relative",
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        position: "relative",
        right: 0,
        top: 0,
        bottom: 0,
        margin: "0.25rem",
        width: "200%",
        minWidth: "8rem",
        maxWidth: "22rem",
      },
      backgroundColor: theme.palette.violet.light,
      color: theme.palette.common.white,
      fontWeight: "bold",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "9999px",
      transition: "background-color 300ms",
      "&:hover": {
        backgroundColor: theme.palette.violet.dark,
      },
    },
    navLink: {
      fontSize: '1.125rem',
      margin: '0.5rem 0',
      [theme.breakpoints.up('lg')]: {
        fontSize: '0.875rem',
        margin: '0',
      },
      fontWeight: '600',
      letterSpacing: '0.05em',
      transition: 'duration 300ms',
      paddingBottom: '0.25rem',
      borderBottom: '2px solid transparent',
      '&:hover': {
        color: theme.palette.primary.main,
      },
    },
    logoLink: {
      display: 'flex',
      alignItems: 'center',
      fontWeight: '900',
      borderBottom: 'none',
      fontSize: '2rem',
      href:'/',
      marginLeft: '0',
      '& img': {
        width: '2.5rem',
        marginRight: '0.75rem',
      },
    },
  }));

export const useHeaderPrivateStyles = makeStyles(() => ({
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

  export const useHeaderPrivateTopStyles = makeStyles(() => ({
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
        color: theme.palette.grey[200]
      },
    },
    logoLink: {
      display: "flex",
      alignItems: "center",
      marginRight: "20px",
      fontWeight: "900",
      borderBottom: "none",
      fontSize: "2rem",
      href: "/",
      marginLeft: "0",
      "& img": {
        width: "2.5rem",
        marginRight: "0.75rem",
      },
      "&:hover": {
        color: theme.palette.grey[200]
      },
    },

    userInfoLink: {
      "&:hover": {
        opacity: 0.5,
        backgroundColor: theme.palette.violet.main,
      }
    }
  }));

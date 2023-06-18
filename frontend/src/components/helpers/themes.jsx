import { createTheme, colors } from "@mui/material";
import { green, deepPurple, red } from "@mui/material/colors";
import { makeStyles, Typography, Button } from "@material-ui/core";

export const theme = createTheme({
    palette: {
      violet: {
        dark: deepPurple[700],
        main: deepPurple[500],
        light: deepPurple[200],
      },
      green : {
        dark: green[900],
        main: green[700],
        light: green[300]
      },
      red: {
        dark: red[900],
        main: red[600],
        light: red[400]
      },
      primary: {
        main: '#556cd6',
      },
      secondary: {
        main: '#19857b',
      },
      error: {
        main: colors.red.A400,
      },
    },

  });


const useStyles = makeStyles(() => ({
    sectionHeading: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      textAlign: "center",
      [theme.breakpoints.up("sm")]: {
        fontSize: "3rem",
      },
    },
    subheading: {
      fontWeight: "bold",
      color: theme.palette.violet.main,
    },
    primaryButton: {
      padding: "8px 24px",
      fontWeight: "bold",
      borderRadius: theme.spacing(1),
      backgroundColor: theme.palette.violet.main,
      color: theme.palette.common.white,
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.grey[200],
      },
      "&:focus": {
        boxShadow: `0 0 0 3px ${theme.palette.primary.light}`,
      },
    }
  }));
  
const SectionHeading = (props) => {
    const classes = useStyles();
    return (
      <Typography variant="h2" component="h2" className={classes.sectionHeading}>
        {props.children}
      </Typography>
    );
  };
  
const Subheading = (props) => {
    const classes = useStyles();
    return (
      <Typography variant="h5" className={classes.subheading}>
        {props.children}
      </Typography>
    );
  };

  const PrimaryButton = (props) => {
    const classes = useStyles();
    return (
      <Button
        className={classes.primaryButton}
        variant="contained"
        {...props}
      />
    );
    }
  


  export default theme;
  export { SectionHeading, Subheading, PrimaryButton };

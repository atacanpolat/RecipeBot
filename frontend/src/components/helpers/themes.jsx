import { createTheme } from "@mui/material";
import { purple, deepPurple } from "@mui/material/colors";
import { makeStyles, Typography, Button } from "@material-ui/core";

export const theme = createTheme({
    palette: {
      violet: {
        dark: deepPurple[700],
        main: deepPurple[500],
        light: deepPurple[200],
      }
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
      backgroundColor: theme.palette.primary.main,
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
        color="primary"
        {...props}
      />
    );
    }
  


  export default theme;
  export { SectionHeading, Subheading, PrimaryButton };

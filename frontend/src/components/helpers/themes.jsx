import { createTheme } from "@mui/material";
import { purple, deepPurple } from "@mui/material/colors";
import { makeStyles, Typography } from "@material-ui/core";

export const theme = createTheme({
    palette: {
      violet: {
        // Purple and green play nicely together.
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
  


  export default theme;
  export { SectionHeading, Subheading };

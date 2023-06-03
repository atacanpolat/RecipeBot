import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Container, Grid, Typography, ThemeProvider } from "@material-ui/core";
import { ReactComponent as SvgDecoratorBlob1 } from "../images/svg-decorator-blob-1.svg";
import DesignIllustration from "../images/food_illustration_purple.jpg";
import Header from "./Header";
import { theme } from "./helpers/themes";

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  heading: {
    fontWeight: "bold",
    fontSize: "2rem",
    [theme.breakpoints.up("lg")]: {
      fontSize: "2.5rem",
    },
  },
  violetText: {
    color: theme.palette.violet.light
  },
  paragraph: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(8),
    fontSize: "1rem",
    [theme.breakpoints.up("lg")]: {
      fontSize: "1.125rem",
    },
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
  illustration: {
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.up("lg")]: {
      justifyContent: "flex-end",
    },
  },
  illustrationImage: {
    width: "100%",
    maxWidth: "60rem",
    [theme.breakpoints.up("xl")]: {
      maxWidth: "50rem",
    },
  },
  decoratorBlob1: {
    pointerEvents: "none",
    opacity: 0.5,
    position: "absolute",
    left: 0,
    bottom: 0,
    height: "16rem",
    width: "16rem",
    transform: "translateX(-66.66%)",
    zIndex: -10,
  },
}));

const HomePage = () => {
  const classes = useStyles();

  return (
    <>
      <Header />
      <Container className={classes.root}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} lg={5}>
            <Typography variant="h1" component="h1" className={classes.heading}>
              Meet RecipeBot, <span className={classes.violetText}>the AI in your kitchen</span>
            </Typography>
            <Typography variant="body1" className={classes.paragraph}>
              Our templates are easy to setup, understand and customize. Fully modular components with a variety of
              pages and components.
            </Typography>
            <div className={classes.actionButton}>
              <Button variant="contained" className={classes.actionButton} disableElevation>
                Try generating a recipe!
              </Button>
            </div>
          </Grid>
          <Grid item xs={12} lg={7} className={classes.illustration}>
            <img src={DesignIllustration} alt="Design Illustration" className={classes.illustrationImage} />
          </Grid>
        </Grid>
        <SvgDecoratorBlob1 className={classes.decoratorBlob1} />
      </Container>
    </>
  );
};

export default HomePage;

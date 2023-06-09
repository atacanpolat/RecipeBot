import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import HeroScreenshot from '../images/Screenshot 2023-06-03 at 23-02-28 SEBA Master 2023 _ Team 31 _ deliverables · GitLab.png';
import theme from "./helpers/themes.jsx";

const useStyles = makeStyles(() => ({
  container: {
    position: "relative",
    width: "80%",
  },
  twoColumn: {
    flexWrap: "nowrap",
    justifyContent: "space-between",
    maxWidth: theme.breakpoints.values.xl,
    margin: "auto",
    padding: theme.spacing(10, 0),
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  column: {
    width: "100%",
    maxWidth: theme.breakpoints.values.md,
    margin: "auto",
    [theme.breakpoints.down("md")]: {
      textAlign: "center",
      marginBottom: theme.spacing(4),
    },
  },
  imageColumn: {
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  textColumn: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    [theme.breakpoints.down("md")]: {
      width: "80%",
      textAlign: "center",
      order: 1,
    },
  },
  image: {
    width: "100%",
    height: "auto",
  },
  textContent: {
    padding: theme.spacing(2),
    textAlign: "left",
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(0),
    },
  },
  subheading: {
    textAlign: "left",
    marginBottom: theme.spacing(1),
    color: theme.palette.violet.dark
  },
  heading: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    fontWeight: "bold",
    fontSize: "2.25rem",
    lineHeight: "1.2",
    [theme.breakpoints.up("sm")]: {
      fontSize: "3rem",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "4rem",
    },
  },
  steps: {
    marginTop: theme.spacing(6),
    listStyle: "none",
    padding: 0,
  },
  step: {
    display: "flex",
    alignItems: "flex-start",
    marginTop: theme.spacing(4),
  },
  stepNumber: {
    fontWeight: "bold",
    fontSize: "2rem",
    lineHeight: "1",
    color: theme.palette.grey[400],
  },
  stepText: {
    marginLeft: theme.spacing(2),
  },
  stepHeading: {
    fontWeight: "bold",
    fontSize: "1.5rem",
    lineHeight: "1.2",
  },
  stepDescription: {
    marginTop: theme.spacing(1),
    fontSize: "0.875rem",
    color: theme.palette.grey[600],
    fontWeight: "medium",
  },
}));

const StepsSection = () => {
  const classes = useStyles();

  const steps = [
    {
      heading: "Add ingredients",
      description: "Add the ingredients that you want to use in the recipe",
    },
    {
      heading: "Customize recipe settings",
      description: "cusotmize the rest of the recipe settings accpording to your wishes, such as cooking utensils, dietary restrictions, allergens, serving size",
    },
    {
      heading: "Generate and Save the recipe",
      description: "Click on 'Generate recipe' and then click on save to  publish the recipe with the world and to be able to access it later on",
    },
  ];

  return (
    <div className={classes.container}>
      <Grid container className={classes.twoColumn}>
        <Grid item xs={12} md={6} className={`${classes.column} ${classes.imageColumn}`}>
          <img src={HeroScreenshot} alt="Hero Screenshot" className={classes.image} />
        </Grid>
        <Grid item xs={12} md={6} className={`${classes.column} ${classes.textColumn}`}>
          <div className={classes.textContent}>
            <Typography variant="h5" className={classes.subheading}>Only 3 steps away to your AI cookbook</Typography>
            <Typography variant="h2" className={classes.heading}>
              Get started!
            </Typography>
            <ul className={classes.steps}>
              {steps.map((step, index) => (
                <li key={index} className={classes.step}>
                  <div className={classes.stepNumber}>{(index + 1).toString().padStart(2, '0')}</div>
                  <div className={classes.stepText}>
                    <Typography variant="h6" className={classes.stepHeading}>
                      {step.heading}
                    </Typography>
                    <Typography variant="body2" className={classes.stepDescription}>
                      {step.description}
                    </Typography>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default StepsSection;

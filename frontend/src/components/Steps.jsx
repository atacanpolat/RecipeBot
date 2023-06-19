import React from "react";
import { Grid, Typography } from "@material-ui/core";
import HeroScreenshot from '../images/Screenshot 2023-06-03 at 23-02-28 SEBA Master 2023 _ Team 31 _ deliverables · GitLab.png';
import { useStepsStyles } from "./helpers/styles/landingPageStyles";



const StepsSection = () => {
  const classes = useStepsStyles();

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

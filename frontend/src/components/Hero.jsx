import React from "react";
import { Button, Container, Grid, Typography } from "@material-ui/core";
import { ReactComponent as SvgDecoratorBlob1 } from "../images/svg-decorator-blob-1.svg";
import DesignIllustration from "../images/food_illustration_purple.jpg";
import Header from "./Header";
import { useHeroStyles } from "./helpers/styles/landingPageStyles";


const HomePage = () => {
  const classes = useHeroStyles();

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
              Description text here.
            </Typography>
            <div>
              <Button variant="contained" href='/generate' className={classes.actionButton} style={{left:60}}>
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

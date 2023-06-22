import React from "react";
import {
  Button,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from "@material-ui/core";
import StarIcon from '@mui/icons-material/Star';
import { useRecipeContainerStyles, useRecipeSliderStyles } from './helpers/styles/recipesStyles';

function RecipeCard({ card , isSlider}) {
  const classesSlider = useRecipeSliderStyles();
  const classesContainer = useRecipeContainerStyles();
  
  const classes = isSlider ? classesSlider : classesContainer;

  return (
    <div className={classes.cardContainer}>
      <Card className={classes.card} component='a' href={card.recipeUrl}>
        <CardMedia className={classes.cardImage} image={card.imgSrc}/>
        <CardContent className={classes.textInfo}>
          <div className={classes.titleReviewContainer}>
            <Typography variant="h5" className={classes.title}>
              {card.title}
            </Typography>
            <div className={classes.ratingsInfo}>
              <StarIcon />
              <Typography variant="body2" className={classes.rating}>
                {card.meanRating}
                <a style={{opacity:'0.7', fontWeight:1}}>({card.reviewCount})</a>
              </Typography>
            </div>
          </div>
          <div className={classes.secondaryInfoContainer}>
            <div className={classes.iconWithText}>
              <Typography variant="body2" className={classes.text}>
                {card.tags}
              </Typography>
            </div>
          </div>
          <Typography variant="body2" className={classes.description}>
            {card.tags}
          </Typography>
        </CardContent>
        <Button className={classes.primaryButton}>Book Now</Button>
      </Card>
    </div>
  );
}

export default RecipeCard;

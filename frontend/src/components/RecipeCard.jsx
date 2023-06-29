import React from "react";
import { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
} from "@material-ui/core";
import StarIcon from '@mui/icons-material/Star';
import { useRecipeContainerStyles, useRecipeSliderStyles } from './helpers/styles/recipesStyles';
import userService from "../features/user/userService";

function CreatedByComponent({ card, classes }) {
  
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await userService.getUserbyId(card.createdBy)
      console.log(userData);
      setUser(userData);
    };
    fetchUser();
  }, [card]);

  return (
    <Typography variant="body2" className={classes.description}>
       Created by: {user.firstName} {user.lastName}
    </Typography>
  );
}

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
            <span className={classes.titleText}>
              {card.title}
              </span>
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
          <CreatedByComponent card={card} classes={classes}/>
        </CardContent>
      </Card>
    </div>
  );
}

export default RecipeCard;

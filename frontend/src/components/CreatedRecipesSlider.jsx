import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from "@material-ui/core";
import StarIcon from '@mui/icons-material/Star';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PersonIcon from '@mui/icons-material/Person';
import theme from "./helpers/themes";
import recipeService from "../features/recipe/recipeService";
import { useRecipeSliderStyles } from "./helpers/styles/recipesStyles";

function CreatedRecipesSlider({style}) {


  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const recipes = await recipeService.getCreatedRecipes();
        const recipesData = await recipeService.calculateRecipeData(recipes); 
        setCards(recipesData);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchData();
  }, []);
  
  const classes = useRecipeSliderStyles();
  const [sliderRef, setSliderRef] = useState(null);
  const slidesToShow = cards.length > 2 ? 3 : cards.length;
  const sliderSettings = {
    arrows: false,
    slidesToShow: slidesToShow,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className={classes.container} style={style}>
      <div className={classes.content}>
        <div className={classes.headingWithControl}>
          <Typography variant="h4" className={classes.heading}>
            Your Created Recipes
          </Typography>
          <div className={classes.controls}>
            <Button className={classes.controlButton} onClick={sliderRef?.slickPrev} >
              <ChevronLeftIcon />
            </Button>
            <Button className={classes.controlButton} onClick={sliderRef?.slickNext}>
              <ChevronRightIcon />
            </Button>
          </div>
        </div>
        <div style={{width:"1450px", overflowX:"scroll", paddingLeft:"40px"}}>
        <Slider ref={setSliderRef} {...sliderSettings} className={classes.cardSlider}>
          {cards.map((card, index) => (
            <div className={classes.cardContainer} key={index}>
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
          ))}   
        </Slider>
        </div>
      </div>
    </div>
  );
};

export default CreatedRecipesSlider;
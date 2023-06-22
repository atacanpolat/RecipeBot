import React, { useState, useEffect } from "react";
import Slider from "react-slick";
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
import recipeService from "../features/recipe/recipeService";
import {useRecipeSliderStyles} from './helpers/styles/recipesStyles';
import RecipeCard from "./RecipeCard";

function PopularRecipesSlider({style}) {


  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const recipes = await recipeService.getAllRecipes();
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
  const sliderSettings = {
    arrows: false,
    slidesToShow: 3,
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
            Popular Recipes
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
          <RecipeCard card={card} key={index} isSlider={true}/>
          ))}    
        </Slider>
        </div>
      </div>
    </div>
  );
};

export default PopularRecipesSlider;
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



const useStyles = makeStyles(() => ({
  container: {
  },
  content: {
    maxWidth: "screen-xl",
    margin: "0 auto",
    padding: theme.spacing(2),
    [theme.breakpoints.up("lg")]: {
      padding: theme.spacing(4),
    },
  },
  headingWithControl: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      alignItems: "stretch",
    },
  },
  heading: {
    ...theme.typography.h4,
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
      ...theme.typography.h3,
      marginBottom: 0,
    },
  },

  controlButton: {
    ...theme.typography.button,
    marginLeft: theme.spacing(2),
    borderRadius: "50%",
    padding: theme.spacing(1),
    backgroundColor: theme.palette.violet.main,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.violet.light,
    },
  },
  cardSlider: {
    marginTop: theme.spacing(4),
    "& .slick-track": {
      display: "flex",
    },
    "& .slick-slide": {
      height: "auto",
      display: "flex",
      justifyContent: "center",
      marginBottom: theme.spacing(1),
    },
  },
  cardContainer: {
    marginTop: theme.spacing(3),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '50%',
      paddingRight: theme.spacing(10),
    },
    [theme.breakpoints.up('md')]: {
      width: '33.33%',
      paddingRight: theme.spacing(6),
    },
    [theme.breakpoints.up('lg')]: {
      width: '25%',
      paddingRight: theme.spacing(12),
    },
  },
  card: {
    height: 300,
    width: 400,
    display: "flex",
    flexDirection: "column",
    borderRadius: "3xl",
    "&:focus": {
      outline: "none",
    },
    "&:hover": {
      opacity: 0.5,
      transition: "0.3s",
    }
  },
  cardImage: {
    width: "100%",
    height: 1000,
    flex: 1,
    backgroundPosition: "center",
    backgroundSize: "cover",
    padding: "80px",
    [theme.breakpoints.up("sm")]: {
      borderTopRightRadius: "3xl",
    },
  },
  titleReviewContainer: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  },
  title: {
    ...theme.typography.h6,
    marginBottom: theme.spacing(2),
    whiteSpace: "pre-wrap", // Allow text to wrap to the next line
    wordWrap: "break-word", // Break words if they exceed the width
    textAlign: "center", // Center the text
  },
  ratingsInfo: {
    display: "flex",
    alignItems: "center",
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      marginTop: 0,
    },
  },
  rating: {
    marginLeft: theme.spacing(1),
    fontWeight: "bold",
  },
  description: {
    ...theme.typography.body2,
    marginTop: theme.spacing(2),
    opacity: "0.5",
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(4),
    },
  },
  secondaryInfoContainer: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
    },
  },
  iconWithText: {
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      marginTop: 0,
    },
  },
  iconContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 24,
    height: 24,
    borderRadius: "50%",
    backgroundColor: theme.palette.grey[700],
    color: theme.palette.common.white,
  },
  text: {
    marginLeft: theme.spacing(1),
    ...theme.typography.body2,
    fontWeight: "bold",
    color: theme.palette.text.primary,
  },
  primaryButton: {
    ...theme.typography.button,
    marginTop: "auto",
    alignItems: "center",
    borderRadius: "0",
    backgroundColor: theme.palette.violet.light,
    [theme.breakpoints.up("sm")]: {
      borderTopRightRadius: "3xl",
    },
  },
}));

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
  
  const classes = useStyles();
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
      <div className={classes.content} style={style}>
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
  );
};

export default PopularRecipesSlider;
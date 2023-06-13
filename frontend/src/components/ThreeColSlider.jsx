import React, { useState } from "react";
import Slider from "react-slick";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from "@material-ui/core";
import EuroIcon from '@mui/icons-material/Euro';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import theme from "./helpers/themes";


const useStyles = makeStyles(() => ({
  container: {
    position: "relative",
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
    height: 500,
    display: "flex",
    flexDirection: "column",
    borderRadius: "3xl",
    "&:focus": {
      outline: "none",
    },
    "&:hover": {
        opacity: .5,
        transition:"0.3s"
      }
  },
  cardImage: {
    width: "100%",
    height: 200,
    backgroundPosition: "center",
    backgroundSize: "cover",
    borderTopLeftRadius: "3xl",
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
    ...theme.typography.h5,
    marginBottom: theme.spacing(2),
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

function CardSlider({style}) {

    const cards = [
        {
          imageSrc: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=1024&w=768&q=80",
          title: "Wyatt Residency",
          description: "Lorem ipsum dolor sit amet, consectur dolori adipiscing elit, sed do eiusmod tempor nova incididunt ut labore et dolore magna aliqua.",
          locationText: "Rome, Italy",
          pricingText: "USD 39/Day",
          rating: "4.8",
          url: "http:localhost:3000/recipe/12786389"
        },
        {
          imageSrc: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=1024&w=768&q=80",
          title: "Soho Paradise",
          description: "Lorem ipsum dolor sit amet, consectur dolori adipiscing elit, sed do eiusmod tempor nova incididunt ut labore et dolore magna aliqua.",
          locationText: "Ibiza, Spain",
          pricingText: "USD 50/Day",
          rating: 4.9,
          url: "http:localhost:3000/recipe/12786389"

        },
        {
          imageSrc: "https://images.unsplash.com/photo-1549294413-26f195200c16?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=1024&w=768&q=80",
          title: "Hotel Baja",
          description: "Lorem ipsum dolor sit amet, consectur dolori adipiscing elit, sed do eiusmod tempor nova incididunt ut labore et dolore magna aliqua.",
          locationText: "Palo Alto, CA",
          pricingText: "USD 19/Day",
          rating: "5.0",
          url: "http:localhost:3000/recipe/12786389"

        },
        {
          imageSrc: "https://images.unsplash.com/photo-1571770095004-6b61b1cf308a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=1024&w=768&q=80",
          title: "Hudak Homes",
          description: "Lorem ipsum dolor sit amet, consectur dolori adipiscing elit, sed do eiusmod tempor nova incididunt ut labore et dolore magna aliqua.",
          locationText: "Arizona, RAK",
          pricingText: "USD 99/Day",
          rating: 4.5,
          url: "http:localhost:3000/recipe/12786389"

        },
      ]
  
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
      <div className={classes.content}>
        <div className={classes.headingWithControl}>
          <Typography variant="h4" className={classes.heading}>
            Popular Hotels
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
              <Card className={classes.card} component='a' href={card.url}>
                <CardMedia className={classes.cardImage} image={card.imageSrc}/>
                <CardContent className={classes.textInfo}>
                <div className={classes.titleReviewContainer}>
                  <Typography variant="h5" className={classes.title}>
                    {card.title}
                  </Typography>
                  <div className={classes.ratingsInfo}>
                      <StarIcon />
                      <Typography variant="body2" className={classes.rating}>
                        {card.rating}
                      </Typography>
                  </div>
                </div>
                <div className={classes.secondaryInfoContainer}>
                  <div className={classes.iconWithText}>
                    <div className={classes.iconContainer}>
                      <LocationOnIcon />
                    </div>
                    <Typography variant="body2" className={classes.text}>
                      {card.locationText}
                    </Typography>
                  </div>
                  <div className={classes.iconWithText}>
                    <div className={classes.iconContainer}>
                      <EuroIcon />
                    </div>
                    <Typography variant="body2" className={classes.text}>
                      {card.pricingText}
                    </Typography>
                  </div>
                </div>
                <Typography variant="body2" className={classes.description}>
                  {card.description}
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

export default CardSlider;
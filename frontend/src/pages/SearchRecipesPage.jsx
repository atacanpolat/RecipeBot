import React, { useState, useEffect } from "react";
import recipeService from "../features/recipe/recipeService";
import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { theme, SectionHeading, PrimaryButton } from "../components/helpers/themes";
import HeaderPrivateTop from "../components/HeaderPrivateTop";
import {
    Button,
    Typography,
    Card,
    CardMedia,
    CardContent,
    TextField,
    Chip
  } from "@material-ui/core";
  import StarIcon from '@mui/icons-material/Star';
import HeaderPrivate from "../components/HeaderPrivate";
import FilteringComponent from "../components/FilteringComponent";
import { FormControl, FormGroup, FormControlLabel, Checkbox } from "@material-ui/core";



const useStyles = makeStyles(() => ({
    cardContainer: {
      marginTop: theme.spacing(10),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '50%',
        paddingRight: theme.spacing(8),
      },
      [theme.breakpoints.up('lg')]: {
        width: '33.33%',
      },
    },
    featured: {
      width: '100%',
      gridColumn: '1 / -1', // Span across all columns
    },
    card: {
        height: 300,
        width: 400,
        display: "flex",
        flexDirection: "column",
        borderRadius: theme.spacing(1),
        backgroundColor: theme.palette.grey[100],
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
        height: "100%",
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

const SearchRecipesPage = () => {




  const classes = useStyles();
  const [visible, setVisible] = useState(7);

  const onLoadMoreClick = () => {
    setVisible((v) => v + 6);
  };

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

  const handleFilterSubmit = async (filters) => {
        try {
          const recipes = await recipeService.getFilteredRecipes(filters);
          const recipesData = await recipeService.calculateRecipeData(recipes); 
          setCards(recipesData);

        } catch (error) {
          console.error("Error getching recipes:", error);
        }
  };


  return (
    <div style={{ alignItems: "center", width: "100%", gap: "20px", flexDirection: "column"}}>
      <HeaderPrivateTop/>
      <div style={{display:"flex"}}>
        <HeaderPrivate className="sideNav" style={{flex: "0 0 auto", zIndex: "1"}}/>
        <div style={{display:"flex", flexDirection: "column", flex: "1 1 auto"}}>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <SectionHeading className={classes.heading}>Search for Recipes</SectionHeading>
          </Grid>

          <FilteringComponent onFilterSubmit={handleFilterSubmit}/>       

          <Grid item xs={12}>
            <Grid container spacing={4} className={classes.cards}>
                {cards.slice(0, visible).map((card, index) => (
                <Grid item key={index} xs={12} sm={6} lg={4} className={classes.cardContainer}>
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
                  </Card>
                </Grid>
                ))}
            </Grid>
        </Grid>
        {visible < cards.length && (
            <Grid item xs={12} className={classes.buttonContainer}>
              <PrimaryButton
                className={classes.loadMoreButton}
                onClick={onLoadMoreClick}
              >
                Load More
              </PrimaryButton>
            </Grid>
          )}
        </Grid>
      </Container>
    </div>
    </div>
    </div>
  );
};

export default SearchRecipesPage;

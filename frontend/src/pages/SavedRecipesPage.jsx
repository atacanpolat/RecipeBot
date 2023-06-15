import React, { useState, useEffect } from "react";
import recipeService from "../features/recipe/recipeService";
import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { theme, SectionHeading, PrimaryButton } from "../components/helpers/themes";
import HeaderPrivateTop from "../components/HeaderPrivateTop";
import {
    Typography,
    Card,
    CardMedia,
    CardContent,
  } from "@material-ui/core";
  import StarIcon from '@mui/icons-material/Star';
import HeaderPrivate from "../components/HeaderPrivate";
import FilteringComponent from "../components/FilteringComponent";



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
      tabContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center", // Added property
      },
      tabButton: {
        backgroundColor: theme.palette.grey[200],
        border: `1px solid ${theme.palette.grey[400]}`,
        color: theme.palette.text.primary,
        padding: theme.spacing(2, 3), // Increased padding for a larger button
        cursor: "pointer",
        transition: "background-color 0.3s",
        marginRight: theme.spacing(2),
        borderRadius: theme.spacing(2),
        fontFamily: theme.typography.fontFamily,
        fontSize: theme.typography.h6.fontSize, // Increased font size for a larger button
        fontWeight: theme.typography.fontWeightMedium,
        "&:hover": {
          backgroundColor: theme.palette.grey[300],
        },
      },
      
      
      activeTabButton: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        "&:hover": {
          backgroundColor: theme.palette.primary.main,
        },
      },
      
  }));

const SavedRecipesPage = () => {


  const classes = useStyles();
  const [visible, setVisible] = useState(6);

  const [activeTab, setActiveTab] = useState("saved");
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [createdRecipes, setCreatedRecipes] = useState([]);


  const onLoadMoreClick = () => {
    setVisible((v) => v + 6);
  };

  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const savedRecipes = await recipeService.getSavedRecipes();
        const savedRecipesData = await recipeService.calculateRecipeData(savedRecipes);
        setSavedRecipes(savedRecipesData);
        
        const createdRecipes = await recipeService.getCreatedRecipes();
        const createdRecipesData = await recipeService.calculateRecipeData(createdRecipes);
        setCreatedRecipes(createdRecipesData);

      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };
  
    fetchData();
  }, []);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const createdRecipes = await recipeService.getCreatedRecipes();
        const savedRecipes = await recipeService.getSavedRecipes();
        const recipesData = await recipeService.calculateRecipeData(createdRecipes); 
        setCards(recipesData);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchData();
  }, []);

  const handleFilterSubmit = async (filters) => {
    try {
      let recipesData = [];
      
      if (activeTab === "saved") {
        const savedRecipesData = await recipeService.getFilteredRecipes(filters);
        recipesData = await recipeService.calculateRecipeData(savedRecipesData);
        setSavedRecipes(recipesData);
      } else if (activeTab === "created") {
        const createdRecipesData = await recipeService.getFilteredRecipes(filters);
        recipesData = await recipeService.calculateRecipeData(createdRecipesData);
        setCreatedRecipes(recipesData);
      }
      
      setCards(recipesData);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  


  return (
    <div style={{ alignItems: "center", width: "100%", gap: "20px", flexDirection: "column"}}>
      <HeaderPrivateTop/>
      <div style={{display:"flex"}}>
        <HeaderPrivate className="sideNav"/>
        <div style={{display:"flex", flexDirection: "column", flex: "1 1 auto"}}>
      <Container>
        <Grid container spacing={4} >
          <Grid item xs={12} style={{display: "flex", flexDirection:"row", justifyContent:"space-between",  paddingBottom:theme.spacing(16)}}>
            <SectionHeading className={classes.heading}>Your Recipes</SectionHeading>
            <div className={classes.tabContainer}>
            <button
            onClick={() => handleTabClick("saved")}
            className={`${classes.tabButton} ${activeTab === "saved" ? classes.activeTabButton : ""}`}
            > Saved Recipes
            </button>
            <button
              onClick={() => handleTabClick("created")}
              className={`${classes.tabButton} ${
                activeTab === "created" ? classes.activeTabButton : ""}`}
            > Created Recipes
            </button>
          </div>
          </Grid>

          

          <FilteringComponent onFilterSubmit={handleFilterSubmit}/>       

          <Grid item xs={12}>
            <Grid container spacing={4} className={classes.cards}>
              {(activeTab === "saved" ? savedRecipes : createdRecipes)
                .slice(0, visible)
                .map((card, index) => (
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

export default SavedRecipesPage;

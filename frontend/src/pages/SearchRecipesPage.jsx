import React, { useState, useEffect } from "react";
import recipeService from "../features/recipe/recipeService";

import { SectionHeading, PrimaryButton } from "../components/helpers/themes";
import {HeaderPrivate, HeaderPrivateTop} from "../components/HeaderPrivate";
import FilteringComponent from "../components/FilteringComponent";
import { useRecipeContainerStyles } from "../components/helpers/styles/recipesStyles";

import {
    Container, 
    Grid,
    Typography,
    Card,
    CardMedia,
    CardContent,
  } from "@material-ui/core";
import StarIcon from '@mui/icons-material/Star';


const SearchRecipesPage = () => {


  const classes = useRecipeContainerStyles();
  const [visible, setVisible] = useState(6);

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

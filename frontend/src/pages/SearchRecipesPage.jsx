import React, { useState, useEffect } from "react";
import recipeService from "../features/recipe/recipeService";

import { SectionHeading, PrimaryButton } from "../components/helpers/themes";
import {HeaderPrivate, HeaderPrivateTop} from "../components/HeaderPrivate";
import FilteringComponent from "../components/FilteringComponent";
import { useRecipeContainerStyles } from "../components/helpers/styles/recipesStyles";
import {Container, Grid} from "@material-ui/core";
import RecipeCard from "../components/RecipeCard";
import SortingComponent from "../components/SortingComponent";


const SearchRecipesPage = () => {


  const classes = useRecipeContainerStyles();
  const [cards, setCards] = useState([]);
  const [visible, setVisible] = useState(6);

  const onLoadMoreClick = () => {
    setVisible((v) => v + 6);
  };


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
          console.error("Error fetching recipes:", error);
        }
  };

  const handleSortSubmit = async (criterion) => {
    try {
      const sortedRecipesData = await recipeService.sortRecipes(cards, criterion);
      setCards(sortedRecipesData);
    } catch (error) {
      console.error('Error sorting recipes:', error);
    }
  }


  return (
    <div style={{ alignItems: "center", width: "100%", gap: "20px", flexDirection: "column"}}>
      <HeaderPrivateTop/>
      <div style={{display:"flex"}}>
        <HeaderPrivate className="sideNav" style={{flex: "0 0 auto", zIndex: "1"}}/>
        <div style={{display:"flex", flexDirection: "column", flex: "1 1 auto"}}>
          <Container>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
              style={{marginBottom: "60px"}}
              >
              <Grid item xs={2}>
              <SortingComponent onSortSubmit={handleSortSubmit} />
              </Grid>    
              <Grid item xs={8}>
              <SectionHeading className={classes.heading}>Search for Recipes</SectionHeading>
              </Grid>
              <Grid item xs={2}></Grid>
            </Grid>
            <FilteringComponent onFilterSubmit={handleFilterSubmit}/>
            <Grid item xs={12}>
              <Grid container spacing={4} className={classes.cards}>
                {cards.slice(0, visible).map((card, index) => (
                  <Grid item key={index} xs={12} sm={6} lg={4} className={classes.cardContainer}>
                    <RecipeCard card={card} key={index} isSlider={false} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            {visible < cards.length && (
                <Grid item xs={12} className={classes.buttonContainer}>
                  <PrimaryButton className={classes.loadMoreButton} onClick={onLoadMoreClick}>
                    Load More
                  </PrimaryButton>
                </Grid>
              )}
          </Container>
        </div>
      </div>
    </div>
  );
};

export default SearchRecipesPage;

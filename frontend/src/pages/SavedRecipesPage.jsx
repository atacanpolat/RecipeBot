import React, { useState, useEffect } from "react";
import { Container, Grid } from "@material-ui/core";
import { SectionHeading, PrimaryButton } from "../components/helpers/themes";
import { HeaderPrivate, HeaderPrivateTop } from "../components/HeaderPrivate";
import FilteringComponent from "../components/FilteringComponent";
import { useRecipeContainerStyles } from "../components/helpers/styles/recipesStyles";
import RecipeCard from "../components/RecipeCard";
import recipeService from "../features/recipe/recipeService";
import SortingComponent from "../components/SortingComponent";

const SavedRecipesPage = () => {
  const classes = useRecipeContainerStyles();
  const [visible, setVisible] = useState(6);
  const [criterion, setCriterion] = useState("");

  const [activeTab, setActiveTab] = useState("saved");
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [createdRecipes, setCreatedRecipes] = useState([]);

  const onLoadMoreClick = () => {
    setVisible((v) => v + 6);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const savedRecipes = await recipeService.getSavedRecipes();
        const savedRecipesData = await recipeService.calculateRecipeData(
          savedRecipes
        );
        setSavedRecipes(savedRecipesData);

        const createdRecipes = await recipeService.getCreatedRecipes();
        const createdRecipesData = await recipeService.calculateRecipeData(
          createdRecipes
        );
        setCreatedRecipes(createdRecipesData);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchData();
  }, []);

  const handleFilterSubmit = async (filters) => {
    try {
      let recipesData = [];
      filters.activeTab = activeTab;
      console.log(activeTab);

      const recipes = await recipeService.getFilteredRecipes(filters);
      recipesData = await recipeService.calculateRecipeData(recipes);

      if (activeTab === "saved") {
        const sortedRecipesData = await recipeService.sortRecipes(
          recipesData,
          criterion
        );
        setSavedRecipes(sortedRecipesData);
      } else {
        const sortedRecipesData = await recipeService.sortRecipes(
          recipesData,
          criterion
        );
        setCreatedRecipes(sortedRecipesData);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const handleSortSubmit = async (criterion) => {
    try {
      const sortedSavedRecipesData = await recipeService.sortRecipes(
        savedRecipes,
        criterion
      );
      const sortedCreatedRecipesData = await recipeService.sortRecipes(
        createdRecipes,
        criterion
      );

      activeTab === "saved"
        ? setSavedRecipes(sortedSavedRecipesData)
        : setCreatedRecipes(sortedCreatedRecipesData);

      setCriterion(criterion);
    } catch (error) {
      console.error("Error sorting recipes:", error);
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div
      style={{
        alignItems: "center",
        width: "100%",
        gap: "20px",
        flexDirection: "column",
      }}
    >
      <HeaderPrivateTop />
      <div style={{ display: "flex" }}>
        <HeaderPrivate className="sideNav" />
        <div
          style={{ display: "flex", flexDirection: "column", flex: "1 1 auto" }}
        >
          <Container>
            <Grid
              container
              spacing={2}
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
              style={{ marginBottom: "80px", marginTop: "40px" }}
            >
              <SortingComponent onSortSubmit={handleSortSubmit} />
              <SectionHeading className={classes.heading}>
                Your Recipes
              </SectionHeading>

              <div className={classes.tabContainer}>
                <button
                  onClick={() => handleTabClick("saved")}
                  className={`${classes.tabButton} ${
                    activeTab === "saved" ? classes.activeTabButton : ""
                  }`}
                >
                  {" "}
                  Saved
                </button>
                <button
                  onClick={() => handleTabClick("created")}
                  className={`${classes.tabButton} ${
                    activeTab === "created" ? classes.activeTabButton : ""
                  }`}
                >
                  {" "}
                  Created
                </button>
              </div>
            </Grid>

            {/* Filters */}
            <Grid container spacing={8}>
              <Grid item xs={12}>
                <FilteringComponent onFilterSubmit={handleFilterSubmit} />
              </Grid>
            </Grid>

            {savedRecipes.length === 0 && activeTab === "saved" && (
              <div style={{ marginTop: "50px" }}>
                <p>You have no saved recipes...</p>
              </div>
            )}

            {/* Grid of saved recipes */}
            <Grid item xs={12}>
              <Grid container spacing={4} className={classes.cards}>
                {(activeTab === "saved" ? savedRecipes : createdRecipes)
                  .slice(0, visible)
                  .map((card, index) => (
                    <Grid
                      item
                      key={index}
                      xs={12}
                      sm={6}
                      lg={4}
                      className={classes.cardContainer}
                    >
                      <RecipeCard card={card} key={index} isSlider={false} />
                    </Grid>
                  ))}
              </Grid>
            </Grid>
            {visible <
              (activeTab === "created"
                ? createdRecipes.length
                : savedRecipes.length) && (
              <Grid item xs={12} className={classes.buttonContainer}>
                <PrimaryButton
                  className={classes.loadMoreButton}
                  onClick={onLoadMoreClick}
                >
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

export default SavedRecipesPage;

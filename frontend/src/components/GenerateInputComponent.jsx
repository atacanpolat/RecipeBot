import axios from "axios";

import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from "@material-ui/core";
import TextareaAutosize from "@mui/material/TextareaAutosize";

import ListItemText from "@mui/material/ListItemText";
import Spinner from "../components/Spinner";

import Checkbox from "@mui/material/Checkbox";
import { Controller, useForm } from "react-hook-form";

import { useState } from "react";
import { useFilterStyles } from "./helpers/styles/recipesStyles";
import Enums from "./enums/enums";
import { toast } from "react-toastify";

import { FormControlLabel } from "@mui/material";

const API_URL_RECIPE = "http://localhost:8000/api/v1/recipes/";

const makeStringLowercase = (string) => {
  // if string is empty, return empty string
  if (string.length === 0) {
    return "";
  }
  // remove all special characters from string
  const noSpecialChars = string.replace(/[^a-zA-Z0-9 ]/g, "");

  return noSpecialChars.charAt(0).toLowerCase() + noSpecialChars.slice(1);
};

const makeStringsInListLowercase = (list) => {
  // if list is empty, return empty list
  if (list.length === 0) {
    return [];
  }
  return list.map((item) => makeStringLowercase(item));
};

const GenerateInputComponent = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const editingRecipe =
    localStorage.getItem("editingRecipe") !== null
      ? JSON.parse(localStorage.getItem("editingRecipe"))
      : false;

  const editingRecipeData = editingRecipe
    ? JSON.parse(localStorage.getItem("recipeData"))
    : null;

  const [isLoading, setIsLoading] = useState(false);
  const [onlyUseIngredients, setOnlyUseIngredients] = useState(false);
  const classes = useFilterStyles();

  const [newIngredient, setNewIngredient] = useState("");

  const [includeIngredients, setIncludeIngredients] = useState(
    editingRecipe ? editingRecipeData.ingredients.map((obj) => obj.name) : []
  );
  const [excludeIngredients, setExcludeIngredients] = useState([]);

  const [mealType, setMealType] = useState(
    editingRecipe
      ? makeStringLowercase(editingRecipeData.instruction.mealType)
      : ""
  );
  const [servingSize, setServingSize] = useState(
    editingRecipe ? editingRecipeData.instruction.servingSize : ""
  );
  const [dietaryRestrictions, setDietaryRestrictions] = useState(
    editingRecipe && editingRecipeData.instruction.diet.length > 0
      ? makeStringsInListLowercase(editingRecipeData.instruction.diet)
      : []
  );
  const [cookingUtensils, setCookingUtensils] = useState(
    editingRecipe ? editingRecipeData.instruction.cookingUtensils : []
  );
  const [allergies, setAllergies] = useState([]); // TODO: add allergies to recipe data
  const [cookingTime, setCookingTime] = useState(
    editingRecipe
      ? makeStringLowercase(editingRecipeData.instruction.cookingTime)
      : ""
  );
  const [additionalNotes, setAdditionalNotes] = useState(""); // TODO: add additional notes to recipe data
  const exampleNotes =
    "e.g., 'african style', 'stew', 'spicy', 'use spices'...";

  const addIngredientToList = (list, listName) => {
    // list and listName: either "includeIngredients" or "excludeIngredients"
    if (newIngredient !== "" && !list.includes(newIngredient)) {
      list.push(newIngredient);
      if (listName === "includeIngredients") {
        setIncludeIngredients(list);
      } else if (listName === "excludeIngredients") {
        setExcludeIngredients(list);
      }
    }
    setNewIngredient(""); // Make input field look empty
  };

  const removeIngredientFromList = (ingredient, list, listName) => {
    // list and listName: either "includeIngredients" or "excludeIngredients"
    if (listName === "includeIngredients") {
      setIncludeIngredients((prevIngredients) =>
        prevIngredients.filter((item) => item !== ingredient)
      );
    } else if (listName === "excludeIngredients") {
      setExcludeIngredients((prevIngredients) =>
        prevIngredients.filter((item) => item !== ingredient)
      );
    }
  };

  const handleMealTypeChange = (event) => {
    const selectedValue = event.target.value;
    setMealType(() => selectedValue);
  };

  const handleDietaryRestrictionsChange = (event) => {
    const {
      target: { value },
    } = event;
    setDietaryRestrictions(
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleCookingUtensilsChange = (event) => {
    const {
      target: { value },
    } = event;
    setCookingUtensils(typeof value === "string" ? value.split(",") : value);
  };

  const handleAllergiesChange = (event) => {
    const {
      target: { value },
    } = event;
    setAllergies(typeof value === "string" ? value.split(",") : value);
  };

  const handleOnlyUseIngredientsChange = (event) => {
    setOnlyUseIngredients(event.target.checked);
  };

  const handleServingSizeChange = (event) => {
    const selectedValue = event.target.value;
    setServingSize(() => selectedValue);
  };

  const handleCookingTimeChange = (event) => {
    const selectedValue = event.target.value;
    setCookingTime(() => selectedValue);
  };

  const handleUpdatEditedRecipe = (recipeId, editedRecipeData, token) => {
    /*
    const response = axios.post(API_URL_RECIPE+'create', editedRecipeData.recipe, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
    
      .patch(API_URL_RECIPE + recipeId, editedRecipeData.recipe, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    
      .then(function (response) {
      */
    console.log(editedRecipeData);
    console.log("Recipe updated successfully!!");
    localStorage.setItem("editingRecipe", JSON.stringify(false));
    localStorage.setItem("recipe", JSON.stringify(editedRecipeData.recipe));
    localStorage.removeItem("recipeData");
    setIsLoading(false);
    window.location.href = "/recipes/" + editedRecipeData.recipe._id;
    /*
      })
      .catch(function (error) {
        setIsLoading(false);
        console.log("error while updating the recipe", error);
      });
      */
  };

  const { control, handleSubmit } = useForm();

  const formSubmitHandler = (formData) => {
    setIsLoading(true);
    const generationParams = {
      user: user,
      ingredients: makeStringsInListLowercase(includeIngredients),
      servingSize: makeStringLowercase(servingSize),
      ingredientsExcl: makeStringsInListLowercase(excludeIngredients),
      utensils: makeStringsInListLowercase(cookingUtensils),
      cookingTime: makeStringLowercase(cookingTime),
      diet: makeStringsInListLowercase(dietaryRestrictions),
      mealType: makeStringLowercase(mealType),
      allergies: makeStringsInListLowercase(allergies),
      additionalNotes: makeStringLowercase(additionalNotes),
      title: editingRecipe ? editingRecipeData.title : null,
      onlyUseIngredients: onlyUseIngredients
        ? "Only use the ingredients listed in the 'ingredients to include', and no other ingredient"
        : "If necessary for the recipe, feel free to add other ingredients as well, then add them to the JSON under ingredients as well.",
    };
    console.log(generationParams);

    const token = localStorage.getItem("jwt");

    // generate recipe and get its data back
    const response = axios
      .post(API_URL_RECIPE + "generate", generationParams, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        // if the generation process worked, set the recipe data in the local storage
        console.log(response);
        localStorage.setItem("recipe", JSON.stringify(response.data.recipe));
        localStorage.setItem(
          "instruction",
          JSON.stringify(response.data.instruction)
        );
        setIsLoading(false);

        // if the recipe needs to be edited, redirect to the edit page
        if (editingRecipe) {
          const recipeId = editingRecipeData._id;
          handleUpdatEditedRecipe(recipeId, response.data, token);
        } else {
          // redirect to the recipe page that has just been created
          window.location.href = "/recipes/" + response.data.recipe._id;
        }
      })
      .catch(function (error) {
        console.log("logging the error");
        console.log(error);
        setIsLoading(false);
        toast.error(
          "Oops, something went wrong while generating your recipe, please try it again :) (The error is usually caused by ChatGPT's API response)",
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          }
        );
      });
    return response;
  };

  return (
    <div className={classes.container}>
      <div style={{ flex: "1 0 100%", marginBottom: "20px" }}>
        {editingRecipe ? (
          <div>
            <h4>Editing Recipe:</h4> <h2>{editingRecipeData.title}</h2>
            <br></br>
          </div>
        ) : null}
        <h2>Required Fields</h2>
      </div>
      {isLoading ? <Spinner /> : null}
      <div>
        {/* INGREDIENT INPUT FIELD */}
        <TextField
          label="Type ingredient..."
          value={newIngredient}
          onChange={(e) => setNewIngredient(e.target.value)}
          onKeyDown={(ev) => {
            if (ev.key === "Enter") {
              addIngredientToList(includeIngredients, "includeIngredients");
            }
          }}
        />

        {/* EXCLUDE/INCLUDE BUTTONS */}
        <Button
          className={classes.filterButton}
          variant="contained"
          onClick={() =>
            addIngredientToList(includeIngredients, "includeIngredients")
          }
        >
          Include
        </Button>
        <Button
          className={classes.filterButton}
          variant="contained"
          onClick={() =>
            addIngredientToList(excludeIngredients, "excludeIngredients")
          }
        >
          Exclude
        </Button>

        {/* CHIPS WITH INGREDIENT LISTS */}
        <div style={{ margin: "20px 0" }}>
          {includeIngredients.map((ingredient) => (
            <Chip
              key={ingredient}
              label={ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}
              className={classes.includedIngredient}
              onDelete={() =>
                removeIngredientFromList(
                  ingredient,
                  includeIngredients,
                  "includeIngredients"
                )
              }
            />
          ))}
          {excludeIngredients.map((ingredient) => (
            <Chip
              key={ingredient}
              label={ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}
              className={classes.excludedIngredient}
              onDelete={() =>
                removeIngredientFromList(
                  ingredient,
                  excludeIngredients,
                  "excludeIngredients"
                )
              }
            />
          ))}
        </div>

        {/* Only use these ingredients checkbox */}
        {includeIngredients.length > 0 && (
          <FormControlLabel
            control={
              <Checkbox
                checked={onlyUseIngredients}
                onChange={handleOnlyUseIngredientsChange}
                name="onlyUseIngredients"
              />
            }
            label="Only use these ingredients"
          />
        )}

        {/* SELECT FIELDS */}
        <div className={classes.filterContainer}>
          <form onSubmit={handleSubmit(formSubmitHandler)}>
            {/* Meal type */}
            <Controller
              name="meal-type"
              control={control}
              type="text"
              defaultValue={mealType}
              render={({ field }) => (
                <FormControl className={classes.filterSelect}>
                  <InputLabel id="meal-type">Meal Type</InputLabel>
                  <Select
                    {...field}
                    labelId="meal-type"
                    label="meal-type"
                    value={mealType}
                    onChange={(field) => {
                      handleMealTypeChange(field);
                    }}
                  >
                    {Enums.MealTypes.map((mealTypeVal) => (
                      <MenuItem value={mealTypeVal} key={mealTypeVal}>
                        {mealTypeVal.charAt(0).toUpperCase() +
                          mealTypeVal.slice(1)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />

            {/* Serving size */}
            <Controller
              name="serving-size"
              control={control}
              type="text"
              defaultValue={[]}
              render={({ field }) => (
                <FormControl className={classes.filterSelect}>
                  <InputLabel id="serving-size">Serving Size</InputLabel>
                  <Select
                    {...field}
                    labelId="serving-size"
                    label="serving-size"
                    value={servingSize}
                    onChange={(field) => {
                      handleServingSizeChange(field);
                    }}
                  >
                    {Enums.ServingSizes.map((servSizeVal) => (
                      <MenuItem value={servSizeVal} key={servSizeVal}>
                        {servSizeVal.charAt(0).toUpperCase() +
                          servSizeVal.slice(1)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
            <div
              style={{
                flex: "1 0 100%",
                marginTop: "60px",
                marginBottom: "20px",
              }}
            >
              <h2>Optional Fields</h2>
              <p>
                Do not modify if you wish to use your profile's default values
                for the following fields.
              </p>
            </div>

            {/* Dietary restrictions */}
            <Controller
              name="dietary-restrictions"
              control={control}
              type="text"
              defaultValue={[]}
              render={({ field }) => (
                <FormControl className={classes.filterSelect}>
                  <InputLabel id="dietary-restrictions">
                    Dietary Restrictions
                  </InputLabel>
                  <Select
                    multiple
                    value={dietaryRestrictions}
                    onChange={handleDietaryRestrictionsChange}
                    renderValue={(selected) =>
                      selected
                        .map((e) => e.charAt(0).toUpperCase() + e.slice(1))
                        .join(", ")
                    }
                  >
                    {Enums.DietaryRestrictions.map((dietVal) => (
                      <MenuItem key={dietVal} value={dietVal}>
                        <Checkbox
                          checked={dietaryRestrictions.indexOf(dietVal) > -1}
                        />
                        <ListItemText
                          primary={
                            dietVal.charAt(0).toUpperCase() + dietVal.slice(1)
                          }
                        />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />

            {/* Cooking utensils */}
            <Controller
              name="cooking-utensils"
              control={control}
              type="text"
              defaultValue={[]}
              render={({ field }) => (
                <FormControl className={classes.filterSelect}>
                  <InputLabel id="cooking-utensils">
                    Cooking Utensils
                  </InputLabel>
                  <Select
                    multiple
                    value={cookingUtensils}
                    onChange={handleCookingUtensilsChange}
                    renderValue={(selected) =>
                      selected
                        .map((e) => e.charAt(0).toUpperCase() + e.slice(1))
                        .join(", ")
                    }
                  >
                    {Enums.CookingUtensils.map((utensil) => (
                      <MenuItem key={utensil} value={utensil}>
                        <Checkbox
                          checked={cookingUtensils.indexOf(utensil) > -1}
                        />
                        <ListItemText
                          primary={
                            utensil.charAt(0).toUpperCase() + utensil.slice(1)
                          }
                        />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />

            {/* Allergies */}
            <Controller
              name="allergies"
              control={control}
              type="text"
              defaultValue={[]}
              render={({ field }) => (
                <FormControl className={classes.filterSelect}>
                  <InputLabel id="allergies">Allergies</InputLabel>
                  <Select
                    multiple
                    value={allergies}
                    onChange={handleAllergiesChange}
                    renderValue={(selected) =>
                      selected
                        .map((e) => e.charAt(0).toUpperCase() + e.slice(1))
                        .join(", ")
                    }
                  >
                    {Enums.Allergies.map((allergy) => (
                      <MenuItem key={allergy} value={allergy}>
                        <Checkbox checked={allergies.indexOf(allergy) > -1} />
                        <ListItemText
                          primary={
                            allergy.charAt(0).toUpperCase() + allergy.slice(1)
                          }
                        />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />

            {/* Cooking time */}
            <Controller
              name="cooking-time"
              control={control}
              type="text"
              defaultValue={[]}
              render={({ field }) => (
                <FormControl className={classes.filterSelect}>
                  <InputLabel id="cooking-time">Cooking Time</InputLabel>
                  <Select
                    {...field}
                    labelId="cooking-time"
                    label="cooking-time"
                    value={cookingTime}
                    onChange={(field) => {
                      handleCookingTimeChange(field);
                    }}
                  >
                    {Enums.CookingTimes.map((cookTime) => (
                      <MenuItem value={cookTime} key={cookTime}>
                        {cookTime.charAt(0).toUpperCase() + cookTime.slice(1)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />

            {/* Additional Notes */}
            <div className={classes.additionalNotes}>
              <InputLabel id="additional-notes">Additional Notes</InputLabel>
              <div className={classes.notesContent}>
                <TextareaAutosize
                  id="additional-notes"
                  placeholder="Enter any additional notes..."
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  className={classes.textarea}
                />
                <div className={classes.exampleNotes}>{exampleNotes}</div>
              </div>
            </div>

            <div style={{ marginBottom: "75px" }}></div>
            {/* SUBMIT BUTTON */}
            <FormControl>
              <Button
                disabled={
                  isLoading ||
                  includeIngredients.length === 0 ||
                  mealType === "" ||
                  servingSize === ""
                }
                type="submit"
                variant="contained"
                style={{
                  width: "300px",
                  padding: "10px 30px",
                  fontWeight: "bold",
                }}
              >
                {editingRecipe ? "GENERATE EDITED" : "GENERATE"} RECIPE
              </Button>
            </FormControl>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GenerateInputComponent;

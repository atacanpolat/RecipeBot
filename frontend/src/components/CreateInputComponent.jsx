import axios from "axios";

import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
} from "@material-ui/core";
import ListItemText from "@mui/material/ListItemText";
import Spinner from "../components/Spinner";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import { Controller, useForm } from "react-hook-form";
import uploadService from "../features/uploadService";

import { useState } from "react";
import {
  useCreateRecipeStyles,
  useFilterStyles,
} from "./helpers/styles/recipesStyles";
import Enums from "./enums/enums";

const API_URL = "http://localhost:8000/api/v1/recipes/";

const CreateInputComponent = () => {
  const token = localStorage.getItem("jwt");

  const [isLoading, setIsLoading] = useState(false);
  const classes = useCreateRecipeStyles();
  const { control, handleSubmit } = useForm();

  const [recipeTitle, setRecipeTitle] = useState(null);
  const [recipeImage, setRecipeImage] = useState(null);
  const [recipeCookingTime, setRecipeCookingTime] = useState(null);
  const [recipeMealType, setRecipeMealType] = useState(null);
  const [recipeServingSize, setRecipeServingSize] = useState(null);
  const [recipeDiet, setRecipeDiet] = useState([]);
  const [recipeCookingMethod, setRecipeCookingMethod] = useState(null);

  const [recipeIngredients, setRecipeIngredients] = useState([
    { name: "", quantity: "", brand: "" },
  ]);

  const allRecipeParams = {
    title: recipeTitle,
    image: recipeImage,
    ingredients: recipeIngredients,
    cookingTime: recipeCookingTime,
    mealType: recipeMealType,
    servingSize: recipeServingSize,
    allRecipeParams: recipeIngredients,
    cookingMethod: recipeCookingMethod,
    diet: recipeDiet,
  };

  const handleCreateRecipe = () => {
    const recipeParams = {
      title: allRecipeParams.title,
      ingredients: allRecipeParams.ingredients,
      instruction: {
        narrative: allRecipeParams.cookingMethod,
        cookingTime: allRecipeParams.cookingTime,
        servingSize: allRecipeParams.servingSize,
        mealType: allRecipeParams.mealType,
        diet: allRecipeParams.diet,
      },
      photo: allRecipeParams.image,
      isGenerated: false,
      tags: [
        allRecipeParams.mealType,
        allRecipeParams.cookingTime,
        allRecipeParams.diet[0],
      ],
    };

    console.log(recipeParams)

    axios
      .post(API_URL + "create", recipeParams, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("RECIPE ADDED TO THE DATABASE");
        console.log(response);
        // redirect to new recipe page (since ID has changed)
        window.location.href = "/recipes/" + response.data._id;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function areAllValuesSet(obj) {
    for (const key in obj) {
      if (obj[key] === null || obj[key] === undefined || obj[key] === "") {
        return false;
      }
    }
    return true;
  }

  const handleRecipeImageSelect = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", () => {
      setRecipeImage(reader.result);
    });
  };

  const handleIngredientChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...recipeIngredients];
    list[index][name] = value;
    setRecipeIngredients(list);
  };

  const handleIngredientRemove = (index) => {
    const list = [...recipeIngredients];
    list.splice(index, 1);
    setRecipeIngredients(list);
  };

  const handleIngredientAdd = () => {
    console.log(recipeIngredients);
    setRecipeIngredients([
      ...recipeIngredients,
      { name: "", quantity: "", brand: "" },
    ]);
  };

  const handleDietaryRestrictionsChange = (event) => {
    const {
      target: { value },
    } = event;
    setRecipeDiet(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div className={classes.createRecipeContainer}>
      <div style={{ flex: "1 0 100%", marginBottom: "20px" }}>
        <h2>Basic Required Fields</h2>
      </div>
      {isLoading ? <Spinner /> : null}
      <div style={{ flex: "1 0 100%" }}>
        {/* Recipe title */}
        <TextField
          required
          style={{ width: "50%" }}
          id="recipe-title"
          label="Recipe title"
          variant="standard"
          onChange={(e) => setRecipeTitle(e.target.value.trim())}
        />

        {/* BREAK */}
        <div
          className="break"
          style={{ flex: "1 0 100%", marginBottom: "40px" }}
        ></div>

        {/* Recipe image upload */}
        {recipeImage ? (
          <img
            src={recipeImage}
            width={"250px"}
            style={{ display: "block", margin: "auto", marginBottom: "30px" }}
          />
        ) : (
          ""
        )}

        <Button variant="contained" component="label">
          Upload Recipe image
          <input
            accept="image/*"
            id="upload-button"
            type="file"
            hidden
            onChange={(e) => {
              handleRecipeImageSelect(e);
            }}
          />
        </Button>

        {/* BREAK */}
        <div
          className="break"
          style={{ flex: "1 0 100%", marginBottom: "40px" }}
        ></div>

        {/* Cooking time */}
        <Controller
          name="cooking-time"
          control={control}
          type="text"
          defaultValue={[]}
          render={({ field }) => (
            <FormControl className={classes.filterSelect}>
              <InputLabel required id="cooking-time">
                Cooking Time
              </InputLabel>
              <Select
                {...field}
                labelId="cooking-time"
                label="cooking-time"
                value={recipeCookingTime}
                onChange={(e) => {
                  setRecipeCookingTime(e.target.value.trim());
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

        {/* Meal type */}
        <Controller
          name="meal-type"
          control={control}
          type="text"
          defaultValue={recipeMealType}
          render={({ field }) => (
            <FormControl className={classes.filterSelect}>
              <InputLabel required id="meal-type">
                Meal Type
              </InputLabel>
              <Select
                {...field}
                labelId="meal-type"
                label="meal-type"
                value={recipeMealType}
                onChange={(e) => {
                  setRecipeMealType(e.target.value.trim());
                }}
              >
                {Enums.MealTypes.map((mealTypeVal) => (
                  <MenuItem value={mealTypeVal} key={mealTypeVal}>
                    {mealTypeVal.charAt(0).toUpperCase() + mealTypeVal.slice(1)}
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
              <InputLabel required id="serving-size">
                Serving Size
              </InputLabel>
              <Select
                {...field}
                labelId="serving-size"
                label="serving-size"
                value={recipeServingSize}
                onChange={(e) => {
                  setRecipeServingSize(e.target.value.trim());
                }}
              >
                {Enums.ServingSizes.map((servSizeVal) => (
                  <MenuItem value={servSizeVal} key={servSizeVal}>
                    {servSizeVal.charAt(0).toUpperCase() + servSizeVal.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />

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
                value={recipeDiet}
                onChange={handleDietaryRestrictionsChange}
                renderValue={(selected) =>
                  selected
                    .map((e) => e.charAt(0).toUpperCase() + e.slice(1))
                    .join(", ")
                }
              >
                {Enums.DietaryRestrictions.map((dietVal) => (
                  <MenuItem key={dietVal} value={dietVal}>
                    <Checkbox checked={recipeDiet.indexOf(dietVal) > -1} />
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

        {/* BREAK */}
        <div
          className="break"
          style={{ flex: "1 0 100%", marginBottom: "40px" }}
        ></div>

        {/* Ingredients */}
        <form autoComplete="off">
          <div style={{ marginTop: "20px" }}>
            <h3>Ingredients</h3>
            {recipeIngredients.map((singleIngredient, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <div style={{ marginBottom: "20px" }}>
                  <TextField
                    name="name"
                    required
                    InputLabelProps={{ shrink: true }}
                    label="Ingredient"
                    onChange={(e) => handleIngredientChange(e, index)}
                  ></TextField>
                  <TextField
                    style={{ marginLeft: "10px" }}
                    name="quantity"
                    InputLabelProps={{ shrink: true }}
                    label="Quantity"
                    onChange={(e) => handleIngredientChange(e, index)}
                  ></TextField>
                  {recipeIngredients.length - 1 === index && (
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={handleIngredientAdd}
                    >
                      Add an ingredient
                    </Button>
                  )}
                </div>
                {recipeIngredients.length - 1 !== index &&
                  recipeIngredients.length !== 1 && (
                    <IconButton
                      size="small"
                      style={{ marginLeft: "10px" }}
                      onClick={() => handleIngredientRemove(index)}
                    >
                      <DeleteIcon style={{ fontSize: "20px" }} />
                    </IconButton>
                  )}
              </div>
            ))}
          </div>
        </form>

        {/* Optional Fields */}
        <div
          style={{ flex: "1 0 100%", marginBottom: "20px", marginTop: "20px" }}
        >
          <h2>Cooking Method</h2>
        </div>

        {/* Cooking method */}
        <TextField
          required
          style={{ width: "60%" }}
          id="outlined-multiline-flexible"
          label="Write here the recipe cooking method"
          multiline
          variant="outlined"
          minRows={10}
          onChange={(e) => setRecipeCookingMethod(e.target.value)}
        />

        {/* CREATE BUTTON */}
        <Button
          fullWidth
          variant="contained"
          disabled={!areAllValuesSet(allRecipeParams)}
          style={{
            padding: "10px 30px",
            fontWeight: "bold",
            marginTop: "40px",
          }}
          onClick={() => handleCreateRecipe()}
        >
          CREATE RECIPE
        </Button>
      </div>
    </div>
  );
};

export default CreateInputComponent;

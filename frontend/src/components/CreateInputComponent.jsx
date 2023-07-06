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
import ListItemText from "@mui/material/ListItemText";
import Spinner from "../components/Spinner";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import Checkbox from "@mui/material/Checkbox";
import { Controller, useForm } from "react-hook-form";

import { useState } from "react";
import { useFilterStyles } from "./helpers/styles/recipesStyles";
import Enums from "./enums/enums";

const API_URL_RECIPE = "http://localhost:8000/api/v1/recipes/";

const CreateInputComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const classes = useFilterStyles();
  const { control, handleSubmit } = useForm();

  // TODO: delete this function, only for debubbing
  const printAllRecipeParams = () => {
    const allRecipeParams = {
      title: recipeTitle,
      image: recipeImage,
      cookingTime: recipeCookingTime,
      mealType: recipeMealType,
      servingSize: recipeServingSize,
    };

    console.log(allRecipeParams);
  };

  const [recipeTitle, setRecipeTitle] = useState("");
  const [recipeImage, setRecipeImage] = useState("");
  const [recipeCookingTime, setRecipeCookingTime] = useState("");
  const [recipeMealType, setRecipeMealType] = useState("");
  const [recipeServingSize, setRecipeServingSize] = useState("");
  const [recipeIngredients, setRecipeIngredients] = useState([
    { ingedient: "", quantity: "" },
  ]);

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
    setRecipeIngredients([...recipeIngredients, { ingrdient: "" }]);
  };

  return (
    <div className={classes.createRecipeContainer}>
      <div style={{ flex: "1 0 100%", marginBottom: "20px" }}>
        <h2>Basic Required Fields</h2>
      </div>
      {isLoading ? <Spinner /> : null}

      {/* Recipe title */}
      <TextField
        style={{ width: "50%" }}
        id="recipe-title"
        label="Recipe title"
        variant="standard"
        onChange={(e) => setRecipeTitle(e.target.value.trim())}
      />

      {/* Recipe image upload */}
      <Button
        variant="contained"
        component="label"
        endIcon={<CloudUploadIcon />}
        onClick={(e) => setRecipeImage(e.target.value)}
      >
        Upload recipe image
        <input type="file" hidden />
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
            <InputLabel id="cooking-time">Cooking Time</InputLabel>
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
            <InputLabel id="meal-type">Meal Type</InputLabel>
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
            <InputLabel id="serving-size">Serving Size</InputLabel>
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

      {/* DEBUG BUTTON */}
      <Button
        fullWidth
        variant="contained"
        style={{ marginTop: "40px" }}
        onClick={() => printAllRecipeParams()}
      >
        Print params
      </Button>
    </div>
  );
};

export default CreateInputComponent;

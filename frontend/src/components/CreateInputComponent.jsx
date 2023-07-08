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

import { useState } from "react";
import {
  useCreateRecipeStyles,
  useFilterStyles,
} from "./helpers/styles/recipesStyles";
import Enums from "./enums/enums";
import { UploadButton, FileSelectButton } from "./UploadButton";

const API_URL_RECIPE = "http://localhost:8000/api/v1/recipes/";

const CreateInputComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const classes = useCreateRecipeStyles();
  const { control, handleSubmit } = useForm();

  // TODO: delete this function, only for debubbing
  const printAllRecipeParams = () => {
    const allRecipeParams = {
      title: recipeTitle,
      image: recipeImage,
      cookingTime: recipeCookingTime,
      mealType: recipeMealType,
      servingSize: recipeServingSize,
      recipeIngredients: recipeIngredients,
      cookingMethod: recipeCookingMethod,
    };

    console.log(allRecipeParams);
  };

  const [recipeTitle, setRecipeTitle] = useState(null);
  const [recipeImage, setRecipeImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [recipeCookingTime, setRecipeCookingTime] = useState(null);
  const [recipeMealType, setRecipeMealType] = useState(null);
  const [recipeServingSize, setRecipeServingSize] = useState(null);
  const [recipeCookingMethod, setRecipeCookingMethod] = useState(null);

  const [recipeIngredients, setRecipeIngredients] = useState([
    { ingredient: "", quantity: "" },
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
    console.log(recipeIngredients);
    setRecipeIngredients([
      ...recipeIngredients,
      { ingredient: "", quantity: "" },
    ]);
  };

  const handleRecipeImageUpload = async () => {
    // TODO: handle proper upload of recipe image
    setRecipeImage("https://i.stack.imgur.com/iJV3F.jpg");
  };

  return (
    <div className={classes.createRecipeContainer}>
      <div style={{ flex: "1 0 100%", marginBottom: "20px" }}>
        <h2>Basic Required Fields</h2>
      </div>
      {isLoading ? <Spinner /> : null}

      {/* Recipe title */}
      <TextField
        required
        style={{ width: "50%" }}
        id="recipe-title"
        label="Recipe title"
        variant="standard"
        onChange={(e) => setRecipeTitle(e.target.value.trim())}
      />

      {/* Recipe image upload */}
      {recipeImage ? <img src={recipeImage} width={"200px"} /> : "Save Changes"}

      <Button
        variant="contained"
        component="label"
        onChange={handleRecipeImageUpload}
      >
        Upload Recipe image
        <input type="file" accept=".gif,.jpg,.jpeg,.png,.svg,.ico" hidden />
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

      {/* BREAK */}
      <div
        className="break"
        style={{ flex: "1 0 100%", marginBottom: "40px" }}
      ></div>

      {/* Ingredients */}
      <form autoComplete="off">
        <div>
          <h3 style={{ textAlign: "left" }}>Ingredients</h3>
          {recipeIngredients.map((singleIngredient, index) => (
            <div key={index} style={{ display: "flex", width: "100%" }}>
              <div style={{ marginBottom: "20px" }}>
                <TextField
                  name="ingredient"
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
      <div style={{ flex: "1 0 100%", marginBottom: "20px" }}>
        <h2>Optional Fields</h2>
      </div>

      {/* Cooking method */}
      <TextField
        style={{ width: "50%" }}
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
        style={{
          padding: "10px 30px",
          fontWeight: "bold",
          marginTop: "40px",
        }}
        onClick={() => printAllRecipeParams()}
      >
        CREATE RECIPE
      </Button>
    </div>
  );
};

export default CreateInputComponent;

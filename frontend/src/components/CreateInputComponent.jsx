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

  // TODO: delete this function, only for debubbing
  const printAllRecipeParams = () => {
    const allRecipeParams = {
      title: recipeTitle,
      image: recipeImage,
    };

    console.log(allRecipeParams);
  };

  const [recipeTitle, setRecipeTitle] = useState("");
  const [recipeImage, setRecipeImage] = useState("");

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

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

import Checkbox from "@mui/material/Checkbox";
import { Controller, useForm } from "react-hook-form";

import { useState } from "react";
import { useFilterStyles } from "./helpers/styles/recipesStyles";
import Enums from "./enums/enums";


const GenerateInputComponent = () => {
  const classes = useFilterStyles();

  const [newIngredient, setNewIngredient] = useState("");
  const [includeIngredients, setIncludeIngredients] = useState([]);
  const [excludeIngredients, setExcludeIngredients] = useState([]);
  const [mealTypes, setMealTypes] = useState([]);
  const [dietaryRestrictions, setDietaryRestrictions] = useState([]);
  const [servingSize, setServingSize] = useState("");

  const addIngredientToList = (list, listName) => {
    // list and listName: either "includeIngredients" or "excludeIngredients"
    if (newIngredient !== "" && !list.includes(newIngredient)) {
      list.push(newIngredient);
      if (listName === "includeIngredients") {
        setIncludeIngredients(list);
      } else if (listName === "excludeIngredients") {
        setExcludeIngredients(list);
      }
      console.log(newIngredient, "added:", list);
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
    console.log(ingredient, "removed:", list);
  };

  const handleMealTypesChange = (event) => {
    const {
      target: { value },
    } = event;
    setMealTypes(typeof value === "string" ? value.split(",") : value);
  };

  const handleDietaryRestrictionsChange = (event) => {
    const {
      target: { value },
    } = event;
    setDietaryRestrictions(
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleServingSizeChange = (event) => {
    const selectedValue = event.target.value;
    setServingSize(() => selectedValue);
  };

  const { control, handleSubmit } = useForm();

  const formSubmitHandler = (formData) => {
    // TODO: add also default values
    const generationParams = {
      includeIngredients,
      excludeIngredients,
      mealTypes,
      dietaryRestrictions,
      servingSize,
    };
    console.log(generationParams);
  };

  return (
    <div className={classes.container}>
      <div style={{ flex: "1 0 100%", marginBottom: "20px" }}>
        <h2>Required Fields</h2>
      </div>
      <div>
        {/* INGREDIENT INPUT FIELD */}
        <TextField
          label="Type ingredient..."
          value={newIngredient}
          onChange={(e) => setNewIngredient(e.target.value.trim())}
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

        {/* SELECT FIELDS */}
        <div className={classes.filterContainer}>
          <form onSubmit={handleSubmit(formSubmitHandler)}>
            {/* Meal type */}
            <Controller
              name="meal-type"
              control={control}
              type="text"
              defaultValue={[]}
              render={({ field }) => (
                <FormControl className={classes.filterSelect}>
                  <InputLabel id="meal-type">Meal Type</InputLabel>
                  <Select
                    multiple
                    value={mealTypes}
                    onChange={handleMealTypesChange}
                    renderValue={(selected) =>
                      selected
                        .map((e) => e.charAt(0).toUpperCase() + e.slice(1))
                        .join(", ")
                    }
                  >
                    {Enums.MealTypes.map((mealType) => (
                      <MenuItem key={mealType} value={mealType}>
                        <Checkbox checked={mealTypes.indexOf(mealType) > -1} />
                        <ListItemText
                          primary={
                            mealType.charAt(0).toUpperCase() + mealType.slice(1)
                          }
                        />
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
            <div style={{ marginBottom: "75px" }}></div>
            {/* SUBMIT BUTTON */}
            <FormControl>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                style={{
                  width: "300px",
                  padding: "10px 30px",
                  fontWeight: "bold",
                }}
              >
                GENERATE RECIPE
              </Button>
            </FormControl>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GenerateInputComponent;

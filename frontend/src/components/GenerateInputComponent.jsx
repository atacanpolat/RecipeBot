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
  const [mealType, setMealType] = useState("");
  const [servingSize, setServingSize] = useState("");
  const [dietaryRestrictions, setDietaryRestrictions] = useState([]);
  const [cookingUtensils, setCookingUtensils] = useState([]);
  const [allergies, setAllergies] = useState([]);

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
      mealType,
      servingSize,
      dietaryRestrictions,
      cookingUtensils,
      allergies,
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

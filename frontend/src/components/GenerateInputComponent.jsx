import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  FormGroup,
  MenuItem,
  Chip,
} from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";

import { useState } from "react";
import { useFilterStyles } from "./helpers/styles/recipesStyles";

const GenerateInputComponent = ({}) => {
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
      if (listName == "includeIngredients") {
        setIncludeIngredients(list);
      } else if (listName == "excludeIngredients") {
        setExcludeIngredients(list);
      }
      console.log(newIngredient, "added:", list);
    }
    setNewIngredient(""); // Make input field look empty
  };

  const removeIngredientFromList = (ingredient, list, listName) => {
    // list and listName: either "includeIngredients" or "excludeIngredients"
    if (listName == "includeIngredients") {
      setIncludeIngredients((prevIngredients) =>
        prevIngredients.filter((item) => item !== ingredient)
      );
    } else if (listName == "excludeIngredients") {
      setExcludeIngredients((prevIngredients) =>
        prevIngredients.filter((item) => item !== ingredient)
      );
    }
    console.log(ingredient, "removed:", list);
  };

  const handleMealTypesChange = (event) => {
    const selectedValues = event.target.value;
    setMealTypes(() => selectedValues);
    console.log("meal types:", selectedValues);
  };

  const handleDietaryRestrictionsChange = (event) => {
    const selectedValues = event.target.value;
    setDietaryRestrictions(() => selectedValues);
    console.log("dietary restrictions:", selectedValues);
  };

  const handleServingSizeChange = (event) => {
    const selectedValue = event.target.value;
    setDietaryRestrictions(() => selectedValue);
    console.log("serving size:", selectedValue);
  };

  const mealTypeVals = [
    "breakfast",
    "soup",
    "starter",
    "appetizer",
    "main",
    "salad",
    "dessert",
  ];

  const dietVals = [
    "gluten-free",
    "lactose-free",
    "Kosher",
    "seafood",
    "halal",
    "vegetarian",
    "vegan",
    "keto",
    "low-calorie",
  ];

  const servingSizeVals = [
    "1 person",
    "2 people",
    "3 people",
    "4 people",
    "6 people",
    "8+ people",
    "12+ people",
  ];

  const { control, handleSubmit } = useForm();

  const formSubmitHandler = (formData) => {
    // TODO: implement
    console.log("GENERATING RECIPE...");
    console.log(formData);
  };

  return (
    <div className={classes.container}>
      <div className="generate-input">
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
                    {...field}
                    labelId="meal-type"
                    label="meal-type"
                    multiple
                    onClick={(field) => {
                      handleMealTypesChange(field);
                    }}
                  >
                    {mealTypeVals.map((mealType) => (
                      <MenuItem value={mealType} key={mealType}>
                        {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
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
                    {...field}
                    labelId="dietary-restrictions"
                    label="dietary-restrictions"
                    multiple
                    onClick={(field) => {
                      handleDietaryRestrictionsChange(field);
                    }}
                  >
                    {dietVals.map((dietRest) => (
                      <MenuItem value={dietRest} key={dietRest}>
                        {dietRest.charAt(0).toUpperCase() + dietRest.slice(1)}
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
                    onClick={(field) => {
                      handleServingSizeChange(field);
                    }}
                  >
                    {servingSizeVals.map((servSizeVal) => (
                      <MenuItem value={servSizeVal} key={servSizeVal}>
                        {servSizeVal.charAt(0).toUpperCase() +
                          servSizeVal.slice(1)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
            <div style={{ marginTop: "20px" }}></div>
            <FormControl>
              <Button type="submit" variant="contained" fullWidth>
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

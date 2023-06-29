import { useState } from "react";
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

import theme from "./helpers/themes";
import { PrimaryButton } from "./helpers/themes";
import { useFilterStyles } from "./helpers/styles/recipesStyles";
import Enums from "./enums/enums";

const FilteringComponent = ({ onFilterSubmit }) => {
  const classes = useFilterStyles();

  const [keyword, setKeyword] = useState("");
  const [includeIngredients, setIncludeIngredients] = useState([]);
  const [excludeIngredients, setExcludeIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState("");
  const [mealType, setMealType] = useState("");
  const [dietaryRestriction, setDietaryRestriction] = useState("");
  const [servingSize, setServingSize] = useState("");
  const [cookingUtensils, setCookingUtensils] = useState([]);

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleIncludeIngredient = () => {
    if (newIngredient.trim() !== "") {
      setIncludeIngredients((prevIngredients) => [
        ...prevIngredients,
        newIngredient,
      ]);
      setNewIngredient("");
    }
  };

  const handleExcludeIngredient = () => {
    if (newIngredient.trim() !== "") {
      setExcludeIngredients((prevIngredients) => [
        ...prevIngredients,
        newIngredient,
      ]);
      setNewIngredient("");
    }
  };

  const handleRemoveIncludedIngredient = (ingredient) => {
    setIncludeIngredients((prevIngredients) =>
      prevIngredients.filter((item) => item !== ingredient)
    );
  };

  const handleRemoveExcludedIngredient = (ingredient) => {
    setExcludeIngredients((prevIngredients) =>
      prevIngredients.filter((item) => item !== ingredient)
    );
  };

  const handleMealTypeChange = (event) => {
    const selectedValue = event.target.value;
    setMealType((prevMealType) =>
      prevMealType == selectedValue ? "" : selectedValue
    );
  };

  const handleDietaryRestrictionChange = (event) => {
    const selectedValue = event.target.value;
    setDietaryRestriction((prevDietaryRestriction) =>
      prevDietaryRestriction == selectedValue ? "" : selectedValue
    );
  };

  const handleServingSizeChange = (event) => {
    const selectedValue = event.target.value;

    if (servingSize === selectedValue) {
      setServingSize("");
    } else {
      setServingSize(selectedValue);
    }
  };

  const handleCookingUtensilsChange = (event) => {
    const selectedValues = event.target.value; // Array of selected options

    if (
      selectedValues.length > 1 &&
      selectedValues[selectedValues.length - 1] ===
        selectedValues[selectedValues.length - 2]
    ) {
      selectedValues.pop();
    }

    setCookingUtensils(selectedValues);
  };

  const handleFilterSubmit = (event) => {
    event.preventDefault();
    // Call the onFilterSubmit function with the filter values
    const filters = {
      keyword,
      includeIngredients,
      excludeIngredients,
      mealType,
      dietaryRestriction,
      servingSize,
      cookingUtensils,
    };
    console.log(excludeIngredients)
    console.log(includeIngredients)
    onFilterSubmit(filters);
  };

  return (
    
    <div className={classes.container}>
      
      <div>
        <TextField
          label="Type Ingredient"
          value={newIngredient}
          onChange={(e) => setNewIngredient(e.target.value)}
        />
        <Button
          className={classes.filterButton}
          variant="contained"
          onClick={handleIncludeIngredient}
        >
          Include
        </Button>
        <Button
          className={classes.filterButton}
          variant="contained"
          onClick={handleExcludeIngredient}
        >
          Exclude
        </Button>
        <div style={{ margin: "20px 0" }}>
          {includeIngredients.map((ingredient) => (
            <Chip
              key={ingredient}
              label={ingredient}
              className={classes.includedIngredient}
              onDelete={() => handleRemoveIncludedIngredient(ingredient)}
            />
          ))}
          {excludeIngredients.map((ingredient) => (
            <Chip
              key={ingredient}
              label={ingredient}
              className={classes.excludedIngredient}
              onDelete={() => handleRemoveExcludedIngredient(ingredient)}
            />
          ))}
        </div>
      </div>

      <div className={classes.filterContainer}>
        <FormControl className={classes.filterSelect}>
          <InputLabel>Meal Type</InputLabel>
          <Select value={mealType} onChange={handleMealTypeChange}>
            {Enums.MealTypes.map((type) => (
              <MenuItem
                key={type}
                value={type.charAt(0).toUpperCase() + type.slice(1)}
                onClick={() => {
                  setMealType("");
                }}
                selected={mealType === type}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.filterSelect}>
          <InputLabel>Dietary Restrictions</InputLabel>
          <Select
            value={dietaryRestriction}
            onChange={handleDietaryRestrictionChange}
          >
            {Enums.DietaryRestrictions.map((type) => (
              <MenuItem
                key={type}
                value={type.charAt(0).toUpperCase() + type.slice(1)}
                onClick={() => {
                  setDietaryRestriction("");
                }}
                selected={dietaryRestriction === type}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.filterSelect}>
          <InputLabel>Serving Size</InputLabel>
          <Select value={servingSize} onChange={handleServingSizeChange}>
            {Enums.ServingSizes.map((type) => (
              <MenuItem
                key={type}
                value={type}
                onClick={() => {
                  setServingSize("");
                }}
                selected={servingSize === type}
              >
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          component="fieldset"
          className={classes.filterCheckboxGroup}
        >
          <FormGroup>{/* Render cooking utensils checkboxes */}</FormGroup>
        </FormControl>
      </div>
      <div className={classes.filterContainer}>
        <PrimaryButton
          variant="contained"
          onClick={handleFilterSubmit}
          style={{ backgroundColor: theme.palette.violet.main }}
        >
          Apply Filters
        </PrimaryButton>
      </div>
    </div>
  );
};

export default FilteringComponent;

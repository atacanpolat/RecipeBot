import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
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
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import theme from "./helpers/themes";
import { PrimaryButton } from "./helpers/themes";


const useStyles = makeStyles(() => ({
    container: {
        display: "flex",
        justifyContent: "center", // Center the filters horizontally
        alignItems: "flex-start", // Align the filters at the top vertically
      },
    filterContainer: {
      alignItems: "center",
      marginBottom: theme.spacing(2),
    },
    filterInput: {
      marginRight: theme.spacing(2),
    },
    filterButton: {
      marginRight: theme.spacing(2),
      backgroundColor: theme.palette.violet.light,
      color: theme.palette.grey[100]
    },
    filterSelect: {
      marginRight: theme.spacing(2),
      minWidth: 150,
    },
    filterCheckboxGroup: {
      display: "flex",
      flexDirection: "column",
    },

    includedIngredient: {
        marginRight: theme.spacing(1),
        backgroundColor: "#00e676", // Green color for included ingredients
        color: "#ffffff",
      },
      excludedIngredient: {
        marginRight: theme.spacing(1),
        backgroundColor: "#ff1744", // Red color for excluded ingredients
        color: "#ffffff",
      },
  }));

const FilteringComponent = ({ onFilterSubmit }) => {
  const classes = useStyles();
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
      setIncludeIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
      setNewIngredient("");
    }
  };

  const handleExcludeIngredient = () => {
    if (newIngredient.trim() !== "") {
      setExcludeIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
      setNewIngredient("");
    }
  };

  const handleRemoveIncludedIngredient = (ingredient) => {
    setIncludeIngredients((prevIngredients) => prevIngredients.filter((item) => item !== ingredient));
  };

  const handleRemoveExcludedIngredient = (ingredient) => {
    setExcludeIngredients((prevIngredients) => prevIngredients.filter((item) => item !== ingredient));
  };


const handleMealTypeChange = (event) => {
  const selectedValue = event.target.value; 
  setMealType((prevMealType) => prevMealType == selectedValue ? "" : selectedValue);
};



  const handleDietaryRestrictionChange = (event) => {
    const selectedValue = event.target.value; 
    setDietaryRestriction((prevDietaryRestriction) => prevDietaryRestriction == selectedValue ? "" : selectedValue);
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
        selectedValues[selectedValues.length - 1] === selectedValues[selectedValues.length - 2]
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
    onFilterSubmit(filters);
  };


  const mealTypeVals = ['breakfast','soup', 'starter', 'appetizer', 'main', 'salad', 'dessert']
  const dietVals = ['gluten-free', 'lactose-free', 'Kosher', 'seafood', 'halal', 'vegetarian', 'vegan', 'keto', 'low-calorie']
  const servingSizeVals = ['1 person', '2 people', '3 people', '4 people', '6 people', '8+ people', '12+ people']

  return (
    <div className={classes.container}>
     <div className={classes.filterContainer}>
     <TextField
        label="Type Ingredient"
        value={newIngredient}
        onChange={(e) => setNewIngredient(e.target.value)}
      />
      <Button className={classes.filterButton} variant="contained" onClick={handleIncludeIngredient}>
        Include
      </Button>
      <Button className={classes.filterButton} variant="contained" onClick={handleExcludeIngredient}>
        Exclude
      </Button>
      <div>
        {includeIngredients.map((ingredient) => (
          <Chip
            key={ingredient}
            label={ingredient}
            className={classes.includedIngredient}
            onDelete={() => handleRemoveIncludedIngredient(ingredient)}
            deleteIcon={<AddIcon />}
          />
        ))}
        {excludeIngredients.map((ingredient) => (
          <Chip
            key={ingredient}
            label={ingredient}
            className={classes.excludedIngredient}
            onDelete={() => handleRemoveExcludedIngredient(ingredient)}
            deleteIcon={<RemoveIcon />}
          />
        ))}
      </div>
      </div>
      <div className={classes.filterContainer}>
        <FormControl className={classes.filterSelect}>
          <InputLabel>Meal Type</InputLabel>
          <Select value={mealType} onChange={handleMealTypeChange}>
            {mealTypeVals.map((type) => (
            <MenuItem 
            key={type} 
            value={type.charAt(0).toUpperCase() + type.slice(1)}
            onClick={() => {setMealType('');}}
            selected={mealType === type}
            >
                {type.charAt(0).toUpperCase() + type.slice(1)}
            </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.filterSelect}>
          <InputLabel>Dietary Restrictions</InputLabel>
          <Select value={dietaryRestriction} onChange={handleDietaryRestrictionChange}>
            {dietVals.map((type) => (
            <MenuItem 
            key={type} 
            value={type.charAt(0).toUpperCase() + type.slice(1)}
            onClick={() => {setDietaryRestriction('');}}
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
            {servingSizeVals.map((type) => (
            <MenuItem 
            key={type} 
            value={type}
            onClick={() => {setServingSize('');}}
            selected={servingSize === type}
            >
                {type}
            </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl component="fieldset" className={classes.filterCheckboxGroup}>
          <FormGroup>
            {/* Render cooking utensils checkboxes */}
          </FormGroup>
        </FormControl>
      </div>
      <PrimaryButton variant="contained" onClick={handleFilterSubmit} style={{backgroundColor:theme.palette.violet.main}}>
        Apply Filters
      </PrimaryButton>
    </div>
  );
};

export default FilteringComponent;

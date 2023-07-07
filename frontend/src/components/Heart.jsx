import axios from "axios";
import React, { useEffect, useState } from "react";
import Heart from "react-animated-heart";

function HeartComponent({ user, recipe }) {
  const [isClick, setClick] = useState(false);
  const token = localStorage.getItem('jwt');



  useEffect(() => {
    if (user._id === recipe.createdBy || user.savedRecipes.includes(recipe._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [user, recipe]);
  

  const handleSaveRecipe = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/v1/recipes/save', 
      { recipeId: recipe._id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Recipe added to saved recipes!");
      setClick(true);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    if (!isClick) {
      handleSaveRecipe();
    } else {
      setClick(!isClick);
    }
  };

  return (
    <div className="App">
      <Heart isClick={isClick} onClick={handleClick} />
    </div>
  );
}

export default HeartComponent;

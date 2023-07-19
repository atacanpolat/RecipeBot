import axios from "axios";
import React, { useEffect, useState } from "react";
import Heart from "react-animated-heart";

function HeartComponent({ user, recipe }) {
  const [isClick, setIsClick] = useState(false);
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    if (
      user._id === recipe.createdBy ||
      user.savedRecipes.includes(recipe._id)
    ) {
      setIsClick(true);
    } else {
      setIsClick(false);
    }
  }, [user, recipe]);

  const handleSaveRecipe = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/recipes/save",
        { recipeId: recipe._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedUser = {
        ...user,
        savedRecipes: [...user.savedRecipes, recipe._id],
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      console.log("Recipe added to saved recipes successfully");
      setIsClick(true);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveRecipe = async () => {
    try {
      const response = await axios.put(
        "http://localhost:8000/api/v1/recipes/remove",
        { recipeId: recipe._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedUser = {
        ...user,
        savedRecipes: user.savedRecipes.filter((id) => id !== recipe._id),
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      console.log("Recipe removed from saved recipes successfully");
      setIsClick(false);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    if (!isClick) {
      handleSaveRecipe();
    } else {
      handleRemoveRecipe();
    }
  };

  return (
    <div className="App">
      <Heart isClick={isClick} onClick={handleClick} />
    </div>
  );
}

export default HeartComponent;

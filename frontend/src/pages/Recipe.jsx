import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../assets/css/star.css";
import {
  FaClock,
  FaConciergeBell,
  FaPizzaSlice,
  FaSeedling,
  FaTrash,
} from "react-icons/fa";
import Rating from "../components/Rating";
import { HeaderPrivateTop, HeaderPrivate } from "../components/HeaderPrivate";
import HeartComponent from "../components/Heart";
import userService from "../features/user/userService";

function Recipe() {
  const API_URL = "http://localhost:8000/api/v1/recipes/";

  const token = localStorage.getItem("jwt");
  const user = JSON.parse(localStorage.getItem("user"));
  let params = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [updatedIngredients, setUpdatedIngredients] = useState([]);
  const [updatedCookingMethod, setUpdatedCookingMethod] = useState("");
  const [recipeInDatabase, setRecipeInDatabase] = useState(false);
  const [isUserRecipe, setIsUserRecipe] = useState(false); 

  let recipeData = {};

  const getInformation = async () => {
    // try retreiving recipe from the databas
    await axios
      .get(API_URL + params.name, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        recipeData = response.data;
        setRecipeInDatabase(true);
        setIsUserRecipe(recipeData.createdBy === user._id); // Check ownership
      })
      .catch((error) => {
        if (error.response.status === 404 && localStorage.getItem("recipe")) {
          recipeData = JSON.parse(localStorage.getItem("recipe"));
          setRecipeInDatabase(false);
          setIsUserRecipe(recipeData.createdBy === user._id); // Check ownership
        } else {
          throw error;
        }
      });
    console.log("is recipe in database?", recipeInDatabase);
    console.log(recipeData);
    setDetails(recipeData);
  };

  useEffect(() => {
    getInformation();
  }, [params.name]);

  const handleEditIngredients = () => {
    setIsEditing(true);
    setUpdatedIngredients(
      details.ingredients.map((ingredient) => ({ ...ingredient }))
    );
  };

  const handleAddIngredient = () => {
    setUpdatedIngredients([
      ...updatedIngredients,
      { name: "", quantity: "", brand: "" },
    ]);
  };

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredientsCopy = [...updatedIngredients];
    updatedIngredientsCopy[index][field] = value;
    setUpdatedIngredients(updatedIngredientsCopy);
  };

  // const handleCookingMethodChange = (e) => {
  //   setUpdatedCookingMethod(e.target.value);
  // };

  const addRecipeToDatabase = () => {
    const recipeParams = {
      title: details.title,
      ingredients: details.ingredients,
      instruction: details.instruction,
      photo: details.photo,
      isGenerated: details.isGenerated ? details.isGenerated : false,
      tags: [details.instruction.mealType, details.instruction.diet ? details.instruction.diet : "Not diet specific", details.instruction.cookingTime]
    };
    axios
      .post(API_URL + "/create", recipeParams, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("RECIPE ADDED TO THE DATABASE");
        console.log(response);
        localStorage.removeItem("recipe");
        localStorage.removeItem("instruction");
        // redirect to new recipe page (since ID has changed)
        window.location.href = "/recipes/" + response.data._id;
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const handleCreateNewRecipe = () => {
    // Save the updatedIngredients and updatedCookingMethod as a new recipe
    // You can make an API call here to save the new recipe with the updated details
    // Use the updatedIngredients and updatedCookingMethod to create the new recipe
    // After successfully saving the new recipe, redirect or display a success message

    // Example API call:
    axios
      .post(
        API_URL,
        {
          title: details.title,
          ingredients: updatedIngredients,
          instruction: {
            0: updatedCookingMethod,
          },
          // Other recipe properties
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // Handle successful response
        console.log("New recipe saved:", response.data);
        // Redirect or display success message
      })
      .catch((error) => {
        // Handle error
        console.error("Failed to save new recipe:", error);
        // Display error message or handle the error in an appropriate way
      });
  };

  const formatIngredients = () => {
    if (details.ingredients && details.ingredients.length > 0) {
      return details.ingredients.map((ingredient, index) => (
        <li key={index}>
          Ingredient {index + 1}: {ingredient.brand} {ingredient.name} - {ingredient.quantity} 
        </li>
      ));
    }
    return null;
  };

  const displayInfo = (info) => {
    if (details.instruction && Object.keys(details.instruction).length > 0) {
      const instructionKey = Object.keys(details.instruction)[info];
      const instruction = details.instruction[instructionKey];
      if (instruction) {
        return instruction;
      }
    }
    return "/"; // Change "Default Value" to the desired default value
  };

  const formatCookingMethod = (cookingMethod) => {
    const cookingMethodList = cookingMethod.split(/\d+\.\s/).filter(Boolean);
    return cookingMethodList;
  };


  const handleDeleteRecipe = () => {
    const confirmed = window.confirm("Are you sure you want to delete this recipe?");
    if (confirmed) {
      axios
        .delete(API_URL + 'delete', {
          data: { recipeId: details._id },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("RECIPE DELETED");
          console.log(response);
          navigate("/saved");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div
      style={{
        alignItems: "center",
        width: "100%",
        gap: "20px",
        flexDirection: "column",
      }}
    >
      <HeaderPrivateTop />

      <DetailWrapper>
        <PhotoWrapper>
          <BackgroundImage
            style={{ backgroundImage: `url(${details.photo})` }}
          />
          <PhotoImage src={details.photo} alt="" />
        </PhotoWrapper>
        <div style={{ display: "flex" }}>
          <HeaderPrivate />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: "1 1 auto",
            }}
          >
            <PageWrapper>
              <ContentWrapper>
                {!recipeInDatabase ? (
                  <Button onClick={addRecipeToDatabase}>
                    Save recipe to database
                  </Button>
                ) : null}

                <RecipeContainer>
                  <RecipeName>{details.title}</RecipeName>
                  <Rating />
                  <HeartComponent user={user} recipe={details} />
                  <Button>Edit</Button>
                  {isUserRecipe && recipeInDatabase && (
          <ButtonDelete onClick={handleDeleteRecipe}>
            <FaTrash /> Delete Recipe
          </ButtonDelete>
        )}
                </RecipeContainer>
                <InfoContainer>
                  <div className="info-row">
                    <span className="info-label">
                      <FaClock></FaClock> Cooking time:
                    </span>
                    <span className="info-value">{displayInfo(1)}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">
                      <FaPizzaSlice></FaPizzaSlice> Meal type:
                    </span>
                    <span className="info-value">{displayInfo(4)}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">
                      <FaConciergeBell></FaConciergeBell> Serving size:
                    </span>
                    <span className="info-value">{displayInfo(2)}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">
                      <FaSeedling></FaSeedling>Diet:
                    </span>
                    <span className="info-value">{displayInfo(5)}</span>
                  </div>
                </InfoContainer>
                <IngredientsHeading>
                  <h4>Ingredients:</h4>
                  {isEditing ? (
                    <div className="edit-container">
                      {updatedIngredients.map((ingredient, index) => (
                        <div className="input-container" key={index}>
                          <input
                            type="text"
                            placeholder="Enter ingredient"
                            value={ingredient.name}
                            onChange={(e) =>
                              handleIngredientChange(
                                index,
                                "name",
                                e.target.value
                              )
                            }
                          />
                          {/* Add other input fields for quantity, brand, etc. as needed */}
                        </div>
                      ))}
                      <div className="add-ingredient-container">
                        <button onClick={handleAddIngredient}>Add</button>
                      </div>
                      <Button onClick={handleCreateNewRecipe}>
                        Save as New Recipe
                      </Button>
                      <Button onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button onClick={handleEditIngredients}>Edit</Button>
                  )}
                  <a href="https://www.goflink.com/de-DE/">
                    <ButtonFlink>Order on Flink</ButtonFlink>
                  </a>
                </IngredientsHeading>
                <IngredientsList>
                  <ul>{formatIngredients()}</ul>
                </IngredientsList>
                <CookingMethod>
                  <h4>Cooking method:</h4>
                  <ol>
                    {formatCookingMethod(displayInfo(0)).map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </CookingMethod>
              </ContentWrapper>
            </PageWrapper>
          </div>
        </div>
      </DetailWrapper>
    </div>
  );
}
const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const DetailWrapper = styled.div`
  scrollbar-gutter: stable both-edges;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin: 0;
  padding: 0;

  .info-row {
    display: flex;
    align-items: flex-start;
  }
  .info-label {
    font-weight: bold;
    width: 150px;
    text-align: left;
  }
  .info-value {
    display: inline-block;
    width: 150px;
    height: 25px;
    background-color: #d3d3d3; /* Light gray color */
    border-radius: 10px; /* Adjust the value for desired roundness */
    margin-bottom: 10px; /* Adjust the value for desired spacing */
  }
`;
const InfoContainer = styled.div`
  margin-top: 1rem;
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const PhotoWrapper = styled.div`
  position: relative;
  align-items: center;
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 50%; /* Align the left edge of the image to the center of the container */
  transform: translateX(
    -50%
  ); /* Adjust the image position to center it horizontally */
  width: 100vw; /* Use 100vw to stretch the image to the full width of the viewport */
  height: 100%;
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  filter: blur(10px); /* Add blur effect */
  z-index: -1;
`;

const PhotoImage = styled.img`
  width: 100%;
`;

const ContentWrapper = styled.div`
  z-index: 1;
  width: 100%;
  max-width: 1200px; /* Adjust the maximum width as needed */
  padding: 1rem;
  box-sizing: border-box;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  font-size: 16px;
  border: 2px solid black;
  font-weight: 600;
  top: 50%;
  background-color: #0a0a23;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 15px;
  min-height: 30px;
  min-width: 120px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0a0a23;
    color: #fff;
  }
`;

const RecipeContainer = styled.div`
  display: flex;
  margin-right: 1rem;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const RecipeName = styled.h1`
  margin-right: 1rem;
  font-size: 1.5rem; /* Adjust the font size as desired */
  margin-right: 10rem;
  white-space: nowrap; /* Prevent title from wrapping */
`;
const IngredientsHeading = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  h4 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    margin-right: 26rem; /* Add right margin for spacing */
  }
  Button {
    margin-right: 13rem; /* Add right margin for spacing */
  }
  .edit-container {
    display: flex;
    flex-direction: column; /* Set flex-direction to column */
    align-items: flex-start;
    margin-bottom: 1rem;
  }

  input[type="text"] {
    flex-grow: 1;
    margin-bottom: 1rem; /* Add margin-bottom to create spacing between input fields */
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;
const ButtonFlink = styled.div`
  padding: 1rem 2rem;
  border: 2px solid black;
  font-weight: 600;
  font-size: 13px;
  top: 50%;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 15px;
  height: 50px;
  width: 160px;
  background-color: #c91383;
`;

const ButtonDelete = styled.button`
  /* Add your desired button styles here */
  background-color: red;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;


const IngredientsList = styled.div`
  margin-top: 1rem;

  h4 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  ul {
    list-style-type: disc;
    padding-left: 1.5rem;
  }

  li {
    font-size: 1rem;
    line-height: 1.5rem;
    display: flex;
    align-items: baseline; /* Align the ingredients with the bullet points */
  }
  margin-bottom: 5rem;
`;
const CookingMethod = styled.div`
  h4 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }
  text-align: justify;
`;

const ButtonCancel = styled(Button)`
  background-color: #d3d3d3;
  color: #000;

  &:hover {
    background-color: #ccc;
  }
`;


// const InputContainer = styled.div`
//   display: flex;
//   margin-bottom: 0.5rem;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 0.5rem;
//   border: 1px solid #ccc;
//   border-radius: 4px;
// `;

// const AddIngredientContainer = styled.div`
//   margin-top: 0.5rem;
// `;

export default Recipe;

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaClock,
  FaConciergeBell,
  FaPizzaSlice,
  FaSeedling,
  FaTrash,
  FaStar,
} from "react-icons/fa";
import ReviewComponent from "../components/ReviewComponent";
import { HeaderPrivateTop, HeaderPrivate } from "../components/HeaderPrivate";
import HeartComponent from "../components/Heart";
import recipeService from "../features/recipe/recipeService";
import Header from "../components/Header";

function Recipe() {
  const API_URL = "http://localhost:8000/api/v1/recipes/";

  const token = localStorage.getItem("jwt");
  const user = JSON.parse(localStorage.getItem("user"));
  let params = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState({});
  // const [isEditing, setIsEditing] = useState(false);
  // const [updatedIngredients] = useState([]);
  // const [updatedCookingMethod] = useState("");
  const [recipeInDatabase, setRecipeInDatabase] = useState(false);
  const [isUserRecipe, setIsUserRecipe] = useState(false);
  const [meanRating, setMeanRating] = useState(0);
  const [reviewCount] = useState(0);

  let recipeData = {};

  const getInformation = async () => {
    // try retrieving recipe from the database
    if (!user) {
      recipeData = JSON.parse(localStorage.getItem("recipe"));
      setRecipeInDatabase(false);
      setDetails(recipeData);
    } else {
      await axios
        .get(API_URL + params.name, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(async (response) => {
          recipeData = response.data;
          setRecipeInDatabase(true);
          setIsUserRecipe(recipeData.createdBy === user._id); // Check ownership

          const reviewPromises = recipeData.reviews.map((review) => {
            return axios.get(
              `http://localhost:8000/api/v1/users/${review.createdBy}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
          });

          const userResponses = await Promise.all(reviewPromises);
          const updatedReviews = recipeData.reviews.map((review, index) => ({
            ...review,
            user: userResponses[index].data,
          }));
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
      setDetails(recipeData);
    }
  };

  useEffect(() => {
    getInformation();
  }, [params.name]);

  useEffect(() => {
    if (user) {
      // Calculate the initial rating and review count
      const calculatedData = recipeService.calculateRecipeData([details]);
      const meanRating = calculatedData[0].meanRating;
      const reviewCount = calculatedData[0].reviewCount;

      setMeanRating(meanRating ? meanRating : 0);
    }
  }, [details]);

  const addRecipeToDatabase = () => {
    const recipeParams = {
      title: details.title,
      ingredients: details.ingredients,
      instruction: details.instruction,
      photo: details.photo,
      isGenerated: details.isGenerated ? details.isGenerated : false,
      tags: [
        details.instruction.mealType,
        details.instruction.diet &&
        details.instruction.diet !== "" &&
        details.instruction.diet.length > 0 &&
        details.instruction.diet[0] !== ""
          ? details.instruction.diet
          : "Not diet specific",
        details.instruction.cookingTime,
      ],
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

  const formatIngredients = () => {
    if (!details.ingredients || details.ingredients.length === 0) {
      return null;
    }

    return details.ingredients.map((ingredient, index) => {
      if (ingredient.name === "") {
        return null;
      }

      return <li key={index}>{formatIngredientText(ingredient, index)}</li>;
    });
  };

  const formatIngredientText = (ingredient, index) => {
    const brandText =
      ingredient.brand !== "" ? ` ® ${ingredient.brand}` : ingredient.brand;
    const quantityText = ` (${ingredient.quantity})`;

    return (
      <>
        {index + 1}:<i>&nbsp;{brandText}&nbsp;</i>
        <strong>&nbsp;{ingredient.name}&nbsp;</strong>
        {quantityText}
      </>
    );
  };

  const displayInfo = (info) => {
    if (details.instruction && Object.keys(details.instruction).length > 0) {
      const instructionKey = Object.keys(details.instruction)[info];
      const instruction = details.instruction[instructionKey];
      // if the instruction is an array, format it properly
      if (Array.isArray(instruction)) {
        return instruction.map((obj) => obj).join(", ");
      }
      if (instruction) {
        return instruction;
      }
    }
    return "/";
  };

  const formatCookingMethod = (cookingMethod) => {
    const cookingMethodList = cookingMethod.split(/\d+\.\s/).filter(Boolean);
    return cookingMethodList;
  };

  const handleDeleteRecipe = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this recipe?"
    );
    if (confirmed) {
      axios
        .delete(API_URL + "delete", {
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

  const handleEditRecipeClick = () => {
    localStorage.setItem("editingRecipe", true);
    localStorage.setItem("recipeData", JSON.stringify(details));

    // if the recipe has been generated by AI, redirect to the generation page
    if (details.isGenerated) {
      window.location.href = "/generate";
    }
    // if the recipe has been manually created, redirect to the create page
    else {
      window.location.href = "/create";
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
      <>{token ? <HeaderPrivateTop /> : <Header />}</>
      <DetailWrapper>
        <PhotoWrapper>
          <BackgroundImage
            style={{ backgroundImage: `url(${details.photo})` }}
          />
          <PhotoImage src={details.photo} alt={details.title} />
          {details.isGenerated ? (
            <GeneratedText>AI generated recipe</GeneratedText>
          ) : (
            <GeneratedText>User created recipe</GeneratedText>
          )}
        </PhotoWrapper>
        <div style={{ display: "flex", width: "100%" }}>
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
                <RecipeContainer>
                  <RecipeName>{details.title}</RecipeName>

                  {token && (
                    <RatingContainer>
                      {meanRating}
                      <StarIcon className="star-icon" />
                      <span> ({reviewCount} reviews)</span>
                    </RatingContainer>
                  )}

                  {token && <HeartComponent user={user} recipe={details} />}
                  {recipeInDatabase && (
                    <Button onClick={handleEditRecipeClick}>Edit</Button>
                  )}
                </RecipeContainer>
                <InfoContainer>
                  <div className="info-row">
                    <span className="info-label">
                      <FaClock /> Cooking time:
                    </span>
                    <span className="info-value">{displayInfo(1)}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">
                      <FaPizzaSlice /> Meal type:
                    </span>
                    <span className="info-value">{displayInfo(4)}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">
                      <FaConciergeBell /> Serving size:
                    </span>
                    <span className="info-value">{displayInfo(2)}</span>
                  </div>

                  <div className="info-row">
                    <span className="info-label">
                      <FaSeedling /> Diet:
                    </span>
                    <span className="info-value">
                      {displayInfo(5) === "" ? "-" : displayInfo(5)}
                    </span>
                  </div>
                </InfoContainer>
                <IngredientsHeading>
                  <h4>Ingredients:</h4>
                  <a
                    href="https://www.goflink.com/de-DE/?source=recipe-bot-app-seba-2023"
                    target="_blank"
                  >
                    <ButtonFlink>Order on Flink</ButtonFlink>
                  </a>
                </IngredientsHeading>
                <IngredientsList>
                  <ul>{formatIngredients()}</ul>
                </IngredientsList>
                <CookingMethod>
                  <h4>Cooking method:</h4>
                  <div>
                    {formatCookingMethod(displayInfo(0)).map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </div>
                </CookingMethod>
                <HandleRecipeButtons>
                  {!recipeInDatabase && token && (
                    <Button onClick={addRecipeToDatabase}>
                      Save recipe to database
                    </Button>
                  )}

                  {isUserRecipe && recipeInDatabase && token && (
                    <ButtonDelete onClick={handleDeleteRecipe}>
                      <FaTrash /> Delete Recipe
                    </ButtonDelete>
                  )}
                </HandleRecipeButtons>

                {recipeInDatabase && token && (
                  <ReviewComponent recipe={details} token={token} />
                )}
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
  width: 1 00%;

  .info-row {
    display: flex;
    align-items: flex-start;
    gap: 20px;
  }
  .info-label {
    font-weight: bold;
    width: 150px;
    text-align: left;
  }
  .info-label svg {
    margin-right: 5px;
  }
  .info-value {
    display: inline-block;
    width: auto;
    height: 26px;
    padding: 0 15px;
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
  height: 50vh;
`;

const GeneratedText = styled.p`
  position: absolute;
  bottom: 10px;
  left: 10px;
  font-size: 1.2rem;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 5px 10px;
  border-radius: 5px;
`;

const ContentWrapper = styled.div`
  z-index: 1;
  width: 100%;
  // max-width: 1200px; /* Adjust the maximum width as needed */
  padding: 1rem 5rem;
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
  justify-content: space-between;
`;

const RecipeName = styled.h1`
  margin-right: 1rem;
  font-size: 1.5rem; /* Adjust the font size as desired */
  margin-right: 10rem;
  white-space: nowrap; /* Prevent title from wrapping */
`;

const StarIcon = styled(FaStar)`
  color: gold; /* Adjust the color as desired */
  margin-left: 0.5rem; /* Add margin to create spacing between the rating and the star */
`;

const IngredientsHeading = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  justify-content: space-between;
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

const ButtonDelete = styled(Button)`
  background-color: red;
  color: white;
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
  margin-bottom: 4rem;
`;

const HandleRecipeButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const RatingContainer = styled.div`
  margin-bottom: 0.5rem;
`;

export default Recipe;

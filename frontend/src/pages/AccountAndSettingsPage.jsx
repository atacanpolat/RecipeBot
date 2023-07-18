import React, { useState, useEffect } from "react";
import { HeaderPrivate, HeaderPrivateTop } from "../components/HeaderPrivate";
import { SectionHeading } from "../components/helpers/themes";
import { useRecipeContainerStyles } from "../components/helpers/styles/recipesStyles";
import useAccountSettingStyles from "../components/helpers/styles/accountSettingStyles";
import { toast } from 'react-toastify'
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import "../assets/css/AccountSettings.css";
import UpdateUserProfileService from "../features/UpdateUserProfileService";
import UserService from "../features/user/userService";

const userInLocalStorage = JSON.parse(localStorage.getItem('user'));



  

const AccountAndSettingsPage = () => {

  console.log("test3333");
  console.log(userInLocalStorage.defaultRecipeSettings);
  let abc=JSON.stringify(userInLocalStorage.defaultRecipeSettings);
  console.log(abc);
  console.log(userInLocalStorage.defaultRecipeSettings);
  //const valuesArray = JSON.parse(userInLocalStorage.defaultRecipeSettings);
  let valuesArray = JSON.parse(abc);
  console.log("test4444");

  let [measurementSystemState, setMeasurementSystemState] =
    useState("");
  const [dietaryRestrictionsState, setDietaryRestrictionsState] = useState([]);
  const [allergensState, setAllergensState] = useState([]);
  const [cookingUtensilsState, setCookingUtensilsState] = useState([]);
  let [firstNameValue, setFirstNameValue] = useState("");
  let [lastNameValue, setLastNameValue] = useState("");
  let [emailValue, setEmailValue] = useState("");
  let [phoneValue, setPhoneValue] = useState("");
  let [newPassword, setNewPassword] = useState("");
  let [imageFormData, setImageFormData] = useState("");

  const classes = useRecipeContainerStyles();
  const pageStyles = useAccountSettingStyles();

  
  
  let measurementSystem = [
    {
      value: "metric",
      label: "Metric",
    },
    {
      value: "imperial",
      label: "Imperial",
    },
  ];


  let dietaryRestrictions = [
    {
      value: "gluten-free",
      label: "Gluten Free",
      checked: false,
    },
    {
      value: "lactose-free",
      label: "Lactose Free",
      checked: false,
    },
    {
      value: "kosher",
      label: "Kosher",
      checked: false,
    },
    {
      value: "seafood",
      label: "Sea Food",
      checked: false,
    },
    {
      value: "halal",
      label: "Halal",
      checked: false,
    },
    {
      value: "vegetarian",
      label: "Vegetarian",
      checked: false,
    },
    {
      value: "vegan",
      label: "Vegan",
      checked: false,
    },
    {
      value: "keto",
      label: "Keto",
      checked: false,
    },
    {
      value: "low-calorie",
      label: "Low-calorie",
      checked: false,
    },
  ];

  const allergens = [
    {
      value: "nuts",
      label: "Nuts",
      checked: false,
    },
    {
      value: "milk",
      label: "Milk",
      checked: false,
    },
    {
      value: "shellfish",
      label: "Shellfish",
      checked: false,
    },
    {
      value: "egg",
      label: "Egg",
      checked: false,
    },
    {
      value: "peanut",
      label: "Peanut",
      checked: false,
    },
  ];


  const cookingUtensils = [
    {
      value: "no oven",
      label: "No Oven",
      checked: false,
    },
    {
      value: "no stove",
      label: "No Stove",
      checked: false,
    },
    {
      value: "no blender",
      label: "No Blender",
      checked: false,
    },
    {
      value: "no microwave",
      label: "No Microwave",
      checked: false,
    },
  ];

  

 
  for (var  j=0;j<valuesArray.dietaryRestrictions.length;j++) {
    for(var i=0;i<dietaryRestrictions.length;i++)
    {
      //console.log(dietaryRestrictions[i].value==valuesArray.dietaryRestrictions[j]);
      if(dietaryRestrictions[i].value===valuesArray.dietaryRestrictions[j])
      {
        dietaryRestrictions[i].checked=true;
      }
    }
  }

  for (var  j1=0;j1<valuesArray.allergies.length;j1++) {
    for(var i1=0;i1<allergens.length;i1++)
    {
     // console.log(dietaryRestrictions[i].value==valuesArray.allergies[j]);
      if(allergens[i1].value===valuesArray.allergies[j1])
      {
        allergens[i1].checked=true;
      }
    }
  }

  for (var  j2=0;j2<valuesArray.utensils.length;j2++) {
    for(var i2=0;i2<cookingUtensils.length;i2++)
    {
     // console.log(dietaryRestrictions[i].value==valuesArray.allergies[j]);
      if(cookingUtensils[i2].value===valuesArray.utensils[j2])
      {
        cookingUtensils[i2].checked=true;
      }
    }
  }
  
      measurementSystemState=valuesArray.metricSystem;
      //firstNameValue=userInLocalStorage.firstName;
      //lastNameValue=userInLocalStorage.lastName;
      //phoneValue=userInLocalStorage.phone;

  //console.log("measurementSystemState:" + measurementSystemState);
  //console.log("valuesArray.metricsystem:" + valuesArray.metricSystem);
  

  
  const setCheckedValues = () => {
    let dietaryVariables = [];
    dietaryRestrictions.forEach((item) => {
      if (item.checked) {
        dietaryVariables.push(item.value);
      }   
    });
    setDietaryRestrictionsState(dietaryVariables);
    let allergensVariables = [];
    allergens.forEach((item) => {
      if (item.checked) {
        allergensVariables.push(item.value);
      }
    });
    setAllergensState(allergensVariables);
    let cookingUtensilsVariables = [];
    cookingUtensils.forEach((item) => {
      if (item.checked) {
        cookingUtensilsVariables.push(item.value);
      }
    });
    setCookingUtensilsState(cookingUtensilsVariables);
  };

  
  useEffect(() => {
    //console.log(userInLocalStorage._id);
    //console.log(userInLocalStorage);
   // const valuesArray = JSON.parse(userInLocalStorage.defaultRecipeSettings);

    //console.log(valuesArray.dietaryRestrictions);

    setCheckedValues();

  }, []);


  const fetchUser = async () => {
    const userData2 = await UserService.getUserbyId(userInLocalStorage._id)
    console.log("Updated User");
    console.log(userData2);
    localStorage.setItem('user', JSON.stringify(userData2));

  };
  

  const updateProfileInfos = () => {
    const profileInfosAndSettings = {
      firstName: firstNameValue,
      lastName: lastNameValue,
      email: emailValue,
      phone: phoneValue,
      newPassword: newPassword,
      measurementSystem: measurementSystemState,
      allergies: allergensState,
      dietaryRestrictions: dietaryRestrictionsState,
      utensils: cookingUtensilsState,
      imageX: imageFormData,
      defaultRecipeSettings:{"measurementSystem":"metric",dietaryRestrictions: dietaryRestrictionsState,allergies: allergensState, utensils: cookingUtensilsState}
    };

    console.log("profileInfosAndSettings");
    console.log(profileInfosAndSettings);

    UpdateUserProfileService.updateUser(profileInfosAndSettings)
      .then((response) => {
        toast("Saved");
        console.log("Upload success:", response);
        fetchUser();
        // Kadir:  TODO: login again to get userdata to local storage
      })
      .catch((error) => {
        toast("Error:" + error);
        console.log("Upload error:", error);
      });


     

      
      
  };

  const changeDietaryRestrictionsState = (e) => {
    if (e.target.checked) {
      setDietaryRestrictionsState((current) => [...current, e.target.value]);
    } else {
      setDietaryRestrictionsState((current) =>
        current.filter((item) => item !== e.target.value)
      );
    }
  };

  const changeAllergensStat = (e) => {
    if (e.target.checked) {
      setAllergensState((current) => [...current, e.target.value]);
    } else {
      setAllergensState((current) =>
        current.filter((item) => item !== e.target.value)
      );
    }
  };

  const changeCookingUtensilsState = (e) => {
    if (e.target.checked) {
      setCookingUtensilsState((current) => [...current, e.target.value]);
    } else {
      setCookingUtensilsState((current) =>
        current.filter((item) => item !== e.target.value)
      );
    }
  };

  const handlePageUpload = (event) => {
    const file = event.target.files[0];
    console.log(file);
    const formData = new FormData();
    formData.append("file", file);
    console.log(formData);
    setImageFormData(formData);
  };

  return (
    <div className={pageStyles.accountSettingsMainContainer}>
      <HeaderPrivateTop />
      <div className={pageStyles.accountSettingsMainContent}>
        <HeaderPrivate className="sideNav" />
        <div className={pageStyles.accountSettingsContent}>
          <div className={pageStyles.accountSettingsInnerContent}>
            <SectionHeading className={classes.heading}>
              Profile/Settings
            </SectionHeading>
            <div className="account-settings-row-container">
              <div className={pageStyles.directionColumn}>
                <InputLabel className="account-settings-bold-label">
                  First Name
                </InputLabel>
                <TextField
                  onChange={(e) => setFirstNameValue(e.target.value)}
                  className="account-settings-textfield"
                  label=""
                  variant="outlined"
                  size="small"
                  defaultValue={userInLocalStorage.firstName}
                />
              </div>
              <div className={pageStyles.directionColumn}>
                <InputLabel className="account-settings-bold-label">
                  Last Name
                </InputLabel>
                <TextField
                  onChange={(e) => setLastNameValue(e.target.value)}
                  className="account-settings-textfield"
                  defaultValue={userInLocalStorage.lastName}
                  variant="outlined"
                  size="small"
                />
              </div>
            </div>
            <div className="account-settings-row-container">
              <div className={pageStyles.directionColumn}>
                <InputLabel className="account-settings-bold-label">
                  Email
                </InputLabel>
                <TextField
                  onChange={(e) => setEmailValue(e.target.value)}
                  className="account-settings-textfield"
                  defaultValue={userInLocalStorage.email}
                  variant="outlined"
                  size="small"
                />
              </div>
              <div className={pageStyles.directionColumn}>
                <InputLabel className="account-settings-bold-label">
                  Phone
                </InputLabel>
                <TextField
                  onChange={(e) => setPhoneValue(e.target.value)}
                  className="account-settings-textfield"
                  defaultValue={userInLocalStorage.phone}
                  variant="outlined"
                  size="small"
                  type="number"
                />
              </div>
            </div>
            <div className="account-settings-row-container">
              <div className={pageStyles.directionColumn}>
                <InputLabel className="account-settings-bold-label">
                  Profile Picture
                </InputLabel>
                <input
                  style={{ width: "300px" }}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handlePageUpload(e)}
                />
              </div>
              <div className={pageStyles.directionColumn}>
                <InputLabel className="account-settings-bold-label">
                  New Password
                </InputLabel>
                <TextField
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="account-settings-textfield"
                  variant="outlined"
                  size="small"
                />
              </div>
            </div>
            <div className="account-settings-default-container">
              <InputLabel className="account-settings-default-label">
                Default Settings
              </InputLabel>
              <div className="account-settings-default-row-container">
                <InputLabel className="account-settings-default-bold-label">
                  Measurement System
                </InputLabel>
                <div className="account-settings-default-dashed-container">
                  <FormControl>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      defaultValue={measurementSystemState}
                      onChange={(e) =>
                        setMeasurementSystemState(e.target.value)
                      }
                    >
                      {measurementSystem.length ? (
                        measurementSystem.map((item) => (
                          <FormControlLabel
                            value={item.value}
                            control={
                              <Radio className="account-settings-default-radio" />
                            }
                            label={item.label}
                          />
                        ))
                      ) : (
                        <></>
                      )}
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>
              <div className="account-settings-default-row-container">
                <InputLabel className="account-settings-default-bold-label">
                  Dietary Restrictions
                </InputLabel>
                <div className="account-settings-default-dashed-container">
                  <FormGroup
                    row
                    onChange={(e) => changeDietaryRestrictionsState(e)}
                  >
                    {dietaryRestrictions.length ? (
                      dietaryRestrictions.map((item) => (
                        <FormControlLabel
                          value={item.value}
                          control={
                            <Checkbox
                              className="account-settings-default-radio"
                              defaultChecked={item.checked}
                            />
                          }
                          label={item.label}
                        />
                      ))
                    ) : (
                      <></>
                    )}
                  </FormGroup>
                </div>
              </div>
              <div className="account-settings-default-row-container">
                <InputLabel className="account-settings-default-bold-label">
                  Allergens
                </InputLabel>
                <div className="account-settings-default-dashed-container">
                  <FormGroup row onChange={(e) => changeAllergensStat(e)}>
                    {allergens.length ? (
                      allergens.map((item) => (
                        <FormControlLabel
                          value={item.value}
                          control={
                            <Checkbox
                              className="account-settings-default-radio"
                              defaultChecked={item.checked}
                            />
                          }
                          label={item.label}
                        />
                      ))
                    ) : (
                      <></>
                    )}
                  </FormGroup>
                </div>
              </div>
              <div className="account-settings-default-row-container">
                <InputLabel className="account-settings-default-bold-label">
                  Cooking Utensils
                </InputLabel>
                <div className="account-settings-default-dashed-container">
                  <FormGroup
                    row
                    onChange={(e) => changeCookingUtensilsState(e)}
                  >
                    {cookingUtensils.length ? (
                      cookingUtensils.map((item) => (
                        <FormControlLabel
                          value={item.value}
                          control={
                            <Checkbox
                              className="account-settings-default-radio"
                              defaultChecked={item.checked}
                            />
                          }
                          label={item.label}
                        />
                      ))
                    ) : (
                      <></>
                    )}
                  </FormGroup>
                </div>
              </div>
            </div>
            <Button
              onClick={updateProfileInfos}
              className={pageStyles.submitButton}
              variant="contained"
            >
              Update
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountAndSettingsPage;

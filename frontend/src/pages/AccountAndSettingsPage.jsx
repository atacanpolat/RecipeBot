import React, { useState, useEffect } from "react";
import { HeaderPrivate, HeaderPrivateTop } from "../components/HeaderPrivate";
import { SectionHeading } from "../components/helpers/themes";
import { useRecipeContainerStyles } from "../components/helpers/styles/recipesStyles";
import useAccountSettingStyles from "../components/helpers/styles/accountSettingStyles";
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

const AccountAndSettingsPage = () => {
  const [radioGroup, setRadioGroup] = useState("metric");
  const [checkboxGroup, setCheckboxGroup] = useState([]);
  const [firstNameValue, setFirstNameValue] = useState("");
  const [lastNameValue, setLastNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const classes = useRecipeContainerStyles();
  const pageStyles = useAccountSettingStyles();

  useEffect(() => {
    console.log(firstNameValue);
  }, [firstNameValue]);

  const changeCheckboxGroup = (e) => {
    setCheckboxGroup((current) => [...current, e.target.value]);
  };

  const updateProfileInfos = () => {
    console.log("deneme")
  }

  const radioArray = [
    {
      value: "metric",
      label: "Metric",
    },
    {
      value: "imperial",
      label: "Imperial",
    },
  ];

  const checkboxeArray = [
    {
      value: "glutenFree",
      label: "Gluten Free",
    },
    {
      value: "diabetic",
      label: "Diabetic",
    },
    {
      value: "diaryFree",
      label: "Diary Free",
    },
    {
      value: "lowFat",
      label: "Low Fat",
    },
    {
      value: "vegan",
      label: "Vegan",
    },
  ];

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
                  label="First Name"
                  variant="outlined"
                  size="small"
                />
              </div>
              <div className={pageStyles.directionColumn}>
                <InputLabel className="account-settings-bold-label">
                  Last Name
                </InputLabel>
                <TextField
                  onChange={(e) => setLastNameValue(e.target.value)}
                  className="account-settings-textfield"
                  label="Last Name"
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
                  label="Email"
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
                  label="Phone"
                  variant="outlined"
                  size="small"
                />
              </div>
            </div>
            <div className="account-settings-row-container">
              <div className={pageStyles.directionColumn}>
                <InputLabel className="account-settings-bold-label">
                  Profile Picture
                </InputLabel>
                <input style={{ width: "300px" }} type="file" />
              </div>
              <div className={pageStyles.directionColumn}>
                <InputLabel className="account-settings-bold-label">
                  New Password
                </InputLabel>
                <TextField
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="account-settings-textfield"
                  label="New Password"
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
                      defaultValue={radioGroup}
                      onChange={(e) => setRadioGroup(e.target.value)}
                    >
                      {radioArray.length ? (
                        radioArray.map((item) => (
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
                  <FormGroup row onChange={(e) => changeCheckboxGroup(e)}>
                    {checkboxeArray.length ? (
                      checkboxeArray.map((item) => (
                        <FormControlLabel
                          value={item.value}
                          control={
                            <Checkbox
                              className="account-settings-default-radio"
                              defaultChecked
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
                  <FormGroup row>
                    {checkboxeArray.length ? (
                      checkboxeArray.map((item) => (
                        <FormControlLabel
                          value={item.value}
                          control={
                            <Checkbox
                              className="account-settings-default-radio"
                              defaultChecked
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
                  <FormGroup row>
                    {checkboxeArray.length ? (
                      checkboxeArray.map((item) => (
                        <FormControlLabel
                          value={item.value}
                          control={
                            <Checkbox
                              className="account-settings-default-radio"
                              defaultChecked
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
            <Button onClick={updateProfileInfos} className={pageStyles.submitButton} variant="contained">Update</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountAndSettingsPage;

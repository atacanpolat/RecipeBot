import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  profilePicture: "",
  password: "",
  measurementSystem: "metric",
  dietaryRestrictions: "",
  allergens: "",
  cookingUtensils: "",
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateProfile } = profileSlice.actions;

export default profileSlice.reducer;

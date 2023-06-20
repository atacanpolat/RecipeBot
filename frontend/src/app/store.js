import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import profileReducer from '../app/profileSlice'; // you should import profileSlice reducer

export const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer, // use profileSlice reducer here
    },
});


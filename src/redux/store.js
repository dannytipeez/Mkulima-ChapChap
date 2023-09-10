import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth-Slice";


export const store = configureStore({
    reducer: {
        authReducer,
    }
});
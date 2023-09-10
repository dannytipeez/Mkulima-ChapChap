import { createSlice, PayloadAction } from "@reduxjs/toolkit";



import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    GOOGLE_AUTH_SUCCESS,
    GOOGLE_AUTH_FAIL,
    FACEBOOK_AUTH_SUCCESS,
    FACEBOOK_AUTH_FAIL,
    LOGOUT
} from '../actions/types';


const initialState = {
    value: {
        access: localStorage.getItem('access'),
        refresh: localStorage.getItem('refresh'),
        isAuthenticated: null,
        user: null
    }
};


export const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        //log out fxn
        clearUser: () => {
            return initialState;
        },

        //log in fxn
        setUser: (state, action) => {
            localStorage.setItem('access', action.payload)
            return {
                value: {
                    ...state,
                    access: action.payload.access,
                    refresh: action.payload.refresh,
                    isAuthenticated: true,
                }
            }
        }

    }
});


export const {logIn, logOut} = auth.actions;
export default auth.reducer;
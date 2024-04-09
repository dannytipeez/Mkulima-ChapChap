// authSlice.jsdashboard
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ACTIVATION_SUCCESS, ACTIVATION_FAIL } from '../actions/types';


const initialState = {
  auth: {
    access: typeof window !== 'undefined' ? localStorage.getItem('access') : null,
    refresh: typeof window !== 'undefined' ? localStorage.getItem('refresh') : null,
    isAuthenticated: null,
    user: null,
  },
  loading: false,
  error: null,
};

// Define an async thunk action to load the user
export const loadUser = createAsyncThunk('auth/loadUser', async (_, { getState, dispatch, rejectWithValue }) => {
    const { access } = getState && getState().authReducer;

    if (access) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${access}`,
                'Accept': 'application/json'
            }
        };
        // console.log("loading user...");
        try {
            const res = await axios.get(`http://localhost:8000/api/v1/auth/users/me/`, config);
            console.log(res.data);
            const { email, username, role } = res.data;
            localStorage.setItem('username', username);
            localStorage.setItem('role', role);
            localStorage.setItem('email', email);
            localStorage.setItem("user", JSON.stringify(res.data));
            localStorage.setItem("pass", true);
            dispatch(userLoadedSuccess(res.data));
            return res.data;

        } catch (err) {
            return rejectWithValue(err.response.data); // Handle errors
        }
    } else {
        return rejectWithValue('Access token is missing'); // Handle missing access token
    }
});

export const checkAuthenticated = createAsyncThunk(
    'auth/checkAuthenticated',
    async (_, { getState, rejectWithValue }) => {
        const { access } = getState && getState().authReducer;

        if (access) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            };

            const body = JSON.stringify({ token: access });

            try {
                const res = await axios.post(
                    `http://localhost:8000/api/v1/auth/jwt/verify/`,
                    body,
                    config
                );

                if (res.data.code !== 'token_not_valid') {
                    return true; // Authentication succeeded
                } else {
                    return false; // Token not valid
                }
            } catch (err) {
                return rejectWithValue(err.response.data); // Handle errors
            }
        } else {
            return false; // Access token is missing
        }
    }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, email, password }, { dispatch }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    };

    const body = JSON.stringify({ username, email, password });

    try {
      const res = await axios.post(
        'http://localhost:8000/api/v1/auth/jwt/create/',
        body,
        config
      );

      dispatch(loginSuccess(res.data));
      const {access, refresh} = res.data;
      localStorage.setItem('access', access);
      localStorage.setItem('refresh', refresh);
      dispatch(loadUser()); // Load user data after login

    } catch (err) {
      console.log(err);
      dispatch(loginFail(err.response.data));
    }
  }
);

export const logOut = createAsyncThunk(
    'auth/logOut',
    async (_, { dispatch }) => {
        try {
            // Clear access token from local storage
            localStorage.removeItem('access');

            // Optionally, clear refresh token from local storage if needed
            localStorage.removeItem('refresh');

            // Clear any other user-related data or session-related data
            // Dispatch the action to reset the authentication state
            dispatch(logout()); // Dispatch your logout action creator
        } catch (e) {
            console.error(e);
        }
    }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ username, role, phone, email, password, re_password }, { dispatch }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ username, role, phone, email, password, re_password });

    try {
      const res = await axios.post(
        'http://localhost:8000/api/v1/auth/users/',
        body,
        config
      );

      dispatch(signupSuccess()); // Dispatch the signup success action
      console.log('Registration successful');
      return res.data;

    } catch (err) {
      console.log(err);
      return err.response.data; // Return error data
    }
  }
);

//verify users
export const verifyUser = createAsyncThunk(
  'auth/verify',
  async ({ uid, token }, { dispatch }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ uid, token });

    try {
      await axios.post(
        `http://localhost:8000/api/v1/auth/users/activation/`,
        body,
        config
      );

      dispatch({
        type: ACTIVATION_SUCCESS,
      });
      console.log("account activation successful!")
    } catch (err) {
      dispatch({
        type: ACTIVATION_FAIL,
      });
      console.log("Account activation failed!");
      console.log(err);
      throw err;
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ email }, { dispatch }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ email });

    try {
      const res = await axios.post(
        'http://localhost:8000/api/v1/auth/users/reset_password/',
        body,
        config
      );

      console.log('Password reset email sent');
      dispatch(passwordResetSuccess());
      return res.data;

    } catch (err) {
      console.log(err);
      return err.response.data; // Return error data
    }
  }
);

export const resetPasswordConfirm = createAsyncThunk(
  'auth/resetPasswordConfirm',
  async ({ uid, token, new_password, re_new_password }, { dispatch }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ uid, token, new_password, re_new_password });

    try {
      const res = await axios.post(
        'http://localhost:8000/api/v1/auth/users/reset_password_confirm/',
        body,
        config
      );

      console.log('Password reset successful');
      dispatch(passwordResetConfirmSuccess());
      return res.data;

    } catch (err) {
      console.log("error setting new password")
      console.log(err);
      return err.response.data; // Return error data
    }
  }
);



export const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authenticatedSuccess: (state) => {
            state.isAuthenticated = true;
        },
        loginSuccess: (state, action) => {
            const { access, refresh } = action.payload;
            state.isAuthenticated = true;
            state.access = access;
            state.refresh = refresh;
        },
        signupSuccess: (state) => {
            state.isAuthenticated = false;
        },
        userLoadedSuccess: (state, action) => {
            state.user = action.payload;
        },
        authenticatedFail: (state) => {
            state.isAuthenticated = false;
        },
        userLoadedFail: (state) => {
            state.user = null;
        },
        logout: (state) => {
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            state.access = null;
            state.refresh = null;
            state.isAuthenticated = false;
            state.user = null;
        },
        loginFail: (state, action) => {
          state.loading = false;
          state.isAuthenticated = false;
          state.error = action.payload;
        },
        signupFail: (state, action) => {
          state.loading = false;
          state.isAuthenticated = false;
          state.error = action.payload;
        },
        loadUserFail: (state, action) => {
          state.loading = false;
          state.isAuthenticated = false;
          state.user = null;
          state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(loadUser.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.user = null;
                state.error = action.payload;
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.error = action.payload;
            });
    },
});

export const {
    authenticatedSuccess,
    loginSuccess,
    signupSuccess,
    userLoadedSuccess,
    authenticatedFail,
    logout,
    passwordResetSuccess,
    passwordResetConfirmSuccess,
    loginFail,
    signupFail,
    loadUserFail,
} = auth.actions;

export default auth.reducer;

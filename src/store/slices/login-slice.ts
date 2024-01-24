import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../models/User";

import type { AppDispatch } from "../store";
import axios, { AxiosError } from "axios";

// Define a type for the slice state
interface LoginState {
  isLoggedIn: boolean;
  error: boolean;
  message: string;
  accessToken: string;
  refreshToken: string;
  loading: boolean;
  loginDate: number;
}

// Define the initial state using that type
const initialState: LoginState = {
  isLoggedIn: false,
  error: false,
  message: "",
  accessToken: "",
  refreshToken: "",
  loading: false,
  loginDate: 0,
};

export const loginSlice = createSlice({
  name: "login",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    logSuccess: (
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken: string;
        loginDate: number;
      }>
    ) => {
      state.isLoggedIn = true;
      state.error = false;
      state.message = "Success";
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.loginDate = action.payload.loginDate;
    },
    logError: (state, action: PayloadAction<string>) => {
      state.error = true;
      state.message = action.payload;
      state.loading = false;
    },
    logOut: (state) => {
      state.isLoggedIn = false;
      state.error = false;
      state.message = "";
      state.loading = false;
    },
    onRequest: (state) => {
      state.loading = true;
    },
    replaceToken: (
      state,
      action: PayloadAction<{ accesToken: string; refreshDate: number }>
    ) => {
      state.accessToken = action.payload.accesToken;
      state.loginDate = action.payload.refreshDate;
    },
  },
});

// Other code such as selectors can use the imported `RootState` type
export const onLogin = (user: User) => {
  return async (dispatch: AppDispatch) => {
    dispatch(onRequest());
    try {
      const request = await axios.post(
        process.env.REACT_APP_API_BASE + "/user/token/",
        user
      );
      if (request.status === 200) {
        dispatch(
          logSuccess({
            accessToken: request.data?.access,
            refreshToken: request.data?.refresh,
            loginDate: Date.now(),
          })
        );
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data?.detail);
      }
      dispatch(logError("Error al intentar acceder"));
    }
  };
};

export const requestNewToken = (refreshToken: string, loginDate: number) => {
  return async (dispatch: AppDispatch) => {
    if (Date.now() - loginDate >= 3600000) {
      console.log("new token...");
      try {
        const request = await axios.post(
          process.env.REACT_APP_API_BASE + "/user/token/refresh/",
          { refresh: refreshToken }
        );
        if (request.status === 200) {
          console.log(request.data);
          dispatch(
            replaceToken({
              accesToken: request.data?.access,
              refreshDate: Date.now(),
            })
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
};

export const { logSuccess, logOut, logError, onRequest, replaceToken } =
  loginSlice.actions;

export default loginSlice.reducer;

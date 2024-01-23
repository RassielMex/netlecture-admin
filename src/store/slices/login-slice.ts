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
}

// Define the initial state using that type
const initialState: LoginState = {
  isLoggedIn: false,
  error: false,
  message: "",
  accessToken: "",
  refreshToken: "",
};

export const loginSlice = createSlice({
  name: "login",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    logSuccess: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>
    ) => {
      state.isLoggedIn = true;
      state.error = false;
      state.message = "";
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    logError: (state, action: PayloadAction<string>) => {
      state.error = true;
      state.message = action.payload;
    },
    logOut: (state) => {
      state.isLoggedIn = false;
      state.error = false;
      state.message = "";
    },
  },
});

// Other code such as selectors can use the imported `RootState` type
export const onLogin = (user: User) => {
  return async (dispatch: AppDispatch) => {
    try {
      const request = await axios.post(
        "https://netlecture-api.vercel.app/user/token/",
        user
      );
      if ((request.status = 200)) {
        dispatch(
          logSuccess({
            accessToken: request.data?.access,
            refreshToken: request.data?.refresh,
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

export const { logSuccess, logOut, logError } = loginSlice.actions;

export default loginSlice.reducer;

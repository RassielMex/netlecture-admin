import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../models/User";

import type { AppDispatch } from "../store";
import axios from "axios";

// Define a type for the slice state
interface LoginState {
  isLoggedIn: boolean;
  error: boolean;
  message: string;
}

// Define the initial state using that type
const initialState: LoginState = {
  isLoggedIn: false,
  error: false,
  message: "",
};

export const loginSlice = createSlice({
  name: "login",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    logSuccess: (state) => {
      state.isLoggedIn = true;
      state.error = false;
      state.message = "";
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
      const request = await axios.post("", user);
      if ((request.status = 200)) {
        dispatch(logSuccess());
      }
    } catch (error) {
      dispatch(logError("Error al intentar acceder"));
    }
  };
};

export const { logSuccess, logOut, logError } = loginSlice.actions;

export default loginSlice.reducer;

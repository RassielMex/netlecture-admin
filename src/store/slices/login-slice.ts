import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { User } from "../../models/User";
import { app } from "../../services/firebase";
import type { AppDispatch } from "../store";

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
  return (dispatch: AppDispatch) => {
    const auth = getAuth(app);
    const { email, password } = user;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        //const _user = userCredential.user;
        dispatch(logSuccess());
        // ...
      })
      .catch((error) => {
        //const errorCode = error.code;
        const errorMessage = error.message;
        dispatch(logError(errorMessage));
      });
  };
};

export const { logSuccess, logOut, logError } = loginSlice.actions;

export default loginSlice.reducer;

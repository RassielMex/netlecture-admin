import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookFromAPI, grade } from "../../models/Book";
import type { AppDispatch } from "../store";
import axios from "axios";

// Define a type for the slice state
interface BooksState {
  books: BookFromAPI[];
  loading: boolean;
  error: boolean;
  message: string;
  filters: grade[];
}

// Define the initial state using that type
const initialState: BooksState = {
  books: [],
  loading: false,
  error: false,
  message: "",
  filters: [grade.First],
};

export const BooksSlice = createSlice({
  name: "Books",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    onRequest: (state) => {
      state.loading = true;
      state.message = "";
      state.error = false;
    },
    onFailed: (state, action: PayloadAction<{ message: string }>) => {
      state.loading = false;
      state.message = action.payload.message;
      state.error = true;
    },
    onSuccess: (state) => {
      state.loading = false;
      state.message = "";
      state.error = false;
    },
    replaceBooks: (state, action: PayloadAction<BookFromAPI[]>) => {
      state.books = action.payload.slice();
    },
  },
});

export const getBooks = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(onRequest());
    try {
      const { data } = await axios.get<BookFromAPI[]>("");
      dispatch(replaceBooks(data));
    } catch (error: any) {
      dispatch(
        onFailed({
          message: "Error al intentar cargar los datos",
        })
      );
    }
  };
};

export const onDelete = (id: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(onRequest());
    try {
      const request = await axios.delete("");
      if (request.status === 400) {
        dispatch(onSuccess());
      }
    } catch (error) {
      dispatch(
        onFailed({
          message: "Error: No se eliminó el elemento",
        })
      );
    }
  };
};

export const { onRequest, onFailed, onSuccess, replaceBooks } =
  BooksSlice.actions;

export default BooksSlice.reducer;

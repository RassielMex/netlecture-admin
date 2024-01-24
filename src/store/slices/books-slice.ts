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
  detailedBook: BookFromAPI | null;
}

// Define the initial state using that type
const initialState: BooksState = {
  books: [],
  loading: false,
  error: false,
  message: "",
  filters: [grade.First],
  detailedBook: null,
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
      state.message = "Request Success";
      state.error = false;
    },
    replaceBooks: (state, action: PayloadAction<BookFromAPI[]>) => {
      state.books = action.payload.slice();
    },
    setFilters: (state, action: PayloadAction<grade[]>) => {
      state.filters = action.payload.slice();
    },
    replaceDetailedBook: (state, action: PayloadAction<BookFromAPI>) => {
      state.detailedBook = action.payload;
    },
    emptyDetailedBook: (state) => {
      state.detailedBook = null;
    },
  },
});

export const getBooks = (token: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const { data } = await axios.get<BookFromAPI[]>(
        process.env.REACT_APP_API_BASE + "/api/books/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //console.log(data);
      dispatch(replaceBooks(data));
      dispatch(onSuccess());
    } catch (error: any) {
      dispatch(
        onFailed({
          message: "Error al intentar cargar los datos",
        })
      );
    }
  };
};

export const getBookById = (id: string, token: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(onRequest());
    try {
      const { data } = await axios.get<BookFromAPI>(
        process.env.REACT_APP_API_BASE + `/api/book/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //console.log(data);
      dispatch(replaceDetailedBook(data));
      dispatch(onSuccess());
    } catch (error) {
      dispatch(onFailed({ message: "No data con el id proporcionado" }));
    }
  };
};

export const onDelete = (id: string, token: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(onRequest());
    try {
      const request = await axios.delete(
        process.env.REACT_APP_API_BASE + `/api/book/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (request.status === 204) {
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

export const {
  onRequest,
  onFailed,
  onSuccess,
  replaceBooks,
  setFilters,
  replaceDetailedBook,
  emptyDetailedBook,
} = BooksSlice.actions;

export default BooksSlice.reducer;

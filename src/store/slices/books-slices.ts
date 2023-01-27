import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBook } from "../../models/Book";
import { app } from "../../services/firebase";
import type { AppDispatch } from "../store";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
} from "firebase/firestore";

export enum requestType {
  "DELETE",
  "RETRIEVE",
  "PATCH",
  "CREATE",
  "NULL",
}

// Define a type for the slice state
interface BooksState {
  books: IBook[];
  loading: boolean;
  error: boolean;
  message: string;
  booksFiltered: IBook[];
  requestType: requestType;
}

// Define the initial state using that type
const initialState: BooksState = {
  books: [],
  loading: false,
  error: false,
  message: "",
  booksFiltered: [],
  requestType: requestType.NULL,
};

export const BooksSlice = createSlice({
  name: "Books",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    onRequest: (state, action: PayloadAction<requestType>) => {
      state.requestType = action.payload;
      state.loading = true;
      state.message = "";
      state.error = false;
    },
    onFailed: (
      state,
      action: PayloadAction<{ requestType: requestType; message: string }>
    ) => {
      state.requestType = action.payload.requestType;
      state.loading = false;
      state.message = action.payload.message;
      state.error = true;
    },
    onSuccess: (state, action: PayloadAction<requestType>) => {
      state.requestType = action.payload;
      state.loading = false;
      state.message = "";
      state.error = false;
    },
    replaceBooks: (state, action: PayloadAction<IBook[]>) => {
      state.books = action.payload.slice();
      state.booksFiltered = action.payload.slice();
    },
    filterByTitle: (state, action: PayloadAction<string>) => {
      if (action.payload.length > 0) {
        state.booksFiltered = state.books.filter((book) => {
          const searchStr = action.payload.toUpperCase().trim();
          return book.titulo.toUpperCase().trim().includes(searchStr);
        });
      } else {
        state.booksFiltered = state.books.slice();
      }
    },
  },
});

export const onRetrieve = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(onRequest(requestType.RETRIEVE));
    try {
      const db = getFirestore(app);
      const querySnapshot = await getDocs(collection(db, "Libros"));
      if (!querySnapshot.empty) {
        dispatch(onSuccess(requestType.RETRIEVE));
        const dataArray: any = [];
        querySnapshot.forEach((doc) => {
          dataArray.push({ id: doc.id, ...doc.data() });
        });
        dispatch(replaceBooks(dataArray));
      }
    } catch (error: any) {
      dispatch(
        onFailed({
          requestType: requestType.RETRIEVE,
          message: "Error al intentar cargar los datos",
        })
      );
    }
  };
};

export const onDelete = (id: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(onRequest(requestType.DELETE));
      const db = getFirestore(app);
      await deleteDoc(doc(db, "Libros", id));
      dispatch(onSuccess(requestType.DELETE));
    } catch (error) {
      dispatch(
        onFailed({
          requestType: requestType.DELETE,
          message: "Error: No se eliminó el elemento",
        })
      );
    }
  };
};

export const { onRequest, onFailed, onSuccess, replaceBooks, filterByTitle } =
  BooksSlice.actions;

export default BooksSlice.reducer;

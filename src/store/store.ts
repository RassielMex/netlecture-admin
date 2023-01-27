import { configureStore } from "@reduxjs/toolkit";
import BooksSlice from "./slices/books-slices";
import LoginSlice from "./slices/login-slice";

export const store = configureStore({
  reducer: { login: LoginSlice, books: BooksSlice },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

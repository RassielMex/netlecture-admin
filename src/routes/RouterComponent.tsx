import React from "react";
import { createBrowserRouter } from "react-router-dom";
import BooksContainer from "../components/BooksContainer";
import Login from "../views/Login";
import Main from "../views/Main";
import RequiresLogin from "./RequiresLogin";
import BookForm from "../components/BookForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequiresLogin>
        <Main />
      </RequiresLogin>
    ),
    children: [
      { index: true, element: <BooksContainer /> },
      { path: "edit/:id", element: <BookForm /> },
      { path: "add", element: <BookForm /> },
    ],
  },
  { path: "login", element: <Login /> },
  { path: "*", element: <p>we couldnt find that!!</p> },
]);

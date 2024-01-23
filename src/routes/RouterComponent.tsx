import React from "react";
import { createBrowserRouter } from "react-router-dom";
import BooksContainer from "../components/Books/BooksContainer";
import Login from "../views/Login";
import Main from "../views/Main";
import RequiresLogin from "./RequiresLogin";
import BookForm from "../components/Books/BookForm";
import AuthorsContainer from "../components/Authors/AuthorsContainer";
import GenresContainer from "../components/Genres/GenresContainer";

export const router = createBrowserRouter([
  {
    path: "admin",
    element: (
      <RequiresLogin>
        <Main />
      </RequiresLogin>
    ),
    children: [
      { index: true, element: <BooksContainer /> },
      { path: "authors", element: <AuthorsContainer /> },
      { path: "genres", element: <GenresContainer /> },
      { path: "book/:id", element: <BookForm /> },
      { path: "book/add", element: <BookForm /> },
    ],
  },
  { path: "login", element: <Login /> },
  { path: "*", element: <p>we couldnt find that!!</p> },
]);

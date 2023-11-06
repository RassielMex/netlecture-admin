import React from "react";
import { createBrowserRouter } from "react-router-dom";
import AddBookContainer from "../components/AddBookContainer";
import BooksContainer from "../components/BooksContainer";
import EditBookContainer from "../components/EditBookContainer";
import Login from "../views/Login";
import Main from "../views/Main";
import RequiresLogin from "./RequiresLogin";

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
      { path: "edit/:id", element: <EditBookContainer /> },
      { path: "add", element: <AddBookContainer /> },
    ],
  },
  { path: "login", element: <Login /> },
  { path: "*", element: <p>we couldnt find that!!</p> },
]);

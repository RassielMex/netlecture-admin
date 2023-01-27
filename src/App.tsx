import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/RouterComponent";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;

import React from "react";
import { Outlet } from "react-router-dom";
import MainAppBar from "../components/MainAppBar";

type Props = {};

const Main = (props: Props) => {
  return (
    <>
      <MainAppBar />
      <Outlet />
    </>
  );
};

export default Main;

import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";
import { RootState } from "../store/store";

type Props = {
  children: JSX.Element;
};

const RequiresLogin = (props: Props) => {
  const isLoggedIn = useAppSelector((state: RootState) => {
    return state.login.isLoggedIn;
  });

  if (!isLoggedIn) {
    return <Navigate to={"/Login"} replace={true} />;
  }
  return props.children;
};

export default RequiresLogin;

import { Stack } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import LoginForm from "../components/LoginForm";

type Props = {};

const Login = (props: Props) => {
  return (
    <div className="w-screen h-screen bg-login-gradient bg-no-repeat bg-cover">
      <div className="flex flex-col justify-center items-center h-full">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;

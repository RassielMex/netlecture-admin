import { Stack } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import LoginForm from "../components/LoginForm";

const backImg = require("../img/image.png");

type Props = {};

const Login = (props: Props) => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${backImg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        width: "100wv",
        height: "100vh",
        margin: 0,
      }}
    >
      <Stack alignItems="center" justifyContent="center" height="100%">
        <LoginForm />
      </Stack>
    </Box>
  );
};

export default Login;

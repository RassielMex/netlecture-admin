import {
  Button,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { FormEvent, useRef } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { User } from "../models/User";
import { onLogin } from "../store/slices/login-slice";
import { RootState } from "../store/store";

type Props = {};

const LoginForm = (props: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state: RootState) => {
    return state.login.isLoggedIn;
  });
  const error = useAppSelector((state: RootState) => {
    return state.login.error;
  });
  const errorMessage = useAppSelector((state: RootState) => {
    return state.login.message;
  });

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handlerSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (emailRef.current && passwordRef.current) {
      const user: User = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
      dispatch(onLogin(user));
    }
  };
  return (
    <>
      {isLoggedIn ? (
        <Navigate to={"/"} replace />
      ) : (
        <Paper
          variant="elevation"
          elevation={10}
          sx={{
            width: `${isMobile ? "240px" : "300px"}`,
            padding: "24px",
            height: `${isMobile ? "260px" : "320px"}`,
          }}
        >
          <Stack direction={"column"} justifyContent="center" height="100%">
            <form onSubmit={handlerSubmit}>
              <Typography
                variant="h5"
                marginBottom={"16px"}
                color="#1976D2"
                fontWeight={500}
              >
                Ingrese su cuenta
              </Typography>
              <Stack spacing={4} alignItems="center">
                <TextField
                  id="mail"
                  label="email"
                  variant="outlined"
                  size="small"
                  fullWidth
                  inputRef={emailRef}
                />
                <TextField
                  id="password"
                  label="password"
                  variant="outlined"
                  type="password"
                  size="small"
                  fullWidth
                  inputRef={passwordRef}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    borderRadius: "16px",
                  }}
                >
                  Entrar
                </Button>
              </Stack>
            </form>
            {error && (
              <Typography
                variant="body2"
                textAlign={"center"}
                color="red"
                marginTop="8px"
              >
                {errorMessage}
              </Typography>
            )}
          </Stack>
        </Paper>
      )}
    </>
  );
};

export default LoginForm;

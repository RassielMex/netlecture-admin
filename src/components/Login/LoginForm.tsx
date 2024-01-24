import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { User } from "../../models/User";
import { onLogin } from "../../store/slices/login-slice";
import { RootState } from "../../store/store";
import { FormEvent, useRef } from "react";
import { Button, Label, TextInput } from "flowbite-react";

type Props = {};

const LoginForm = (props: Props) => {
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

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handlerSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (usernameRef.current && passwordRef.current) {
      const user: User = {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      };
      dispatch(onLogin(user));
    }
  };
  return (
    <>
      {isLoggedIn ? (
        <Navigate to={"/admin"} replace />
      ) : (
        <div className="shadow-md min-w-max w-1/4 bg-white p-8 rounded-md">
          <div className="flex flex-col justify-center h-full">
            <form onSubmit={handlerSubmit}>
              <p className="text-2xl mb-4 text-sky-800 font-semibold text-center">
                Ingrese su cuenta
              </p>
              <div className="flex flex-col items-center gap-y-4">
                <Label
                  htmlFor="username"
                  value="Your username"
                  className="w-full"
                />
                <TextInput
                  id="username"
                  placeholder="jhon123"
                  required
                  ref={usernameRef}
                  className="w-full"
                />
                <Label
                  htmlFor="password"
                  value="Your password"
                  className="w-full"
                />
                <TextInput
                  id="password"
                  type="password"
                  required
                  ref={passwordRef}
                  className="w-full"
                />
                <Button color="blue" type="submit" className="w-full">
                  Entrar
                </Button>
              </div>
            </form>
            {error && (
              <p className="text-center text-red-600 mt-4">{errorMessage}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default LoginForm;

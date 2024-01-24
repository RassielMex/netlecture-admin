import React from "react";
import LoginForm from "../components/LoginForm";
import { Modal, Spinner } from "flowbite-react";
import { useAppSelector } from "../hooks/hooks";

type Props = {};

const Login = (props: Props) => {
  const loading = useAppSelector((state) => {
    return state.login.loading;
  });
  return (
    <div className="w-screen h-screen bg-login-gradient bg-no-repeat bg-cover">
      <div className="flex flex-col justify-center items-center h-full">
        <LoginForm />
        <Modal show={loading} size={"sm"}>
          <Modal.Body>
            <Spinner />
            <span className="ml-2">Ingresando...</span>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default Login;

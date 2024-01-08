import {
  StyledBoxForm,
  StyledImgForm,
  StyledFormContainer,
  StyledInputForm,
} from "../../components/common/StyledForm";
import logo from "../../assets/img/logo.png";
import { StyledButton } from "../../components/common/StyledButton";
import { Navigate } from "react-router-dom";
import React from "react";
import { LoginProps } from "../../interfaces/props/PropsInterface";
import { ToastContainer } from "react-toastify";

export const LoginPage: React.FC<LoginProps> = ({
  handleOnSubmit,
  userLogin,
  checkLogin
}) => {
  const url: string | null = localStorage.getItem("lastRoute");

  console.log(userLogin)

  return (
    <>
    <ToastContainer></ToastContainer>
    <StyledBoxForm>
      {userLogin !== "" && <Navigate to={`${url}`} />}
      <StyledImgForm src={logo}></StyledImgForm>
      <StyledFormContainer
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleOnSubmit(e)}
      >
        <StyledInputForm
          placeholder="Email"
          type="email"
          data-cy="inputUserEmail"
        ></StyledInputForm>
        <StyledInputForm
          placeholder="Password"
          type="password"
          data-cy="inputUserPassword"
        ></StyledInputForm>
        <StyledButton name="login" type="submit" data-cy="loginButton">
          LOGIN
        </StyledButton>
      </StyledFormContainer>
    </StyledBoxForm>
    </>
  );
};

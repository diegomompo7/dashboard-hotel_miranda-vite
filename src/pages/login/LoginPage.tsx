import {
  StyledBoxForm,
  StyledImgForm,
  StyledFormContainer,
  StyledInputForm,
} from "../../components/common/StyledForm";
import logo from "../../assets/img/logo.png";
import { StyledButton } from "../../components/common/StyledButton";
import {Navigate, useNavigate } from "react-router-dom";
import React from "react";
import { LoginProps } from "../../interfaces/props/PropsInterface";
import { ToastContainer, toast } from "react-toastify";

export const LoginPage: React.FC<LoginProps> = ({
  userLogin,
  checkLogin,
  setUserLogin
}) => {
  const url: string | null = localStorage.getItem("lastRoute");

  const navigate = useNavigate()

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await fetch(import.meta.env.VITE_API + "auth/user/", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: (e.target as any)[0].value,
          password: (e.target as any)[1].value
        })
      })

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem("token", data);
        checkLogin = true;
        setUserLogin(data);

      } else {
        toast.error("Invalid username or password", {
          position: "bottom-center",
          autoClose: 5000,
          closeOnClick: true,
          theme: "colored",
        });
        checkLogin = false;
      }
    } catch (e) {
      console.error("Error", e)
    }
  }

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
        <p>email: andrea83@gmail.com</p>
        <p>password: matumevalifopid</p>
      </StyledFormContainer>
    </StyledBoxForm>
    </>
  );
};

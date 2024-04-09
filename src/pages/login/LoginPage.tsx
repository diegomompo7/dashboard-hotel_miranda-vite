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
      const response = await fetch('http://15.188.49.158/admin/', {
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `username=${encodeURIComponent((e.target as any)[0].value)}&password=${encodeURIComponent((e.target as any)[1].value)}`,
        credentials: 'include'
      })

      if (response.redirected && response.url.includes('/admin/')) {
        // Redireccionar al panel de administración
        window.location.href = response.url;
      } else {
        // El inicio de sesión falló
        toast.error("Invalid username or password", {
            position: "bottom-center",
            autoClose: 5000,
            closeOnClick: true,
            theme: "colored",
        });
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
          type="text"
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

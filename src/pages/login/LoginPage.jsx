import {
  StyledBoxForm,
  StyledImgForm,
  StyledFormContainer,
  StyledInputForm
} from "../../components/common/StyledForm";
import logo from "../../assets/img/logo.png";
import { StyledButton } from "../../components/common/StyledButton";
import { Navigate } from "react-router-dom";



export const LoginPage = ({handleOnSubmit, userLogin}) => {


    const url = localStorage.getItem('lastRoute');
    

  return (
  
    <StyledBoxForm>

      {userLogin!=="" && <Navigate to={`${url}`}/>}

      <StyledImgForm src={logo}></StyledImgForm>
      <StyledFormContainer onSubmit={(e) => handleOnSubmit(e)}>
        <StyledInputForm
          placeholder="Email"
          type="email"
          variant="email"
          data-cy="inputUserEmail"
        ></StyledInputForm>
        <StyledInputForm
          placeholder="Password"
          type="password"
          variant="password"
          data-cy="inputUserPassword"
        ></StyledInputForm>
        <StyledButton name="login" type="submit" data-cy="loginButton">LOGIN</StyledButton>
      </StyledFormContainer>
    </StyledBoxForm>
  );
};

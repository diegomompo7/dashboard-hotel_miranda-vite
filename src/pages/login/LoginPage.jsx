import {
  StyledBoxForm,
  StyledImgForm,
  StyledFormContainer,
  StyledInputForm
} from "../../components/common/StyledForm";
import logo from "../../assets/img/logo.png";
import { StyledButton } from "../../components/common/StyledButton";
import { Navigate } from "react-router-dom";



export const LoginPage = ({handleOnSubmit, userLogin, url}) => {

    

  return (
  
    <StyledBoxForm>

      {userLogin!=="" && <Navigate to={`${url}`}/>}

      <StyledImgForm src={logo}></StyledImgForm>
      <StyledFormContainer onSubmit={(e) => handleOnSubmit(e)}>
        <StyledInputForm
          placeholder="Email"
          type="email"
          variant="email"
        ></StyledInputForm>
        <StyledInputForm
          placeholder="Password"
          type="password"
          variant="password"
        ></StyledInputForm>
        <StyledButton name="login" type="submit">LOGIN</StyledButton>
      </StyledFormContainer>
    </StyledBoxForm>
  );
};

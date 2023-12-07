import { StyledButton } from "../../components/common/StyledButton";
import {
  StyledBoxForm,
  StyledFormContainer,
  StyledImgForm,
  StyledInputForm,
  StyledTextAreaForm
} from "../../components/common/StyledForm";
import {
  StyledFormControl,
  StyledInputLabel,
  StyledSelect,
} from "../../components/common/StyledSelect";
import { MenuItem } from "@mui/material";
import logo from "../../assets/img/logo.png";
import {  createUser, getChangeData, getNewData, getUsersData, getUsersError, getUsersStatus} from "../../features/users/usersSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUsersFromApiTrunk } from "../../features/users/usersTrunk";

import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const NewUserPage = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const usersListData = useSelector(getUsersData);
  const usersListError = useSelector(getUsersError);
  const usersListStatus = useSelector(getUsersStatus);
  const [spinner, setSpinner] = useState(true);
  let userCreate= useSelector(getChangeData)

  useEffect(
    () => {

      if (usersListStatus === "idle") {
        dispatch(getUsersFromApiTrunk());
      } else if (usersListStatus === "pending") {
        setSpinner(true);
      } else if (usersListStatus === "fulfilled") {
        setSpinner(false)
      }
    },[
    dispatch,
    usersListData,
    usersListStatus]
  );


  let searchMax = usersListData.reduce(
    (prev, cur) => (prev?.id > cur.id ? prev : cur),
  );

  const [formData, setFormData] = useState({
    id:  searchMax.id + 1,
    photo:"",
    fullName:"",
    job: "",
    email: "",
    phone: "",
    startDate: "",
    descriptionJob: "",
    status: "",
    password: ""
  });


  const handleChange = (e) => 
  {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }



  const handleOnCreate = (e) => {
    e.preventDefault()
    dispatch(createUser(formData));
    toast.success('User created succesfull', {
      position: "bottom-center",
      autoClose: 5000,
      closeOnClick: true,
      theme: "colored",
      });
  }

  return (
    <StyledBoxForm name="createForm">
      {spinner ? <p>Loading...</p> : <>
      <StyledImgForm src={logo}></StyledImgForm>
      <StyledFormContainer
        name="createForm"
        onChange={(e) => {handleChange(e)}}
      >
        <StyledTextAreaForm
          placeholder="Photo"
          type="url"
          name="photo"
          rows="1"
        ></StyledTextAreaForm>
        <StyledInputForm
          placeholder="Full Name"
          type="text"
          name="fullName"
        ></StyledInputForm>
        <StyledInputForm
          placeholder="Job"
          type="text"
          name="job"
        ></StyledInputForm>
        <StyledInputForm
          placeholder="Email"
          type="email"
          name="email"
        ></StyledInputForm>
        <StyledInputForm
          placeholder="123456789"
          type="tel"
          name="phone"
          pattern="[0-9]{3}[0-9]{3}[0-9]{3}"
        ></StyledInputForm>
        <StyledInputForm
          placeholder="date"
          type="date"
          name="startDate"
        ></StyledInputForm>
        <StyledTextAreaForm
          placeholder="Description about job"
          type="text"
          name="descriptionJob"
          rows={2}
        ></StyledTextAreaForm>
        <StyledFormControl name="selectCreate">
          <StyledInputLabel>Status</StyledInputLabel>
          <StyledSelect name= "status" label="status" value={formData.status}    onChange={(e) => {handleChange(e)}}>
            <MenuItem value="ACTIVE">ACTIVE</MenuItem>
            <MenuItem value="INACTIVE">INACTIVE</MenuItem>
          </StyledSelect>
        </StyledFormControl>
        <StyledInputForm
          placeholder="Password"
          type="Password"
          name="password"
        ></StyledInputForm>

        <StyledButton name="new" type="submit" onClick={(e) => {handleOnCreate(e), navigate("/users")}}>
          UPDATE EMPLOYEE
        </StyledButton>
      </StyledFormContainer>
      </>}
    </StyledBoxForm>
  );
};

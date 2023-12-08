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
import { useState, useEffect } from "react";
import { getUsersData, getUsersError, getUsersStatus, updateUser } from "../../features/users/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { getUsersFromApiTrunk } from "../../features/users/usersTrunk";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const EditUserPage = () => {

  const url = new URL(window.location.href)
  const id = url.pathname.split("/").slice(2,3).join("")


  const navigate = useNavigate()
  const dispatch = useDispatch();
  const usersListData = useSelector(getUsersData);
  const usersListError = useSelector(getUsersError);
  const usersListStatus = useSelector(getUsersStatus);
  const [spinner, setSpinner] = useState(true);

  

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


  const userId = usersListData.find((user) => parseInt(user.id) == id)


  const [formData, setFormData] = useState({
    photo: userId.photo,
    fullName: userId.fullName,
    job: userId.job,
    email: userId.email,
    phone: userId.phone,
    startDate: userId.startDate,
    descriptionJob: userId.descriptionJob,
    status: userId.status,
    password: userId.password
  });

  const handleChange = (e) => 
  {

    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
   
    dispatch(updateUser({ id: userId.id, formData: formData }));
    toast.success('User updated succesfull', {
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
          value={formData.photo}
          placeholder="Photo"
          type="url"
          name="photo"
          rows="1"
        ></StyledTextAreaForm>
        <StyledInputForm
          value={formData.fullName}
          placeholder="Full Name"
          type="text"
          name="fullName"
        ></StyledInputForm>
        <StyledInputForm
        value={formData.job}
          placeholder="Job"
          type="text"
          name="job"
        ></StyledInputForm>
        <StyledInputForm
        value={formData.email}
          placeholder="Email"
          type="email"
          name="email"
        ></StyledInputForm>
        <StyledInputForm
        value={formData.phone}
          placeholder="123456789"
          type="tel"
          name="phone"
          pattern="[0-9]{3}[0-9]{3}[0-9]{3}"
        ></StyledInputForm>
        <StyledInputForm
        value={formData.startDate}
  
          placeholder="YYYY/MM/DD"
          type="text"
          name="startDate"
        ></StyledInputForm>
        <StyledTextAreaForm
          value={formData.descriptionJob}
          placeholder="Description about job"
          type="text"
          name="descriptionJob"
          rows={2}
        ></StyledTextAreaForm>
        <StyledFormControl name="selectCreate">
          <StyledInputLabel>Status</StyledInputLabel>
          <StyledSelect name= "status" label="status" value={formData.status} onChange={(e) => {handleChange(e)}}>
            <MenuItem value="ACTIVE">ACTIVE</MenuItem>
            <MenuItem value="INACTIVE">INACTIVE</MenuItem>
          </StyledSelect>
        </StyledFormControl>
        <StyledInputForm

          value={formData.password}
          placeholder="Password"
          type="Password"
          name="password"
        ></StyledInputForm>

        <StyledButton name="new" type="submit" onClick={(e) => {handleOnSubmit(e), navigate("/users")}}>
          UPDATE EMPLOYEE
        </StyledButton>
      </StyledFormContainer>
      </>}
    </StyledBoxForm>
  );
};

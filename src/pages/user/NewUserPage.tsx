import { StyledButton } from "../../components/common/StyledButton";
import {
  StyledBoxForm,
  StyledFormContainer,
  StyledImgForm,
  StyledInputForm,
  StyledTextAreaForm,
} from "../../components/common/StyledForm";
import { StyledSelect } from "../../components/common/StyledSelect";
import logo from "../../assets/img/logo.png";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import React, { ChangeEvent, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppDispatch } from "../../app/store";
import { UserInterface } from "../../../user/UserInterface";
import { fetchPOSTUser } from "../../features/users/usersTrunk";

export const NewUserPage = () => {
  const navigate: NavigateFunction = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const [formData, setFormData] = useState<UserInterface>({
    photo: "",
    fullName: "",
    job: "",
    email: "",
    phone: "",
    startDate: "",
    descriptionJob: "",
    status: "",
    password: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLFormElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOnCreate = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    const hasEmptyFieldsExceptSpecialRequest = Object.entries(formData).some(
      ([key, value]) =>
        value === null ||
        value === undefined ||
        value === "" ||
        value.length === 0
    );

    if (hasEmptyFieldsExceptSpecialRequest) {
      e.preventDefault();
      toast.error(`All fileds must be completed`, {
        position: "bottom-center",
        autoClose: 5000,
        closeOnClick: true,
        theme: "colored",
      });
    } else {
      e.preventDefault();
      dispatch(fetchPOSTUser(formData));
      toast.success("User created succesfull", {
        position: "bottom-center",
        autoClose: 5000,
        closeOnClick: true,
        theme: "colored",
      });
      navigate("/users");
    }
  };

  return (
    <StyledBoxForm name="createForm">
      <ToastContainer></ToastContainer>
      <StyledImgForm src={logo}></StyledImgForm>
      <StyledFormContainer
        name="createForm"
        onChange={(e: ChangeEvent<HTMLFormElement>) => {
          handleChange(e);
        }}
      >
        <StyledTextAreaForm
          placeholder="Photo"
          name="photo"
          rows={1}
        ></StyledTextAreaForm>
        <StyledInputForm
          placeholder="Full Name"
          type="text"
          name="fullName"
        ></StyledInputForm>
        <StyledInputForm
          placeholder="Password"
          type="Password"
          name="password"
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
          name="descriptionJob"
          rows={2}
        ></StyledTextAreaForm>
        <StyledSelect
          nameSelect="selectCreate"
          name="status"
          value={formData.status}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            handleChange(e);
          }}
        >
          <option value="" disabled selected hidden>
            Choose a Status
          </option>
          <option value="ACTIVE">ACTIVE</option>
          <option value="INACTIVE">INACTIVE</option>
        </StyledSelect>
        <StyledSelect
          nameSelect="selectCreate"
          name="job"
          value={formData.job}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            handleChange(e);
          }}
        >
          <option value="" disabled selected hidden>
            Choose a Job
          </option>
          <option value="Manager">Manager</option>
          <option value="Receptionist">Receptionist</option>
          <option value="Room Service">Room Service</option>
        </StyledSelect>

        <StyledButton
          name="new"
          type="submit"
          onClick={(e: any) => {
            handleOnCreate(e);
          }}
        >
          UPDATE EMPLOYEE
        </StyledButton>
      </StyledFormContainer>
    </StyledBoxForm>
  );
};

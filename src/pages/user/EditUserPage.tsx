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
import React, { useState, ChangeEvent } from "react";
import {
  getUsersData,
  getUsersError,
  getUsersStatus,
  updateUser,
} from "../../features/users/usersSlice";
import { useDispatch } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppDispatch, useAppSelector } from "../../app/store";
import { UserInterface } from "../../../user/UserInterface";

export const EditUserPage = () => {
  const url: URL = new URL(window.location.href);
  const id: string = url.pathname.split("/").slice(2, 3).join("");

  const navigate: NavigateFunction = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const usersListData = useAppSelector<UserInterface[]>(getUsersData);

  const userId: UserInterface = usersListData.find(
    (user) => user.id == parseInt(id)
  )!;

  const [formData, setFormData] = useState<UserInterface>({
    photo: userId.photo,
    fullName: userId.fullName,
    job: userId.job,
    email: userId.email,
    phone: userId.phone,
    startDate: userId.startDate,
    descriptionJob: userId.descriptionJob,
    status: userId.status,
    password: userId.password,
  });

  const handleChange = (
    e: ChangeEvent<HTMLFormElement | HTMLSelectElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOnSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();

    dispatch(updateUser({ id: userId.id, formData: formData }));
    toast.success("User updated succesfull", {
      position: "bottom-center",
      autoClose: 5000,
      closeOnClick: true,
      theme: "colored",
    });
  };

  return (
    <StyledBoxForm name="createForm">
      <StyledImgForm src={logo}></StyledImgForm>
      <StyledFormContainer
        name="createForm"
        onChange={(e: ChangeEvent<HTMLFormElement>) => {
          handleChange(e);
        }}
      >
        <StyledTextAreaForm
          value={formData.photo}
          placeholder="Photo"
          name="photo"
          rows={2}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
            handleChange(e);
          }}
        ></StyledTextAreaForm>
        <StyledInputForm
          value={formData.fullName}
          placeholder="Full Name"
          type="text"
          name="fullName"
        ></StyledInputForm>
        <StyledInputForm
          value={formData.password}
          placeholder="Password"
          type="Password"
          name="password"
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
          onClick={(e) => {
            handleOnSubmit(e), navigate("/users");
          }}
        >
          UPDATE EMPLOYEE
        </StyledButton>
      </StyledFormContainer>
    </StyledBoxForm>
  );
};

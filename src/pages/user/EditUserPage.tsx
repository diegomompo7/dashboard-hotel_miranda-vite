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
import React, { useState, ChangeEvent, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppDispatch, useAppSelector } from "../../app/store";
import { UserInterface } from "../../../user/UserInterface";
import { fetchPATCHUser, fetchUser, fetchUsers } from "../../features/users/usersTrunk";
import { getUserId, getUsersData, getUsersError, getUsersStatus } from "../../features/users/usersSlice";
import { ErrorPage } from "../error/ErrorPage";

export const EditUserPage = () => {
  const url: URL = new URL(window.location.href);
  const id: string = url.pathname.split("/").slice(2, 3).join("");

  const navigate: NavigateFunction = useNavigate();
  const dispatch: AppDispatch = useDispatch()

  const usersListData = useAppSelector<UserInterface[]>(getUsersData)!;
  const usersListDataId = useAppSelector<UserInterface>(getUserId)!;
  const usersListError = useAppSelector<string | undefined>(
    getUsersError
  );
  const  usersListStatus = useAppSelector<string>((state) => state.users.status);
  
  const [error, setError] = useState<string | null>(null);
  const [spinner, setSpinner] = useState<boolean>(true);

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

  useEffect(() => {
    console.log(usersListStatus)
    if (usersListStatus === "idle") {
      dispatch(fetchUser(id));
      dispatch(fetchUsers())
    } else if (usersListStatus === "pending") {
      setSpinner(true);
    } else if (usersListStatus === "rejected") {
      setError(usersListError!)
    } else if (usersListStatus === "fulfilled") {
      setSpinner(false);
      setFormData(usersListDataId)
      setError(null)
    }
  }, [dispatch, usersListDataId, usersListStatus, usersListData, id]);

    console.log(spinner)
    console.log(usersListDataId)

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

    dispatch(fetchPATCHUser({ id, formData }));
    toast.success("User updated succesfull", {
      position: "bottom-center",
      autoClose: 5000,
      closeOnClick: true,
      theme: "colored",
    });
  };

  return (
    <>
    {error !==  null ?   <ErrorPage error={error}></ErrorPage> : usersListDataId !== undefined && (
    <StyledBoxForm name="createForm">
      <StyledImgForm src={logo}></StyledImgForm>
      <StyledFormContainer
        name="createForm"
        onChange={(e: ChangeEvent<HTMLFormElement>) => {
          handleChange(e);
        }}
      >
        <StyledTextAreaForm
          value={usersListDataId.photo}
          placeholder="Photo"
          name="photo"
          rows={2}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
            handleChange(e);
          }}
        ></StyledTextAreaForm>
        <StyledInputForm
          value={usersListDataId.fullName}
          placeholder="Full Name"
          type="text"
          name="fullName"
        ></StyledInputForm>
        <StyledInputForm
          value={usersListDataId.password}
          placeholder="Password"
          type="Password"
          name="password"
        ></StyledInputForm>
        <StyledInputForm
          value={usersListDataId.email}
          placeholder="Email"
          type="email"
          name="email"
        ></StyledInputForm>
        <StyledInputForm
          value={usersListDataId.phone}
          placeholder="123456789"
          type="tel"
          name="phone"
          pattern="[0-9]{3}[0-9]{3}[0-9]{3}"
        ></StyledInputForm>
        <StyledInputForm
          value={usersListDataId.startDate}
          placeholder="YYYY/MM/DD"
          type="text"
          name="startDate"
        ></StyledInputForm>
        <StyledTextAreaForm
          value={usersListDataId.descriptionJob}
          placeholder="Description about job"
          name="descriptionJob"
          rows={2}
        ></StyledTextAreaForm>
        <StyledSelect
          nameSelect="selectCreate"
          name="status"
          value={usersListDataId.status}
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
          value={usersListDataId.job}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            handleChange(e);
          }}
        >
          <option value="" disabled selected hidden>
            Choose a Job
          </option>
          <option value="Manager">Manager</option>
          <option value="Receptionist">Receptionist</option>
          <option value="User Service">User Service</option>
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
    )}
    </>
  );
};

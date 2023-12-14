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

import { createRoom } from "../../features/rooms/roomsSlice";
import { useDispatch } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";
import React, { ChangeEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppDispatch } from "../../app/store";
import { RoomInterface } from "../../interfaces/room/RoomInterface";
export const NewRoomPage = () => {
  const navigate: NavigateFunction = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const [formData, setFormData] = useState<RoomInterface>({
    roomType: "",
    offer: "",
    photos: [],
    roomNumber: "",
    description: "",
    priceNight: 0,
    discount: 0,
    cancellation: "",
    amenities: [],
    status: "Available",
  });

  const handleChange = (
    e: ChangeEvent<HTMLFormElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      if (name === "amenities" || name === "photos") {
        return {
          ...prevData,
          [name]: value.split("\n"),
        };
      } else {
        return {
          ...prevData,
          [name]: value,
        };
      }
    });
  };

  const handleOnCreate = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
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
      dispatch(createRoom(formData));
      toast.success("Room created succesfull", {
        position: "bottom-center",
        autoClose: 5000,
        closeOnClick: true,
        theme: "colored",
      });
      navigate("/rooms");
    }
  };

  return (
    <StyledBoxForm name="createForm">
      <ToastContainer />
      <StyledImgForm src={logo}></StyledImgForm>
      <StyledFormContainer
        name="createForm"
        onChange={(e: ChangeEvent<HTMLFormElement>) => {
          handleChange(e);
        }}
      >
        <StyledSelect
          nameSelect="selectCreate"
          name="roomType"
          defaultValue={formData.roomType}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            handleChange(e);
          }}
        >
          <option value="" disabled selected hidden>
            Choose a Type
          </option>
          <option value="Single Bed">Single Bed</option>
          <option value="Double Bed">Double Bed</option>
          <option value="Double Superior">Double Superior</option>
          <option value="Suite">Suite</option>
        </StyledSelect>
        <StyledSelect
          nameSelect="selectCreate"
          name="offer"
          defaultValue={formData.offer}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            handleChange(e);
          }}
        >
          <option value="" disabled selected hidden>
            is Offer?
          </option>
          <option value="YES">YES</option>
          <option value="NO">NO</option>
        </StyledSelect>

        <StyledTextAreaForm
          placeholder="Introduce each photo on a new line"
          name="photos"
          rows={5}
          cols={10}
        ></StyledTextAreaForm>

        <StyledInputForm
          placeholder="Room Number"
          type="text"
          name="roomNumber"
        ></StyledInputForm>
        <StyledTextAreaForm
          placeholder="Description"
          name="description"
        ></StyledTextAreaForm>
        <StyledInputForm
          placeholder="Price per night"
          type="number"
          name="priceNight"
        ></StyledInputForm>
        <StyledInputForm
          placeholder="Discount"
          type="number"
          name="discount"
        ></StyledInputForm>
        <StyledInputForm
          placeholder="Cancelattion"
          type="text"
          name="cancellation"
        ></StyledInputForm>
        <StyledTextAreaForm
          placeholder="Amenities. Introduce each amenitie on a new line"
          name="amenities"
          rows={3}
        ></StyledTextAreaForm>

        <StyledButton
          name="new"
          type="submit"
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            handleOnCreate(e);
          }}
        >
          CREATE ROOM
        </StyledButton>
      </StyledFormContainer>
    </StyledBoxForm>
  );
};

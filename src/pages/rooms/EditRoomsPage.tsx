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
import {getRoomsStatus} from "../../features/rooms/roomsSlice";
import { useDispatch } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";
import React, { ChangeEvent, useEffect, useState } from "react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppDispatch, useAppSelector } from "../../app/store";
import { RoomInterface } from "../../interfaces/room/RoomInterface";
import { fetchPATCHRoom, fetchRoom } from "../../features/rooms/roomsTrunk";
import { StyledSpinner } from "../../components/spinner/StyledSpinner";
import { ErrorPage } from "../error/ErrorPage";

export const EditRoomsPage = () => {
  const url: URL = new URL(window.location.href);
  const id: string = url.pathname.split("/").slice(2, 3).join("");

  const navigate: NavigateFunction = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const roomsListStatus = useAppSelector<string>(getRoomsStatus);
  const [roomId, setRoomId] = useState<RoomInterface>();

  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<RoomInterface>({
    roomType: '',
    offer: '',
    photos: [],
    roomNumber:'',
    description:'',
    priceNight:0,
    discount:0,
    cancellation:'',
    amenities:[],
    status:'',
  });


  useEffect(() => {
    dispatch(fetchRoom(id)).unwrap().then((room) => {
      setFormData(room)
      setRoomId(room)
    }).catch((err) => setError(err.message))
}, [dispatch, id]);


  const handleChange = (
    e: ChangeEvent<HTMLFormElement | HTMLSelectElement | HTMLTextAreaElement> 
  ) => {
    const { name, value } = e.target;

    if (
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLSelectElement ||
      name === "description"
    ) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else if (e.target instanceof HTMLTextAreaElement) {
      // Tratamiento especial para el campo 'photos' que es un textarea
      setFormData((prevData) => ({
        ...prevData,
        [name]: Array.isArray(value) ? value : value.split("\n"),
      }));
    }
  };

  const handleOnSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();
    dispatch(fetchPATCHRoom({ id, formData }));
    toast.success("Room updated succesfull", {
      position: "bottom-center",
      autoClose: 5000,
      closeOnClick: true,
      theme: "colored",
    });
  };

  return (
    <>
    {error !==  null ?   <ErrorPage error={error}></ErrorPage> : (
    <StyledBoxForm name="createForm">
      <StyledImgForm src={logo}></StyledImgForm>
      {roomsListStatus === "pending" ?   <StyledSpinner>Loading...</StyledSpinner> : roomId &&(
      <StyledFormContainer
        name="createForm"
        onChange={(e: ChangeEvent<HTMLFormElement>) => {
          handleChange(e);
        }}
      >
        <StyledSelect
          nameSelect="selectCreate"
          name="roomType"
          defaultValue={roomId!.roomType}
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
          defaultValue={roomId!.offer}
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
          value={
            Array.isArray(formData.photos)
              ? formData.photos.join("\n")
              : formData.photos
          }
          placeholder="Photo"
          name="photos"
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
            handleChange(e);
          }}
          rows={5}
          cols={10}
        ></StyledTextAreaForm>

        <StyledInputForm
          placeholder="Room Number"
          value={formData.roomNumber}
          type="text"
          name="roomNumber"
        ></StyledInputForm>
        <StyledTextAreaForm
          placeholder="Description"
          value={formData.description}
          name="description"
        ></StyledTextAreaForm>
        <StyledInputForm
          value={formData.priceNight}
          placeholder="Price per night"
          type="number"
          name="priceNight"
        ></StyledInputForm>
        <StyledInputForm
          value={formData.discount === null ? "" : formData.discount.toString()}
          placeholder="Discount"
          type="number"
          name="discount"
        ></StyledInputForm>
        <StyledInputForm
          placeholder="Cancelattion"
          value={formData.cancellation}
          type="text"
          name="cancellation"
        ></StyledInputForm>
        <StyledTextAreaForm
          placeholder="Amenities"
          value={
            Array.isArray(formData.amenities)
              ? formData.amenities.join("\n")
              : formData.amenities
          }
          name="amenities"
          rows={3}
        ></StyledTextAreaForm>

        <StyledButton
          name="new"
          type="submit"
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            handleOnSubmit(e), navigate("/rooms");
          }}
        >
          UPDATE ROOM
        </StyledButton>
      </StyledFormContainer>
        )}
    </StyledBoxForm>
    )}
    </>
  );
};

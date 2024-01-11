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
import { getRoomId, getRoomsData, getRoomsError, getRoomsStatus} from "../../features/rooms/roomsSlice";
import { useDispatch } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";
import React, { ChangeEvent, useEffect, useState } from "react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppDispatch, useAppSelector } from "../../app/store";
import { RoomInterface } from "../../interfaces/room/RoomInterface";
import { fetchPATCHRoom, fetchRoom, fetchRooms } from "../../features/rooms/roomsTrunk";
import { StyledSpinner } from "../../components/spinner/StyledSpinner";
import { ErrorPage } from "../error/ErrorPage";

export const EditRoomsPage = () => {
  const url: URL = new URL(window.location.href);
  const id: string = url.pathname.split("/").slice(2, 3).join("");

  const navigate: NavigateFunction = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const roomsListData= useAppSelector<RoomInterface[]>(getRoomsData);
  const roomsListDataId = useAppSelector<RoomInterface>(getRoomId);
  const roomsListError = useAppSelector<string | undefined>(
    getRoomsError
  );
  const roomsListStatus = useAppSelector<string>(getRoomsStatus);
  const [spinner, setSpinner] = useState<boolean>(true);

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
    if (roomsListStatus === "idle") {
      dispatch(fetchRoom(id));
      dispatch(fetchRooms());
    } else if (roomsListStatus === "pending") {
      setSpinner(true);
    } else if (roomsListStatus === "rejected") {
      setError(roomsListError!)
    } else if (roomsListStatus === "fulfilled") {
      setSpinner(false);
      setFormData(roomsListDataId)
      setError(null)
    }
  }, [dispatch, roomsListData, roomsListDataId, roomsListStatus]);



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
    {error !==  null ?   <ErrorPage error={error}></ErrorPage> : roomsListDataId !== undefined && (
    <StyledBoxForm name="createForm">
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
          defaultValue={roomsListDataId.roomType}
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
          defaultValue={roomsListDataId.offer}
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
            Array.isArray(roomsListDataId.photos)
              ? roomsListDataId.photos.join("\n")
              : roomsListDataId.photos
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
          value={roomsListDataId.roomNumber}
          type="text"
          name="roomNumber"
        ></StyledInputForm>
        <StyledTextAreaForm
          placeholder="Description"
          value={roomsListDataId.description}
          name="description"
        ></StyledTextAreaForm>
        <StyledInputForm
          value={roomsListDataId.priceNight}
          placeholder="Price per night"
          type="number"
          name="priceNight"
        ></StyledInputForm>
        <StyledInputForm
          value={roomsListDataId.discount === null ? "" : roomsListDataId.discount.toString()}
          placeholder="Discount"
          type="number"
          name="discount"
        ></StyledInputForm>
        <StyledInputForm
          placeholder="Cancelattion"
          value={roomsListDataId.cancellation}
          type="text"
          name="cancellation"
        ></StyledInputForm>
        <StyledTextAreaForm
          placeholder="Amenities"
          value={
            Array.isArray(roomsListDataId.amenities)
              ? roomsListDataId.amenities.join("\n")
              : roomsListDataId.amenities
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
    </StyledBoxForm>
    )}
    </>
  );
};

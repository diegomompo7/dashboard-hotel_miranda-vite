import { StyledButton } from "../../components/common/StyledButton";
import {
  StyledBoxForm,
  StyledFormContainer,
  StyledImgForm,
  StyledInputForm,
  StyledTextAreaForm,
} from "../../components/common/StyledForm";
import {
  StyledFormControl,
  StyledInputLabel,
  StyledSelect,
} from "../../components/common/StyledSelect";
import { MenuItem } from "@mui/material";
import logo from "../../assets/img/logo.png";
import {  getChangeData, getNewData, getRoomsData, getRoomsError, getRoomsStatus, updateRoom } from "../../features/rooms/roomsSlice";
import { useDispatch, useSelector } from "react-redux";
import { getRoomsFromApiTrunk } from "../../features/rooms/roomsTrunk";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const EditRoomsPage = () => {

  const url = new URL(window.location.href)
  const id = url.pathname.split("/").slice(2,3).join("")

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const roomsListData = useSelector(getRoomsData);
  const roomsListError = useSelector(getRoomsError);
  const roomsListStatus = useSelector(getRoomsStatus);
  const [spinner, setSpinner] = useState(true);
 let roomUpdate= useSelector(getChangeData)

 useEffect(
  () => {

    if (roomsListStatus === "idle") {
      dispatch(getRoomsFromApiTrunk());
    } else if (roomsListStatus === "pending") {
      setSpinner(true);
    } else if (roomsListStatus === "fulfilled") {
      setSpinner(false)
    }
  },[
  dispatch,
  roomsListData,
  roomsListStatus]
);

  const roomId = roomsListData.find((room) => parseInt(room.id) == id)


  const [formData, setFormData] = useState({
    roomType: roomId.roomType,
    offer: roomId.offer,
    photos: roomId.photos.join("\n"),
    roomNumber: roomId.roomNumber,
    description: roomId.description,
    priceNight: roomId.priceNight,
    discount: roomId.discount,
    cancellation: roomId.cancellation,
    amenities: roomId.amenities.join("\n"),
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
    console.log(e.target)
    dispatch(updateRoom({ id: roomId.id, formData: formData }));
    toast.success('Room updated succesfull', {
      position: "bottom-center",
      autoClose: 5000,
      closeOnClick: true,
      theme: "colored",
    });
  }


  return (
    <StyledBoxForm name="createForm">
      <StyledImgForm src={logo}></StyledImgForm>
      <StyledFormContainer
        onSubmit={(e) => handleOnSubmit(e)}
        name="createForm"
        onChange={(e) => {handleChange(e)}}
      >
        <StyledFormControl name="selectCreate">
          <StyledInputLabel>Status</StyledInputLabel>
          <StyledSelect label="roomType" name="roomType" defaultValue={formData.roomType} onChange={(e) => {handleChange(e)}}>
            <MenuItem value="Single Bed">Single Bed</MenuItem>
            <MenuItem value="Double Bed">Double Bed</MenuItem>
            <MenuItem value="Double Superior">Double Superior</MenuItem>
            <MenuItem value="Suite">Suite</MenuItem>
          </StyledSelect>
        </StyledFormControl>
        <StyledFormControl name="selectCreate">
          <StyledInputLabel>Offer</StyledInputLabel>
          <StyledSelect label="offer" name="offer" defaultValue={formData.offer} onChange={(e) => {handleChange(e)}}>
            <MenuItem value="YES">YES</MenuItem>
            <MenuItem value="NO">NO</MenuItem>
          </StyledSelect>
        </StyledFormControl>

        <StyledTextAreaForm
          value={formData.photos}
          placeholder="Photo"
          type="url"
          name="photos"
          rows="5" cols="10"
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
          type="description"
          name="description"
        ></StyledTextAreaForm>
        <StyledInputForm
        value={formData.priceNight}
          placeholder="Price per night"
          type="number"
          name="priceNight"
        ></StyledInputForm>
        <StyledInputForm
        value={formData.discount}
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
          value={formData.amenities}
          type="text"
          name="amenities"
          rows={3}
        ></StyledTextAreaForm>

        <StyledButton name="new" type="submit" onClick={(e) => {handleOnSubmit(e), navigate("/rooms")}}>
          UPDATE ROOM
        </StyledButton>
      </StyledFormContainer>
    </StyledBoxForm>
  );
};

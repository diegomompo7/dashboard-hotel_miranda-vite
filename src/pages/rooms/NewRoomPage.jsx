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

import {  getChangeData, getNewData, getRoomsData, getRoomsError, getRoomsStatus, createRoom } from "../../features/rooms/roomsSlice";
import { useDispatch, useSelector } from "react-redux";
import { getRoomsFromApiTrunk } from "../../features/rooms/roomsTrunk";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { store } from "../../app/store";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export const NewRoomPage = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const roomsListData = useSelector(getRoomsData);
  const roomsListError = useSelector(getRoomsError);
  const roomsListStatus = useSelector(getRoomsStatus);
  const [spinner, setSpinner] = useState(true);
  let roomCreate= useSelector(getChangeData)

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

  
  
  let searchMax = roomsListData.reduce(
    (prev, cur) => (prev?.id > cur.id ? prev : cur),
  );

  const [formData, setFormData] = useState({
    id:  searchMax.id + 1,
    roomType: "",
    offer: "",
    photos: "",
    roomNumber: "",
    description: "",
    priceNight: "",
    discount: "",
    cancellation: "",
    amenities: "",
  });



  const handleChange = (e) => 
  {
    const { name, value } = e.target;
    setFormData((prevData) => {
      if (name === "amenities" || name ==="photos") {
        return {
          ...prevData,
          [name]: value,
        };
      } else {
        return {
          ...prevData,
          [name]: value,
        };
      }
    });
  }


  const handleOnCreate = (e) => {
    e.preventDefault()
    dispatch(createRoom(formData));
    toast.success('Room created succesfull', {
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
          <StyledSelect label="roomType" name="roomType" onChange={(e) => {handleChange(e)}}>
            <MenuItem value="Single Bed">Single Bed</MenuItem>
            <MenuItem value="Double Bed">Double Bed</MenuItem>
            <MenuItem value="Double Superior">Double Superior</MenuItem>
            <MenuItem value="Suite">Suite</MenuItem>
          </StyledSelect>
        </StyledFormControl>
        <StyledFormControl name="selectCreate">
          <StyledInputLabel>Offer</StyledInputLabel>
          <StyledSelect label="offer" name="offer" onChange={(e) => {handleChange(e)}}>
            <MenuItem value="YES">YES</MenuItem>
            <MenuItem value="NO">NO</MenuItem>
          </StyledSelect>
        </StyledFormControl>

        <StyledTextAreaForm
          placeholder="Introduce each photo on a new line"
          type="text"
          name="photos"
          rows="5" cols="10"
        ></StyledTextAreaForm>

        <StyledInputForm
          placeholder="Room Number"
          type="text"
          name="roomNumber"
        ></StyledInputForm>
        <StyledTextAreaForm
          placeholder="Description"
          type="description"
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
          type="text"
          name="amenities"
          rows="3"
        ></StyledTextAreaForm>

        <StyledButton name="new" type="submit" onClick={(e) => {handleOnCreate(e), navigate("/rooms")}}>
          CREATE ROOM
        </StyledButton>
      </StyledFormContainer>
    </StyledBoxForm>
  );
};

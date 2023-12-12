import { StyledButton } from "../../components/common/StyledButton";
import {
  StyledBoxForm,
  StyledFormContainer,
  StyledImgForm,
  StyledInputForm,
  StyledTextAreaForm,
  StyledInputDate
} from "../../components/common/StyledForm";
import {
  StyledFormControl,
  StyledInputLabel,
  StyledSelect,
} from "../../components/common/StyledSelect";
import { MenuItem } from "@mui/material";

import {getBookingsData, getBookingsError,  createBooking} from "../../features/bookings/bookingsSlice";
import { useDispatch, useSelector } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { getRoomsData, getRoomsStatus } from "../../features/rooms/roomsSlice";
import { getRoomsFromApiTrunk } from "../../features/rooms/roomsTrunk";

import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Dispatch } from "@reduxjs/toolkit";
import { BookingInterface } from "../../interfaces/booking/BookingInterface";
import { RoomInterface } from "../../interfaces/room/RoomInterface";

import logo  from "../../assets/img/logo.png";


export const NewBookingPage = () => {

  const navigate: NavigateFunction = useNavigate()
  const dispatch: Dispatch = useDispatch()
  const bookingsListData = useSelector <BookingInterface[]>(getBookingsData) as BookingInterface[]
  const bookingsListError = useSelector<string>(getBookingsError);
  const [spinner, setSpinner] = useState<boolean>(true);

  const roomBoking = useSelector<RoomInterface[]>(getRoomsData) as RoomInterface[]
  const roomsListStatus = useSelector<string>(getRoomsStatus);

  const [roomAvailable, setRoomAvailable] = useState<string[]>([])

  const now: Date = new Date();
  const nowDate: string = now.toISOString().slice(0, 16).replace("T", " ");

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
    roomBoking,
    roomsListStatus]
  );


  const [formData, setFormData] = useState({
    name: "",
    orderDate: nowDate,
    check_in: "",
    hour_in: "",
    check_out: "",
    hour_out: "",
    specialRequest: "",
    roomId: "",
  });



  const handleChange = (e:any):void => 
  {
    const { name, value } = e.target;

    setFormData((prevData) => {
      if (name === "roomId") {
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

    if(name === "check_in" || name === "check_out"){
     setRoomAvailable([])
    }
  
  }

  useEffect(() => {
    if(formData.check_in !== "" && formData.check_out !== "") {

    
      roomBoking.forEach(room => {
  
        const idBook = bookingsListData.filter(booking => booking.roomId === room.id)

        if(idBook.length === 0){
          roomAvailable.push(room.roomNumber)
        }
        
  
        idBook.forEach((checkDate) => {
        
          
        if(checkDate.check_in > formData.check_out || checkDate.check_out < formData.check_in){
          roomAvailable.push(room.roomNumber)
          }
        })
     })
    }
  }, [formData.check_in, formData.check_out])

  console.log(roomAvailable)


  const handleOnCreate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>):void => {
    e.preventDefault()
    dispatch(createBooking(formData));
    toast.success('Booking created succesfull', {
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
        name="createForm"
        onChange={(e) => {handleChange(e)}}
      >
        <StyledInputForm
          placeholder="Name and surname"
          type="text"
          name="name"
          rows="5" cols="10"
        ></StyledInputForm>

        <StyledInputDate>
        <label htmlFor="">Check In:  </label>
        <StyledInputForm
          label="Check In"
          placeholder="Check In"
          type="date"
          name="check_in"
        ></StyledInputForm>
        <label htmlFor="">Hour In:  </label>
        <StyledInputForm
          placeholder="Hour In"
          type="time"
          name="hour_in"
        ></StyledInputForm>
        <label htmlFor="">Check Out:  </label>
        <StyledInputForm
          placeholder="Check Out"
          type="date"
          name="check_out"
        ></StyledInputForm>
        <label htmlFor="">Hour Out:  </label>
                <StyledInputForm
          placeholder="Hour Out"
          type="time"
          name="hour_out"
        ></StyledInputForm>
        </StyledInputDate>
        <StyledTextAreaForm
          placeholder="Special Request"
          type="specialRequest"
          name="specialRequest"
        ></StyledTextAreaForm>
                <StyledFormControl name="selectRoom">
          <StyledInputLabel>Rooms Available</StyledInputLabel>
          <StyledSelect label="roomType" name="roomId" onChange={(e) => {handleChange(e)}}>

          {
      
            roomAvailable.length !== 0 &&
               roomAvailable.map((roomAva) => {
                
                const room = roomBoking.find(room => room.roomNumber === roomAva)

                return room !== undefined &&
                <MenuItem key={room.id} value={room.id}>
                  {roomAva}
                </MenuItem>
    
               })
          }
          </StyledSelect>
        </StyledFormControl>
      
        <StyledButton name="new" type="submit" onClick={(e) => {handleOnCreate(e), navigate("/booking")}}>
          CREATE ROOM
        </StyledButton>
      </StyledFormContainer>
    </StyledBoxForm>
  );
};

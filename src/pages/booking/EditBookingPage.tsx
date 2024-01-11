import { StyledButton } from "../../components/common/StyledButton";
import {
  StyledBoxForm,
  StyledFormContainer,
  StyledImgForm,
  StyledInputForm,
  StyledTextAreaForm,
  StyledInputDate,
} from "../../components/common/StyledForm";
import { StyledSelect } from "../../components/common/StyledSelect";

import {
  getBookingsData,
  getBookingsError,
  getBookingsStatus,
} from "../../features/bookings/bookingsSlice";
import { useDispatch } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";
import React, { ChangeEvent, useEffect, useState } from "react";

import { getRoomsData, getRoomsStatus } from "../../features/rooms/roomsSlice";
import { fetchRooms } from "../../features/rooms/roomsTrunk";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BookingInterface } from "../../interfaces/booking/BookingInterface";
import { RoomInterface } from "../../interfaces/room/RoomInterface";

import logo from "../../assets/img/logo.png";
import { AppDispatch, useAppSelector } from "../../app/store";
import { fetchBooking, fetchBookings, fetchPATCHBooking } from "../../features/bookings/bookingsTrunk";

export const EditBookingPage = () => {

  const url: URL = new URL(window.location.href);
  const id: string = url.pathname.split("/").slice(2, 3).join("");

  const navigate: NavigateFunction = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const bookingsListData = useAppSelector<BookingInterface[]>(getBookingsData);
  const bookingsListError = useAppSelector<string | undefined>(
    getBookingsError
  );
  const bookingsListStatus = useAppSelector<string>(getBookingsStatus);
  const [spinner, setSpinner] = useState<boolean>(true);

  const roomBoking = useAppSelector<RoomInterface[]>(getRoomsData);
  const roomsListStatus = useAppSelector<string>(getRoomsStatus);
  const [selectedRoom, setSelectedRoom] = useState<string>(''); // Set default value here
  const [roomAvailable, setRoomAvailable] = useState<string[]>([]);

  const now: Date = new Date();
  const nowDate: string = now.toISOString().slice(0, 16).replace("T", " ");
  const [bookingId, setBookingId] =  useState<BookingInterface>()
     const [formData, setFormData] = useState<BookingInterface>({
    name: '',
    orderDate: '',
    check_in: '',
    hour_in: '',
    check_out: '',
    hour_out: '',
    specialRequest: '',
    room: {
      photos: [],
      roomType: "",
      roomNumber: "",
      description: "",
      offer: "",
      priceNight: 0,
      discount: null,
      cancellation: "",
      amenities: [],
      status: ""
    }, // Puedes ajustar esto según el tipo de 'room'
    status: '',
  });


  
  useEffect(() => {
    if (roomsListStatus === "idle") {
      dispatch(fetchRooms());
    } else if (roomsListStatus === "pending") {
      setSpinner(true);
    } else if (roomsListStatus === "fulfilled") {
      setSpinner(false);
    }
  }, [dispatch, roomBoking, roomsListStatus]);

  useEffect(() => {
    if (bookingsListStatus === "idle") {
      dispatch(fetchBookings());
    } else if (bookingsListStatus === "pending") {
      setSpinner(true);
    } else if (bookingsListStatus === "fulfilled") {
      setSpinner(false);
    }
  }, [dispatch, bookingsListData, bookingsListStatus]);



   useEffect(() => {
    dispatch(fetchBooking(id)).then((action) => {
      if (fetchBooking.fulfilled.match(action)) {
      if(typeof action === "object" && typeof action.payload !== "string" &&  typeof action.payload !== undefined){
      setBookingId(action.payload)
      setFormData(action.payload)
      }
    }
    })
  }, [])


  

  const handleChange = (
    e: ChangeEvent<HTMLFormElement | HTMLSelectElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;


    if (
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLSelectElement ||
      e.target instanceof HTMLTextAreaElement
    ) {
      setFormData((prevData) => {
        if (name === "room") {
          return {
            ...prevData,
            [name]: JSON.parse(value),
          };
        } else {
          return {
            ...prevData,
            [name]: value,
          };
        }
      });
    }

    if (name === "check_in" || name === "check_out") {
      setRoomAvailable([]);
    }
  };

  useEffect(() => {
    if (formData.check_in !== "" && formData.check_out !== "") {
      roomBoking.forEach((rooms: RoomInterface) => {
        const idBook: BookingInterface[] = bookingsListData.filter(
          (booking: BookingInterface) => booking.room._id === rooms._id
        );




        if (idBook.length === 0) {
          roomAvailable.push(rooms.roomNumber);
        }

        idBook.every((checkDate) => {

          if (
            checkDate.check_in > formData.check_out ||
            checkDate.check_out < formData.check_in
          ) {

            if(!roomAvailable.includes(rooms.roomNumber)){
            roomAvailable.push(rooms.roomNumber);
            }
          } else{
            let delRoom = roomAvailable.findIndex( room => room == rooms.roomNumber)
            roomAvailable.splice(delRoom, 1);
            return false

          }
        });
      });

    }
  }, [formData!.check_in, formData!.check_out]);

  const handleOnUpdate = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();

    if (
      new Date(formData.check_in) <= new Date(nowDate) ||
      new Date(formData.check_out) <= new Date(nowDate)
    ) {
      toast.error(`The Date must be elderly than actual Date`, {
        position: "bottom-center",
        autoClose: 5000,
        closeOnClick: true,
        theme: "colored",
      });
    } else if (formData.room._id === 0) {
      toast.error(`All fileds must be completed`, {
        position: "bottom-center",
        autoClose: 5000,
        closeOnClick: true,
        theme: "colored",
      });
    } else {
      dispatch(fetchPATCHBooking({id, formData}));
      toast.success("Updated created succesfull", {
        position: "bottom-center",
        autoClose: 5000,
        closeOnClick: true,
        theme: "colored",
      });
      navigate("/booking");
    }
  };


  return (
    <>
    <ToastContainer />
    {bookingId && 
    <StyledBoxForm name="createForm">
      <StyledImgForm src={logo}></StyledImgForm>
      <StyledFormContainer
        name="createForm"
        onChange={(e: ChangeEvent<HTMLFormElement>) => handleChange(e)}
      >
        <StyledInputForm
          placeholder="Name and surname"
          type="text"
          alignInput="center"
          name="name"
          defaultValue={bookingId!.name}
        ></StyledInputForm>

        <StyledInputDate>
          <label htmlFor="">Check In: </label>
          <StyledInputForm
            placeholder="Check In"
            type="date"
            name="check_in"
            defaultValue={bookingId!.check_in}
          ></StyledInputForm>
          <label htmlFor="">Hour In: </label>
          <StyledInputForm
            placeholder="Hour In"
            type="time"
            name="hour_in"
            defaultValue={bookingId!.hour_in}
          ></StyledInputForm>
          <label htmlFor="">Check Out: </label>
          <StyledInputForm
            placeholder="Check Out"
            type="date"
            name="check_out"
            defaultValue={bookingId!.check_out}
          ></StyledInputForm>
          <label htmlFor="">Hour Out: </label>
          <StyledInputForm
            placeholder="Hour Out"
            type="time"
            name="hour_out"
            defaultValue={bookingId!.hour_out}
          ></StyledInputForm>
        </StyledInputDate>
        <StyledTextAreaForm
          placeholder="Special Request"
          name="specialRequest"
          defaultValue={bookingId!.specialRequest}
        ></StyledTextAreaForm>

        <StyledSelect
          nameSelect="selectRoom"
          name="room"
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            handleChange(e);
          }}
        >
          <option value="" selected hidden>
            Choose a Room Available
          </option>
          {roomAvailable.length !== 0 &&
            roomAvailable.map((roomAva: string) => {
              const room = roomBoking.find(
                (room: RoomInterface) => room.roomNumber === roomAva
              );

                if (room !== undefined) {
                  if(roomAva === bookingId!.room.roomNumber){
                    return (
                    <option key={room._id} value={JSON.stringify(room)} selected>
                    {roomAva}
                  </option> )
                  }else{
                    return (
                  <option key={room._id} value={JSON.stringify(room)}>
                    {roomAva}
                  </option>
                  )}
                }
              })
            })
        </StyledSelect>

        <StyledSelect
          nameSelect="selectRoom"
          name="status"
          defaultValue={bookingId!.status}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            handleChange(e);
          }}
        >
          <option value="" disabled selected hidden>
            Select a Status
          </option>
          <option value="Check In"> Check In</option>
          <option value="Check Out"> Check Out</option>
          <option value="In Progress"> In Progress</option>
  
        </StyledSelect>

        <StyledButton
          name="new"
          type="submit"
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            handleOnUpdate(e);
          }}
        >
          UPDATE ROOM
        </StyledButton>
      </StyledFormContainer>
    </StyledBoxForm>
    }
    </>
  );
}

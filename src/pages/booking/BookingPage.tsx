import { DataTableBooking } from "./DataTableBooking";
import { StyledTable, StyledTableCellRow } from "../../components/common/StyledTable.ts";
import React, { ChangeEvent, useEffect, useState } from "react";
import { StyledNav, StyledNavText } from "../../components/common/StyledNav.ts";
import { StyledTextField } from "../../components/common/StyledTextField.ts";
import { StyledSelect } from "../../components/common/StyledSelect.ts";
import { StyledPagination, StyledPaginationText , StyledButtonPage, StyledTextPage} from "../../components/common/StyledPagination.ts";
import { StyledButton } from "../../components/common/StyledButton.ts";
import { ModalComponent } from "../../components/ModalComponent/ModalComponent.tsx";
import { useDispatch } from "react-redux";

import { getBookingsData,  getBookingsStatus, getClient, getSelect } from "../../features/bookings/bookingsSlice.ts";
import { getBookingsFromApiTrunk } from "../../features/bookings/bookingsTrunk.ts";
import { getRoomsData, getRoomsStatus } from "../../features/rooms/roomsSlice.ts";
import { getRoomsFromApiTrunk } from "../../features/rooms/roomsTrunk.ts";
import { useNavigate } from "react-router";
import { BookingInterface } from "../../interfaces/booking/BookingInterface.ts";
import { NavigateFunction } from "react-router-dom";
import { RoomInterface } from "../../interfaces/room/RoomInterface.ts";
import { AppDispatch, useAppSelector } from "../../app/store.ts";
import { StyledSpinner } from "../../components/spinner/StyledSpinner.ts";

  
export const BookingPage = () => {

  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = ():void => setOpen(true);
  const handleClose = ():void => setOpen(false);
  const [specialRequest, setSpecialRequest] = useState<string>("")

  const navigate: NavigateFunction = useNavigate()
  const dispatch: AppDispatch = useDispatch()
  let bookingsListData = useAppSelector<BookingInterface[]>(getBookingsData)

  const bookingsListStatus = useAppSelector<string>(getBookingsStatus)
  const [spinner, setSpinner] = useState<boolean>(true);

  const roomBoking = useAppSelector<RoomInterface[]>(getRoomsData)
  const roomsListStatus = useAppSelector<string>(getRoomsStatus);

  const [currentView, setCurrentView] = useState<string>("all");

  const [numberPage, setNumberPage] = useState<number[]>([0, 10])
  const [currentPage, setCurrentPage] = useState<number>(1);

    
  const now: Date = new Date();
  const nowDate: string = now.toISOString().split('T')[0];

  useEffect(
    () => {

      if (roomsListStatus == "idle") {
        dispatch(getRoomsFromApiTrunk())
      } else if (roomsListStatus == "pending") {
        setSpinner(true);
      } else if (roomsListStatus == "fulfilled") {
        setSpinner(false)
      }
    },[
    dispatch,
    roomBoking,
    roomsListStatus]
  );

  useEffect(
    () => {

      if (bookingsListStatus === "idle") {
        dispatch(getBookingsFromApiTrunk()); 
      } else if (bookingsListStatus === "pending") {
        setSpinner(true);
      } else if (bookingsListStatus === "fulfilled") {
        setSpinner(false)
      }
    },[
    dispatch,
    bookingsListData,
    bookingsListStatus]
  );

  const bookingListRoom: BookingInterface[] = 
  
     bookingsListData.map((booking: BookingInterface) => {

    const room  = roomBoking.find((room: RoomInterface) => room.id === booking.roomId)

    if(room){

      if(nowDate > booking.check_in){
        if(nowDate >= booking.check_out){
        return {...booking, roomId: room, status: "Check Out"}
        }
        else{
          return {...booking, roomId: room, status: "In Progress"}
        }
      } else {
        return {...booking, roomId: room, status: "Check In"}
      }

    }

    return booking

  }).filter((booking: BookingInterface) => booking !== null);



  const handleClick = (click: React.SetStateAction<string>):void => {

    setCurrentView(click)

    numberPage[0] = 0
    numberPage[1] = 10
    setCurrentPage(1)
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>):void => {
    dispatch(getClient(e.target.value))
  }

  const handleOnSelect = (e: ChangeEvent<HTMLSelectElement>):void => {

   

    let orderSelect: BookingInterface[] =  []
    setCurrentView("select")

    switch(e.target.value){
        case "orderDate":
        orderSelect = [... bookingListRoom].sort((a,b) => new Date(`${b.orderDate}`).getTime() - new Date(`${a.orderDate}`).getTime())
        break;
        case "checkIn":
          orderSelect = [... bookingListRoom].sort((a,b) => new Date(`${b.check_in}`).getTime() - new Date(`${a.check_in}`).getTime())
          break;
          case "checkOut":
            orderSelect = [...bookingListRoom].sort((a,b) => new Date(`${b.check_out}`).getTime() - new Date(`${a.check_out}`).getTime())
            break;
        case "guest":
          orderSelect = [...bookingListRoom].sort((a,b) => {
            const nameA:string = a.name.toUpperCase();
            const nameB:string = b.name.toUpperCase(); 
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
          })
          break;
      }


      dispatch(getSelect(orderSelect))
      numberPage[0] = 0;
      numberPage[1] = 10;
      setCurrentPage(1)
    }

  const currentBookingsListData: BookingInterface[] = 
  currentView ==="checkIn" ? 
    [...bookingListRoom].sort((a,b) => new Date(b.check_in).getTime() - new Date(a.check_in).getTime()) :
    currentView ==="checkOut" ? 
    [...bookingListRoom].sort((a,b) => new Date(b.check_out).getTime() - new Date(a.check_out).getTime()) :
    currentView ==="inProgress" ? 
    [...bookingListRoom].filter((inProgress) => inProgress.status === "In Progress").sort((a,b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()) :
    currentView ==="select" ? 
      bookingListRoom:
    [...bookingListRoom].sort((a,b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime())


  return (
    <>

    { currentBookingsListData !== undefined &&
    <>

    <ModalComponent open={open} handleClose={handleClose} description={specialRequest}></ModalComponent>

      <div style={{display: 'flex'}}>
      <StyledNav>
          <StyledNavText onClick={() =>handleClick("all")} isActive={currentView === "all"}>All Bookings</StyledNavText>
          <StyledNavText onClick={() =>handleClick("checkIn")} isActive={currentView === "checkIn"}>Checking In</StyledNavText>
          <StyledNavText onClick={() =>handleClick("checkOut")} isActive={currentView === "checkOut"}>Checking Out</StyledNavText>
          <StyledNavText onClick={() =>handleClick("inProgress")} isActive={currentView === "inProgress"}>In Progress</StyledNavText>
        </StyledNav>
        <StyledTextField label="Client" onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleOnChange(e)}/>
        <StyledButton name="create" onClick={() => navigate("/createBooking")}>+ New Booking</StyledButton>
        <StyledSelect  onChange={(e: ChangeEvent<HTMLSelectElement>) => handleOnSelect(e)} >
                <option value="" disabled selected hidden>Choose a Order</option>
                <option value="guest" >Guest</option>
                <option value="orderDate">Order Date</option>
                <option value="checkIn">Check In</option>
                <option value="checkOut">Check Out</option>

        </StyledSelect>
      </div>
        <StyledTable>
          <thead>
            
              <StyledTableCellRow >Guest</StyledTableCellRow>
              <StyledTableCellRow>OrderDate</StyledTableCellRow>
              <StyledTableCellRow>Check In</StyledTableCellRow>
              <StyledTableCellRow>Check Out</StyledTableCellRow>
              <StyledTableCellRow>Special Request</StyledTableCellRow>
              <StyledTableCellRow>Room Type</StyledTableCellRow>
              <StyledTableCellRow>Status</StyledTableCellRow>
              <StyledTableCellRow></StyledTableCellRow>
          </thead>
          <tbody>
          {spinner ? <StyledSpinner>Loading...</StyledSpinner> : 
            <DataTableBooking data={currentBookingsListData} numberPage={numberPage}handleOpen={handleOpen} setSpecialRequest={setSpecialRequest}></DataTableBooking>
          }
          </tbody>
        </StyledTable>
        <StyledPagination>
          <StyledPaginationText> Showing {currentBookingsListData.length !== 0 ? numberPage[0]+1 : numberPage[0]} of { currentBookingsListData.length >= numberPage[1] ? numberPage[1] : currentBookingsListData.length} data</StyledPaginationText>
          <StyledButtonPage>
              <StyledButton name="Prev" disabled={numberPage[0] === 1} onClick={() => {
                numberPage[0] -= 10
                numberPage[1] -= 10
                setCurrentPage(next => next - 1) }}>Prev</StyledButton>
              {
                Array.from({length: Math.ceil((currentBookingsListData.length / 10))}, (_, i) => (
                    <StyledTextPage key={i} isCurrentPage={i+1 === currentPage}>{i+1}</StyledTextPage>
                ))
              }
              <StyledButton  name="Next"  disabled={numberPage[1] >= currentBookingsListData.length} onClick={() => {
                numberPage[0] += 10
                numberPage[1] += 10
                setCurrentPage(next => next + 1)
              }}>Next</StyledButton>
          </StyledButtonPage>
        </StyledPagination>
        </>
}
    </>
  );
};

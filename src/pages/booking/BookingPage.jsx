import { DataTableBooking } from "./DataTableBooking";
import { TableHead, TableBody, TableRow, MenuItem } from "@mui/material";
import { StyledTable, StyledTableCellRow, StyledTableContainer } from "../../components/common/StyledTable";
import { useEffect, useState } from "react";
import { StyledNav, StyledNavText } from "../../components/common/StyledNav";
import { StyledTextField } from "../../components/common/StyledTextField";
import { StyledFormControl, StyledInputLabel, StyledSelect } from "../../components/common/StyledSelect";
import { StyledPagination, StyledPaginationText , StyledButtonPage, StyledTextPage} from "../../components/common/StyledPagination";
import { StyledButton } from "../../components/common/StyledButton";
import { ModalComponent } from "../../components/ModalComponent/ModalComponent";
import { useDispatch, useSelector } from "react-redux";

import { getBookingsData,  getBookingsError, getBookingsStatus, getChangeData, getClient, getSelect } from "../../features/bookings/bookingsSlice";
import { getBookingsFromApiTrunk } from "../../features/bookings/bookingsTrunk";
import { getRoomsData, getRoomsStatus } from "../../features/rooms/roomsSlice";
import { getRoomsFromApiTrunk } from "../../features/rooms/roomsTrunk";
import { useNavigate } from "react-router";
  
export const BookingPage = () => {

  const [isOpen] = useState(false)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [specialRequest, setSpecialRequest] = useState("")

  const navigate = useNavigate()
  const dispatch = useDispatch()
  let bookingsListData = useSelector(getBookingsData)
  const bookingsListError = useSelector(getBookingsError)
  const bookingsListStatus = useSelector(getBookingsStatus)
  const [spinner, setSpinner] = useState(true);


  const roomBoking = useSelector(getRoomsData)
  const roomsListStatus = useSelector(getRoomsStatus);

  const bookingList = useSelector(getChangeData)


  const [currentView, setCurrentView] = useState("all");

  const [numberPage, setNumberPage] = useState([0, 10])
  const [currentPage, setCurrentPage] = useState(1);

    
  const now = new Date();
  const nowDate = now.toISOString().split('T')[0];;

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

  const bookingListRoom = 
  
     bookingsListData.map((booking) => {

    const room = roomBoking.find(room => room.id === booking.roomId)

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

  })

 


  const handleClick = (click) => {

    setCurrentView(click)

    numberPage[0] = 0
    numberPage[1] = 10
    setCurrentPage(1)
  }

  const handleOnChange = (e) => {
    dispatch(getClient(e.target.value))
  }

  const handleOnSelect = (e) => {

   

    let orderSelect =  []
    setCurrentView("select")

    switch(e.target.value){
        case "orderDate":
        orderSelect = [... bookingListRoom].sort((a,b) => new Date(`${b.orderDate}`) - new Date(`${a.orderDate}`))
        break;
        case "checkIn":
          orderSelect = [... bookingListRoom].sort((a,b) => new Date(`${b.check_in}`) - new Date(`${a.check_in}`))
          break;
          case "checkOut":
            orderSelect = [...bookingListRoom].sort((a,b) => new Date(`${b.check_out}`) - new Date(`${a.check_out}`))
            break;
        case "guest":
          orderSelect = [...bookingListRoom].sort((a,b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase(); 
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

  const currentBookingsListData = 
  currentView ==="checkIn" ? 
    [...bookingListRoom].sort((a,b) => new Date(b.check_in) - new Date(a.check_in)) :
    currentView ==="checkOut" ? 
    [...bookingListRoom].sort((a,b) => new Date(b.check_out) - new Date(a.check_out)) :
    currentView ==="inProgress" ? 
    [...bookingListRoom].filter((inProgress) => inProgress.status === "In Progress").sort((a,b) => new Date(b.orderDate) - new Date(a.orderDate)) :
    currentView ==="select" ? 
      bookingListRoom:
    [...bookingListRoom].sort((a,b) => new Date(b.orderDate) - new Date(a.orderDate))


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
        <StyledTextField label="Client" onChange={(e) => handleOnChange(e)}/>
        <StyledButton name="create" onClick={() => navigate("/createBooking")}>+ New Booking</StyledButton>
        <StyledFormControl>
        <StyledInputLabel>Order</StyledInputLabel>
        <StyledSelect label="Order" onChange={(e) => handleOnSelect(e)} >
                <MenuItem value="guest" >Guest</MenuItem>
                <MenuItem value="orderDate">Order Date</MenuItem>
                <MenuItem value="checkIn">Check In</MenuItem>
                <MenuItem value="checkOut">Check Out</MenuItem>

        </StyledSelect>
        </StyledFormControl>
      </div>
      <StyledTableContainer isOpen={isOpen}>
        <StyledTable>
          <TableHead>
            <TableRow>
              <StyledTableCellRow >Guest</StyledTableCellRow>
              <StyledTableCellRow>OrderDate</StyledTableCellRow>
              <StyledTableCellRow>Check In</StyledTableCellRow>
              <StyledTableCellRow>Check Out</StyledTableCellRow>
              <StyledTableCellRow>Special Request</StyledTableCellRow>
              <StyledTableCellRow>Room Type</StyledTableCellRow>
              <StyledTableCellRow>Status</StyledTableCellRow>
              <StyledTableCellRow></StyledTableCellRow>
            </TableRow>
          </TableHead>
          <TableBody>
          {spinner ? <p>Loading...</p> : 
            <DataTableBooking data={currentBookingsListData} numberPage={numberPage}handleOpen={handleOpen} setSpecialRequest={setSpecialRequest}></DataTableBooking>
          }
          </TableBody>
        </StyledTable>
        </StyledTableContainer>
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

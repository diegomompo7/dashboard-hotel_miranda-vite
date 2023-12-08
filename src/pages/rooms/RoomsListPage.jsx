import { DataTableRooms } from "./DataTableRooms";
import { TableHead, TableBody, TableRow, MenuItem} from "@mui/material";
import { StyledTable, StyledTableCellRow, StyledTableContainer } from "../../components/common/StyledTable";
import { useState, useEffect } from "react";
import { StyledNav, StyledNavText } from "../../components/common/StyledNav";
import { StyledFormControl, StyledInputLabel, StyledSelect } from "../../components/common/StyledSelect";
import { StyledPagination, StyledPaginationText , StyledButtonPage, StyledTextPage} from "../../components/common/StyledPagination";
import { StyledButton } from "../../components/common/StyledButton";
import { useDispatch, useSelector } from "react-redux";
import {
  getRoomsData,
  getRoomsError,
  getRoomsStatus,
  getSelect,
  getRoomsDataAvailable,
  getRoomsDataBooked,

} from "../../features/rooms/roomsSlice";
import { getRoomsFromApiTrunk } from "../../features/rooms/roomsTrunk";
import { useNavigate } from "react-router-dom";


export const RoomsListPage = () => {

  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch();
const roomsListData = useSelector(getRoomsData);
const roomsListError = useSelector(getRoomsError);
const roomsListStatus = useSelector(getRoomsStatus);
const [spinner, setSpinner] = useState(true);
const roomsListAvailable = useSelector(getRoomsDataAvailable)
const roomsListBooked = useSelector(getRoomsDataBooked)


  const [currentView, setCurrentView] = useState("all");

  const [numberPage, setNumberPage] = useState([0, 10])
  const [currentPage, setCurrentPage] = useState(1);


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

  const handleClick = (click) => {

    setCurrentView(click)

    numberPage[0] = 0
    numberPage[1] = 10
    setCurrentPage(1)
  }
  
  const handleOnSelect = (e) => {

    let orderSelect =  []

    switch(e.target.value){
      case "priceLess":
        orderSelect = [...currentUsersListData].sort((a,b) => a.priceNight - b.priceNight)
        break;
        case "priceHigher":
          orderSelect = [...currentUsersListData].sort((a,b) => b.priceNight - a.priceNight)
          break;
      }
      dispatch(getSelect(orderSelect))
      numberPage[0] = 0;
      numberPage[1] = 10;
      setCurrentPage(1)
    }

    const currentUsersListData = currentView ==="available" ? roomsListAvailable : currentView === "booked" ? roomsListBooked : roomsListData

  return (
    <>

    { roomsListData !== undefined && <>

    <div style={{display: 'flex', flexWrap: 'wrap'}}>
      <StyledNav>
          <StyledNavText  onClick={() => handleClick("all")} isActive={currentView === "all"}>All Bookings</StyledNavText>
          <StyledNavText  onClick={() => handleClick("available")} isActive={currentView === "available"}>Available</StyledNavText>
          <StyledNavText  onClick={() => handleClick("booked")} isActive={currentView === "booked"}>Booked</StyledNavText>
        </StyledNav>
        <StyledButton name="create" onClick={() => navigate("/createRoom")}>+ New Room</StyledButton>
        <StyledFormControl>
        <StyledInputLabel>Order</StyledInputLabel>
        <StyledSelect label="Order"  onChange={(e) => handleOnSelect(e)}>
                <MenuItem value="priceLess" >Price less</MenuItem>
                <MenuItem value="priceHigher">Price High</MenuItem>
        </StyledSelect>
        </StyledFormControl>
      </div>
           
      <StyledTableContainer isOpen={isOpen}>
        <StyledTable>
          <TableHead>
            <TableRow>
              <StyledTableCellRow >Room Name</StyledTableCellRow>
              <StyledTableCellRow>Bed Type</StyledTableCellRow>
              <StyledTableCellRow>Facilities</StyledTableCellRow>
              <StyledTableCellRow>Price</StyledTableCellRow>
              <StyledTableCellRow>Offer Price</StyledTableCellRow>
              <StyledTableCellRow>Status</StyledTableCellRow>
              <StyledTableCellRow></StyledTableCellRow>
            </TableRow>
          </TableHead>
          <TableBody>
          {spinner ? <p>Loading...</p> : 
           
           <DataTableRooms data={currentUsersListData} numberPage={numberPage}></DataTableRooms>
           
           }
          </TableBody>
        </StyledTable>
        </StyledTableContainer>
        <StyledPagination>
          <StyledPaginationText> Showing {currentUsersListData.length !== 0 ? numberPage[0]+1 : numberPage[0]} of { currentUsersListData.length >= numberPage[1] ? numberPage[1] : currentUsersListData.length} data</StyledPaginationText>
          <StyledButtonPage>
              <StyledButton name="Prev" disabled={numberPage[0] === 1} onClick={() => {
                numberPage[0] -= 10
                numberPage[1] -= 10
                setCurrentPage(next => next - 1) }}>Prev</StyledButton>
              {
                Array.from({length: Math.ceil((currentUsersListData.length / 10))}, (_, i) => (
                    <StyledTextPage key={i+1} isCurrentPage={i+1 === currentPage}>{i+1}</StyledTextPage>
                ))
              }
              <StyledButton  name="Next"  disabled={numberPage[1] >= currentUsersListData.length} onClick={() => {
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

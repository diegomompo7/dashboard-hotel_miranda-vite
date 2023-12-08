
import { DataTableUsers } from "./DataTableUsers";
import { TableHead, TableBody, TableRow, MenuItem } from "@mui/material";
import { StyledTable, StyledTableCellRow, StyledTableContainer} from "../../components/common/StyledTable";
import { useEffect, useState } from "react";
import { StyledNav, StyledNavText } from "../../components/common/StyledNav";
import { StyledTextField } from "../../components/common/StyledTextField";
import { StyledFormControl, StyledInputLabel, StyledSelect } from "../../components/common/StyledSelect";
import { StyledPagination, StyledPaginationText , StyledButtonPage, StyledTextPage} from "../../components/common/StyledPagination";
import { StyledButton } from "../../components/common/StyledButton";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsersData,
  getUsersError,
  getUsersStatus,
  getEmployee,
  getSelect,
  getUsersDataActive,
  getUsersDataInactive
} from "../../features/users/usersSlice";
import { getUsersFromApiTrunk } from "../../features/users/usersTrunk";
import { useNavigate } from "react-router-dom";


export const UserPage = () => {

  const [isOpen, setIsOpen] = useState(false)
  
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const usersListData = useSelector(getUsersData);
  const usersListError = useSelector(getUsersError);
  const usersListStatus = useSelector(getUsersStatus);
  const usersListActive = useSelector(getUsersDataActive);
  const usersListInactive = useSelector(getUsersDataInactive);

  const [spinner, setSpinner] = useState(true);

  const [currentView, setCurrentView] = useState("all");

  const [numberPage, setNumberPage] = useState([0, 10])
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(
    () => {

      if (usersListStatus === "idle") {
        dispatch(getUsersFromApiTrunk());
      } else if (usersListStatus === "pending") {
        setSpinner(true);
      } else if (usersListStatus === "fulfilled") {
        setSpinner(false)
      }
    },[
    dispatch,
    usersListData,
    usersListStatus]
  );

  const handleClick = (click) => {

    setCurrentView(click)

    numberPage[0] = 0
    numberPage[1] = 10
    setCurrentPage(1)
  }

  const handleOnChange = (e) => {
    dispatch(getEmployee(e.target.value))
  }

  const handleOnSelect = (e) => {

    let orderSelect =  []

    switch(e.target.value){
      case "orderDate":
        orderSelect = [...currentUsersListData].sort((a,b) => new Date(`${b.startDate}`) - new Date(`${a.startDate}`))
        break;
        case "name":
          orderSelect = [...currentUsersListData].sort((a,b) => {
            const nameA = a.fullName.toUpperCase(); 
            const nameB = b.fullName.toUpperCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
          
            // names must be equal
            return 0;
          })
          break;
      }
      dispatch(getSelect(orderSelect))
      numberPage[0] = 0;
      numberPage[1] = 10;
      setCurrentPage(1)
    }

    const currentUsersListData = currentView ==="active" ? usersListActive : currentView === "inactive" ? usersListInactive : usersListData


  return (
    <>
    { currentUsersListData !== undefined &&
    <>
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
      <StyledNav>
          <StyledNavText onClick={() =>handleClick("all")} isActive={currentView === "all"}>All Employee</StyledNavText>
          <StyledNavText onClick={() => handleClick("active")} isActive={currentView === "active"}>Active Employee</StyledNavText>
          <StyledNavText onClick={() => handleClick("inactive")} isActive={currentView === "inactive"}>Inactive Employee</StyledNavText>
        </StyledNav>
        <StyledTextField label="Employee" onChange={(e) => handleOnChange(e)}/>
        <StyledButton name="create" onClick={() => navigate("/createUser")}>+ New Employee</StyledButton>
        <StyledFormControl>
        <StyledInputLabel>Order</StyledInputLabel>
        <StyledSelect label="Order" onChange={(e) => handleOnSelect(e)}>
                <MenuItem value="orderDate">Order Date</MenuItem>
                <MenuItem value="name">Name</MenuItem>

        </StyledSelect>
        </StyledFormControl>
      </div>
      <StyledTableContainer isOpen={isOpen}>
        <StyledTable>
          <TableHead>
            <TableRow>
              <StyledTableCellRow>Photo</StyledTableCellRow>
              <StyledTableCellRow>Name</StyledTableCellRow>
              <StyledTableCellRow>ID</StyledTableCellRow>
              <StyledTableCellRow>Email</StyledTableCellRow>
              <StyledTableCellRow>Start Date</StyledTableCellRow>
              <StyledTableCellRow>Description</StyledTableCellRow>
              <StyledTableCellRow>Users</StyledTableCellRow>
              <StyledTableCellRow>Status</StyledTableCellRow>
            </TableRow>
          </TableHead>
          <TableBody>
          {spinner ? <p>Loading...</p> : 
           
           <DataTableUsers data={currentUsersListData} numberPage={numberPage}></DataTableUsers>
           
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
                    <StyledTextPage key={i} isCurrentPage={i+1 === currentPage}>{i+1}</StyledTextPage>
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

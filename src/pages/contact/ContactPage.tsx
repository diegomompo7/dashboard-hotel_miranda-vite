
import { DataTableContact } from "./DataTableContact";
import { TableHead, TableBody, TableRow } from "@mui/material";
import { StyledTable, StyledTableCellRow, StyledTableContainer} from "../../components/common/StyledTable";
import React, { useState, useEffect } from "react";
import { StyledNav, StyledNavText } from "../../components/common/StyledNav";
import { StyledPagination, StyledPaginationText , StyledButtonPage, StyledTextPage} from "../../components/common/StyledPagination";
import { StyledButton } from "../../components/common/StyledButton";
import { CardContact } from "./CardContact";
import { useDispatch } from "react-redux";
import {
  getContactData,
  getContactDataArchive,
  getContactError,
  getContactStatus
} from "../../features/contact/contactSlice";
import { getContactFromApiTrunk } from "../../features/contact/contactTrunk";
import { Dispatch } from "@reduxjs/toolkit";
import { ContactInterface } from "../../interfaces/contact/ContactInterface";
import { AppDispatch, useAppSelector } from "../../app/store";
import { StyledSpinner } from "../../components/spinner/StyledSpinner";


export const ContactPage = () => {

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const dispatch: AppDispatch = useDispatch();
  let contactListData = useAppSelector<ContactInterface[]>(getContactData);
  const contactListError = useAppSelector<string | undefined>(getContactError);
  const contactListStatus = useAppSelector<string>(getContactStatus);
  const currentContactListArchived = useAppSelector<ContactInterface[]>(getContactDataArchive);

  const [spinner, setSpinner] = useState<boolean>(true);

  const [numberPage, setNumberPage] = useState<number[]>([0, 10])
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentView, setCurrentView] = useState<string>("all");

  useEffect(
    () => {

      if (contactListStatus === "idle") {
        dispatch(getContactFromApiTrunk());
      } else if (contactListStatus === "pending") {
        setSpinner(true);
      } else if (contactListStatus === "fulfilled") {
        setSpinner(false)
      }
    },[
    dispatch,
    contactListData,
    contactListStatus]
  );

  const handleClick = (nav: string) :void => {

    switch(nav){
      case "all":
      setCurrentView("all")
      break;
      case "archived":
       setCurrentView("archived")
      break;
      

    }
    numberPage[0] = 0;
    numberPage[1] = 10;
    setCurrentPage(1)
  }

  const currentContactListData: ContactInterface[] = currentView === "archived" ? currentContactListArchived : contactListData;



  return (
    <>

      { currentContactListData !== undefined &&

        <>
      {spinner ? <StyledSpinner>Loading...</StyledSpinner> :<CardContact contact={contactListData}></CardContact> }

      <StyledNav>
          <StyledNavText onClick={() => handleClick("all")} isActive={currentView === "all"}>All Contacts</StyledNavText>
          <StyledNavText  onClick={() => setCurrentView("archived")} isActive={currentView === "archived"}>Archived</StyledNavText>
        </StyledNav>
        <StyledTableContainer isOpen={isOpen}>
        <StyledTable>
          <TableHead>
            <TableRow>
              <StyledTableCellRow >Date & ID</StyledTableCellRow>
              <StyledTableCellRow>Customer</StyledTableCellRow>
              <StyledTableCellRow>Comment</StyledTableCellRow>
            </TableRow>
          </TableHead>
          <TableBody>
          {spinner ? <StyledSpinner>Loading...</StyledSpinner> :
           <DataTableContact data={currentContactListData} numberPage={numberPage} setCurrentPage={setCurrentPage} setCurrentView={setCurrentView}></DataTableContact>
           
           }
          </TableBody>
        </StyledTable>
        </StyledTableContainer>
        <StyledPagination>
          <StyledPaginationText> Showing {currentContactListData.length !== 0 ? numberPage[0]+1 : numberPage[0]} of { currentContactListData.length >= numberPage[1] ? numberPage[1] : currentContactListData.length } data</StyledPaginationText>
          <StyledButtonPage>
              <StyledButton name="Prev" disabled={numberPage[0] <= 1} onClick={() => {
                numberPage[0] -= 10
                numberPage[1] -= 10
                setCurrentPage(next => next - 1) }}>Prev</StyledButton>
              {
                Array.from({length: Math.ceil((currentContactListData.length / 10))}, (_, i) => (
                    <StyledTextPage key={i} isCurrentPage={i+1 === currentPage}>{i+1}</StyledTextPage>
                ))
              }
              <StyledButton  name="Next"  disabled={numberPage[1] >= currentContactListData.length} onClick={() => {
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
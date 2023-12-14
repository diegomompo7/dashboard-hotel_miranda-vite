import { TableRow } from "@mui/material";
import {
  StyledTableCellBody,
  StyledTableCellBodyText,
  StyledTableRow,
} from "../../components/common/StyledTable";
import { StyledButton } from "../../components/common/StyledButton";
import { StyledMoreIcon } from "../../components/common/StyledIcons";
import { useDispatch } from "react-redux";
import {updateContact } from "../../features/contact/contactSlice";
import { DataTableContactProps } from "../../interfaces/props/PropsInterface";
import React from "react";
import { ContactInterface } from "../../interfaces/contact/ContactInterface";
import { Dispatch } from "@reduxjs/toolkit";

export const DataTableContact: React.FC<DataTableContactProps> = (props) => {

  const data: ContactInterface[] = props.data
  const orderContactDate: ContactInterface[] = [...data].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  const dataPage: ContactInterface[] = orderContactDate.slice(props.numberPage[0], props.numberPage[1])

    const dispatch: Dispatch = useDispatch()

    const handleUpdate = (idContact: number, isArchived: boolean):void => {

      switch(isArchived){
        case true:
          dispatch(updateContact({id: idContact, is_archived: !isArchived}))
          props.setCurrentView("all")
        break;
        case false:
          dispatch(updateContact({id: idContact, is_archived: !isArchived}))
          props.setCurrentView("archived")
        break;
      }

      props.numberPage[0] = 0;
      props.numberPage[1] = 10;
      props.setCurrentPage(1)

    }
  

  return (
    <>
      {dataPage.map((data: ContactInterface) => (
        <StyledTableRow key={data.name}>
          <StyledTableCellBody>
          <StyledTableCellBodyText>{data.date}</StyledTableCellBodyText>
           <StyledTableCellBodyText>#{data.id}</StyledTableCellBodyText>
          </StyledTableCellBody>
          <StyledTableCellBody>
          <StyledTableCellBodyText>{data.name} {data.surname}</StyledTableCellBodyText>
          <StyledTableCellBodyText>{data.email} {data.phone}</StyledTableCellBodyText>
          </StyledTableCellBody>
          <StyledTableCellBody typeStyle="message">
            <StyledTableCellBodyText>{data.subject}</StyledTableCellBodyText>
            <StyledTableCellBodyText>{data.message}</StyledTableCellBodyText>
          </StyledTableCellBody>
          <StyledTableCellBody>
            <StyledButton name="archived" onClick={() => handleUpdate(data.id, data.is_archived)}>{data.is_archived ? "Publish" : "Archived"}</StyledButton>
          </StyledTableCellBody>
          <StyledTableCellBody>
            <StyledMoreIcon></StyledMoreIcon>
          </StyledTableCellBody>
        </StyledTableRow>
      ))}
    </>
  );
};

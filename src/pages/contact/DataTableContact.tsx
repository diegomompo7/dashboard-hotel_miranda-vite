import {
  StyledTableCellBody,
  StyledTableCellBodyText,
  StyledTableRow,
} from "../../components/common/StyledTable";
import { StyledButton } from "../../components/common/StyledButton";
import { StyledMoreIcon } from "../../components/common/StyledIcons";
import { useDispatch } from "react-redux";
import { updateContact } from "../../features/contact/contactSlice";
import { DataTableContactProps } from "../../interfaces/props/PropsInterface";
import React from "react";
import { ContactInterface } from "../../interfaces/contact/ContactInterface";
import { Dispatch } from "@reduxjs/toolkit";
import { fetchPATCHContact } from "../../features/contact/contactTrunk";
import { AppDispatch } from "../../app/store";

export const DataTableContact: React.FC<DataTableContactProps> = (props) => {
  const data: ContactInterface[] = props.data;
  const orderContactDate: ContactInterface[] = [...data].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const dataPage: ContactInterface[] = orderContactDate.slice(
    props.numberPage[0],
    props.numberPage[1]
  );

  const dispatch: AppDispatch = useDispatch();

  const handleUpdate = (id: number, isArchived: boolean): void => {
    let formData: Object = {}
    switch (isArchived) {
      case true:
        formData = {is_archived: !isArchived}
        dispatch(fetchPATCHContact({ id,formData }));
        props.setCurrentView("all");
        break;
      case false:
        formData = {is_archived: !isArchived}
        dispatch(fetchPATCHContact({ id,formData }));
        props.setCurrentView("archived");
        break;
    }

    props.numberPage[0] = 0;
    props.numberPage[1] = 10;
    props.setCurrentPage(1);
  };

  return (
    <>
      {dataPage.map((data: ContactInterface) => (
        <StyledTableRow key={data.name}>
          <StyledTableCellBody>
            <StyledTableCellBodyText>{data.date}</StyledTableCellBodyText>
            <StyledTableCellBodyText>#{data._id}</StyledTableCellBodyText>
          </StyledTableCellBody>
          <StyledTableCellBody>
            <StyledTableCellBodyText>
              {data.name} {data.surname}
            </StyledTableCellBodyText>
            <StyledTableCellBodyText>
              {data.email} {data.phone}
            </StyledTableCellBodyText>
          </StyledTableCellBody>
          <StyledTableCellBody typeStyle="message">
            <StyledTableCellBodyText>{data.subject}</StyledTableCellBodyText>
            <StyledTableCellBodyText>{data.message}</StyledTableCellBodyText>
          </StyledTableCellBody>
          <StyledTableCellBody>
            <StyledButton
              name="archived"
              onClick={() => handleUpdate(data._id!, data.is_archived)}
            >
              {data.is_archived ? "Publish" : "Archived"}
            </StyledButton>
          </StyledTableCellBody>
          <StyledTableCellBody>
            <StyledMoreIcon></StyledMoreIcon>
          </StyledTableCellBody>
        </StyledTableRow>
      ))}
    </>
  );
};

import React, { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import {
  StyledTableCellBody,
  StyledTableCellBodyText,
  StyledTableRow,
} from "../../components/common/StyledTable";
import { StyledButton } from "../../components/common/StyledButton";
import { StyledMoreIcon } from "../../components/common/StyledIcons";
import { NavigateFunction, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Action} from "@reduxjs/toolkit";
import { BookingInterface } from "../../interfaces/booking/BookingInterface";
import { DataTableBookingProps } from "../../interfaces/props/PropsInterface";
import { fetchBooking,  fetchDELETEBooking } from "../../features/bookings/bookingsTrunk";
import { AppDispatch } from "../../app/store";

export const DataTableBooking: React.FC<DataTableBookingProps> = (props) => {
  const navigate: NavigateFunction = useNavigate();
  const dispatch: AppDispatch= useDispatch();


  const dataPage: BookingInterface[] = [...props.data].slice(
    props.numberPage[0],
    props.numberPage[1]
  )!;

  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [menuId, setMenuId] = useState<number | null >(null);
  const open: boolean = Boolean(anchorEl);
  const handleClick = (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    id: number | null
  ) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setMenuId(id);
  };
  const handleClose = (): void => {
    setAnchorEl(null);
    setMenuId(null);
  };

  const handleDelete = async (id: number): Promise<void> => {
    dispatch(fetchDELETEBooking(id))
    .then((action: Action<unknown>) => {
      if (fetchDELETEBooking.fulfilled.match(action)) {
        handleClose(); 
        toast.success("Booking deleted succesfull", {
          position: "bottom-center",
          autoClose: 5000,
          closeOnClick: true,
          theme: "colored",
        });
      
      }

    })
  };

  return (
    <>
      {dataPage.map((data: BookingInterface) => (
        <StyledTableRow key={data._id}>
          <StyledTableCellBody
            style={{ display: "flex", alignItems: "center" }}
          >
            <div>
              <StyledTableCellBodyText typeStyle="title">
                {data.name}
              </StyledTableCellBodyText>
              <StyledTableCellBodyText typeStyle="id">
                #{data._id}
              </StyledTableCellBodyText>
            </div>
          </StyledTableCellBody>
          <StyledTableCellBody>{data.orderDate}</StyledTableCellBody>
          <StyledTableCellBody>
            <StyledTableCellBodyText typeStyle="title">
              {data.check_in}
            </StyledTableCellBodyText>
            <StyledTableCellBodyText typeStyle="subtitle">
              {data.hour_in}
            </StyledTableCellBodyText>
          </StyledTableCellBody>
          <StyledTableCellBody>
            <StyledTableCellBodyText typeStyle="title">
              {data.check_out}
            </StyledTableCellBodyText>
            <StyledTableCellBodyText typeStyle="subtitle">
              {data.hour_out}
            </StyledTableCellBodyText>
          </StyledTableCellBody>
          <StyledTableCellBody>
            <StyledButton
              name="view_notes"
              onClick={() => {
                props.handleOpen(),
                  data.specialRequest !== undefined &&
                  props.setSpecialRequest(data.specialRequest);
              }}
              disabled={data.specialRequest === ""}
            >
              View Notes
            </StyledButton>
          </StyledTableCellBody>
          <StyledTableCellBody>
            <StyledTableCellBodyText typeStyle="title">
              {data.room.roomNumber!}
            </StyledTableCellBodyText>
          </StyledTableCellBody>
          <StyledTableCellBody>
            <StyledButton name={data.status}>{data.status}</StyledButton>
          </StyledTableCellBody>
          <StyledTableCellBody>
            <StyledMoreIcon
              onClick={(e: React.MouseEvent<SVGElement, MouseEvent>) =>
                handleClick(e, data._id!)
              }
            ></StyledMoreIcon>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>

            <MenuItem onClick={() => {dispatch(fetchBooking(`${menuId}`)), navigate(`/booking/${menuId}`)}}>
                View details
              </MenuItem>
              <MenuItem onClick={() => {navigate(`/editBooking/${menuId}`)}}>
                Edit
              </MenuItem>
              <MenuItem onClick={() => menuId !== null && handleDelete(menuId)}>Delete</MenuItem>
            </Menu>
          </StyledTableCellBody>
        </StyledTableRow>
      ))}
    </>
  );
};

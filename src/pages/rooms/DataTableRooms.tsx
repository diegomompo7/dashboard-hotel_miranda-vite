import React, { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import {
  StyledTableCellBody,
  StyledTableCellBodyText,
  StyledTableCellBodyImg,
  StyledTableRow,
} from "../../components/common/StyledTable";
import { StyledButton } from "../../components/common/StyledButton";
import { StyledMoreIcon } from "../../components/common/StyledIcons";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DataTableRoomsProps } from "../../interfaces/props/PropsInterface";
import { AppDispatch } from "../../app/store";
import { RoomInterface } from "../../interfaces/room/RoomInterface";
import { fetchDELETERoom } from "../../features/rooms/roomsTrunk";

export const DataTableRooms: React.FC<DataTableRoomsProps> = (props) => {
  const navigate: NavigateFunction = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const dataPage: RoomInterface[] = [...props.data].slice(
    props.numberPage[0],
    props.numberPage[1]
  );

  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [menuId, setMenuId] = useState<number | null>(null);
  const open: boolean = Boolean(anchorEl);
  const handleClick = (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    id: number | null
  ): void => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setMenuId(id);
  };
  const handleClose = (): void => {
    setAnchorEl(null);
    setMenuId(null);
  };

  const handleDelete = (id: number): void => {
    dispatch(fetchDELETERoom(id));
    handleClose();
    toast.error("User deleted succesfull", {
      position: "bottom-center",
      autoClose: 5000,
      closeOnClick: true,
      theme: "colored",
    });
  };

  return (
    <>
      {dataPage.map((data) => (
        <StyledTableRow key={data._id}>
          <StyledTableCellBody
            style={{ display: "flex", alignItems: "center" }}
          >
            <StyledTableCellBodyImg
              src={data.photos[0]}
              typeImg="rooms"
            ></StyledTableCellBodyImg>
            <div>
              <StyledTableCellBodyText typeStyle="id">
                #{data._id}
              </StyledTableCellBodyText>
              <StyledTableCellBodyText typeStyle="title">
                {data.roomNumber}
              </StyledTableCellBodyText>
            </div>
          </StyledTableCellBody>
          <StyledTableCellBody>
            <StyledTableCellBodyText typeStyle="title">
              {data.roomType}
            </StyledTableCellBodyText>
          </StyledTableCellBody>
          <StyledTableCellBody typeStyle="description">
            {data.amenities.toString()}
          </StyledTableCellBody>
          <StyledTableCellBody>
            <div style={{ display: "flex" }}>
              <StyledTableCellBodyText typeStyle="titleSemiBold">
                ${data.priceNight}
              </StyledTableCellBodyText>
              <StyledTableCellBodyText typeStyle="id">
                /night
              </StyledTableCellBodyText>
            </div>
          </StyledTableCellBody>
          <StyledTableCellBody>
            {data.discount !== null && (
              <div style={{ display: "flex" }}>
                <StyledTableCellBodyText typeStyle="titleSemiBold">
                  ${data.priceNight - (data.priceNight * 20) / 100}
                </StyledTableCellBodyText>
                <StyledTableCellBodyText typeStyle="id">
                  /night
                </StyledTableCellBodyText>
              </div>
            )}
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
              <MenuItem onClick={() => navigate(`/createRoom/${menuId}`)}>
                Edit
              </MenuItem>
              <MenuItem onClick={() => handleDelete(menuId!)}>Delete</MenuItem>
            </Menu>
          </StyledTableCellBody>
        </StyledTableRow>
      ))}
    </>
  );
};

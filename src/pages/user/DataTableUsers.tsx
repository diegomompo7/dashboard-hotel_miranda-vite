import React, { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import {
  StyledTableCellBody,
  StyledTableCellBodyText,
  StyledTableCellBodyImg,
  StyledTableRow,
} from "../../components/common/StyledTable";
import { StyledButton } from "../../components/common/StyledButton";
import {
  StyledMoreIcon,
  StyledPhone,
} from "../../components/common/StyledIcons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../features/users/usersSlice";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DataTableUserProps } from "../../interfaces/props/PropsInterface";

export const DataTableUsers: React.FC<DataTableUserProps> = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dataPage = [...props.data].slice(
    props.numberPage[0],
    props.numberPage[1]
  );

  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [menuId, setMenuId] = useState<number | null>(null);
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

  const handleDelete = (id: number | null): void => {
    dispatch(deleteUser(id));
    handleClose();
    toast.error("Booking deleted succesfull", {
      position: "bottom-center",
      autoClose: 5000,
      closeOnClick: true,
      theme: "colored",
    });
  };

  return (
    <>
      {dataPage.map((data) => (
        <StyledTableRow key={data.id}>
          <StyledTableCellBody>
            <StyledTableCellBodyImg
              src={data.photo}
              typeImg="users"
            ></StyledTableCellBodyImg>
          </StyledTableCellBody>
          <StyledTableCellBody>
            <StyledTableCellBodyText typeStyle="title">
              {data.fullName}
            </StyledTableCellBodyText>
          </StyledTableCellBody>
          <StyledTableCellBody>{data.id}</StyledTableCellBody>
          <StyledTableCellBody>{data.email}</StyledTableCellBody>
          <StyledTableCellBody>{data.startDate}</StyledTableCellBody>
          <StyledTableCellBody typeStyle="description">
            {data.descriptionJob}
          </StyledTableCellBody>
          <StyledTableCellBody>
            <div style={{ display: "flex" }}>
              <StyledPhone></StyledPhone>
              <StyledTableCellBodyText typeStyle="titleSemiBold">
                {data.phone}
              </StyledTableCellBodyText>
            </div>
          </StyledTableCellBody>
          <StyledTableCellBody>
            <StyledButton name={data.status}>{data.status}</StyledButton>
          </StyledTableCellBody>
          <StyledTableCellBody name="menu">
            <StyledMoreIcon
              onClick={(e: React.MouseEvent<SVGElement, MouseEvent>) =>
                handleClick(e, data.id!)
              }
            ></StyledMoreIcon>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem onClick={() => navigate(`/createUser/${menuId}`)}>
                Edit
              </MenuItem>
              <MenuItem onClick={() => handleDelete(menuId)}>Delete</MenuItem>
            </Menu>
          </StyledTableCellBody>
        </StyledTableRow>
      ))}
    </>
  );
};

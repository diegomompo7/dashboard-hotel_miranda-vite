import React, { useState } from "react";
import { Menu, MenuItem, TableRow } from "@mui/material";
import {
  StyledTableCellBody,
  StyledTableCellBodyText,
  StyledTableCellBodyImg,
  StyledTableRow,
} from "../../components/common/StyledTable";
import { StyledButton } from "../../components/common/StyledButton";
import { StyledMoreIcon, StyledPhone } from "../../components/common/StyledIcons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../features/users/usersSlice";

import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const DataTableUsers = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dataPage = [...props.data].slice(
    props.numberPage[0],
    props.numberPage[1]
  );

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [menuId, setMenuId] = useState(null);
  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setMenuId(id);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setMenuId(null);
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
    handleClose()
    toast.error('User deleted succesfull', {
      position: "bottom-center",
      autoClose: 5000,
      closeOnClick: true,
      theme: "colored",
      });
  };

  return (
    <>
      {dataPage.map((data) => (
        <StyledTableRow key={data.name}>
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
              onClick={(e) => handleClick(e, data.id)}
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

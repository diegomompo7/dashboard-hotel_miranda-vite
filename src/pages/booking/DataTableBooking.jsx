import React, { useState } from "react";
import { Menu, MenuItem, TableRow } from "@mui/material";
import {
  StyledTableCellBody,
  StyledTableCellBodyText,
  StyledTableCellBodyImg,
} from "../../components/common/StyledTable";
import { StyledButton } from "../../components/common/StyledButton";
import { StyledMoreIcon } from "../../components/common/StyledIcons";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { deleteBooking } from "../../features/bookings/bookingsSlice";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const DataTableBooking = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const dataPage = [...props.data].slice(
    props.numberPage[0],
    props.numberPage[1]
  );

  const [anchorEl, setAnchorEl] = useState(null);
    const [menuId, setMenuId] = useState(null)
    const open = Boolean(anchorEl);
    const handleClick = (event, id) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
        setMenuId(id)
    };
    const handleClose = () => {
        setAnchorEl(null);
        setMenuId(null)
    };

    const handleDelete = (id) => {
      dispatch(deleteBooking(id));
      handleClose()
      toast.error('Booking deleted succesfull', {
          position: "bottom-center",
          autoClose: 5000,
          closeOnClick: true,
          theme: "colored",
          });
    
  }

  return (
    <>
      {dataPage.map((data) => (
        <TableRow key="data.id">
          <StyledTableCellBody
            style={{ display: "flex", alignItems: "center" }}
          >
            <div>
              <StyledTableCellBodyText typeStyle="title">
                {data.name}
              </StyledTableCellBodyText>
              <StyledTableCellBodyText typeStyle="id">
                #{data.id}
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
                  props.setSpecialRequest(data.specialRequest);
              }}
              disabled={data.specialRequest === ""}
            >
              View Notes
            </StyledButton>
          </StyledTableCellBody>
          <StyledTableCellBody>
              <StyledTableCellBodyText typeStyle="title">{data.roomId.roomNumber}</StyledTableCellBodyText>
          </StyledTableCellBody>
          <StyledTableCellBody>
            <StyledButton name={data.status}>{data.status}</StyledButton>
          </StyledTableCellBody>
          <StyledTableCellBody>
                        <StyledMoreIcon onClick={(e) => handleClick(e, data.id)}></StyledMoreIcon>
                        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                            <MenuItem onClick={ () => navigate(`/booking/${menuId}`)}>
                                View details
                            </MenuItem>
                            <MenuItem onClick={() => handleDelete(menuId)}>Delete</MenuItem>
                        </Menu>
                    </StyledTableCellBody>
        </TableRow>
      ))}
    </>
  );
};

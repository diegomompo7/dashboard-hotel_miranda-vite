import React, { useState } from "react";
import { Menu, MenuItem, TableRow } from "@mui/material";
import { StyledTableCellBody, StyledTableCellBodyText, StyledTableCellBodyImg } from "../../components/common/StyledTable";
import { StyledButton } from "../../components/common/StyledButton";
import { StyledMoreIcon } from "../../components/common/StyledIcons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteRoom, getNewData} from "../../features/rooms/roomsSlice";

import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



export const DataTableRooms = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const dataPage = [...props.data].slice(props.numberPage[0], props.numberPage[1])

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
        dispatch(deleteRoom(id));
        handleClose()
        toast.error('User deleted succesfull', {
            position: "bottom-center",
            autoClose: 5000,
            closeOnClick: true,
            theme: "colored",
            });
      
    }

    return (
        <>{
            dataPage.map((data) => (
                <TableRow
                    key={data.name}
                >

                    <StyledTableCellBody style={{ display: "flex", alignItems: "center" }}>
                        <StyledTableCellBodyImg src={data.photos[0]} typeImg="rooms"></StyledTableCellBodyImg>
                        <div>
                            <StyledTableCellBodyText typeStyle="id">#{data.id}</StyledTableCellBodyText>
                            <StyledTableCellBodyText typeStyle="title">{data.roomNumber}</StyledTableCellBodyText>
                        </div>
                    </StyledTableCellBody>
                    <StyledTableCellBody>
                        <StyledTableCellBodyText typeStyle="title">{data.roomType}</StyledTableCellBodyText>
                    </StyledTableCellBody>
                    <StyledTableCellBody typeStyle="description">
                        {data.amenities.toString(",")}
                    </StyledTableCellBody>
                    <StyledTableCellBody>
                        <div style={{ display: "flex" }}>
                            <StyledTableCellBodyText typeStyle="titleSemiBold">${data.priceNight}</StyledTableCellBodyText>
                            <StyledTableCellBodyText typeStyle="id">/night</StyledTableCellBodyText>
                        </div>
                    </StyledTableCellBody>
                    <StyledTableCellBody>
                        {data.discount !== null &&
                            <div style={{ display: "flex" }}>
                                <StyledTableCellBodyText typeStyle="titleSemiBold">${data.priceNight - (data.priceNight * 20 / 100)}</StyledTableCellBodyText>
                                <StyledTableCellBodyText typeStyle="id">/night</StyledTableCellBodyText>
                            </div>
                        }
                    </StyledTableCellBody>
                    <StyledTableCellBody>
                        <StyledButton name={data.status}>{data.status}</StyledButton>
                    </StyledTableCellBody>
                    <StyledTableCellBody>
                        <StyledMoreIcon onClick={(e) => handleClick(e, data.id)}></StyledMoreIcon>
                        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                            <MenuItem onClick={() => navigate(`/createRoom/${menuId}`)}>
                                Edit
                            </MenuItem>
                            <MenuItem onClick={() => handleDelete(menuId)}>Delete</MenuItem>
                        </Menu>
                    </StyledTableCellBody>
                </TableRow>

            ))
        }</>
    )

}
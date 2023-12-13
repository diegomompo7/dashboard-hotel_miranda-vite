import { Outlet, useLocation } from "react-router-dom"
import { useState } from "react";
import {Header} from "../header/Header"
import { StyledBody } from "../../components/root/StyledBody";
import { ToastContainer } from "react-toastify";

export const Root = () =>  {
    const [isOpen, setIsOpen] = useState(false)
    let title = ""
    let location = useLocation();

    switch(location.pathname){
        
        case "/":
            title = "Dashboard"
        break;
        case "/booking":
            title = "Bookings List"
        break;
        case "/booking/:id":
            title = "Booking Detail"
        break;
        case "/rooms":
            title = "Room List"
        break;
        case "/users":
            title = "Users List"
        break;
        case "/contact":
            title = "Reviews"
        break;

    }
    
    return (
      <div style={{position: "relative", flexDirection: "column",  height: "100%"}}>
        <ToastContainer />
        <Header setIsOpen={setIsOpen} title={title}></Header>
        <StyledBody isOpen={isOpen}>
            <Outlet />
        </StyledBody>
    </div>
    )

}
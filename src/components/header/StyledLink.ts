import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { HeaderProps } from "../../interfaces/props/PropsInterface";

export const StyledLink = styled(NavLink)<HeaderProps>`
    font-size: 1.125em;
    font-family: "Poppins", sans-serif;
    color: #799283;
    font-weight: 400;
    padding-left: 1.5em;
    transform: translateY(-20%);
    margin-bottom: 2.833em;
    text-decoration: none;

      &.active , &.activeId {
        color: #E23428;
        font-weight: 600;
        }

`
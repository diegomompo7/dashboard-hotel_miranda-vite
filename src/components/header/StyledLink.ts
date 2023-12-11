import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const StyledLink = styled(NavLink)`
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

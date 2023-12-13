import styled from "styled-components";

export const StyledNav = styled.nav `
    display: flex;
    width: 34%;
    min-width: 31.25em;
    margin-bottom:2.188em;
    border-bottom: 1px solid #D4D4D4;
  
`
export const StyledNavText = styled.p<{isActive:boolean}> `
    white-space: nowrap;
    width: 7.937em;
    font-size: 1rem;
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    margin-right: auto;
    margin-bottom: auto;
    padding-bottom: 20px;
    text-align: center;
    color: #6E6E6E;

    ${props => props.isActive && `
    color:#135846;
    border-bottom: 1px solid #135846`};
`


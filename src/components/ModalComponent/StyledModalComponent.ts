import styled from "styled-components";
import { IoClose } from "react-icons/io5";

export const StyledBoxModal = styled.div`
    background: #F8F8F8;
    width: 31.25em;
    height: auto;
    margin: 0 auto;
    transform: translatey(25%)
`
export const StyledTextModal = styled.p`
    font-size: 1.25rem;
    text-align:center;
    padding:5em 3.125em;
    color: #135846;
`

export const StyledIconModal = styled(IoClose)`
    color: #E23428;
    width: 2.5em;
    height: 2.5em;
    margin-top: 0.625em;
    margin-left: 90%;
`
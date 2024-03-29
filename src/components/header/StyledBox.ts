import styled from "styled-components";
import { Box } from "@mui/material";

export const StyledBox = styled.div<{ isOpen: boolean }>`
  height: 7.5rem;
  width: 100%;
  display: flex;
  background-color: #ffffff;

  ${(props) =>
    props.isOpen === true &&
    `
    margin-left: 17.5%;
    width: 83%;

`}
`;

export const StyledMenuBox = styled.div`
  width: 18%;
  background-color: #ffffff;
  position: absolute;
  height: 100%;
`;

export const StyledLogo = styled.div`
  display: flex;
`;

export const StyledBoxMenuProfile = styled.div`
  display: flex;
  flex-direction: column;
  width: 67.5%;
  margin: 0 auto;
  box-shadow: 0px 20px 30px #00000014;
  text-align: center;
  border-radius: 1.125em;
  word-wrap: break-word;
`;

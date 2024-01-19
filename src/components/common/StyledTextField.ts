import styled from "styled-components";
import { TextField } from "@mui/material";

export const StyledTextField = styled(TextField)`
  margin-left: auto;
  width: 15%;
  & .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline {
    border-color: #135846;
  }
`;

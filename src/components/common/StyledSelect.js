import styled from "styled-components";
import { FormControl, InputLabel, Select} from "@mui/material";

export const StyledFormControl = styled(FormControl)`
  
    margin-left: auto;
    width: 15%;
    & .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline{
        border-color: #135846;
        border-radius: 0.75em;
    };

    ${props => props.name==="selectCreate" && `
        width: 45%;
        margin-left: 0;
        margin-right: 1.25em;
        margin-bottom: 1.875em;

        & .MuiSelect-select {
 
        }
        & .MuiInputLabel-root {
    
        }
      
    `}
    ${props => props.name==="selectRoom" && `
    width: 100%;
    margin-left: 0;
    margin-right: 1.25em;
    margin-bottom: 1.875em;

    & .MuiSelect-select {

    }
    & .MuiInputLabel-root {

    }
  
`}
`
export const StyledInputLabel = styled(InputLabel)`
    color: #135846;
    &.Mui-focused {
    color: #135846;
    fontWeight: bold;
    };

`

export const StyledSelect = styled(Select)`
    font-family: Poppins, sans-serif;
    color: #135846;
    font-weight: 600;

`
import styled from "styled-components";

export const StyledSelect = styled.select<{
  name?: string;
  nameSelect?: string;
}>`
  font-family: Poppins, sans-serif;
  color: #135846;
  font-weight: 600;
  margin-left: auto;
  border-color: #135846;
  border-radius: 0.75em;
  height: 3.125em;
  padding-left: 0.75em;

  ${(props) =>
    props.nameSelect === "selectCreate" &&
    `
        margin: 0 auto 1.875em auto;
    `}
    ${(props) =>
      props.nameSelect === "selectRoom" &&
      `
          margin: 0 auto 1.875em auto;
      `}    
`;

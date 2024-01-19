import styled from "styled-components";

export const StyledTable = styled.table`
  background: #ffffff;
  height: auto;
  width: 100%;
  padding-left: 1.25rem;
`;
export const StyledTableBody = styled.tbody`
  border: none;
  table-layout: auto;
`;
export const StyledTableCellRow = styled.th`
  font-size: 1rem;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  text-align: left;
  border-bottom: 1px solid #f8f8f8;
  padding: 1.25em 0;
`;

export const StyledTableCellBodyText = styled.p<{ typeStyle?: string }>`
  ${(props) =>
    props.typeStyle === "title" &&
    `
        font-weight: 500;
        color: #393939;
        margin: 0;
        `}

  ${(props) =>
    props.typeStyle === "titleSemiBold" &&
    `
        font-weight: 600;
        color: #393939;
        padding-right: 0.25em;
        margin: 0;
        `}

        ${(props) =>
    props.typeStyle === "id" &&
    `
        font-size: 0.875rem;
        color: #799283;
        margin: 0;`}

    ${(props) =>
    props.typeStyle === "subtitle" &&
    `
    font-size: 0.875rem;
    color: #393939;
    margin: 0;`}
`;
export const StyledTableCellBody = styled.td<{
  typeStyle?: string;
  name?: string;
}>`
  font-size: 1rem;
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  color: #393939;
  height: 7.56em;
  margin: 0 auto;
  border-bottom: 1px solid #f8f8f8;

  ${(props) =>
    props.typeStyle === "description" &&
    `
        
        width: 30%;

    `}
  ${(props) =>
    props.typeStyle === "message" &&
    `
            width: 30%;
    `}
    ${(props) =>
    props.name === "menu" &&
    `
        position: relative

        &:active,  & div{
            display: block;
        }
    `}
`;

export const StyledTableCellBodyImg = styled.img<{ typeImg: string }>`
  ${(props) =>
    props.typeImg === "booking" &&
    `
        width: 2.813em;
        height: 2.813em;
        padding-right: 0.375em
    `}
  ${(props) =>
    props.typeImg === "rooms" &&
    `
    width: 9.375em;
    height: 4.813em;
    border-radius: 0.5em;
    padding-right: 1.75em
`}
${(props) =>
    props.typeImg === "users" &&
    `
width: 5.5em;
height: 5.5em;
border-radius: 0.5em;

`}
`;

export const StyledTableRow = styled.tr`
  &:hover {
    box-shadow: 0px 4px 30px #00000014;
  }
`;

import styled from "styled-components";

export const StyledNav = styled.nav<{page?: string}>`
  display: flex;
  width: 34%;
  min-width: 31.25em;
  margin-bottom: 2.188em;
  border-bottom: 1px solid #d4d4d4;
  ${(props) =>
    props.page === "contact" &&
    `
    margin-top: 5.438em;`};
`;
export const StyledNavText = styled.p<{ isActive: boolean }>`
  white-space: nowrap;
  width: 7.937em;
  font-size: 1rem;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  margin-right: auto;
  margin-bottom: auto;
  padding-bottom: 1.25em;
  text-align: center;
  color: #6e6e6e;

  ${(props) =>
    props.isActive &&
    `
    color:#135846;
    border-bottom: 1px solid #135846`};
`;

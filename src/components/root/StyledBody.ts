import styled from "styled-components";

export const StyledBody = styled.div<{ isOpen: boolean }>`
  ${(props) =>
    props.isOpen === true &&
    `
        margin-left: 17.5%;
    `}

  margin-top: 3.125em;
  padding-left: 1.875em;
  padding-right: 1.56%;
`;

export const StyledBoxDefault = styled.div`
  display: flex;
`;

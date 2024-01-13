import styled, { StyleFunction } from "styled-components";
import { Text } from "@chakra-ui/react";

interface StyledTextProps {
  fontSize?: string;
  color?: string;
  fontFamily?: string;
  weight?: string;
}

export const StyledText: StyleFunction<StyledTextProps> = (props) => `
    font-size: ${props.fontSize};
    color: ${props.color};
    font-family: ${props.fontFamily};
    font-weight: ${props.weight};
`;

export const StyledTextHeader = styled.h1<StyledTextProps>`
  ${StyledText}
  margin-left: 1.786em;
  margin-top: 1.464em;
`;

export const StyledTextLogo = styled.div<StyledTextProps>`
  padding-left: 8.9%;
  display: flex;
  flex-direction: column;
  margin-bottom: 5.167em;
  ${StyledText}
`;

export const StyledTextUserMenu = styled.p<StyledTextProps>`
  ${StyledText};
  height: auto;
  margin-top: ${(props) => (props.fontSize === "1rem" ? "1em" : "0")};
  margin-bottom: ${(props) =>
    props.fontSize === "0.75rem" ? "1.333em" : "0.813em"};
`;

export const StyledTextFooter = styled.p<{ name: string }>`
  font-family: "Poppins", sans-serif;
  padding-left: 16.2%;
  vertical-align: 100%;
  ${(props) =>
    props.name === "travl" &&
    `   
        margin-bottom: 0.313em;
        color: #212121;
        font-size: 1rem;
        font-weight: 600;
       `}
  ${(props) =>
    props.name === "copy" &&
    `
        margin-bottom: 4.071em;
        color: #799283;
        font-size: 0.875rem;
        font-weight: 300;
       `}
    ${(props) =>
    props.name === "made" &&
    `
        color: #799283;
        font-size: 0.875rem;
        font-weight: 300;
       `}
`;

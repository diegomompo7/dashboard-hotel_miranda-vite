import styled, { StyleFunction } from "styled-components";

interface StyledImgProps {
    width?: string;
    height?: string;
  }

const styledImg: StyleFunction<StyledImgProps> = props => `
    width: ${props.width};
    height: ${props.height};

`

export const StyledImgLogo = styled.img<StyledImgProps>`
    margin-left: 13.6%;
    margin-top: 3.063rem;
    ${styledImg}
`
export const StyledTextImgLogo = styled.img<StyledImgProps>`
    margin-top: 3.063rem;
    ${styledImg}
`

export const StyledImgProfileMenu = styled.img<StyledImgProps>`
    ${styledImg};
    border-radius: 0.5em;
    margin: 0 auto;
`
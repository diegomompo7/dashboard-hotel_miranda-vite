import styled from "styled-components";

const styledImg = props => `
    width: ${props.width};
    height: ${props.height};

`

export const StyledImgLogo = styled.img`
    margin-left: 13.6%;
    margin-top: 3.063rem;
    ${styledImg}
`
export const StyledTextImgLogo = styled.img`
    margin-top: 3.063rem;
    ${styledImg}
`

export const StyledImgProfileMenu = styled.img`
    ${styledImg};
    border-radius: 0.5em;
    margin: 0 auto;
`
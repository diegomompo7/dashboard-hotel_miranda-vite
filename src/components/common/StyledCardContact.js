import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";

export const StyledSwiperSlide = styled(SwiperSlide)`
  border-radius: 1.25em;
  background: #ffffff;
  width: 22.4%;
  height: auto;
`;

export const StyledSwiper = styled(Swiper)`

& .swiper-button-next, .swiper-button-prev {
    color: #ffffff;
    background: #135846;
    border-radius: 0.7em;
    width: 3.5em;
    height: 3.5em;
    
    &::after{
        font-size: 1rem;

    }
}
    margin-bottom: 5.438em;
`;

export const StyledSSText = styled.p`
  ${(props) =>
        props.name === "message" &&
        `
    
        font-size: 1rem;
        font-family: "Poppins", sans-serif;
        line-height: 1.75em;
        padding: 1.875em 1.875em 0 1.875em;
        margin-bottom: 3.5em;
        color: #4E4E4E;
        display: -webkit-box;
        -webkit-line-clamp: 4; /* Número de líneas que deseas mostrar */
        -webkit-box-orient: vertical;
        overflow: hidden;
    `}
  ${(props) =>
        props.name === "title" &&
        `
    
    font-size: 1rem;
    font-family: "Poppins", sans-serif;
    line-height: 1.75em;
    font-weight: 600;
    padding-left: 1.313em;
    margin:0;
`}
    ${(props) =>
        props.name === "subtitle" &&
        `
    
    font-size: 0.875rem;
font-family: "Poppins", sans-serif;
line-height: 1.75em;
font-weight: 400;
color: #799283;
padding: 0;
margin:0;
padding-left: 1.5em;
`}
`;

export const StyledSSImg = styled.img`
  width: 3.5em;
  height: 3.5em;
  border-radius: 0.5em;
  padding-left: 1.875em;
  margin-bottom: 1.875em;
`;

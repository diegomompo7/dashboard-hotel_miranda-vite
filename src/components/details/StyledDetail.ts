import { Text } from "@chakra-ui/react";
import styled from "styled-components";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineMessage } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";

export const StyledDetailContainer = styled.div`
  display: flex;
  height: auto;
`;
export const StyledDetailContent = styled.div`
  width: 50%;

  background: #ffffff;
  border-radius: 0.75em;
  padding-left: 5.4%;
`;
export const StyledDetailContentPerson = styled.div`
  display: flex;
  padding-top: 2.5em;
  margin-bottom: 2em;
`;
export const StyledDetailImg = styled.img`
  width: 9.75em;
  height: 9.75em;
`;
export const StyledDetailPersonText = styled.div``;
export const StyledDetailText = styled.p<{ typeStyle: string }>`
  font-family: "Poppins", sans-serif;

  ${(props) =>
    props.typeStyle === "semibold" &&
    `
    
        font-size: 1.875rem;
        font-weight: 600;
        margin-top: 0;
        margin-bottom: 0.433em;
        
    `}
  ${(props) =>
    props.typeStyle === "id" &&
    `
    
    font-size: 0.875rem;
    font-weight: 400;
    color: #799283;
    margin-top: 0;
    margin-bottom: 1.5em;
    
`}
${(props) =>
    props.typeStyle === "message" &&
    `
    
font-size: 1rem;
font-weight: 500;
color: #FFFFFF;
padding-left: 1.438em;
padding-right: 1.625em;

`}

${(props) =>
    props.typeStyle === "normal" &&
    `
    
font-size: 0.875rem;
font-weight: 400;
color: #6E6E6E;
margin-bottom 0.714em;
`}

${(props) =>
    props.typeStyle === "normalFacilities" &&
    `
    
font-size: 0.875rem;
font-weight: 500;
color: #6E6E6E;
margin: 0;
`}

${(props) =>
    props.typeStyle === "checkMedium" &&
    `
    
font-size: 1rem;
font-weight: 500;
color: #212121;
margin: 0;
padding-right: 4.5em;
`}

${(props) =>
    props.typeStyle === "infoMedium" &&
    `
    
font-size: 1.5rem;
font-weight: 500;
color: #212121;
margin: 0;
`}

${(props) =>
    props.typeStyle === "perNight" &&
    `
    
font-size: 0.875rem;
font-weight: 400;
color: #799283;
padding-left: 0.857em;
`}
${(props) =>
    props.typeStyle === "normalDesc" &&
    `
    
font-size: 0.875rem;
font-weight: 400;
color: #363636;
line-height: 1.5em;
margin-top: 2.142em;
width: 93.7%;
`}
${(props) =>
    props.typeStyle === "amenities" &&
    `
    
font-size: 1rem;
font-weight: 600;
color: #2c6a5a;
background: #e8f2ef;
padding: 0.812em 0.937em  0.812em 0.937em;
margin-right: 0.812em;
`}

${(props) =>
    props.typeStyle === "roomType" &&
    `
    
font-size: 1rem;
font-weight: 500;
color: #FFFFFF;
padding-left: 3.375em;
margin-top: 0;
margin-bottom: 1.187em;
`}
${(props) =>
    props.typeStyle === "roomDescription" &&
    `
    
font-size: 0.875rem;
font-weight: 400;
color: #8f8f8f;
padding-left: 3.857em;
margin-top: 0;
margin-bottom: 2.714em;
`}
`;

export const StyledDetailActions = styled.div`
  display: flex;
`;
export const StyledDetailIconPhone = styled(FaPhoneAlt)`
  width: 1.25em;
  width: 1.25em;
  padding: 1.25em 1.25em 1.25em 1.04%;
  color: #135846;
`;

export const StyledDetailMessage = styled.div`
  background: #135846;
  display: flex;
  border-radius: 0.75em;
  width: 100%;
`;

export const StyledDetailIconMessage = styled(MdOutlineMessage)`
  color: #ffffff;
  width: 1.5em;
  height: 1.5em;
  padding-top: 1.063em;
  padding-left: 1.125em;
`;

export const StyleDetailCheck = styled.div`
  display: flex;
`;

export const StyledDetailLine = styled.hr`
  margin: 1.25em 0 0;
  width: 97%;
`;

export const StyledDetailInfo = styled.div`
  display: flex;
  margin-top: 1.3125em;
`;

export const StyledDetailInfoRoom = styled.div`
  margin-right: 13.1%;
`;
export const StyledDetailInfoPrice = styled.div``;

export const StyledDetailAmeContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-wrap: wrap;
  width: 78.8%;
`;

export const StyledDetailAmenities = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: 0;
`;

export const StyledDetailSwiper = styled(Swiper)`
  width: 50%;
  border-radius: 0.75em;

  & .swiper-button-next,
  .swiper-button-prev {
    color: #ffffff;
    background: #c8c8c8;
    border-radius: 0.7em;
    border: 5px solid #d2d2d2;
    top: 70%;
    margin-left: 3.375em;
    margin-right: 2.062em;
    width: 2.5em;
    height: 2.5em;

    &::after {
      font-size: 0;
    }
  }
`;

export const StyledDetailSwiperImg = styled.div<{ img: string }>`

    background-image: url(${(props) => props.img})
    position: absolute;
    left: 0;
    top: 0;
    width: 130%;
    height: 100%;
    -webkit-background-size: cover;
    background-size: cover;
    background-position: center;`;

export const StyledDetailSwiperSlide = styled(SwiperSlide)<{ img: string }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 1.25em;
  width: 22.4%;
  height: auto;
  background-image: url(${(props) => props.img});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  z-index: -1;
`;

export const StyledDetailTextContainer = styled.div``;
export const StyleDetailStatus = styled.div<{ typeStyle: string }>`
  position: relative;
  left: 3.75em;
  margin-left: auto;
  top: 1em;
  transform: rotate(40deg);
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 1rem;
  margin-right: 0px;
  padding: 1em 0;
  text-align: center;
  width: 12.75em;

  ${(props) =>
    props.typeStyle === "Check In" &&
    `
   background-color: #5AD07A;
   color: #FFFFFF;
   
   `}
  ${(props) =>
    props.typeStyle === "Check Out" &&
    `
    background-color: #E23428;
    color: #FFFFFF;

`}
${(props) =>
    props.typeStyle === "In Progress" &&
    `
    background-color: #e2dc28;
    color: #000000;

`}
`;

import { Card } from "@mui/material";
import styled from "styled-components";
import { IoBedOutline } from "react-icons/io5";
import { LuCalendarCheck2 } from "react-icons/lu";
import { TbLogin2, TbLogin } from "react-icons/tb";

const kpiIcon = `
padding: 1.437em 1.125em 1.375em 1.187em;
width: 28px;
height: 20px;
background: #FFEDEC;
border-radius: 8px;
margin: 1.875em 1.375em 1.875em 1.875em;
color: #E23428;
`;

export const StyledCardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 450px;
`;

export const StyledCardKpi = styled(Card)`
  background: #ffffff;
  width: 23%;
  box-shadow: 0px 4px 4px #00000005;
  display: flex;
`;

export const StyledKpiIconBed = styled(IoBedOutline)`
  ${kpiIcon}
`;
export const StyledKpiIconCalendar = styled(LuCalendarCheck2)`
  ${kpiIcon}
`;
export const StyledKpiIconIn = styled(TbLogin2)`
  ${kpiIcon}
`;

export const StyledKpiIconOut = styled(TbLogin)`
  ${kpiIcon}
`;

export const StyledKpiTextContainer = styled.div``;
export const StyledKpiText = styled.p<{ typeStyle: string }>`
  ${(props) =>
    props.typeStyle === "title" &&
    `
    font-family: "Poppins", sans-serif;
    font-size: 1.875rem;
    color: #393939;
    font-weight:600;
    margin-bottom: 0;
`}

  ${(props) =>
    props.typeStyle === "subtitle" &&
    `
    font-family: "Poppins", sans-serif;
    font-size: 0.875rem;
    color: #787878;
    font-weight:300;
    margin: 0;
`}
`;

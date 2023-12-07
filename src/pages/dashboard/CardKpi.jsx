import React from "react";
import { StyledCardContainer, StyledCardKpi, StyledKpiIconBed, StyledKpiTextContainer, StyledKpiText, StyledKpiIconCalendar, StyledKpiIconIn, StyledKpiIconOut } from "../../components/dashboard/StyledCardKpi";


export const CardKpi = () => {
    return(
        <StyledCardContainer>
            <StyledCardKpi>
                <StyledKpiIconBed></StyledKpiIconBed>
                <StyledKpiTextContainer>
                    <StyledKpiText typeStyle="title">8,461</StyledKpiText>
                    <StyledKpiText typeStyle="subtitle">New Booking</StyledKpiText>
                </StyledKpiTextContainer>
            </StyledCardKpi>
            <StyledCardKpi>
            <StyledKpiIconCalendar></StyledKpiIconCalendar>
                <StyledKpiTextContainer>
                    <StyledKpiText typeStyle="title">963</StyledKpiText>
                    <StyledKpiText typeStyle="subtitle">Scheduled Rooms</StyledKpiText>
                </StyledKpiTextContainer>
            </StyledCardKpi>
            <StyledCardKpi>
            <StyledKpiIconIn></StyledKpiIconIn>
                <StyledKpiTextContainer>
                    <StyledKpiText typeStyle="title">753</StyledKpiText>
                    <StyledKpiText typeStyle="subtitle">Check In</StyledKpiText>
                </StyledKpiTextContainer>
            </StyledCardKpi>
            <StyledCardKpi>
            <StyledKpiIconOut></StyledKpiIconOut>
                <StyledKpiTextContainer>
                    <StyledKpiText typeStyle="title">516</StyledKpiText>
                    <StyledKpiText typeStyle="subtitle">Check Out</StyledKpiText>
                </StyledKpiTextContainer>
            </StyledCardKpi>
        </StyledCardContainer>
    )
}
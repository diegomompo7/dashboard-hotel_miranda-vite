import React from "react"
import { StyledButton } from "../../components/common/StyledButton"
import { StyledSpinner } from "../../components/spinner/StyledSpinner"
import { StyledErrorPage } from "../../components/error/StyledErrorPage"
import { NavigateFunction, useNavigate } from "react-router-dom"

export const ErrorPage = (props: any) => {

    const navigate: NavigateFunction = useNavigate()
    return (
        <StyledErrorPage>
        <StyledSpinner>{props.error}</StyledSpinner>
        <StyledButton name="create"  onClick={() => navigate(`/`)}>Back to Home</StyledButton>
        </StyledErrorPage>
    )
}
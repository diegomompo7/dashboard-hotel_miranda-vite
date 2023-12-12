import styled from "styled-components";

export const StyledPagination = styled.div`
    margin-top: 1.688em;
    display: flex;
`

export const StyledPaginationText = styled.p`
   
    font-size: 1rem;
    font-family: "Poppins", sans-serif;
    font-weight: 400;
`

export const StyledButtonPage = styled.div`
    margin-left: auto;
    display: flex;
`

export const StyledTextPage= styled.div<{isCurrentPage:boolean}>`

   font-size: 1rem;
   font-weight: 500;
   border-radius: 0.75em;
   padding: 0.938em 1.438em 0.875em 1.5em;
   font-family: "Poppins", sans-serif;
   margin-right: 0.25em;
    ${props => props.isCurrentPage && `
    color:#FFFFFF;
    background: #135846`};
`

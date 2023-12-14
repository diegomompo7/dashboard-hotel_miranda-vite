import styled from "styled-components";


export const StyledButton = styled.button<{name:string}>`
    text-transform: none;
    border: none;
    ${props => props.name==="CONTACT_US" && 
        `
            margin: 0 auto;
            width: 67.8%;
            background: #EBF1EF;
            font-size : 0.875rem;
            font-family: 'Poppins', sans-serif;
            font-weight: 600;
            color: #135846;
            padding: 1em 0 0.929em 0;
            margin-bottom: 2.5em;
        `
    }
    ${props => props.name==="view_notes" && 
    `
       font-size: 1rem;
       background-color: #EEF9F2;
       font-family: 'Poppins', sans-serif;
       font-weight: 500;
       color: #212121;
       border-radius:  0.75em;
       padding: 0.813em 2.188em 0.75em 2.25em;

       &:disabled{
         border: 1px solid #799283;
         background-color: #FFFFFF;
         color: #799283;
       }

    `}

    ${props => props.name==="Check In" && 
    `
       font-size: 1rem;
       background-color: #E8FFEE;
       font-family: 'Poppins', sans-serif;
       font-weight: 500;
       color: #5AD07A;
       border-radius:  0.75em;
       padding: 0.813em 1.5em 0.75em 1.563em;
    `
    }
    ${props => props.name==="Check Out" && 
    `
       font-size: 1rem;
       background-color: #FFEDEC;
       font-family: 'Poppins', sans-serif;
       font-weight: 500;
       color: #E23428;
       border-radius:  0.75em;
       padding: 0.813em 1.5em 0.75em 1.563em;

    `
    }
    ${props => props.name==="In Progress" && 
    `
       font-size: 1rem;
       background-color: #FEFFEB;
       font-family: 'Poppins', sans-serif;
       font-weight: 500;
       color: #909217;
       border-radius: 0.75em;
       padding: 0.813em 1.5em 0.75em 1.563em;

    `
    }
    ${props => (props.name==="Prev" || props.name==="Next") && 
    `
       font-size: 1rem;
       text-align: center;
       background-color: #FFFFFF;
       color: #135846;
       border: 1px solid #135846;
       font-family: 'Poppins', sans-serif;
       font-weight: 400;
       border-radius: 0.75em;
       padding: 0.938em 1.75em 0.875em 1.813em;
    `
    }
   ${props => props.name==="Prev" && `margin-right:0.25em`}

   
           ${props => props.name==="Available" && 
           `
              font-size: 1rem;
              background-color: #5AD07A;
              font-family: 'Poppins', sans-serif;
              font-weight: 500;
              color: #FFFFFF;
              border-radius:  0.75em;
              padding: 0.813em 1.5em 0.75em 1.563em;
       
           `
           }
           ${props => props.name==="Booked" && 
           `
              font-size: 1rem;
              background-color: #E23428;
              font-family: 'Poppins', sans-serif;
              font-weight: 500;
              color: #FFFFFF;
              border-radius:  0.75em;
              padding: 0.813em 1.5em 0.75em 1.563em;
       
           `
           }
           ${props => props.name==="archived"  && 
           `
              font-size: 1rem;
   
              font-family: 'Poppins', sans-serif;
              font-weight: 500;
              color:#E23428;
              border-radius:  0.75em;
              padding: 0.813em 1.5em 0.75em 1.563em;
              background-color: #FFFFFF;
       
           `
           }

           ${props => props.name==="ACTIVE" && 
           `
              font-size: 0.875rem;
   
              font-family: 'Poppins', sans-serif;
              font-weight: 500;
              color:#5AD07A;
              border-radius:  0.75em;
              padding: 0.813em 1.5em 0.75em 1.563em;
           `
           }
           ${props => props.name==="INACTIVE" && 
           `
              font-size: 0.875rem;
   
              font-family: 'Poppins', sans-serif;
              font-weight: 500;
              color:#E23428;
              border-radius:  0.75em;
              padding: 0.813em 1.5em 0.75em 1.563em;
           `
           }
           ${props => props.name==="login" && 
           `
               width: 26.7%;
              font-size: 1.25rem;
              font-family: 'Poppins', sans-serif;
              font-weight: 500;
              background: #135846;
              color:#FFFFFF;
               margin: 0 auto;
              border-radius:  0.6em;
              box-shadow: 0 0 8px 4px #135846;

              &:hover{
               background: #135846;
               box-shadow: 0 0 8px 4px #135846;
              }

           `
           }

           ${props => props.name==="new" && 
           `
               width: 70.7%;
               height: 3.062em;
              font-size: 1.25rem;
              font-family: 'Poppins', sans-serif;
              font-weight: 500;
              background: #135846;
              color:#FFFFFF;
               margin: 0 auto;
              border-radius:  0.6em;
              box-shadow: 0 0 8px 4px #135846;

              &:hover{
               background: #135846;
               box-shadow: 0 0 8px 4px #135846;
              }

           `
           }

           ${props => props.name==="create" && 
           `
             width: 18%;
      
             height: 3.062em;
               margin-left: auto;
              font-size: 1rem;
              font-family: 'Poppins', sans-serif;
              font-weight: 500;
              background: #135846;
              color:#FFFFFF;
              border-radius:  0.75em;
   

              &:hover{
               background: #135846;
   
              }

           `
           }

   `
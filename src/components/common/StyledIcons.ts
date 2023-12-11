import { IoIosSearch, IoMdHeartEmpty, IoMdMore } from "react-icons/io";
import { FiAlignLeft, FiBell } from "react-icons/fi";
import { MdOutlineMail, MdOutlineLocalPhone} from "react-icons/md";
import styled from "styled-components";
import { LuLayoutDashboard, LuCalendarCheck2  } from "react-icons/lu";
import { TfiKey } from "react-icons/tfi";
import { FaRegUser } from "react-icons/fa6";
import { HiOutlinePuzzle } from "react-icons/hi";
import { SlLogin } from "react-icons/sl";


const styleIconsMenu = `
       color: #799283;

`
const styleIcons =`
    width: 1.5em
    height: 1.5em;
    
`
const styleIconsHeader = `
       margin-top: 3.188rem;
       margin-left: 3%;
`

export const StyledMenuIcon = styled(FiAlignLeft)`
        margin-top: 3.188rem;
        margin-left: 2.1%;
        ${styleIcons}
`
export const StyledSearchIcon = styled(IoIosSearch)`
       ${styleIcons}
      
`
export const StyledHeartIcon = styled(IoMdHeartEmpty)`
       ${styleIcons};
       margin-top: 3.188rem;
       margin-left: auto;

`
export const StyledEmailIcon = styled(MdOutlineMail)`
       ${styleIcons};
       ${styleIconsHeader};

`
export const StyledBellIcon = styled(FiBell)`
       ${styleIcons};
       ${styleIconsHeader};

`
export const StyledLogOutIcon = styled(SlLogin)`
       ${styleIcons};
       ${styleIconsHeader};
       margin-right: 3.125rem
`

export const StyledDashboardIcon = styled(LuLayoutDashboard)`
       ${styleIconsMenu}
       ${styleIcons}
`
export const StyledBookingIcon = styled(TfiKey)`
       ${styleIconsMenu}
       ${styleIcons}
`
export const StyledRoomsIcon = styled(LuCalendarCheck2)`
       ${styleIconsMenu}
       ${styleIcons}

       &.active {
              color: red;
            }
`
export const StyledContactIcon = styled(FaRegUser)`
       ${styleIconsMenu}
       ${styleIcons}
`
export const StyledUsersIcon = styled(HiOutlinePuzzle)`
       ${styleIconsMenu}
       ${styleIcons}
`
export const StyledMoreIcon = styled(IoMdMore)`
       ${styleIcons}
       color: #6E6E6E;
       margin: 0 auto;

       ${props => props.name==="moreDetail" && `
              width: 1.5em;
              height:1.5em;
              margin-right: 1.875em;
              margin-left: auto;
       
       `
       }
`
export const StyledPhone = styled(MdOutlineLocalPhone)`
       ${styleIcons}
       margin-right: 0.938em

`
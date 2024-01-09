import React, { useContext, useEffect } from "react";
import {
  StyledBox,
  StyledMenuBox,
  StyledLogo,
  StyledBoxMenuProfile,
} from "../../components/header/StyledBox";
import {
  StyledBellIcon,
  StyledBookingIcon,
  StyledContactIcon,
  StyledDashboardIcon,
  StyledEmailIcon,
  StyledHeartIcon,
  StyledLogOutIcon,
  StyledMenuIcon,
  StyledRoomsIcon,
  StyledUsersIcon,
} from "../../components/common/StyledIcons";
import {
  StyledTextUserMenu,
  StyledTextHeader,
  StyledTextLogo,
  StyledTextFooter,
} from "../../components/header/StyledText";
import {
  StyledImgLogo,
  StyledTextImgLogo,
  StyledImgProfileMenu,
} from "../../components/common/StyledImg";
import { StyledMenuItem } from "../../components/header/StyledMenuItem";
import logo from "../../assets/img/logo.png";
import textLogo from "../../assets/img/textLogo.png";
import { StyledButton } from "../../components/common/StyledButton";
import { StyledLink } from "../../components/header/StyledLink";
import AuthContext from "../../AuthContext";
import { HeaderProps } from "../../interfaces/props/PropsInterface";
import { fetchGETData } from "../../hooks/fetchAPI";

export const Header: React.FC<HeaderProps> =  (props) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const { userLogin } = useContext(AuthContext);
  const [user, setUser] = React.useState({photo: "", fullName: "", email: "",})

  if(open){
    const user = async  () => {
      setUser(await fetchGETData("/header"))
    }
    user()
  }

  return (
    <div>
      {open === true ? (
        <StyledMenuBox>
          <StyledLogo>
            <StyledImgLogo
              src={logo}
              width="47px"
              height="40px"
            ></StyledImgLogo>
            <StyledTextLogo
              fontSize="0.75rem"
              fontFamily="'Poppins', sans-serif"
              color="#5D5449"
              weight="300"
            >
              <StyledTextImgLogo
                src={textLogo}
                width="72px"
                height="23px"
              ></StyledTextImgLogo>
              <p>Hotel Admin Dashboard</p>
            </StyledTextLogo>
          </StyledLogo>
          <StyledMenuItem>
            <StyledDashboardIcon></StyledDashboardIcon>
            <StyledLink to="/" activeClassName="active" {...props}>
              Dashboard
            </StyledLink>
          </StyledMenuItem>
          <StyledMenuItem>
            <StyledRoomsIcon></StyledRoomsIcon>
            <StyledLink to="/booking" activeClassName="active" {...props}>
              Bookings
            </StyledLink>
          </StyledMenuItem>
          <StyledMenuItem>
            <StyledBookingIcon></StyledBookingIcon>
            <StyledLink to="/rooms" activeClassName="active" {...props}>
              Room
            </StyledLink>
          </StyledMenuItem>
          <StyledMenuItem>
            <StyledContactIcon></StyledContactIcon>
            <StyledLink to="/contact" activeClassName="activeId" {...props}>
              Contact
            </StyledLink>
          </StyledMenuItem>
          <StyledMenuItem>
            <StyledUsersIcon></StyledUsersIcon>
            <StyledLink to="/users" activeClassName="active" {...props}>
              Users
            </StyledLink>
          </StyledMenuItem>
          <StyledBoxMenuProfile>
            <StyledImgProfileMenu
              src={user.photo}
              width="70px"
              height="70px"
            ></StyledImgProfileMenu>
            <StyledTextUserMenu
              fontSize="1rem"
              fontFamily="'Poppins', sans-serif"
              color="#5D5449"
              weight="500"
            >
              {user.fullName}
            </StyledTextUserMenu>
            <StyledTextUserMenu
              fontSize="0.75rem"
              fontFamily="'Poppins', sans-serif"
              color="#B2B2B2"
              weight="300"
            >
              {user.email}
            </StyledTextUserMenu>
            <StyledButton name="CONTACT_US">Contact Us</StyledButton>
          </StyledBoxMenuProfile>
          <StyledTextFooter name="travl">
            Travl Hotel Admin Dashboard
          </StyledTextFooter>
          <StyledTextFooter name="copy">
            © 2020 All Rights Reserved
          </StyledTextFooter>
          <StyledTextFooter name="made">
            Made with ♥ by Peterdraw
          </StyledTextFooter>
        </StyledMenuBox>
      ) : (
        ""
      )}
      <StyledBox isOpen={open}>
        <StyledMenuIcon
          onClick={() => {
            setOpen(!open);
            props.setIsOpen(!open);
          }}
        ></StyledMenuIcon>
        <StyledTextHeader
          fontSize="1.7rem"
          color="#393939"
          fontFamily="'Poppins', sans-serif"
          weight="600"
        >
          {props.title}
        </StyledTextHeader>
        <StyledHeartIcon></StyledHeartIcon>
        <StyledEmailIcon></StyledEmailIcon>
        <StyledBellIcon></StyledBellIcon>
        <StyledLogOutIcon></StyledLogOutIcon>
      </StyledBox>
    </div>
  );
};

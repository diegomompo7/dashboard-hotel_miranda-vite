
import {StyledSwiper, StyledSwiperSlide, StyledSSText, StyledSSImg } from "../../components/common/StyledCardContact";
import { Keyboard,  Navigation } from "swiper/modules";
import { useState } from "react";
import { getFullMessage } from "../../features/contact/contactSlice";


import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ModalComponent } from "../../components/ModalComponent/ModalComponent.jsx";
import { useDispatch, useSelector } from "react-redux";



export const CardContact = (props) => {



    const dispatch = useDispatch()
    const contact = props.contact
    const orderContactDate = [...contact].sort((a,b) => new Date(b.date) - new Date(a.date))
    const [open, setOpen] = useState(false);
    const fullMessage = useSelector((state) => state.contact.fullMessage);

    const handleOpen = (idContact) => {
      
      setOpen(true)
      dispatch(getFullMessage(idContact));
      
    }
    const handleClose = () => {
      setOpen(false)
    }

  
    return (
      <>

    {  fullMessage !== undefined && 

      <ModalComponent open={open} handleClose={handleClose} description={fullMessage.message}></ModalComponent> }

        <StyledSwiper
        slidesPerView={3}
        spaceBetween={30}
        keyboard={{
          enabled: true,
        }}
        navigation={true}
        modules={[Keyboard, Navigation]}
        className="mySwiper"

      >
        {
            orderContactDate.map((contact) => (
            
            <StyledSwiperSlide key={contact.id} onClick={() => {handleOpen(contact.id)}}>
                <StyledSSText name="message">{contact.message}</StyledSSText>
                <div style={{display: 'flex'}}>
                <StyledSSImg src={contact.userImg}></StyledSSImg>
                <div>
                <StyledSSText name="title">{contact.name} {contact.surname}</StyledSSText>
                <StyledSSText name="subtitle">{
                
                Math.floor((Date.now() - new Date(contact.date)) / 1000 / 60 / 60)
                }h {
                
                  Math.floor(((Date.now() - new Date(contact.date)) / 1000 / 60 / 60 ) % 60)
                  }m ago</StyledSSText>
                </div>
                
                </div>
            </StyledSwiperSlide>

            ))
        }

      </StyledSwiper>
      </>
    )
}
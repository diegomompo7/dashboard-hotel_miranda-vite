import {
  StyledSwiper,
  StyledSwiperSlide,
  StyledSSText,
  StyledSSImg,
} from "../../components/common/StyledCardContact";
import { Keyboard, Navigation } from "swiper/modules";
import React, { useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ModalComponent } from "../../components/ModalComponent/ModalComponent";
import { ContactInterface } from "../..//interfaces/contact/ContactInterface";
import { CardContactProps } from "../..//interfaces/props/PropsInterface";

export const CardContact: React.FC<CardContactProps> = (props) => {
  const contact: ContactInterface[] = props.contact;
  const orderContactDate: ContactInterface[] = [...contact].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const [open, setOpen] = useState<boolean>(false);
  const [fullMessage, setFullMessage] = useState<string>("");

  return (
    <>
      {fullMessage !== undefined && (
        <ModalComponent
          open={open}
          handleClose={() => setOpen(false)}
          description={fullMessage}
        ></ModalComponent>
      )}

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
        {orderContactDate.map((contact: ContactInterface) => (
          <StyledSwiperSlide
            key={contact._id}
            onClick={() => {
              setOpen(true), setFullMessage(contact.message);
            }}
          >
            <StyledSSText name="message">{contact.message}</StyledSSText>
            <div style={{ display: "flex" }}>
              <StyledSSImg src={contact.userImg}></StyledSSImg>
              <div>
                <StyledSSText name="title">
                  {contact.name} {contact.surname}
                </StyledSSText>
                <StyledSSText name="subtitle">
                  {Math.floor(
                    (Date.now() - new Date(contact.date).getTime()) /
                      1000 /
                      60 /
                      60
                  )}
                  h{" "}
                  {Math.floor(
                    ((Date.now() - new Date(contact.date).getTime()) /
                      1000 /
                      60 /
                      60) %
                      60
                  )}
                  m ago
                </StyledSSText>
              </div>
            </div>
          </StyledSwiperSlide>
        ))}
      </StyledSwiper>
    </>
  );
};

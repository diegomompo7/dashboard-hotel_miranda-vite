import {
  StyledDetailContainer,
  StyledDetailSwiper,
  StyledDetailContent,
  StyledDetailContentPerson,
  StyledDetailPersonText,
  StyledDetailText,
  StyledDetailActions,
  StyledDetailIconPhone,
  StyledDetailMessage,
  StyledDetailIconMessage,
  StyleDetailCheck,
  StyledDetailLine,
  StyledDetailInfo,
  StyledDetailInfoRoom,
  StyledDetailInfoPrice,
  StyledDetailAmenities,
  StyledDetailAmeContainer,
  StyledDetailTextContainer,
  StyledDetailSwiperSlide,
  StyleDetailStatus,
} from "../../components/details/StyledDetail";

import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";
import { Navigation } from "swiper/modules";
import { StyledMoreIcon } from "../../components/common/StyledIcons";

import { useDispatch } from "react-redux";

import {getBookingsStatus} from "../../features/bookings/bookingsSlice";
import React, { useEffect, useState } from "react";
import { AppDispatch, useAppSelector } from "../../app/store";
import { BookingInterface } from "../../interfaces/booking/BookingInterface";
import { fetchBooking } from "../../features/bookings/bookingsTrunk";
import { ErrorPage } from "../error/ErrorPage";
import { StyledSpinner } from "../../components/spinner/StyledSpinner";

export const BookingDetailPage = () => {
  const url: URL = new URL(window.location.href);
  const id: string = url.pathname.split("/").slice(2, 3).join("");

  const dispatch: AppDispatch = useDispatch();
  const [bookingId, setBookingId] = useState<BookingInterface>();
  const bookingsListStatus = useAppSelector<string>(getBookingsStatus);

  
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    dispatch(fetchBooking(id)).unwrap().then((book) => {
      setBookingId(book)
    }).catch((err) => setError(err.message))
}, [dispatch, id]);


  return (
    <>
    {bookingsListStatus === "rejected"  ?   <ErrorPage error={error}></ErrorPage> : bookingsListStatus === "pending" ?   <StyledSpinner>Loading...</StyledSpinner> : bookingId &&
    <StyledDetailContainer key={bookingId._id}>
      <StyledDetailContent>
        <StyledDetailContentPerson>
          <StyledDetailPersonText>
            <StyledDetailText typeStyle="semibold">
              {bookingId.name}
            </StyledDetailText>
            <StyledDetailText typeStyle="id">
              ID {bookingId._id}
            </StyledDetailText>
            <StyledDetailActions>
              <StyledDetailIconPhone></StyledDetailIconPhone>
              <StyledDetailMessage>
                <StyledDetailIconMessage></StyledDetailIconMessage>
                <StyledDetailText typeStyle="message">
                  Send Message
                </StyledDetailText>
              </StyledDetailMessage>
            </StyledDetailActions>
          </StyledDetailPersonText>
          <StyledMoreIcon name="moreDetail"></StyledMoreIcon>
        </StyledDetailContentPerson>
        <StyleDetailCheck>
          <div>
            <StyledDetailText typeStyle="normal"> Check In</StyledDetailText>
            <StyledDetailText typeStyle="checkMedium">
              {" "}
              {bookingId.check_in} | {bookingId.hour_in}{" "}
            </StyledDetailText>
          </div>
          <div>
            <StyledDetailText typeStyle="normal"> Check out</StyledDetailText>
            <StyledDetailText typeStyle="checkMedium">
              {bookingId.check_out} | {bookingId.hour_out}{" "}
            </StyledDetailText>
          </div>
        </StyleDetailCheck>
        <StyledDetailLine />
        <StyledDetailInfo>
          <StyledDetailInfoRoom>
            <StyledDetailText typeStyle="normal">Room Info</StyledDetailText>
            <StyledDetailText typeStyle="infoMedium">
              {bookingId.room.roomNumber}
            </StyledDetailText>
          </StyledDetailInfoRoom>
          <StyledDetailInfoPrice>
            <StyledDetailText typeStyle="normal">Price</StyledDetailText>

            <div style={{ display: "flex" }}>
              <StyledDetailText typeStyle="infoMedium">
                ${bookingId.room.priceNight}
              </StyledDetailText>
              <StyledDetailText typeStyle="perNight"> /night</StyledDetailText>
            </div>
          </StyledDetailInfoPrice>
        </StyledDetailInfo>
        <StyledDetailText typeStyle="normalDesc">
          {bookingId.specialRequest}
        </StyledDetailText>
        <StyledDetailAmeContainer>
          <StyledDetailText typeStyle="normalFacilities">
            Facilites
          </StyledDetailText>
          <StyledDetailAmenities>
            {bookingId.room.amenities.map((amenities) => (
              <StyledDetailText key={amenities} typeStyle="amenities">
                {amenities}
              </StyledDetailText>
            ))}
          </StyledDetailAmenities>
        </StyledDetailAmeContainer>
      </StyledDetailContent>
      <StyledDetailSwiper
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[Navigation]}
        className="mySwiper"
      >
        {bookingId.room.photos.map((element) => (
          <StyledDetailSwiperSlide key={element} img={element}>
            <StyleDetailStatus typeStyle={bookingId.status}>
              {bookingId.status}
            </StyleDetailStatus>
            <StyledDetailTextContainer>
              <StyledDetailText typeStyle="roomType">
                {bookingId.room.roomType}
              </StyledDetailText>
              <StyledDetailText typeStyle="roomDescription">
                {bookingId.room.description}
              </StyledDetailText>
            </StyledDetailTextContainer>
          </StyledDetailSwiperSlide>
        ))}

        <div className="swiper-button-next">
          <IoIosArrowRoundForward />
        </div>
        <div className="swiper-button-prev">
          <IoIosArrowRoundBack />
        </div>
      </StyledDetailSwiper>
    </StyledDetailContainer>
    }
    </>
  );
};

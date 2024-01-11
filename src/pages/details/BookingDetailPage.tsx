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

import { getBookingId, getBookingsError, getBookingsStatus} from "../../features/bookings/bookingsSlice";
import React, { useEffect, useState } from "react";
import { AppDispatch, useAppSelector } from "../../app/store";
import { BookingInterface } from "../../interfaces/booking/BookingInterface";
import { fetchBooking } from "../../features/bookings/bookingsTrunk";

export const BookingDetailPage = () => {
  const url: URL = new URL(window.location.href);
  const id: string = url.pathname.split("/").slice(2, 3).join("");

  const dispatch: AppDispatch = useDispatch();
  const [spinner, setSpinner] = useState<boolean>(true);



  const bookingListRoom= useAppSelector<BookingInterface>(getBookingId);
  const bookingsListError = useAppSelector<string | undefined>(
    getBookingsError)
  const bookingsListStatus = useAppSelector<string>(getBookingsStatus);
  
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    if (bookingsListStatus === "idle") {
      dispatch(fetchBooking(id));
    } else if (bookingsListStatus === "pending") {
      setSpinner(true);
    } else if (bookingsListStatus === "rejected") {
      setError(bookingsListError!)
    } else if (bookingsListStatus === "fulfilled") {
      setSpinner(false);
      setError(null)
    }
  }, [dispatch, bookingListRoom, bookingsListStatus]);

  console.log(bookingsListStatus)

  return (
    <>
    { bookingListRoom &&
    <StyledDetailContainer key={bookingListRoom._id}>
      <StyledDetailContent>
        <StyledDetailContentPerson>
          <StyledDetailPersonText>
            <StyledDetailText typeStyle="semibold">
              {bookingListRoom.name}
            </StyledDetailText>
            <StyledDetailText typeStyle="id">
              ID {bookingListRoom._id}
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
              {bookingListRoom.check_in} | {bookingListRoom.hour_in}{" "}
            </StyledDetailText>
          </div>
          <div>
            <StyledDetailText typeStyle="normal"> Check out</StyledDetailText>
            <StyledDetailText typeStyle="checkMedium">
              {bookingListRoom.check_out} | {bookingListRoom.hour_out}{" "}
            </StyledDetailText>
          </div>
        </StyleDetailCheck>
        <StyledDetailLine />
        <StyledDetailInfo>
          <StyledDetailInfoRoom>
            <StyledDetailText typeStyle="normal">Room Info</StyledDetailText>
            <StyledDetailText typeStyle="infoMedium">
              {bookingListRoom.room.roomNumber}
            </StyledDetailText>
          </StyledDetailInfoRoom>
          <StyledDetailInfoPrice>
            <StyledDetailText typeStyle="normal">Price</StyledDetailText>

            <div style={{ display: "flex" }}>
              <StyledDetailText typeStyle="infoMedium">
                ${bookingListRoom.room.priceNight}
              </StyledDetailText>
              <StyledDetailText typeStyle="perNight"> /night</StyledDetailText>
            </div>
          </StyledDetailInfoPrice>
        </StyledDetailInfo>
        <StyledDetailText typeStyle="normalDesc">
          {bookingListRoom.specialRequest}
        </StyledDetailText>
        <StyledDetailAmeContainer>
          <StyledDetailText typeStyle="normalFacilities">
            Facilites
          </StyledDetailText>
          <StyledDetailAmenities>
            {bookingListRoom.room.amenities.map((amenities) => (
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
        {bookingListRoom.room.photos.map((element) => (
          <StyledDetailSwiperSlide key={element} img={element}>
            <StyleDetailStatus typeStyle={bookingListRoom.status}>
              {bookingListRoom.status}
            </StyleDetailStatus>
            <StyledDetailTextContainer>
              <StyledDetailText typeStyle="bookingType">
                {bookingListRoom.room.roomType}
              </StyledDetailText>
              <StyledDetailText typeStyle="bookingDescription">
                {bookingListRoom.room.description}
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

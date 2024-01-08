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

import {
  getBookingsData,
  getBookingsError,
  getBookingsStatus,
} from "../../features/bookings/bookingsSlice";
import { getBookingsFromApiTrunk } from "../../features/bookings/bookingsTrunk";
import { getRoomsData, getRoomsStatus } from "../../features/rooms/roomsSlice";
import { getRoomsFromApiTrunk } from "../../features/rooms/roomsTrunk";
import React, { useEffect, useState } from "react";
import { AppDispatch, useAppSelector } from "../../app/store";
import { BookingInterface } from "../../interfaces/booking/BookingInterface";
import { RoomInterface } from "../../interfaces/room/RoomInterface";
import { fetchGETData } from "../../hooks/fetchAPI";

export const BookingDetailPage = async () => {
  const url: URL = new URL(window.location.href);
  const id: string = url.pathname.split("/").slice(2, 3).join("");

  const dispatch: AppDispatch = useDispatch();
  const bookingsListData = useAppSelector<BookingInterface[]>(getBookingsData);
  const bookingsListError = useAppSelector<string | undefined>(
    getBookingsError
  );
  const bookingsListStatus = useAppSelector<string>(getBookingsStatus);
  const [spinner, setSpinner] = useState<boolean>(true);

  const roomBoking = useAppSelector<RoomInterface[]>(getRoomsData);
  const roomsListStatus = useAppSelector<string>(getRoomsStatus);

  const now: Date = new Date();
  const nowDate: string = now.toISOString().split("T")[0];

  useEffect(() => {
    if (roomsListStatus === "idle") {
      dispatch(getRoomsFromApiTrunk());
    } else if (roomsListStatus === "pending") {
      setSpinner(true);
    } else if (roomsListStatus === "fulfilled") {
      setSpinner(false);
    }
  }, [dispatch, roomBoking, roomsListStatus]);

  useEffect(() => {
    if (bookingsListStatus === "idle") {
      dispatch(getBookingsFromApiTrunk());
    } else if (bookingsListStatus === "pending") {
      setSpinner(true);
    } else if (bookingsListStatus === "fulfilled") {
      setSpinner(false);
    }
  }, [dispatch, bookingsListData, bookingsListStatus]);


  let bookingListRoom: BookingInterface = await fetchGETData("/bookings" + id)

  if (bookingListRoom) {
    const room: RoomInterface[] = roomBoking.filter(
      (room) => room.id === bookingListRoom.room.id
    )!;
    

    if (nowDate > bookingListRoom.dateIn) {
      if (nowDate >= bookingListRoom.dateOut) {
        bookingListRoom = { ...bookingListRoom, room: room[0], status: "Check Out" };
      } else {
        bookingListRoom = {
          ...bookingListRoom,
          room: room[0],
          status: "In Progress",
        };
      }
    } else {
      bookingListRoom = { ...bookingListRoom, room: room[0], status: "Check In" };
    }
  }

  return (
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
              {bookingListRoom.dateIn} | {bookingListRoom.dateIn}{" "}
            </StyledDetailText>
          </div>
          <div>
            <StyledDetailText typeStyle="normal"> Check out</StyledDetailText>
            <StyledDetailText typeStyle="checkMedium">
              {bookingListRoom.dateOut} | {bookingListRoom.hour_out}{" "}
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
              <StyledDetailText typeStyle="roomType">
                {bookingListRoom.room.roomType}
              </StyledDetailText>
              <StyledDetailText typeStyle="roomDescription">
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
  );
};


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

import { useDispatch, useSelector } from "react-redux";

import { getBookingsData, getBookingsError, getBookingsStatus } from "../../features/bookings/bookingsSlice";
import { getBookingsFromApiTrunk } from "../../features/bookings/bookingsTrunk";
import { getRoomId, getRoomsStatus } from "../../features/rooms/roomsSlice";
import { getRoomsFromApiTrunk } from "../../features/rooms/roomsTrunk";
import { useEffect, useState } from "react";

export const BookingDetailPage = () => {
  const url = new URL(window.location.href);
  const id = url.pathname.split("/").slice(2, 3).join("");



  const dispatch = useDispatch()
  let bookingsListData = useSelector(getBookingsData)
  const bookingsListError = useSelector(getBookingsError)
  const bookingsListStatus = useSelector(getBookingsStatus)
  const [spinner, setSpinner] = useState(true);

  const roomBoking = useSelector(getRoomId)
  const roomsListStatus = useSelector(getRoomsStatus);

  const now = new Date();
  const nowDate = now.toISOString().split('T')[0];;

  useEffect(
    () => {

      if (roomsListStatus === "idle") {
        dispatch(getRoomsFromApiTrunk());
      } else if (roomsListStatus === "pending") {
        setSpinner(true);
      } else if (roomsListStatus === "fulfilled") {
        setSpinner(false)
      }
    },[
    dispatch,
    roomBoking,
    roomsListStatus]
  );

  useEffect(
    () => {

      if (bookingsListStatus === "idle") {
        dispatch(getBookingsFromApiTrunk());
      } else if (bookingsListStatus === "pending") {
        setSpinner(true);
      } else if (bookingsListStatus === "fulfilled") {
        setSpinner(false)
      }
    },[
    dispatch,
    bookingsListData,
    bookingsListStatus]
  );

  const bookingId = bookingsListData.find((book) => parseInt(book.id) == id);
  
  const room = roomBoking.find(room => room.id === bookingId.roomId)

  let bookingListRoom = {}

      if(nowDate > bookingId.check_in){
        if(nowDate >= bookingId.check_out){
        bookingListRoom = {...bookingId, roomId: room, status: "Check Out"}
        }
        else{
          bookingListRoom = {...bookingId, roomId: room, status: "In Progress"}
        }
      } else {
        bookingListRoom = {...bookingId, roomId: room, status: "Check In"}
      }
  

  return (
    <>
      {
        <StyledDetailContainer key={bookingListRoom.id}>
          <StyledDetailContent>
            <StyledDetailContentPerson>
              <StyledDetailPersonText>
                <StyledDetailText typeStyle="semibold">
                  {bookingListRoom.name} {bookingListRoom.surname}
                </StyledDetailText>
                <StyledDetailText typeStyle="id">
                  ID {bookingListRoom.id}
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
                <StyledDetailText typeStyle="normal">
                  {" "}
                  Check In
                </StyledDetailText>
                <StyledDetailText typeStyle="checkMedium">
                  {" "}
                  {bookingListRoom.check_in} | {bookingListRoom.hour_in}{" "}
                </StyledDetailText>
              </div>
              <div>
                <StyledDetailText typeStyle="normal">
                  {" "}
                  Check out
                </StyledDetailText>
                <StyledDetailText typeStyle="checkMedium">
                  {bookingListRoom.check_out} | {bookingListRoom.hour_out}{" "}
                </StyledDetailText>
              </div>
            </StyleDetailCheck>
            <StyledDetailLine />
            <StyledDetailInfo>
              <StyledDetailInfoRoom>
                <StyledDetailText typeStyle="normal">
                  Room Info
                </StyledDetailText>
                <StyledDetailText typeStyle="infoMedium">
                  {bookingListRoom.roomId.roomNumber}
                </StyledDetailText>
              </StyledDetailInfoRoom>
              <StyledDetailInfoPrice>
                <StyledDetailText typeStyle="normal">Price</StyledDetailText>

                <div style={{ display: "flex" }}>
                  <StyledDetailText typeStyle="infoMedium">
                    ${bookingListRoom.roomId.priceNight}
                  </StyledDetailText>
                  <StyledDetailText typeStyle="perNight">
                    {" "}
                    /night
                  </StyledDetailText>
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
                {bookingListRoom.roomId.amenities.map((amenities) => (
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
            {bookingListRoom.roomId.photos.map((element) => (
              <StyledDetailSwiperSlide key={element} img={element}>
                <StyleDetailStatus typeStyle={bookingListRoom.status}>
                  {bookingListRoom.status}
                </StyleDetailStatus>
                <StyledDetailTextContainer>
                  <StyledDetailText typeStyle="roomType">
                    {bookingListRoom.roomId.roomType}
                  </StyledDetailText>
                  <StyledDetailText typeStyle="roomDescription">
                    {bookingListRoom.roomId.description}
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

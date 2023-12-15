import { createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";
import rooms from "../../data/rooms.json";
import { RoomInterface } from "../../interfaces/room/RoomInterface";
import { getBookingsFromApiTrunk } from "../bookings/bookingsTrunk";
import { RootState } from "../../app/store";
import { BookingInterface } from "../../interfaces/booking/BookingInterface";
import { getBookingsData } from "../bookings/bookingsSlice";

export const getRoomsFromApiTrunk = createAsyncThunk<
  RoomInterface[],
  void,
  { state: RootState; rejectValue: string }
>("rooms/getRoomsFromApi", async (_, thunkAPI): Promise<RoomInterface[]> => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const now = new Date();
      const nowDate = now.toISOString().split("T")[0];

      const thunkBooking = thunkAPI.dispatch(getBookingsFromApiTrunk());
      const bookingListData = unwrapResult(await thunkBooking);

      console.log(bookingListData);

      const roomListAva: RoomInterface[] = rooms.map((room) => {
        const booking: BookingInterface[] = bookingListData.filter(
          (booking) => room.id === booking.room.id
        );
        console.log(booking);

        if (booking) {
          let checkAva: boolean = true;

          booking.every((element) => {
            if (nowDate >= element.check_in && nowDate < element.check_out) {
              return (checkAva = false);
            } else {
              checkAva = true;
            }
          });

          if (checkAva) {
            return { ...room, status: "Available" };
          } else {
            return { ...room, status: "Booked" };
          }
        } else {
          return { ...room, status: "Available" };
        }
      });
      resolve(roomListAva);
    }, 200);
  });
});

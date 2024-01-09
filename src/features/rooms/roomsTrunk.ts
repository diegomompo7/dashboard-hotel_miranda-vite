import { createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";
import rooms from "../../data/rooms.json";
import { RoomInterface } from "../../interfaces/room/RoomInterface";
import { getBookingsFromApiTrunk } from "../bookings/bookingsTrunk";
import { RootState } from "../../app/store";
import { BookingInterface } from "../../interfaces/booking/BookingInterface";
import { getBookingsData } from "../bookings/bookingsSlice";
import { fetchGETData } from "../../hooks/fetchAPI";

export const getRoomsFromApiTrunk = createAsyncThunk<
  RoomInterface[],
  void,
  { state: any; rejectValue: string }
>("rooms/getRoomsFromApi", async (): Promise<RoomInterface[]> => {
  return new Promise(async (resolve, reject) => {
    resolve(fetchGETData("/rooms"));
  });
});

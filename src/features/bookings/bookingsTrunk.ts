import { createAsyncThunk } from "@reduxjs/toolkit";
import bookings from "../../data/booking.json"
import rooms from "../../data/rooms.json"

import { BookingInterface } from "../../interfaces/booking/BookingInterface";
import { RoomInterface } from "../../interfaces/room/RoomInterface";
import { useContext } from "react";
import AuthContext from "../../AuthContext";
import { fetchGETData } from "../../hooks/fetchAPI";

const  userLogin  = localStorage.getItem("token")

export const getBookingsFromApiTrunk = createAsyncThunk<BookingInterface[], void, { state: any, rejectValue: string }>("bookings/getBookingsFromApi", async (): Promise<BookingInterface[]> => {
    return new Promise(async (resolve, reject) => {
           resolve(fetchGETData("/bookings"))
    })
})
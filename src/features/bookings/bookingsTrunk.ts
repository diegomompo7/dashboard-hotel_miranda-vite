import { createAsyncThunk } from "@reduxjs/toolkit";
import bookings from "../../data/booking.json"
import rooms from "../../data/rooms.json"

import { BookingInterface } from "../../interfaces/booking/BookingInterface";
import { RoomInterface } from "../../interfaces/room/RoomInterface";


export const getBookingsFromApiTrunk = createAsyncThunk<BookingInterface[], void, { state: any, rejectValue: string }>("bookings/getBookingsFromApi", async (): Promise<BookingInterface[]> => {
    return new Promise(async (resolve, reject) => {
            const response = await fetch("https://k9mgwp50x0.execute-api.eu-south-2.amazonaws.com/dev" + "/bookings", {
                method: "GET",
            })
            console.log(response.json())
    })
})
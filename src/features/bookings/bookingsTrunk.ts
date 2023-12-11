import { createAsyncThunk } from "@reduxjs/toolkit";
import booking from "../../data/booking.json"
import { BookingInterface } from "../../interfaces/booking/BookingInterface";

export const getBookingsFromApiTrunk = createAsyncThunk<BookingInterface[], void, { state: any, rejectValue: string }>("bookings/getBookingsFromApi", async (): Promise<BookingInterface[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(booking)
        }, 200)
    })
})
import { createAsyncThunk } from "@reduxjs/toolkit";
import booking from "../../data/booking.json"

export const getBookingsFromApiTrunk = createAsyncThunk("bookings/getBookingsFromApi", async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(booking)
        }, 200)
    })
})


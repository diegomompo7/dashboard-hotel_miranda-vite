import { createSlice, current } from "@reduxjs/toolkit";
import { getBookingsFromApiTrunk } from "./bookingsTrunk";


export const BookingsSlice = createSlice({
    name: "bookings",
    initialState: {
        data: [],
        status: "idle", // | "fulfilled" ||"rejected" ||"pending"
        error: null
    },
    reducers: {

        getClient: (state, action) => {


            const searchClient = state.changeBooking.filter((client) => client.name.includes(action.payload))
            state.data = searchClient;

        },
        getSelect: (state, action) => {

            let data = current(state.data)
            data = action.payload;

        },
        deleteBooking: (state, action) => {
            const data = current(state.changeBooking)
            const delBooking = data.filter((del) => del.id !== action.payload)
            state.data = delBooking
    },
        createBooking: (state, action) => {
            
            state.data = [action.payload, ...state.data]
        },
},

    extraReducers: (builder) => {
        builder.addCase(getBookingsFromApiTrunk.fulfilled, (state, action) => {
            state.status = "fulfilled"
            state.data = action.payload;
            state.changeBooking = state.data
        })
            .addCase(getBookingsFromApiTrunk.rejected, (state, action) => {
                state.status = "rejected"
                state.error = action.error.message
            })
            .addCase(getBookingsFromApiTrunk.pending, (state, action) => {
                state.status = "pending"
            })
    }
})

export const { getSelect, updateBooking, createBooking, deleteBooking, getNewData, getClient, updateRoomToBooking} = BookingsSlice.actions


export const getBookingsDataInProgress = state => state.bookings.data.filter((inProgress) => inProgress.status === "In Progress")
export const getBookingsData = state => state.bookings.data
export const getChangeData = state => state.bookings.changeBooking;
export const getBookingsStatus = state => state.bookings.status;
export const getBookingsError = state => state.bookings.error;

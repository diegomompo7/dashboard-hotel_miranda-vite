import { createSlice, current } from "@reduxjs/toolkit";
import { fetchPOSTBooking, fetchBookings, fetchDELETEBooking, fetchPATCHBooking,} from "./bookingsTrunk";
import { BookingSliceInitialStateInterface } from "../../interfaces/booking/BookingSliceInterface";
import { BookingInterface } from "../../interfaces/booking/BookingInterface";
import { RootState } from "../../app/store";
import { fetchPOSTData } from "../../hooks/fetchAPI";


const initialState: BookingSliceInitialStateInterface = {
  data: [],
  status: "idle", // | "fulfilled" | "rejected" | "pending"
  error: undefined,
};

export const BookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    getClient: (state, action): void => {
      const data = current(state.changeBooking);

      if (data !== undefined) {
        const searchClient = data.filter((client) =>
          client.name.includes(action.payload)
        );
        state.data = searchClient;
      }
    },
    getSelect: (state, action): void => {
      state.data = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.fulfilled, (state, action): void => {
        state.status = "fulfilled";
        state.data = action.payload;
        state.changeBooking = state.data;
      })
      .addCase(fetchBookings.rejected, (state, action): void => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      .addCase(fetchBookings.pending, (state, action): void => {
        state.status = "pending";
      })

    builder
      .addCase(fetchPOSTBooking.fulfilled, (state, action): void => {
        state.status = "fulfilled";
        state.data.push(action.payload);
        state.changeBooking = state.data;
      })
      .addCase(fetchPOSTBooking.rejected, (state, action): void => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      .addCase(fetchPOSTBooking.pending, (state, action): void => {
        state.status = "pending";
      })

      builder
      .addCase(fetchPATCHBooking.fulfilled, (state, action): void => {
        state.status = "fulfilled";
        const findIndex = state.data.findIndex(booking => booking.room._id === action.payload.room._id)
        state.data.splice(findIndex, 1, action.payload);
        state.changeBooking = state.data;
      })
      .addCase(fetchPATCHBooking.rejected, (state, action): void => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      .addCase(fetchPATCHBooking.pending, (state, action): void => {
        state.status = "pending";
      })

    builder
      .addCase(fetchDELETEBooking.fulfilled, (state, action): void => {
        state.status = "fulfilled";
        state.data = state.data.filter(del => del._id !== action.payload._id)
        state.changeBooking = state.data;
      })
      .addCase(fetchDELETEBooking.rejected, (state, action): void => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      .addCase(fetchDELETEBooking.pending, (state, action): void => {
        state.status = "pending";
      });
      
  },
});

export const { getSelect, getClient } =
  BookingsSlice.actions;

export const getBookingsDataInProgress = (
  state: RootState
): BookingInterface[] =>
  state.bookings.data.filter(
    (inProgress) => inProgress.status === "In Progress"
  );
export const getBookingsData = (state: RootState): BookingInterface[] =>
  state.bookings.data;
export const getChangeData = (
  state: RootState
): BookingInterface[] | undefined => state.bookings.changeBooking;
export const getBookingsStatus = (state: RootState) => state.bookings.status;
export const getBookingsError = (state: RootState) => state.bookings.error;

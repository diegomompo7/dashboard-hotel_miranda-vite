import { createSlice, current } from "@reduxjs/toolkit";
import { getBookingsFromApiTrunk } from "./bookingsTrunk";
import { BookingSliceInitialStateInterface } from "../../interfaces/booking/BookingSliceInterface";
import { BookingInterface } from "../../interfaces/booking/BookingInterface";
import { RootState } from "../../app/store";

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
    deleteBooking: (state, action): void => {
      const data = current(state.changeBooking);
      if (data !== undefined) {
        const delBooking = data.filter((del) => del.id !== action.payload);
        state.data = delBooking;
      }
    },
    createBooking: (state, action) => {
      state.data = [...state.data, action.payload];
      console.log(state.data);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getBookingsFromApiTrunk.fulfilled, (state, action): void => {
        state.status = "fulfilled";
        state.data = action.payload;
        state.changeBooking = state.data;
      })
      .addCase(getBookingsFromApiTrunk.rejected, (state, action): void => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      .addCase(getBookingsFromApiTrunk.pending, (state, action): void => {
        state.status = "pending";
      });
  },
});

export const { getSelect, createBooking, deleteBooking, getClient } =
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

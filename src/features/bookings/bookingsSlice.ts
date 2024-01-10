import { createSlice, current } from "@reduxjs/toolkit";
import { fetchPOSTBooking, fetchBookings, fetchDELETEBooking, fetchBooking,} from "./bookingsTrunk";
import { BookingSliceInitialStateInterface } from "../../interfaces/booking/BookingSliceInterface";
import { BookingInterface } from "../../interfaces/booking/BookingInterface";
import { RootState } from "../../app/store";
import { fetchPOSTData } from "../../hooks/fetchAPI";

const  userLogin = localStorage.getItem("token")

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
    createBooking: (state, action): void => {
      fetchPOSTData("/bookings", action.payload)
    },
        /*updateRoom: (state, action): void => {
      const data = state.data;

      const index = data.findIndex((update) => update.id === action.payload.id);

      if (index !== -1) {
        const updatedData = {
          ...data[index],
          photos: action.payload.formData.photos,
          roomType: action.payload.formData.roomType,
          roomNumber: action.payload.formData.roomNumber,
          description: action.payload.formData.description,
          offer: action.payload.formData.offer,
          priceNight: action.payload.formData.priceNight,
          discount: action.payload.formData.discount,
          cancellation: action.payload.formData.cancellation,
          amenities: action.payload.formData.amenities,
        };

        state.data = data.map((item, i) => (i === index ? updatedData : item));
      }
    },*/
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
      .addCase(fetchDELETEBooking.fulfilled, (state, action): void => {
        console.log(action.payload)
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

export const { getSelect, createBooking, getClient } =
  BookingsSlice.actions;

export const getBookingsDataInProgress = (
  state: RootState
): BookingInterface[] =>
  state.bookings.data.filter(
    (inProgress) => inProgress.status === "In Progress"
  );
export const getBookingsData = (state: RootState): BookingInterface[] =>
  state.bookings.data;
export const getBookingsDataId = (state: RootState): BookingInterface =>
  state.bookings.dataId!;
export const getChangeData = (
  state: RootState
): BookingInterface[] | undefined => state.bookings.changeBooking;
export const getBookingsStatus = (state: RootState) => state.bookings.status;
export const getBookingsError = (state: RootState) => state.bookings.error;

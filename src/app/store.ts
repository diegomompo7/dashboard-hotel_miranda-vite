import { configureStore } from "@reduxjs/toolkit";
import { ContactSlice } from "../features/contact/contactSlice";
import { UsersSlice } from "../features/users/usersSlice";
import { RoomsSlice } from "../features/rooms/roomsSlice";
import { BookingsSlice } from "../features/bookings/bookingsSlice";
import { BookingSliceInitialStateInterface } from "../interfaces/booking/BookingSliceInterface";
import { ContactSliceInitialStateInterface } from "../interfaces/contact/ContactSliceInterface";
import { UserSliceInitialStateInterface } from "../interfaces/user/UserSliceInterface";
import { RoomSliceInitialStateInterface } from "../interfaces/room/RoomSliceInterface";

export const store = configureStore({
    reducer: {
        bookings: BookingsSlice.reducer,
        contact: ContactSlice.reducer,
        users: UsersSlice.reducer,
        rooms: RoomsSlice.reducer
    }
})

export interface RootState {
    bookings: BookingSliceInitialStateInterface;
    contact: ContactSliceInitialStateInterface;
    users: UserSliceInitialStateInterface;
    rooms: RoomSliceInitialStateInterface;
  }


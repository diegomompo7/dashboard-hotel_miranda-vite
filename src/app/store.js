import { configureStore } from "@reduxjs/toolkit";
import { ContactSlice } from "../features/contact/contactSlice";
import { UsersSlice } from "../features/users/usersSlice";
import { RoomsSlice } from "../features/rooms/roomsSlice";
import { BookingsSlice } from "../features/bookings/bookingsSlice";

export const store = configureStore({
    reducer: {
        bookings: BookingsSlice.reducer,
        contact: ContactSlice.reducer,
        users: UsersSlice.reducer,
        rooms: RoomsSlice.reducer
    }
})
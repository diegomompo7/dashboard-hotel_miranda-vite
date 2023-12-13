import { configureStore } from "@reduxjs/toolkit";
import { ContactSlice } from "../features/contact/contactSlice";
import { UsersSlice } from "../features/users/usersSlice";
import { RoomsSlice } from "../features/rooms/roomsSlice";
import { BookingsSlice } from "../features/bookings/bookingsSlice";
import { BookingSliceInitialStateInterface } from "../interfaces/booking/BookingSliceInterface";
import { ContactSliceInitialStateInterface } from "../interfaces/contact/ContactSliceInterface";
import { UserSliceInitialStateInterface } from "../interfaces/user/UserSliceInterface";
import { RoomSliceInitialStateInterface } from "../interfaces/room/RoomSliceInterface";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
    reducer: {
        bookings: BookingsSlice.reducer,
        contact: ContactSlice.reducer,
        users: UsersSlice.reducer,
        rooms: RoomsSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector:TypedUseSelectorHook<RootState> = useSelector
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

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
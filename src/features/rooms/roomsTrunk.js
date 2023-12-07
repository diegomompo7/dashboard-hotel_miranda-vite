import { createAsyncThunk } from "@reduxjs/toolkit";
import rooms from "../../data/rooms.json"

export const getRoomsFromApiTrunk = createAsyncThunk("rooms/getRoomsFromApi", async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(rooms)
        }, 200)
    })
})


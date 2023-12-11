import { createAsyncThunk } from "@reduxjs/toolkit";
import rooms from "../../data/rooms.json"
import { RoomInterface } from "../../interfaces/room/RoomInterface";

export const getRoomsFromApiTrunk = createAsyncThunk<RoomInterface[], void, {state: any, rejectValue: string}>("rooms/getRoomsFromApi", async (): Promise<RoomInterface[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(rooms)
        }, 200)
    })
})


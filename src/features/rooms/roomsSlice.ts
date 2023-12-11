import { createSlice, current } from "@reduxjs/toolkit";
import { getRoomsFromApiTrunk } from "./roomsTrunk";
import { RoomSliceInitialStateInterface } from "../../interfaces/room/RoomSliceInterface";
import { RoomInterface } from "../../interfaces/room/RoomInterface";

const initialState: RoomSliceInitialStateInterface = {
    data: [],
    status: "idle", // | "fulfilled" | "rejected" | "pending"
    error: undefined
}


export const RoomsSlice = createSlice({
    name: "rooms",
    initialState,
    reducers: {

        getSelect: (state, action):void => {

            state.data = action.payload;
        },
        
        deleteRoom: (state, action):void => {
            const data = current(state.changeRoom)
            const delRoom = data.filter((del) => del.id !== action.payload)
            state.data = delRoom
    },

        updateRoom: (state, action):void => {

            const data = state.data
            
            const index = data.findIndex((update) => update.id === action.payload.id)


            if (index !== -1) {
                const updatedData = {
                    ...data[index],
                    photos: action.payload.formData.photos.split("\n"),
                    roomType: action.payload.formData.roomType,
                    roomNumber: action.payload.formData.roomNumber,
                    description: action.payload.formData.description,
                    offer: action.payload.formData.offer,
                    priceNight: action.payload.formData.priceNight,
                    discount: action.payload.formData.discount,
                    cancellation: action.payload.formData.cancellation,
                    amenities: action.payload.formData.amenities.split("\n"),

                }

                state.data = data.map((item, i) => (i === index ? updatedData : item));
            }
            
        },
        
        createRoom: (state, action):void => {
            
            state.data = [action.payload, ...state.data]



    },
    getIdRoom: (state, action):void => {
        const room = state.data.filter(room => room.id === action.payload)
        state.roomId = room
    }
},

    extraReducers: (builder) => {
        builder.addCase(getRoomsFromApiTrunk.fulfilled, (state, action):void => {
            state.status = "fulfilled"
            state.data = action.payload;
            state.changeRoom = state.data
            state.roomId = state.data
        })
            .addCase(getRoomsFromApiTrunk.rejected, (state, action):void => {
                state.status = "rejected"
                state.error = action.error.message

            })
            .addCase(getRoomsFromApiTrunk.pending, (state, action):void => {
                state.status = "pending"
            })
    }
})

export const { getSelect, updateRoom, createRoom, deleteRoom, getNewData, updateStatus} = RoomsSlice.actions


export const getRoomsDataAvailable = (state): RoomInterface[] => state.rooms.data.filter((available) => available.status === "Available")
export const getRoomsDataBooked = (state): RoomInterface[] => state.rooms.data.filter((booked) => booked.status === "Booked")
export const getRoomsData = (state): RoomInterface[] => state.rooms.data
export const getChangeData = (state): RoomInterface[] => state.rooms.changeRoom;
export const getRoomId = (state): RoomInterface[] => state.rooms.roomId
export const getRoomsStatus = state => state.rooms.status;
export const getRoomsError = state => state.rooms.error;
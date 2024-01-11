import { createSlice, current } from "@reduxjs/toolkit";
import { RoomSliceInitialStateInterface } from "../../interfaces/room/RoomSliceInterface";
import { RoomInterface } from "../../interfaces/room/RoomInterface";
import { RootState } from "../../app/store";
import { fetchDELETERoom, fetchPATCHRoom, fetchPOSTRoom, fetchRoom, fetchRooms } from "./roomsTrunk";

const initialState: RoomSliceInitialStateInterface = {
  data: [],
  status: "idle", // | "fulfilled" | "rejected" | "pending"
  error: undefined,
};

export const RoomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    getSelect: (state, action): void => {
      state.data = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.fulfilled, (state, action): void => {
        state.status = "fulfilled";
        state.data = action.payload;
      })
      .addCase(fetchRooms.rejected, (state, action): void => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      .addCase(fetchRooms.pending, (state, action): void => {
        state.status = "pending";
      })

      builder
      .addCase(fetchRoom.fulfilled, (state, action): void => {
        state.status = "fulfilled";
        state.roomId = action.payload
      })
      .addCase(fetchRoom.rejected, (state, action): void => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      .addCase(fetchRoom.pending, (state, action): void => {
        state.status = "pending";
      })


    builder
      .addCase(fetchPOSTRoom.fulfilled, (state, action): void => {
        state.status = "fulfilled";
        
        state.data.push(action.payload);
      })
      .addCase(fetchPOSTRoom.rejected, (state, action): void => {
        state.status = "rejected";
        console.log(action.error.message)
        state.error = action.error.message;
      })
      .addCase(fetchPOSTRoom.pending, (state, action): void => {
        state.status = "pending";
      })

      builder
      .addCase(fetchPATCHRoom.fulfilled, (state, action): void => {
        state.status = "fulfilled";
        if(state.roomId !== undefined)
        state.data.splice(state.roomId._id!, 1, action.payload);

      })
      .addCase(fetchPATCHRoom.rejected, (state, action): void => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      .addCase(fetchPATCHRoom.pending, (state, action): void => {
        state.status = "pending";
      })

    builder
      .addCase(fetchDELETERoom.fulfilled, (state, action): void => {
        state.status = "fulfilled";
        state.data = state.data.filter(del => del._id !== action.payload._id)
      })
      .addCase(fetchDELETERoom.rejected, (state, action): void => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      .addCase(fetchDELETERoom.pending, (state, action): void => {
        state.status = "pending";
      });
      
  },
});

export const { getSelect} =
  RoomsSlice.actions;

export const getRoomsData = (state: RootState): RoomInterface[] =>
  state.rooms.data;
export const getRoomId = (state: RootState): RoomInterface =>
  state.rooms.roomId!;
export const getRoomsStatus = (state: RootState) => state.rooms.status;
export const getRoomsError = (state: RootState) => state.rooms.error;
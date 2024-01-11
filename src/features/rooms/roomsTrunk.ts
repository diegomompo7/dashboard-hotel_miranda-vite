import { createAsyncThunk } from "@reduxjs/toolkit";
import { RoomInterface } from "../../interfaces/room/RoomInterface";
import { fetchDELData, fetchGETData, fetchPATCHData, fetchPOSTData } from "../../hooks/fetchAPI";

export const fetchRooms = createAsyncThunk<RoomInterface[], void, { state: any, rejectValue: string }>("rooms/getRooms", async (): Promise<RoomInterface[]> => {
    return new Promise(async (resolve, reject) => {
           resolve(fetchGETData("/rooms"))
    })
})
export const fetchRoom = createAsyncThunk<RoomInterface, string, { state: any, rejectValue: string }>("rooms/getRoom", async (id: string): Promise<RoomInterface> => {
    return new Promise(async (resolve, reject) => {
        try{
            const response = (await fetchGETData(("/rooms/" + id)))
            resolve(response)
        }catch(e){

        }
    })
})
export const fetchPOSTRoom = createAsyncThunk<RoomInterface, Object, { state: any, rejectValue: string }>("rooms/postRoom", async (body: Object): Promise<RoomInterface> => {
   
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetchPOSTData("/rooms", body);
            resolve(response)
          } catch (error) {
        }
    })
})

export const fetchPATCHRoom = createAsyncThunk<RoomInterface, { id: string; formData: Object }, { state: any, rejectValue: string }>("rooms/patchRoom", async ({id, formData}): Promise<RoomInterface> => {

    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetchPATCHData("/rooms/" + id, formData);
            resolve(response)
          } catch (error) {
        }
    })
})

export const fetchDELETERoom = createAsyncThunk<RoomInterface, number, { state: any, rejectValue: string }>("rooms/deleteRoom", async (id: number): Promise<RoomInterface> => {
  
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetchDELData("/rooms/", id);
            resolve(response)
          } catch (error) {
        }
    })
})
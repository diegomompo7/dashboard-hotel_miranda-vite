import { createAsyncThunk } from "@reduxjs/toolkit";
import { RoomInterface } from "../../interfaces/room/RoomInterface";
import { fetchDELData, fetchGETData, fetchPATCHData, fetchPOSTData } from "../../hooks/fetchAPI";
import { Await } from "react-router-dom";
import { ErrorResponseImpl } from "@remix-run/router/dist/utils";

export const fetchRooms = createAsyncThunk<RoomInterface[], void, { state: any, rejectValue: string }>("rooms/getRooms", async (): Promise<RoomInterface[]> => {
    return new Promise(async (resolve, reject) => {
        try{
            const response = await fetchGETData("/rooms")
            if(response.ok){
                resolve(response.json())
                }else{
                    const errorResponse = await response.json()
                    const error = "Error " + response.status + ": " + errorResponse.message
                    reject(error);
                }
        }catch(e){
            reject("Error 500: Internal server error")
        }
    })
})
export const fetchRoom = createAsyncThunk<RoomInterface, string, { state: any, rejectValue: string }>("rooms/getRoom", async (id: string, {rejectWithValue}): Promise<RoomInterface> => {
    return new Promise(async (resolve, reject) => {
        try{
            const response = (await fetchGETData(("/rooms/" + id)))
            if(response.ok){
            resolve(response.json())
            }else{
                const errorResponse = await response.json()
                const error = "Error " + response.status + ": " + errorResponse.message
                reject(error);
            }
        }catch(e){
            reject("Error 500: Internal server error")
        }
    })
})
export const fetchPOSTRoom = createAsyncThunk<RoomInterface, Object, { state: any, rejectValue: string }>("rooms/postRoom", async (body: Object): Promise<RoomInterface> => {
    console.log(body)
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetchPOSTData("/rooms", body);
            resolve(response)
          } catch (error) {
        }
    })
})

export const fetchPATCHRoom = createAsyncThunk<RoomInterface, { id: string; formData: Object }, { state: any, rejectValue: string }>("rooms/patchRoom", async ({id, formData}): Promise<RoomInterface> => {
    console.log(id)
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetchPATCHData("/rooms/" + id, formData);
            resolve(response)
          } catch (error) {
            reject("Error 500: Internal server error")
        }
    })
})

export const fetchDELETERoom = createAsyncThunk<RoomInterface, number, { state: any, rejectValue: string }>("rooms/deleteRoom", async (id: number): Promise<RoomInterface> => {
    console.log(id)
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetchDELData("/rooms/", id);
            resolve(response)
          } catch (error) {
            reject("Error 500: Internal server error")
        }
    })
})
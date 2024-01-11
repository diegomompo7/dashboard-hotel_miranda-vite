import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserInterface } from "../../interfaces/user/UserInterface";
import { fetchDELData, fetchGETData, fetchPATCHData, fetchPOSTData } from "../../hooks/fetchAPI";

export const fetchUsers = createAsyncThunk<UserInterface[], void, { state: any, rejectValue: string }>("users/getUsers", async (): Promise<UserInterface[]> => {
    return new Promise(async (resolve, reject) => {
        try{
            const response = await fetchGETData("/users")
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
export const fetchUser = createAsyncThunk<UserInterface, string, { state: any, rejectValue: string }>("users/getUser", async (id: string): Promise<UserInterface> => {
    return new Promise(async (resolve, reject) => {
        try{
            const response = (await fetchGETData(("/users/" + id)))
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
export const fetchPOSTUser = createAsyncThunk<UserInterface, Object, { state: any, rejectValue: string }>("users/postUser", async (body: Object): Promise<UserInterface> => {

    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetchPOSTData("/users", body);
            resolve(response)
          } catch (error) {
            reject("Error 500: Internal server error")
        }
    })
})

export const fetchPATCHUser = createAsyncThunk<UserInterface, { id: string; formData: Object }, { state: any, rejectValue: string }>("users/patchUser", async ({id, formData}): Promise<UserInterface> => {
  
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetchPATCHData("/users/" + id, formData);
            resolve(response)
          } catch (error) {
            reject("Error 500: Internal server error")
        }
    })
})

export const fetchDELETEUser = createAsyncThunk<UserInterface, number, { state: any, rejectValue: string }>("users/deleteUser", async (id: number): Promise<UserInterface> => {

    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetchDELData("/users/", id);
            resolve(response)
          } catch (error) {
            reject("Error 500: Internal server error")
        }
    })
})
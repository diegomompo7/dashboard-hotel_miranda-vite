import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserInterface } from "../../interfaces/user/UserInterface";
import { fetchData } from "../../hooks/fetchAPI";

export const fetchUsers = createAsyncThunk<UserInterface[], void, { state: any, rejectValue: string }>("users/getUsers", async (): Promise<UserInterface[]> => {
    return new Promise(async (resolve, reject) => {
        try{
            const response = await fetchData("/users", "GET", null)
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
            const response = (await fetchData("/users/" + id, "GET", null))
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
            const response = await fetchData("/users", "POST", body);
            resolve(response.json())
          } catch (error) {
            reject("Error 500: Internal server error")
        }
    })
})

export const fetchPATCHUser = createAsyncThunk<UserInterface, { id: string; formData: Object }, { state: any, rejectValue: string }>("users/patchUser", async ({id, formData}): Promise<UserInterface> => {
  
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetchData("/users/" + id, "PATCH", formData);
            resolve(response.json())
          } catch (error) {
            reject("Error 500: Internal server error")
        }
    })
})

export const fetchDELETEUser = createAsyncThunk<UserInterface, number, { state: any, rejectValue: string }>("users/deleteUser", async (id: number): Promise<UserInterface> => {

    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetchData("/users/" + id, "DELETE", null);
            resolve(response.json())
          } catch (error) {
            reject("Error 500: Internal server error")
        }
    })
})
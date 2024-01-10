import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserInterface } from "../../interfaces/user/UserInterface";
import { fetchDELData, fetchGETData, fetchPATCHData, fetchPOSTData } from "../../hooks/fetchAPI";

export const fetchUsers = createAsyncThunk<UserInterface[], void, { state: any, rejectValue: string }>("users/getUsers", async (): Promise<UserInterface[]> => {
    return new Promise(async (resolve, reject) => {
           resolve(fetchGETData("/users"))
    })
})
export const fetchUser = createAsyncThunk<UserInterface, string, { state: any, rejectValue: string }>("users/getUser", async (id: string): Promise<UserInterface> => {
    return new Promise(async (resolve, reject) => {
        try{
            const response = (await fetchGETData(("/users/" + id)))
            resolve(response)
        }catch(e){

        }
    })
})
export const fetchPOSTUser = createAsyncThunk<UserInterface, Object, { state: any, rejectValue: string }>("users/postUser", async (body: Object): Promise<UserInterface> => {
    console.log(body)
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetchPOSTData("/users", body);
            resolve(response)
          } catch (error) {
        }
    })
})

export const fetchPATCHUser = createAsyncThunk<UserInterface, { id: string; formData: Object }, { state: any, rejectValue: string }>("users/patchUser", async ({id, formData}): Promise<UserInterface> => {
    console.log(id)
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetchPATCHData("/users/" + id, formData);
            resolve(response)
          } catch (error) {
        }
    })
})

export const fetchDELETEUser = createAsyncThunk<UserInterface, number, { state: any, rejectValue: string }>("users/deleteUser", async (id: number): Promise<UserInterface> => {
    console.log(id)
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetchDELData("/users/", id);
            resolve(response)
          } catch (error) {
        }
    })
})
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ContactInterface } from "../../interfaces/contact/ContactInterface";
import { fetchData } from "../../hooks/fetchAPI";

export const fetchContacts = createAsyncThunk<ContactInterface[], void, { state: any, rejectValue: string }>("contacts/getContacts", async (): Promise<ContactInterface[]> => {
    return new Promise(async (resolve, reject) => {
        try{
            const response = await fetchData("/contact", "GET", null)
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
export const fetchContact = createAsyncThunk<ContactInterface, string, { state: any, rejectValue: string }>("contacts/getContact", async (id: string): Promise<ContactInterface> => {
    return new Promise(async (resolve, reject) => {
        try{
            const response = (await fetchData("/contact/" + id, "GET", null))
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
export const fetchPOSTContact = createAsyncThunk<ContactInterface, Object, { state: any, rejectValue: string }>("contacts/postContact", async (body: Object): Promise<ContactInterface> => {
   
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetchData("/contact", "POST", body);
            resolve(response.json())
          } catch (error) {
            reject("Error 500: Internal server error")
        }
    })
})

export const fetchPATCHContact = createAsyncThunk<ContactInterface, { id: number; formData: Object }, { state: any, rejectValue: string }>("contacts/patchContact", async ({id, formData}): Promise<ContactInterface> => {
   
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetchData("/contact/" + id, "PATCH", formData);
            resolve(response.json())
          } catch (error) {
            reject("Error 500: Internal server error")
        }
    })
})

export const fetchDELETEContact = createAsyncThunk<ContactInterface, number, { state: any, rejectValue: string }>("contacts/deleteContact", async (id: number): Promise<ContactInterface> => {

    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetchData("/contact/" + id, "DELETE", null);
            resolve(response.json())
          } catch (error) {
            reject("Error 500: Internal server error")
        }
    })
})
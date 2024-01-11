import { createAsyncThunk } from "@reduxjs/toolkit";
import { ContactInterface } from "../../interfaces/contact/ContactInterface";
import { fetchDELData, fetchGETData, fetchPATCHData, fetchPOSTData } from "../../hooks/fetchAPI";

export const fetchContacts = createAsyncThunk<ContactInterface[], void, { state: any, rejectValue: string }>("contacts/getContacts", async (): Promise<ContactInterface[]> => {
    return new Promise(async (resolve, reject) => {
        try{
            const response = await fetchGETData("/contact")
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
            const response = (await fetchGETData(("/contact/" + id)))
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
            const response = await fetchPOSTData("/contact", body);
            resolve(response)
          } catch (error) {
            reject("Error 500: Internal server error")
        }
    })
})

export const fetchPATCHContact = createAsyncThunk<ContactInterface, { id: number; formData: Object }, { state: any, rejectValue: string }>("contacts/patchContact", async ({id, formData}): Promise<ContactInterface> => {
   
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetchPATCHData("/contact/" + id, formData);
            resolve(response)
          } catch (error) {
            reject("Error 500: Internal server error")
        }
    })
})

export const fetchDELETEContact = createAsyncThunk<ContactInterface, number, { state: any, rejectValue: string }>("contacts/deleteContact", async (id: number): Promise<ContactInterface> => {

    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetchDELData("/contact/", id);
            resolve(response)
          } catch (error) {
            reject("Error 500: Internal server error")
        }
    })
})
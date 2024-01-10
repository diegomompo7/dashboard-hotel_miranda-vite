import { createAsyncThunk } from "@reduxjs/toolkit";
import { ContactInterface } from "../../interfaces/contact/ContactInterface";
import { fetchDELData, fetchGETData, fetchPATCHData, fetchPOSTData } from "../../hooks/fetchAPI";

export const fetchContacts = createAsyncThunk<ContactInterface[], void, { state: any, rejectValue: string }>("contacts/getContacts", async (): Promise<ContactInterface[]> => {
    return new Promise(async (resolve, reject) => {
           resolve(fetchGETData("/contact"))
    })
})
export const fetchContact = createAsyncThunk<ContactInterface, string, { state: any, rejectValue: string }>("contacts/getContact", async (id: string): Promise<ContactInterface> => {
    return new Promise(async (resolve, reject) => {
        try{
            const response = (await fetchGETData(("/contact/" + id)))
            resolve(response)
        }catch(e){

        }
    })
})
export const fetchPOSTContact = createAsyncThunk<ContactInterface, Object, { state: any, rejectValue: string }>("contacts/postContact", async (body: Object): Promise<ContactInterface> => {
    console.log(body)
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetchPOSTData("/contact", body);
            resolve(response)
          } catch (error) {
        }
    })
})

export const fetchPATCHContact = createAsyncThunk<ContactInterface, { id: number; formData: Object }, { state: any, rejectValue: string }>("contacts/patchContact", async ({id, formData}): Promise<ContactInterface> => {
    console.log(id)
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetchPATCHData("/contact/" + id, formData);
            resolve(response)
          } catch (error) {
        }
    })
})

export const fetchDELETEContact = createAsyncThunk<ContactInterface, number, { state: any, rejectValue: string }>("contacts/deleteContact", async (id: number): Promise<ContactInterface> => {
    console.log(id)
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetchDELData("/contact/", id);
            resolve(response)
          } catch (error) {
        }
    })
})
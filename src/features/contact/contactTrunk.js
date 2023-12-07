import { createAsyncThunk } from "@reduxjs/toolkit";
import contact from "../../data/contact.json"

export const getContactFromApiTrunk = createAsyncThunk("contact/getContactFromApi", async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(contact)
        }, 200)
    })
})


import { createAsyncThunk } from "@reduxjs/toolkit";
import users from "../../data/users.json"

export const getUsersFromApiTrunk = createAsyncThunk("users/getUsersFromApi", async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(users)
        }, 200)
    })
})


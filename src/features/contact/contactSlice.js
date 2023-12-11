import { createSlice } from "@reduxjs/toolkit";
import { getContactFromApiTrunk } from "./contactTrunk";


export const ContactSlice = createSlice({
    name: "contact",
    initialState:{
        data: [],
        status: "idle", // | "fulfilled" | "rejected" | "pending"
        error: null
    },
    reducers: {

        getFullMessage:(state, action) => {
            
            const fullMessage = state.data.find((message) => message.id === action.payload)
            state.fullMessage = fullMessage;
            
        },
        updateContact:(state, action) => {
            const data = state.data
            const index = data.findIndex((archived) => archived.id === action.payload.id)
            if(index !== -1){
            const updatedData = { ...data[index], is_archived: action.payload.is_archived  };
            state.data = data.map((item, i) => (i === index ? updatedData : item));
            }
        },
},

    extraReducers: (builder) => {
        builder.addCase(getContactFromApiTrunk.fulfilled, (state,action) => {
            state.status = "fulfilled"
            state.data = action.payload;
        })
        .addCase(getContactFromApiTrunk.rejected,(state,action)  => {
            state.status = "rejected"
            state.error = action.error.message
        })
        .addCase(getContactFromApiTrunk.pending,(state,action)  => {
            state.status = "pending"
        })
    }
})

export const {getFullMessage, getArchived, getAll, updateContact} = ContactSlice.actions;
export const getContactData = state => state.contact.data
export const getContactDataArchive = state => state.contact.data.filter((contact) => contact.is_archived === true)
export const getContactStatus = state => state.contact.status;
export const getContactError = state => state.contact.error;
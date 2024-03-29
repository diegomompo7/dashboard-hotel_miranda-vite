import { createSlice } from "@reduxjs/toolkit";
import { ContactSliceInitialStateInterface } from "../../interfaces/contact/ContactSliceInterface";
import { ContactInterface } from "../../interfaces/contact/ContactInterface";
import { RootState } from "../../app/store";
import { fetchContact, fetchContacts, fetchDELETEContact, fetchPATCHContact, fetchPOSTContact } from "./contactTrunk";

const initialState: ContactSliceInitialStateInterface = {
  data: [],
  status: "idle", // | "fulfilled" | "rejected" | "pending"
  error: undefined,
};

export const ContactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action): void => {
        state.status = "fulfilled";
        state.data = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action): void => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      .addCase(fetchContacts.pending, (state, action): void => {
        state.status = "pending";
      })

      builder
      .addCase(fetchContact.fulfilled, (state, action): void => {
        state.status = "fulfilled";
        state.contactId = action.payload
      })
      .addCase(fetchContact.rejected, (state, action): void => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      .addCase(fetchContact.pending, (state, action): void => {
        state.status = "pending";
      })

    builder
      .addCase(fetchPOSTContact.fulfilled, (state, action): void => {
        state.status = "fulfilled";
        state.data.push(action.payload);
      })
      .addCase(fetchPOSTContact.rejected, (state, action): void => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      .addCase(fetchPOSTContact.pending, (state, action): void => {
        state.status = "pending";
      })

      builder
      .addCase(fetchPATCHContact.fulfilled, (state, action): void => {
        state.status = "fulfilled";
        state.data.splice(state.data[0]._id!, 1, action.payload);
        
      })
      .addCase(fetchPATCHContact.rejected, (state, action): void => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      .addCase(fetchPATCHContact.pending, (state, action): void => {
        state.status = "pending";
      })

    builder
      .addCase(fetchDELETEContact.fulfilled, (state, action): void => {
       
        state.status = "fulfilled";
        state.data = state.data.filter(del => del._id !== action.payload._id)
      })
      .addCase(fetchDELETEContact.rejected, (state, action): void => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      .addCase(fetchDELETEContact.pending, (state, action): void => {
        state.status = "pending";
      });
      
  },
});

export const getContactData = (state: RootState): ContactInterface[] =>
  state.contact.data;
  export const getContactId = (state: RootState): ContactInterface =>
  state.contact.contactId!;
export const getContactDataArchive = (state: RootState): ContactInterface[] =>
  state.contact.data.filter((contact) => contact.is_archived === true);
export const getContactStatus = (state: RootState) => state.contact.status;
export const getContactError = (state: RootState) => state.contact.error;

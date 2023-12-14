import { createSlice } from "@reduxjs/toolkit";
import { getContactFromApiTrunk } from "./contactTrunk";
import { ContactSliceInitialStateInterface } from "../../interfaces/contact/ContactSliceInterface";
import { ContactInterface } from "../../interfaces/contact/ContactInterface";
import { RootState } from "../../app/store";

const initialState: ContactSliceInitialStateInterface = {
  data: [],
  status: "idle", // | "fulfilled" | "rejected" | "pending"
  error: undefined,
};

export const ContactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    updateContact: (state, action): void => {
      const data = state.data;
      const index = data.findIndex(
        (archived) => archived.id === action.payload.id
      );
      if (index !== -1) {
        const updatedData = {
          ...data[index],
          is_archived: action.payload.is_archived,
        };
        state.data = data.map((item, i) => (i === index ? updatedData : item));
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getContactFromApiTrunk.fulfilled, (state, action): void => {
        state.status = "fulfilled";
        state.data = action.payload;
      })
      .addCase(getContactFromApiTrunk.rejected, (state, action): void => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      .addCase(getContactFromApiTrunk.pending, (state, action): void => {
        state.status = "pending";
      });
  },
});

export const { updateContact } = ContactSlice.actions;
export const getContactData = (state: RootState): ContactInterface[] =>
  state.contact.data;
export const getContactDataArchive = (state: RootState): ContactInterface[] =>
  state.contact.data.filter((contact) => contact.is_archived === true);
export const getContactStatus = (state: RootState) => state.contact.status;
export const getContactError = (state: RootState) => state.contact.error;

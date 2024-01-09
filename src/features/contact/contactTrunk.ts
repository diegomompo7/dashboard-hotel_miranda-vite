import { createAsyncThunk } from "@reduxjs/toolkit";
import contact from "../../data/contact.json";
import { ContactInterface } from "../../interfaces/contact/ContactInterface";

export const getContactFromApiTrunk = createAsyncThunk<
  ContactInterface[],
  void,
  { state: any; rejectValue: string }
>("contact/getContactFromApi", async (): Promise<ContactInterface[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(contact);
    }, 200);
  });
});

import { createAsyncThunk } from "@reduxjs/toolkit";
import { BookingInterface } from "../../interfaces/booking/BookingInterface";
import { fetchDELData, fetchGETData, fetchPATCHData, fetchPOSTData } from "../../hooks/fetchAPI";

export const fetchBookings = createAsyncThunk<BookingInterface[], void, { state: any, rejectValue: string }>("bookings/getBookings", async (): Promise<BookingInterface[]> => {
    return new Promise(async (resolve, reject) => {
           resolve(fetchGETData("/bookings"))
    })
})
export const fetchBooking = createAsyncThunk<BookingInterface, string, { state: any, rejectValue: string }>("bookings/getBooking", async (id: string): Promise<BookingInterface> => {
    return new Promise(async (resolve, reject) => {
        try{
            const response = (await fetchGETData(("/bookings/" + id)))
            resolve(response)
        }catch(e){

        }
    })
})
export const fetchPOSTBooking = createAsyncThunk<BookingInterface, Object, { state: any, rejectValue: string }>("bookings/postBooking", async (body: Object): Promise<BookingInterface> => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetchPOSTData("/bookings", body);
            resolve(response)
          } catch (error) {
        }
    })
})

export const fetchPATCHBooking = createAsyncThunk<BookingInterface, { id: string; formData: Object }, { state: any, rejectValue: string }>("bookings/patchBooking", async ({id, formData}): Promise<BookingInterface> => {
   
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetchPATCHData("/bookings/" + id, formData);
            resolve(response)
          } catch (error) {
        }
    })
})

export const fetchDELETEBooking = createAsyncThunk<BookingInterface, number, { state: any, rejectValue: string }>("bookings/deleteBooking", async (id: number): Promise<BookingInterface> => {
   
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetchDELData("/bookings/", id);
            resolve(response)
          } catch (error) {
        }
    })
})
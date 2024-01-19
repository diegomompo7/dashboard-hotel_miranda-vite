import { createAsyncThunk } from "@reduxjs/toolkit";
import { BookingInterface } from "../../interfaces/booking/BookingInterface";
import { fetchData } from "../../hooks/fetchAPI";

export const fetchBookings = createAsyncThunk<BookingInterface[], void, { state: any, rejectValue: string }>("bookings/getBookings", async (): Promise<BookingInterface[]> => {
    return new Promise(async (resolve, reject) => {
        try{
            const response = await fetchData("/bookings", "GET", null)
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
export const fetchBooking = createAsyncThunk<BookingInterface, string, { state: any, rejectValue: string }>("bookings/getBooking", async (id: string): Promise<BookingInterface> => {
    return new Promise(async (resolve, reject) => {
        try{
            const response = (await fetchData("/bookings/" + id, "GET", null))
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
export const fetchPOSTBooking = createAsyncThunk<BookingInterface, Object, { state: any, rejectValue: string }>("bookings/postBooking", async (body: Object): Promise<BookingInterface> => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetchData("/bookings", "POST", body);
            resolve(response.json())
          } catch (error) {
            reject("Error 500: Internal server error")
        }
    })
})

export const fetchPATCHBooking = createAsyncThunk<BookingInterface, { id: string; formData: Object }, { state: any, rejectValue: string }>("bookings/patchBooking", async ({id, formData}): Promise<BookingInterface> => {
   
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetchData("/bookings/" + id, "PATCH", formData);
            resolve(response.json())
          } catch (error) {
            reject("Error 500: Internal server error")
        }
    })
})

export const fetchDELETEBooking = createAsyncThunk<BookingInterface, number, { state: any, rejectValue: string }>("bookings/deleteBooking", async (id: number): Promise<BookingInterface> => {
   
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetchData("/bookings/" + id, "DELETE", null);
            resolve(response.json())
          } catch (error) {
            reject("Error 500: Internal server error")
        }
    })
})
import { createAsyncThunk } from "@reduxjs/toolkit";
import bookings from "../../data/booking.json"
import rooms from "../../data/rooms.json"

import { BookingInterface } from "../../interfaces/booking/BookingInterface";
import { RoomInterface } from "../../interfaces/room/RoomInterface";
import { useContext } from "react";
import AuthContext from "../../AuthContext";
import { fetchDELData, fetchGETData, fetchPOSTData } from "../../hooks/fetchAPI";

const  userLogin  = localStorage.getItem("token")

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
    console.log(body)
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetchPOSTData("/bookings", body);
            resolve(response)
          } catch (error) {
        }
    })
})

export const fetchDELETEBooking = createAsyncThunk<BookingInterface, number, { state: any, rejectValue: string }>("bookings/deleteBooking", async (id: number): Promise<BookingInterface> => {
    console.log(id)
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetchDELData("/bookings/", id);
            resolve(response)
          } catch (error) {
        }
    })
})
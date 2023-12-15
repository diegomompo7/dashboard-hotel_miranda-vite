import { createAsyncThunk } from "@reduxjs/toolkit";
import bookings from "../../data/booking.json"
import rooms from "../../data/rooms.json"

import { BookingInterface } from "../../interfaces/booking/BookingInterface";
import { RoomInterface } from "../../interfaces/room/RoomInterface";

export const getBookingsFromApiTrunk = createAsyncThunk<BookingInterface[], void, { state: any, rejectValue: string }>("bookings/getBookingsFromApi", async (): Promise<BookingInterface[]> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {

            const return_data: BookingInterface[] = []
            const now: Date = new Date();
            const nowDate: string = now.toISOString().split("T")[0];

            bookings.forEach((booking :any )=> {

                const room: RoomInterface = rooms.find((room: RoomInterface) => room.id === booking.room.id)!

                console.log(room)

                if(room){

                    if (nowDate > booking.check_in) {
                        if (nowDate >= booking.check_out) {
                            return_data.push({ ...booking, room, status: "Check Out" });
                        } else {
                            return_data.push({ ...booking, room, status: "In Progress" });
                        }
                      } else {
                        return_data.push({ ...booking, room, status: "Check In" });
                      }
                }
            });

            console.log(return_data)

            resolve(return_data)
        }, 200)
    })
})
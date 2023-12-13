import { RoomInterface } from "../room/RoomInterface"

export interface BookingInterface {
    id: number | null
    name: string
    orderDate: string
    check_in: string
    hour_in: string
    check_out: string
    hour_out: string
    roomId: number | RoomInterface
    specialRequest: string | undefined
    status: string
}
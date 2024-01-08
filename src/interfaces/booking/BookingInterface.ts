import { RoomInterface } from "../room/RoomInterface";

export interface BookingInterface {
  _id?: number;
  name: string;
  orderDate: string;
  dateIn: string;
  dateOut: string;
  check_out: string;
  hour_out: string;
  room: RoomInterface;
  specialRequest: string | undefined;
  status: string;
}

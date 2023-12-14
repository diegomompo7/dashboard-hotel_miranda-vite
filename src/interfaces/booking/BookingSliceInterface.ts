import { BookingInterface } from "./BookingInterface";

export const statusOptions = <const>[
  "fulfilled",
  "rejected",
  "idle",
  "pending",
];

export interface BookingSliceInitialStateInterface {
  data: BookingInterface[];
  status: "idle" | "pending" | "fulfilled" | "rejected";
  error: string | undefined;
  changeBooking?: BookingInterface[];
}

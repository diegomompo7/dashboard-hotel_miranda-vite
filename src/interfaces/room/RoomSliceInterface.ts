import { RoomInterface } from "./RoomInterface";

export const statusOptions = <const>[
  "fulfilled",
  "rejected",
  "idle",
  "pending",
];

export interface RoomSliceInitialStateInterface {
  data: RoomInterface[];
  status: "idle" | "pending" | "fulfilled" | "rejected";
  error: string | undefined;
  roomId?: RoomInterface[];
}

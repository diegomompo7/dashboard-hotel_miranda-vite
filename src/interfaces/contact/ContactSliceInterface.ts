import { ContactInterface } from "./ContactInterface";

export const statusOptions = <const>[
  "fulfilled",
  "rejected",
  "idle",
  "pending",
];

export interface ContactSliceInitialStateInterface {
  data: ContactInterface[];
  status: "idle" | "pending" | "fulfilled" | "rejected";
  error: string | undefined;
}

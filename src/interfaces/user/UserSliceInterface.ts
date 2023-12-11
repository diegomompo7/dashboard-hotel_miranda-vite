import { UserInterface } from "./UserInterface";

export const statusOptions = <const>["fulfilled","rejected","idle","pending"];

export interface UserSliceInitialStateInterface {
    data: UserInterface[],
    status: 'idle' | 'pending' | 'fulfilled' | 'rejected',
    error: string | undefined 
}
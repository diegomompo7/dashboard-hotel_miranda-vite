import { createAsyncThunk } from "@reduxjs/toolkit";
import users from "../../data/users.json";
import { UserInterface } from "../../interfaces/user/UserInterface";

export const getUsersFromApiTrunk = createAsyncThunk<
  UserInterface[],
  void,
  { state: any; rejectedValue: string }
>("users/getUsersFromApi", async (): Promise<UserInterface[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(users);
    }, 200);
  });
});

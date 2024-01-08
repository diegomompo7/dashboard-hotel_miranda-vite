import { createAsyncThunk } from "@reduxjs/toolkit";
import users from "../../data/users.json";
import { UserInterface } from "../../interfaces/user/UserInterface";

export const getUsersFromApiTrunk = createAsyncThunk<
  UserInterface[],
  void,
  { state: any; rejectedValue: string }
>("users/getUsersFromApi", async (): Promise<UserInterface[]> => {
  return new Promise(async (resolve, reject) => {
    const response = await fetch("https://k9mgwp50x0.execute-api.eu-south-2.amazonaws.com/dev" + "/users", {
        method: "GET",
    })
    console.log(response.json())
})
});

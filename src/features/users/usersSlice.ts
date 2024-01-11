import { createSlice, current } from "@reduxjs/toolkit";
import { fetchDELETEUser, fetchPATCHUser, fetchPOSTUser, fetchUsers} from "./usersTrunk";
import { UserSliceInitialStateInterface } from "../../../user/UserSliceInterface";
import { UserInterface } from "../../../user/UserInterface";
import { RootState } from "../../app/store";

const initialState: UserSliceInitialStateInterface = {
  data: [],
  status: "idle", // | "fulfilled" | "rejected" | "pending"
  error: undefined,
};

export const UsersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getEmployee: (state, action): void => {
      const data = current(state.changeUser);

      if (data !== undefined) {
        const searchEmployee = state.data.filter((employee) =>
          employee.fullName.includes(action.payload)
        );
        state.data = searchEmployee;
      }
    },
    getSelect: (state, action): void => {
      state.data = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action): void => {
        state.status = "fulfilled";
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action): void => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      .addCase(fetchUsers.pending, (state, action): void => {
        state.status = "pending";
      })

    builder
      .addCase(fetchPOSTUser.fulfilled, (state, action): void => {
        state.status = "fulfilled";
        state.data.push(action.payload);
      })
      .addCase(fetchPOSTUser.rejected, (state, action): void => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      .addCase(fetchPOSTUser.pending, (state, action): void => {
        state.status = "pending";
      })

      builder
      .addCase(fetchPATCHUser.fulfilled, (state, action): void => {
        state.status = "fulfilled";
        const findIndex = state.data.findIndex(user => user._id === action.payload._id)
        state.data.splice(findIndex, 1, action.payload);

      })
      .addCase(fetchPATCHUser.rejected, (state, action): void => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      .addCase(fetchPATCHUser.pending, (state, action): void => {
        state.status = "pending";
      })

    builder
      .addCase(fetchDELETEUser.fulfilled, (state, action): void => {
  
        state.status = "fulfilled";
        state.data = state.data.filter(del => del._id !== action.payload._id)
      })
      .addCase(fetchDELETEUser.rejected, (state, action): void => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      .addCase(fetchDELETEUser.pending, (state, action): void => {
        state.status = "pending";
      });
      
  },
});

export const { getEmployee, getSelect } =
  UsersSlice.actions;
export const getUsersDataActive = (state: RootState): UserInterface[] =>
  state.users.data.filter((active) => active.status === "ACTIVE");
export const getUsersDataInactive = (state: RootState): UserInterface[] =>
  state.users.data.filter((inactive) => inactive.status === "INACTIVE");
export const getUsersData = (state: RootState): UserInterface[] =>
  state.users.data;
export const getChangeData = (state: RootState): UserInterface[] | undefined =>
  state.users.changeUser;
export const getUsersStatus = (state: RootState) => state.users.status;
export const getUsersError = (state: RootState) => state.users.error;

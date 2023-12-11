import { createSlice, current} from "@reduxjs/toolkit";
import { getUsersFromApiTrunk } from "./usersTrunk";
import { UserSliceInitialStateInterface } from "../../interfaces/user/UserSliceInterface";
import { UserInterface } from "../../interfaces/user/UserInterface";

const initialState: UserSliceInitialStateInterface = {
    data: [],
    status: "idle", // | "fulfilled" | "rejected" | "pending"
    error: undefined
}

export const UsersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        getEmployee: (state, action):void => {

            const searchEmployee = state.changeUser.filter((employee) => employee.fullName.includes(action.payload))
            state.data = searchEmployee;

        },
        getSelect: (state, action):void => {

            state.data = action.payload;
        },

        deleteUser: (state, action):void => {
            const data = current(state.data)
            const delUser = data.filter((del) => del.id !== action.payload)
            state.data = delUser
        },
        updateUser: (state, action):void => {

            const data = state.data
            const index = data.findIndex((update) => update.id === action.payload.id)
            if (index !== -1) {
                const updatedData = {
                    ...data[index],
                    photo: action.payload.formData.photo,
                    fullName: action.payload.formData.fullName,
                    job: action.payload.formData.job,
                    email: action.payload.formData.email,
                    phone: action.payload.formData.phone,
                    startDate: action.payload.formData.startDate,
                    descriptionJob: action.payload.formData.descriptionJob,
                    status: action.payload.formData.status,
                    password: action.payload.formData.password,

                }

                state.data = data.map((item, i) => (i === index ? updatedData : item));
            }
        },
        createUser: (state, action):void => {
            state.data = [action.payload, ...state.data]
    },


},

    extraReducers: (builder) => {
        builder.addCase(getUsersFromApiTrunk.fulfilled, (state, action):void => {
            state.status = "fulfilled"
            state.data = action.payload;
            state.changeUser = state.data
        })
            .addCase(getUsersFromApiTrunk.rejected, (state, action):void => {
                state.status = "rejected"
                state.error = action.error.message
            })
            .addCase(getUsersFromApiTrunk.pending, (state, action):void => {
                state.status = "pending"
            })
    }
})

export const {getEmployee, getSelect, updateUser, createUser, deleteUser} = UsersSlice.actions
export const getUsersDataActive = (state): UserInterface[] => state.users.data.filter((active) => active.status === "ACTIVE")
export const getUsersDataInactive = (state): UserInterface[] => state.users.data.filter((inactive) => inactive.status === "INACTIVE")
export const getUsersData = (state): UserInterface[] => state.users.data
export const getChangeData = (state): UserInterface[] => state.users.changeUser
export const getUsersStatus = state => state.users.status;
export const getUsersError = state => state.users.error;

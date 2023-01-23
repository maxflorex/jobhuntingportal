import { createSlice } from "@reduxjs/toolkit";

// STATE TS VALUES
interface CurrentUserState {
    value: any
}

// INITIAL STATE
const InitialState = { value: [] } as CurrentUserState

// SLICE
export const CurrentUser = createSlice({
    name: 'Current User',
    initialState: InitialState,
    reducers: {
        currentUser: (state, action) => {
            state.value = action.payload
        },
        signoutCurrent: (state) => {
            state.value = InitialState.value
        }
    }
})

export const { currentUser, signoutCurrent } = CurrentUser.actions
import { createSlice } from '@reduxjs/toolkit'

interface suggestionState {
    value: object
}

const InitialState = { value: [] } as suggestionState

export const SuggestionSlice = createSlice({
    name: 'suggestions',
    initialState: InitialState,
    reducers: {
        suggestions: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { suggestions } = SuggestionSlice.actions

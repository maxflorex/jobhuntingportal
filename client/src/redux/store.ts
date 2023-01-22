import { configureStore } from "@reduxjs/toolkit";
import { SuggestionSlice } from "./suggestionSlice";

export const store = configureStore({
    reducer: {
        suggestions: SuggestionSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
})
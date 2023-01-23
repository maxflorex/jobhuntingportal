import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { SuggestionSlice } from "./suggestionSlice";

import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import thunk from "redux-thunk";
import { CurrentUser } from "./userSlice";


// PERSIST CONFIG
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['currentState']
}


// COMBINE REDUCERS
const rootReducer = combineReducers({
    currentState: CurrentUser.reducer,
    suggestions: SuggestionSlice.reducer
})


export type RootState = ReturnType<typeof rootReducer>


// PERSISTED REDUCER
const persistedReducer = persistReducer(persistConfig, rootReducer)


// STORE
export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware({
    //         serializableCheck: false,
    //     })
})
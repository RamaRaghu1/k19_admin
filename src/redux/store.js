import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import adminSlice from "./features/admin/adminSlice";

export const store=configureStore({
    reducer:{
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: adminSlice,
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(apiSlice.middleware),
})
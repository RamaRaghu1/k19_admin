import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_PUBLIC_SERVER_URI,
  }),

  endpoints: () => ({}),
 
});


export default apiSlice;
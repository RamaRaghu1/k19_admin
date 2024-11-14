import apiSlice from "../api/apiSlice";
import { adminLoggedIn } from "./adminSlice";

const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminLoggedIn: builder.mutation({
      query: (data) => ({
        url: "/api/v1/admin/login",
        method: "POST",
        body: data,
        headers: {
          Tag: "admin",
        },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log(`result.data ${JSON.stringify(result.data)}`);
          console.log(`result.data.token ${result.data.token}`);
          dispatch(
            adminLoggedIn({
              token: result.data.token,
              data: result.data,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useAdminLoggedInMutation } = adminApi;

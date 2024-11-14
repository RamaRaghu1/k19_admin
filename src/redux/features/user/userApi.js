import apiSlice from "../api/apiSlice";

export const userApi=apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        userList: builder.query({
          query: () => ({
            url: "/api/v1/user/list",
            method: "GET",
            headers: {
                Tag: "admin",
                Authorization: `${localStorage.getItem("token")}`,
              },
          }),
        }),
        viewSingleUser: builder.query({
          query: ({id}) => ({
            url: `/api/v1/user/view/${id}`,
            method: "GET",
            headers: {
                Tag: "admin",
                Authorization: `${localStorage.getItem("token")}`,
              },
          }),
        })


    })
})

export const {useUserListQuery,useViewSingleUserQuery}=userApi;
import apiSlice from "../api/apiSlice";

export const eventApi=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getAllEvents:builder.query({
            query:()=>({
                url: `/dashboard`,
                method: "GET",
                headers: {
                    Tag: "admin",
                    Authorization: `${localStorage.getItem("token")}`,
                  },
            })
        }),
        createEvent:builder.mutation({
            query:(data)=>({
                body:data,
                method:"POST",
                url:"/event",
                headers: {
                    Tag: "admin",
                    Authorization: `${localStorage.getItem("token")}`,
                  },
            })
        }),
        deleteEvent:builder.mutation({
            query:(eventId)=>({
                url:`/event/${eventId}`,
                method:"DELETE",
                
                headers: {
                    Tag: "admin",
                    Authorization: `${localStorage.getItem("token")}`,
                  },
            })
        })
    })
})

export const {useCreateEventMutation,useGetAllEventsQuery,useDeleteEventMutation}=eventApi;
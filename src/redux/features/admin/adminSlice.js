import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  data: "",
};
const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    adminLoggedIn: (state, action) => {
   
      state.token = action.payload.token;
      state.data = action.payload.data;
     
    },
  },
});

export const { adminLoggedIn } = adminSlice.actions;
export default adminSlice.reducer;

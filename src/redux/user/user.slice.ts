import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        email: "",
        token: ""
    },
    reducers: {
        setUser: (state, action) => {
            state.email = action.payload.email;
            state.token = action.payload.token;
        },
        setToken: (state, action) => {
            state.token = action.payload.token;
        },
        clearUser: (state) => {
            state.email = "";
            state.token = "";
        },
    },
});

export const {setUser, setToken, clearUser} = userSlice.actions;
export default userSlice.reducer;
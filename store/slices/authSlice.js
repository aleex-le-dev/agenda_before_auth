import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    isSignedIn: false,
    idToken: undefined,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setIsSignedIn: (state, action) => {
            state.isSignedIn = action.payload;
        },
        setToken: (state, action) => {
            state.idToken = action.payload;
        },
      
    },
});
export const { setIsSignedIn, setToken } = authSlice.actions;

export default authSlice.reducer;   
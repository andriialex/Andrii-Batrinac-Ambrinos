import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn: false,
    user: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        LOGGED_IN(state, action) {
            state.isLoggedIn = action.payload;
        },
        USER_DATA(state, action) {
            state.user = action.payload;
        },
        LOGOUT(state) {
            state.isLoggedIn = false;
            state.user = null;
        }
    }
})

export const { LOGOUT, LOGGED_IN, USER_DATA } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer
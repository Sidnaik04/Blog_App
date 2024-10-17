import { createSlice } from "@reduxjs/toolkit";

//initialState will be without user
const initialState = {
  status: false, //-> no user so false and data is null
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

/*
This slice is use to track the authentication. To check if user is authenticted or not. Will ask slice if user is authenticated or unauthenticated.

1. Import createSlice from redux-toolkit. This is use to create a slice.
2. create a object authSlice using createSlice. It requires -> name,initialState and reducers
3. initialState -> status and userData
4. reducer (state,action) -> for logout and login
    a. logout -> if login status will be true and data will be using payload
    b. logout -> if logout status will be false and data will be null
5.export the actions -> login and logout
6. export the reducer
*/

import {configureStore} from '@reduxjs/toolkit'
import authSlice from './authSlice';

const store = configureStore({
    reducer:{
        auth: authSlice
    }
})

export default store;

/*
1. Import configureStore from redux-toolkit -> configureStore is used to create a store.
2. create a store -> store needs a reducer
    a. import the authSlice reducer from authSlice.js 
3. export the store.

*/
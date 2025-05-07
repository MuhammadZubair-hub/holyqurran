import { configureStore,getDefaultMiddleware } from "@reduxjs/toolkit";
import  userReducer from "./Userslice"

export const store = configureStore({
    reducer:{
        user : userReducer
    },
    // middleware: getDefaultMiddleware({
    //     serializableCheck: false, // disable this warning
    //   }),
})

//export default store 
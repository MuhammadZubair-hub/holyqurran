import { createSlice } from "@reduxjs/toolkit"

const intialstate  ={
    user :[],
}

const Userslice = createSlice({
    name:'user',
    initialState : intialstate,
    reducers:{
        setUserData : (state,action)=>{
            state.user = action.payload
        },
        clearUserData :(state)=>{
            state.user= null;
        }
    }
})

export const getUser = (state)=>state.user;

export const {setUserData,clearUserData} = Userslice.actions;

export default Userslice.reducer;
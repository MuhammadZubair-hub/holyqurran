import { createSlice } from "@reduxjs/toolkit"

const intialstate  ={
    user :[],
    Qurandetialdata:[],
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
        },
        setqurandetialdata :(state , action)=>{
            state.Qurandetialdata = action.payload
        }
    }
})

export const getUser = (state)=>state.user;
export const getqurandetialdata  = (state) => state.user.Qurandetialdata;


export const {setUserData,clearUserData, setqurandetialdata} = Userslice.actions;

export default Userslice.reducer;
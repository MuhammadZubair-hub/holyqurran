import { createSlice } from "@reduxjs/toolkit"

const intialstate  ={
    User :'',
    Qurandetialdata:[],
}

const Userslice = createSlice({
    name:'user',
    initialState : intialstate,
    reducers:{
        setUserData : (state,action)=>{
            state.User = action.payload
        },
        clearUserData :(state)=>{
            state.User= null;
        },
        setqurandetialdata :(state , action)=>{
            state.Qurandetialdata = action.payload
        }
    }
})

export const getUser = (state)=>state.user.User;
export const getqurandetialdata  = (state) => state.user.Qurandetialdata;


export const {setUserData,clearUserData, setqurandetialdata} = Userslice.actions;

export default Userslice.reducer;
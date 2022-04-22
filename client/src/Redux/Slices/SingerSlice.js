import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../Common/Axios";

const initialState ={
    singers:[],
    singer:{}
};
export const fetchAsyncSingers = createAsyncThunk('singer/fetchAsyncSingers', async ()=>{
    const response = await Axios.get('singers');
    return response.data;
})
export const fetchAsyncSingerById = createAsyncThunk('singer/fetchAsyncSingerById',async(singerId)=>{
    const response = await Axios.get(`singers/${singerId}`);
    return response.data;
})
const SingerSlice = createSlice({
    name:'singer',
    initialState,
    reducers:{

    },
    extraReducers:{
        [fetchAsyncSingers.pending]:()=>{
            console.log("Pending Singers");
        },

        [fetchAsyncSingerById.pending]:()=>{
            console.log("Pending singer by id")
        },

        [fetchAsyncSingers.fulfilled]:(state, { payload })=>{
            console.log("Fetch Singers Successfully");
            
            return{
                ...state,
                singers:payload
            }
        },
        [fetchAsyncSingerById.fulfilled]:(state,action)=>{
            console.log("Fetch singer by id successfully");
            return{
                ...state,
                singer:action.payload
            }
        },
        [fetchAsyncSingers.rejected]:()=>{
            console.log("Singers Fetching Rejected");
        },
        [fetchAsyncSingerById.rejected]:()=>{
            console.log("Singer Fetching by id Rejected");
        },
    }
});
export const getSinger =(state) => state.singer.singer;
export const getSingers = (state) => state.singer.singers;
export default SingerSlice.reducer;
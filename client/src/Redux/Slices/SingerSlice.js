import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../Common/Axios";

const initialState ={
    singers:[]
};
export const fetchAsyncSingers = createAsyncThunk('musicians/fetchAsyncSingers', async ()=>{
    const response = await Axios.get('singers');
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
        [fetchAsyncSingers.fulfilled]:(state, { payload })=>{
            console.log("Fetch Singers Successfully");
            return{
                ...state,
                singers:payload
            }
        },
        [fetchAsyncSingers.rejected]:()=>{
            console.log("Singers Fetching Rejected");
        }
    }
});
export const getSingers = (state) => state.singer.singers;
export default SingerSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../Common/Axios";

const initialState ={
    singers:[],
    searching_singers:[],
    singer:{}
};
export const fetchAsyncSingers = createAsyncThunk('singer/fetchAsyncSingers', async ()=>{
    const response = await Axios.get('singers');
    return response.data;
})
export const asyncSeachingSingers = createAsyncThunk('singer/asyncSeachingSingers', async (searchTerm)=>{
    const response = await Axios.get(`singers/search/${searchTerm}`);
    return response.data;
})
export const fetchAsyncSingerById = createAsyncThunk('singer/fetchAsyncSingerById',async(singerId)=>{
    const response = await Axios.get(`singers/${singerId}`);
    return response.data;
})
export const asyncUpdateSingerById = createAsyncThunk('singer/asyncUpdateSingerById',async(data)=>{
    const response = await Axios.put(`singers/${data.singerId}`,data.formData,
    {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    }
    );
    return response.data;
})
const SingerSlice = createSlice({
    name:'singer',
    initialState,
    reducers:{
        refreshSearchSinger:(state)=>{
            state.searching_singers = []
        }
    },
    extraReducers:{
       
        [fetchAsyncSingers.fulfilled]:(state, { payload })=>{
            
            
            return{
                ...state,
                singers:payload
            }
        },
        [asyncSeachingSingers.fulfilled]:(state,action)=>{
            return{
                ...state,
                searching_singers:action.payload
            }
        },
        [fetchAsyncSingerById.fulfilled]:(state,action)=>{
            
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
export const {refreshSearchSinger} = SingerSlice.actions;
export const getSearchingSingers = state => state.singer.searching_singers;
export const getSinger =(state) => state.singer.singer;
export const getSingers = (state) => state.singer.singers;
export default SingerSlice.reducer;
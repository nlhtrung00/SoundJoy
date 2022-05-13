import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../Axios";

const initialState={
    listens:[],
    listen:{}
}
export const fetchAsyncListensBySong = createAsyncThunk('listen/fetchAsyncListensBySong',async(songId)=>{
    const response = await Axios.get(`listens/getbysong/${songId}`);
    return response.data
})
export const deleteAsyncListensBySong = createAsyncThunk('listen/deleteAsyncListensBySong',async(songId)=>{
    const response = await Axios.delete(`listens/deletebysong/${songId}`);
    return response.data
})
const ListenSlice = createSlice({
    name:'listen',
    initialState,
    reducers:{},
    extraReducers:{
        [fetchAsyncListensBySong.fulfilled]:(state,action)=>{
            return{
                ...state,
                listens:action.payload
            }
        },
        [deleteAsyncListensBySong.fulfilled]:(state,action)=>{
            console.log("delete listens by song success")
        },
    }
})
export default ListenSlice.reducer;
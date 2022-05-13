import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../Axios";

const initialState={
    rating_songs:[],
    rating_song:{}
}
export const deleteAsyncRatingSongBySong = createAsyncThunk('rating_song/deleteAsyncRatingSongBySong',async(songId)=>{
    const response = await Axios.delete(`ratingsongs//deletebysong/${songId}`);
    return response.data
})
const RatingSongSlice = createSlice({
    name:'rating_song',
    initialState,
    reducers:{},
    extraReducers:{
        [deleteAsyncRatingSongBySong.fulfilled]:()=>{
            console.log("delete rating song success")
        }
    }
})
export default RatingSongSlice.reducer;
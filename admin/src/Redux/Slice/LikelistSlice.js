import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../Axios";

const initialState={
    likelists:[],
    likelists_by_song:[],
    likelist:{}
}
export const fetchAsyncLikelists = createAsyncThunk('likelist/fetchAsyncLikelists',async()=>{
    const response = await Axios.get('likelists');
    return response.data
})
export const fetchAsyncLikelistsBySong = createAsyncThunk('likelist/fetchAsyncLikelistsBySong',async(songId)=>{
    const response = await Axios.get(`likelists/getbysong/${songId}`);
    return response.data
})
export const deleteSongInLikelist=createAsyncThunk('likelist/deleteSongInLikelist',async({data,listId})=>{
    const response = await Axios.put(`likelists/${listId}`,data);
    return response.data;
})
const LikelistSlice = createSlice({
    name:'likelist',
    initialState,
    reducers:{},
    extraReducers:{
        [fetchAsyncLikelists.fulfilled]:(state,action)=>{
            return{
                ...state,
                likelists:action.payload
            }
        },
        [fetchAsyncLikelistsBySong.fulfilled]:(state,action)=>{
            return{
                ...state,
                likelists_by_song:action.payload
            }
        },
        [deleteSongInLikelist.fulfilled]:()=>{
            console.log("delete song in likelist success");
        }
    }
})
export const getLikelistsBySong = state => state.likelist.likelists_by_song
export const getLikelists = state => state.likelist.likelists;
export default LikelistSlice.reducer;
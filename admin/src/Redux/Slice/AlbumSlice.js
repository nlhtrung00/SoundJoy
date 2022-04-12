import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../Axios";

// khoi tao gia tri state
const initialState={
    albums:[],
    album:{},
    createresult:{},
    error:'',
}
export const fetchAsyncAlbums = createAsyncThunk('album/fetchAsyncAlbums',async()=>{
    const response = await Axios.get('albums');
    return response.data;
})
export const fetchAsyncAlbumById = createAsyncThunk('album/fetchAsyncAlbumById',async(id)=>{
    const response = await Axios.get(`albums/${id}`);
    return response.data;
})
const AlbumSlice = createSlice({
    name:'album',
    initialState,
    reducers:{},
    extraReducers:{
        // pending
        [fetchAsyncAlbums.pending]:()=>{
            console.log("Pending Albums")
        },

        // fulfilled

        [fetchAsyncAlbums.fulfilled]:(state,action)=>{
            console.log("Fetching albums successfully");
            return{
                ...state,
                albums:action.payload
            }
        },
        [fetchAsyncAlbumById.fulfilled]:(state,action)=>{
            console.log("Fetching albums successfully");
            return{
                ...state,
                album:action.payload
            }
        },

        // rejected
        [fetchAsyncAlbums.rejected]:()=>{
            console.log("Rejected Albums")
        },
    }
})
export const getListAlbums = (state) =>state.album.albums;
export const getAlbum = (state) =>state.album.album;
export default AlbumSlice.reducer;
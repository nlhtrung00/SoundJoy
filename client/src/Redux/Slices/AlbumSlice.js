import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../Common/Axios';

const initialState={
    albums:[],
    new_albums:[],
    hot_albums:[],
    album:{},
};
export const fetchAsyncAlbums = createAsyncThunk("album/fetchAsyncAlbums",async()=>{
    const response = await Axios.get("albums");
    return response.data;
});
export const fetchAsyncNewAlbums = createAsyncThunk("album/fetchAsyncNewAlbums",async()=>{
    const response = await Axios.get("albums/recent/recent");
    return response.data;
});
export const fetchAsyncHotAlbums = createAsyncThunk("album/fetchAsyncNewAlbums",async()=>{
    const response = await Axios.get("albums/top");
    return response.data;
});
export const fetchAsyncAlbumById = createAsyncThunk("album/fetchAsyncAlbumById",async(albumId)=>{
    const response = await Axios.get(`albums/${albumId}`);
    return response.data;
})
const AlbumSlice = createSlice({
    name:'album',
    initialState,
    reducers:{},
    extraReducers:{
        [fetchAsyncAlbums.fulfilled]:(state,action)=>{
            return{
                ...state,
                albums:action.payload
            }
        },
        [fetchAsyncNewAlbums.fulfilled]:(state,action)=>{
            return{
                ...state,
                new_albums:action.payload
            }
        },
        [fetchAsyncHotAlbums.fulfilled]:(state,action)=>{
            return{
                ...state,
                hot_albums:action.payload
            }
        },
        [fetchAsyncAlbumById.fulfilled]:(state,action)=>{
            return{
                ...state,
                album:action.payload
            }
        },
    }
});
export const getListAlbums = state => state.album.albums;
export const getListNewAlbums = state => state.album.new_albums;
export const getListHotAlbums = state => state.album.hot_albums;
export const getAlbum = state=> state.album.album;
export default AlbumSlice.reducer;
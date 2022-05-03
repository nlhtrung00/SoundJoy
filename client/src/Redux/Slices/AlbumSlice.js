import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../Common/Axios';

const initialState={
    albums:[],
    new_albums:[],
    hot_albums:[],
    albums_by_genre:[],
    albums_by_singer:[],
    albums_by_musician:[],
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
export const fetchAsyncAlbumsByGenre = createAsyncThunk("album/fetchAsyncAlbumsByGenre",async(genreId)=>{
    const response = await Axios.get(`albums/genre/${genreId}`);
    return response.data;
})
export const fetchAsyncAlbumsBySinger = createAsyncThunk("album/fetchAsyncAlbumsBySinger",async(singerId)=>{
    const response = await Axios.get(`albums/singer/${singerId}`);
    return response.data;
})
export const fetchAsyncAlbumsByMusician = createAsyncThunk("album/fetchAsyncAlbumsByMusician",async(musicianId)=>{
    const response = await Axios.get(`albums/musician/${musicianId}`);
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
        // albums by genre
        [fetchAsyncAlbumsByGenre.fulfilled]:(state,action)=>{
            return{
                ...state,
                albums_by_genre:action.payload
            }
        },
        // albums by singer
        [fetchAsyncAlbumsBySinger.fulfilled]:(state,action)=>{
            return{
                ...state,
                albums_by_singer:action.payload
            }
        },
        // albums by musician
        [fetchAsyncAlbumsByMusician.fulfilled]:(state,action)=>{
            return{
                ...state,
                albums_by_musician:action.payload
            }
        }
    }
});
export const getListAlbums = state => state.album.albums;
export const getListNewAlbums = state => state.album.new_albums;
export const getListHotAlbums = state => state.album.hot_albums;
export const getListAlbumsByGenre = state => state.album.albums_by_genre;
export const getListAlbumsBySinger = state => state.album.albums_by_singer;
export const getListAlbumsByMusician= state => state.album.albums_by_musician;
export const getAlbum = state=> state.album.album;
export default AlbumSlice.reducer;
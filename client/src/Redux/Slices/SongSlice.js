import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../Common/Axios";

const initialState={
    songs:[{initial:'value'}],
    song:{initial:'value'},
    songbysinger:[{initial:'value'}],
    songbymusician:[{initial:'value'}],
    songbygenre:[{initial:'value'}],
    songbyalbum:[{initial:'value'}],
    recentsongs:[{initial:'value'}],
    playlist:[]
}
export const fetchAsyncSongs =createAsyncThunk('song/fetchAsyncSongs',async()=>{
    const response = await Axios.get('songs');
    
    return response.data;
})
export const fetchAsyncSongById =createAsyncThunk('song/fetchAsyncSongById',async(id)=>{
    const response = await Axios.get(`songs/${id}`);
    return response.data;
})
export const fetchAsyncSongByAlbum =createAsyncThunk('song/fetchAsyncSongByAlbum',async(albumId)=>{
    const response = await Axios.get(`songs/album/${albumId}`);
    return response.data;
})
export const fetchAsyncSongBySinger =createAsyncThunk('song/fetchAsyncSongBySinger',async(singerId)=>{
    const response = await Axios.get(`songs/singer/${singerId}`);
    return response.data;
})
export const fetchAsyncSongByGenre =createAsyncThunk('song/fetchAsyncSongByGenre',async(genreId)=>{
    const response = await Axios.get(`songs/genre/${genreId}`);
    return response.data;
})
export const fetchAsyncSongByMusician =createAsyncThunk('song/fetchAsyncSongByMusician',async(musicianId)=>{
    const response = await Axios.get(`songs/musician/${musicianId}`);
    return response.data;
})
export const fetchAsyncRecentSongs =createAsyncThunk('song/fetchAsyncRecentSongs',async()=>{
    const response = await Axios.get('songs/recent/recent');
    return response.data;
})

export const asyncUpdateSong =createAsyncThunk('song/asyncUpdateSong',async({formdata,songId})=>{
    const response = await Axios.put(`songs/${songId}`,
        formdata,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );
    return response.data;
})

const SongSlice = createSlice({
    name:'song',
    initialState,
    reducers:{
        setPlaylist:(state,action)=>{
            return{
                ...state,
                playlist:action.payload
            }
        }
    },
    extraReducers:{
        
        
        [fetchAsyncSongs.fulfilled]:(state,action)=>{
           
            console.log(action);
            return{
                ...state,
                songs:action.payload
            }
        },
        [fetchAsyncRecentSongs.fulfilled]:(state,action)=>{
            return{
                ...state,
                recentsongs:action.payload
            }
        },
        [fetchAsyncSongById.fulfilled]:(state,action)=>{
           
            return{
                ...state,
                song:action.payload
            }
        },
        [fetchAsyncSongByAlbum.fulfilled]:(state,action)=>{
            
            return{
                ...state,
                songbyalbum:action.payload
            }
        },
        // song by singer
        [fetchAsyncSongBySinger.fulfilled]:(state,action)=>{
            return{
                ...state,
                songbysinger:action.payload
            }
        },
        // song by musician
        [fetchAsyncSongByMusician.fulfilled]:(state,action)=>{
            return{
                ...state,
                songbymusician:action.payload
            }
        },
        // song by genre
        [fetchAsyncSongByGenre.fulfilled]:(state,action)=>{
            return{
                ...state,
                songbygenre:action.payload
            }
        },
        [fetchAsyncSongByGenre.rejected]:(state,action)=>{
            return{
                ...state,
                songbygenre:[]
            }
        },
    }
});
export const {setPlaylist} = SongSlice.actions;
export const getListSongs = (state)=>state.song.songs;
export const getSongsBySinger = (state)=>state.song.songbysinger;
export const getSongsByMusician = (state)=>state.song.songbymusician;
export const getSongsByGenre = (state)=>state.song.songbygenre;
export const getSongsByAlbum = (state)=>state.song.songbyalbum;
export const getSong = (state)=>state.song.song;
export const getRecentSongs = (state) => state.song.recentsongs;
export const getPlaylist =(state) =>state.song.playlist;
export default SongSlice.reducer;
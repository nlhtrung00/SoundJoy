import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../Axios";

const initialState={
    songs:[],
    song:{},
    recentsongs:[],
    songbysinger:[],
    songbymusician:[],
    songbygenre:[],
    songbyalbum:[],
    top:[],
    bad:[],
    createresult:{},
}
export const fetchAsyncSongs =createAsyncThunk('song/fetchAsyncSongs',async()=>{
    const response = await Axios.get('songs');
    
    return response.data;
})
export const fetchAsyncTopSongs =createAsyncThunk('song/fetchAsyncTopSongs',async()=>{
    const response = await Axios.get('songs/top');  
    return response.data;
})

export const fetchAsyncBadSongs =createAsyncThunk('song/fetchAsyncBadSongs',async()=>{
    const response = await Axios.get('songs/bad');    
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
export const AsyncCreateSong = createAsyncThunk('song/AsyncCreateSong',async(data)=>{
    const response = await Axios.post('songs',
        data,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    )
    
    return response.data;
    
})
export const AsyncDeleteSongById =createAsyncThunk('song/AsyncDeleteSongById',async(id)=>{
    const response = Axios.delete(`songs/${id}`);
    return response.data;
})
const SongSlice = createSlice({
    name:'song',
    initialState,
    reducers:{},
    extraReducers:{
        [fetchAsyncSongs.pending]:()=>{
            console.log('Pending Songs');
            
        },
        // fulfilled
        
        [fetchAsyncSongs.fulfilled]:(state,action)=>{
            console.log('Songs fetch successfully');
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
        [fetchAsyncTopSongs.fulfilled]:(state,action)=>{
            return{
                ...state,
                top:action.payload
            }
        },
        [fetchAsyncBadSongs.fulfilled]:(state,action)=>{
            return{
                ...state,
                bad:action.payload
            }
        },
        [fetchAsyncSongById.fulfilled]:(state,action)=>{
            console.log('Song fetch by id successfully');
            return{
                ...state,
                song:action.payload
            }
        },
        [fetchAsyncSongByAlbum.fulfilled]:(state,action)=>{
            console.log('fetch song by album')
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

        // rejected
        [fetchAsyncSongs.rejected]:()=>{
            console.log('Songs fetch rejected');  
        },
        [fetchAsyncSongById.rejected]:()=>{
            console.log('Song fetch by id rejected');
        },
    }
});
export const getListSongs = (state)=>state.song.songs;
export const getSong = (state)=>state.song.song;
export const getSongsBySinger = (state)=>state.song.songbysinger;
export const getSongsByMusician = (state)=>state.song.songbymusician;
export const getSongsByGenre = (state)=>state.song.songbygenre;
export const getSongsByAlbum = (state)=>state.song.songbyalbum;
export const getRecentSongs = (state) => state.song.recentsongs;
export const getTopSongs = (state) => state.song.top;
export const getBadSongs = (state) => state.song.bad;
export default SongSlice.reducer;
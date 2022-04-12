import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../Axios";

const initialState={
    songs:[],
    song:{},
    createresult:{},
}
export const fetchAsyncSongs =createAsyncThunk('song/fetchAsyncSongs',async()=>{
    const response = await Axios.get('songs');
    
    return response.data;
})
export const fetchAsyncSongById =createAsyncThunk('song/fetchAsyncSongById',async(id)=>{
    const response = Axios.get(`songs/${id}`);
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
        [fetchAsyncSongById.fulfilled]:(state,action)=>{
            console.log('Song fetch by id successfully');
            return{
                ...state,
                song:action.payload
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
export const getSong = (state)=>state.song.song
export default SongSlice.reducer;
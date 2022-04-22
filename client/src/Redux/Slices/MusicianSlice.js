import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../Common/Axios";

const initialState ={
    musicians:[],
    musician:{},
};

export const fetchAsyncMusicians = createAsyncThunk('musicians/fetchAsyncMusicians', async() =>{
    const response = await Axios.get('musicians');
    return response.data;
})
export const fetchAsyncMusicianById = createAsyncThunk('musician/fetchAsyncMusicianById',async(musicianId)=>{
    const response = await Axios.get(`musicians/${musicianId}`);
    return response.data;
})
const MusicianSlice = createSlice({
    name:'musician',
    initialState,
    reducers:{
        
    },
    extraReducers:{
        [fetchAsyncMusicians.pending]:()=>{
            console.log("Pending Musicians");
        },
        [fetchAsyncMusicianById.pending]:()=>{
            console.log("Pending Musician by id")
        },
        [fetchAsyncMusicians.fulfilled]:(state, { payload })=>{
            console.log("Fetch Musicians Successfully");
            return{
                ...state,
                musicians:payload
            }
        },
        [fetchAsyncMusicianById.fulfilled]:(state,action)=>{
            console.log("Fetch Musician by id successfully");
            return{
                ...state,
                musician:action.payload
            }
        },
        [fetchAsyncMusicians.rejected]:()=>{
            console.log("Musicians Fetching Rejected");
        },
        [fetchAsyncMusicianById.rejected]:()=>{
            console.log("Musician Fetching by id Rejected");
        },
    }
});
export const getMusician =(state)=>state.musician.musician;
export const getMusicians = (state) => state.musician.musicians;
export default MusicianSlice.reducer;
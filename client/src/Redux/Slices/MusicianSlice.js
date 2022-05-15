import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../Common/Axios";

const initialState ={
    musicians:[],
    searching_musicians:[],
    musician:{},
};

export const fetchAsyncMusicians = createAsyncThunk('musicians/fetchAsyncMusicians', async() =>{
    const response = await Axios.get('musicians');
    return response.data;
})
export const asyncSeachingMusicians = createAsyncThunk('singer/asyncSeachingMusicians', async (searchTerm)=>{
    const response = await Axios.get(`musicians/search/${searchTerm}`);
    return response.data;
})
export const fetchAsyncMusicianById = createAsyncThunk('musician/fetchAsyncMusicianById',async(musicianId)=>{
    const response = await Axios.get(`musicians/${musicianId}`);
    return response.data;
})
export const asyncUpdateMusicianById = createAsyncThunk('musician/asyncUpdateMusicianById',async(data)=>{
    
    const response = await Axios.put(`musicians/${data.musicianId}`,
    data.formData,
    {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    }
    );
    return response.data;
})
const MusicianSlice = createSlice({
    name:'musician',
    initialState,
    reducers:{
        refreshSearchMusician:(state)=>{
            state.searching_musicians = []
        }
    },
    extraReducers:{
       
        [fetchAsyncMusicians.fulfilled]:(state, { payload })=>{
            
            return{
                ...state,
                musicians:payload
            }
        },
        [asyncSeachingMusicians.fulfilled]:(state,action)=>{
            return{
                ...state,
                searching_musicians:action.payload
            }
        },
        [fetchAsyncMusicianById.fulfilled]:(state,action)=>{
          
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
export const {refreshSearchMusician} = MusicianSlice.actions;
export const getMusician =(state)=>state.musician.musician;
export const getMusicians = (state) => state.musician.musicians;
export const getSearchingMusicians = state => state.musician.searching_musicians;
export default MusicianSlice.reducer;
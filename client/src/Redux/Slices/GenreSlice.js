import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../Common/Axios";

const initialState={
    genres:[],
}

export const fetchAsyncGenres = createAsyncThunk('genres/fetchAsyncGenres',async()=>{
    const response = await Axios.get('genres');
    return response.data;
})
const GenreSlice = createSlice({
    name:'genre',
    initialState,
    reducers:{

    },
    extraReducers:{
        [fetchAsyncGenres.pending]:()=>{
            console.log('Pending Genres');
        },
        [fetchAsyncGenres.fulfilled]:(state,{payload})=>{
            console.log('Fetch Genres Successfully');
            return{
                ...state,
                genres:payload
            }
        },
        [fetchAsyncGenres.rejected]:()=>{
            console.log("Genres Fetching Rejected");
        }
    }
});
export const getGenres = (state)=> state.genre.genres;
export default GenreSlice.reducer;
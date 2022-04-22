import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../Common/Axios";

const initialState={
    genres:[],
    genre:{},
}

export const fetchAsyncGenres = createAsyncThunk('genres/fetchAsyncGenres',async()=>{
    const response = await Axios.get('genres');
    return response.data;
})
export const fetchAsyncGenreById = createAsyncThunk('genres/fetchAsyncGenreById',async(genreId)=>{
    const response = await Axios.get(`genres/${genreId}`);
    return response.data;
})
const GenreSlice = createSlice({
    name:'genre',
    initialState,
    reducers:{

    },
    extraReducers:{

        // list genres
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
        },

        // genre

        [fetchAsyncGenreById.pending]:()=>{
            console.log('Pending Genre by Id');
        },
        [fetchAsyncGenreById.fulfilled]:(state,{payload})=>{
            console.log('Fetch Genre by Id Successfully');
            return{
                ...state,
                genre:payload
            }
        },
        [fetchAsyncGenreById.rejected]:()=>{
            console.log("Genre Fetching by Id Rejected");
        }
    }
});
export const getGenre = (state) =>state.genre.genre;
export const getGenres = (state)=> state.genre.genres;
export default GenreSlice.reducer;
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
        
        [fetchAsyncGenres.fulfilled]:(state,{payload})=>{
            return{
                ...state,
                genres:payload
            }
        },
        [fetchAsyncGenres.rejected]:()=>{
            console.log("Genres Fetching Rejected");
        },

        // genre
        [fetchAsyncGenreById.fulfilled]:(state,{payload})=>{
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
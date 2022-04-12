import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../Axios";

// khoi tao gia tri state
const initialState={
    genres:[],
    genre:{},
    updateresult:{},
    createresult:{},
    error:'',
}
// tao lenh call api bat dong bo
export const fetchAsyncGenres = createAsyncThunk('genre/fetchAsyncGenres',async()=>{
    const response = await Axios.get('genres');
    return response.data;
})
export const fetchAsyncGenreById = createAsyncThunk('genre/fetchAsyncGenreById',async(id)=>{
    const response = await Axios.get(`genres/${id}`);
    return response.data;
})
// create slice cho Genre
const GenreSlice = createSlice({
    name:'genre',
    initialState,
    reducers:{

    },
    // voi moi lenh call api, co 3 giai doan : pending ( loading call), fulfilled ( call success ) và rejected ( call failed)
    extraReducers:{
        // Pending - loading call
        [fetchAsyncGenres.pending]:()=>{
            console.log("Pending Genres");
        },

        // fulfilled - call success
        [fetchAsyncGenres.fulfilled]:(state, action)=>{
            console.log("Fetch Genres Successfully");    
            return{
                ...state,
                genres:action.payload
            }
        },
        [fetchAsyncGenreById.fulfilled]:(state, action)=>{
            console.log("Fetch Genre by id Successfully");    
            return{
                ...state,
                genre:action.payload
            }
        },
        
        
        // rejected - call failed due to errors
        [fetchAsyncGenres.rejected]:()=>{
            console.log("Fetch genres rejected");
        },
        [fetchAsyncGenreById.rejected]:()=>{
            console.log('Fetch genre by id rejected')
        }
        
    }
});
export const getListGenres = (state) => state.genre.genres;
export const getGenre = (state)=>state.genre.genre;
export default GenreSlice.reducer;
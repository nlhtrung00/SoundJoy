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
export const AsyncCreateGenre = createAsyncThunk('genre/AsyncCreateGenre',async(data)=>{
    const response = await Axios.post(`genres`,
        data,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        } 
    );
    return response.data;
})
export const AsyncUpdateGenre = createAsyncThunk('genre/AsyncUpdateGenre',async(data)=>{
    const {formdata,id} = data;
    const response = await Axios.put(`genres/${id}`,
        formdata,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        } 
    );
    return response.data;
})
export const AsyncDeleteGenre = createAsyncThunk('genre/AsyncDeleteGenre',async(id)=>{
    const response = await Axios.delete(`genres/${id}`);
    return response.data;
})
// create slice cho Genre
const GenreSlice = createSlice({
    name:'genre',
    initialState,
    reducers:{
        refreshGenre:(state)=>{
            state.genre={}
        }
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
        [AsyncCreateGenre.fulfilled]:(state,action)=>{
            console.log("Create genre successfully");
            return{
                ...state,
                createresult:action.payload
            }
        },
        [AsyncDeleteGenre.fulfilled]:()=>{
            console.log('Delete genre successfully');
        },
        [AsyncUpdateGenre.fulfilled]:()=>{
            console.log("Update genre successfully");
        },
        
        // rejected - call failed due to errors
        [fetchAsyncGenres.rejected]:()=>{
            console.log("Fetch genres rejected");
        },
        [fetchAsyncGenreById.rejected]:()=>{
            console.log('Fetch genre by id rejected')
        },
        [AsyncCreateGenre.rejected]:()=>{
            console.log("Create genre rejected");
        },
        [AsyncDeleteGenre.rejected]:()=>{
            console.log('Delete genre rejected');
        },
        [AsyncUpdateGenre.rejected]:()=>{
            console.log("Update genre rejected");
        },
        
    }
});
export const {refreshGenre} = GenreSlice.actions;
export const getListGenres = (state) => state.genre.genres;
export const getGenre = (state)=>state.genre.genre;
export default GenreSlice.reducer;
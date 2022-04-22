import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../Axios";

// khoi tao gia tri state
const initialState={
    albums:[],
    album:{},
    createresult:{},
    updateresult:{},
    deleteresult:{},
    error:'',
}
export const fetchAsyncAlbums = createAsyncThunk('album/fetchAsyncAlbums',async()=>{
    const response = await Axios.get('albums');
    return response.data;
})
export const fetchAsyncAlbumById = createAsyncThunk('album/fetchAsyncAlbumById',async(id)=>{
    const response = await Axios.get(`albums/${id}`);
    return response.data;
})
export const AsyncUpdateAlbum = createAsyncThunk('album/AsyncUpdateAlbum', async (data) => {
    const {formdata,id} = data;
    // let formData = new FormData();
    // formData.append('name',data.name);
    // formData.append('image',data.image);
    // formData.append('reactions',parseInt(data.reactions));
    // formData.append('debuted_date',data.debuted_date);
    // formData.append('genre',data.genre);
    
    const response = await Axios.put(`albums/${id}`,
        formdata,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }        
        
    );
    return response.data;
    // .then((response)=>response.data)
    // .catch(err=>console.log(err))
    
})

export const AsyncCreateAlbum = createAsyncThunk('album/AsyncCreateAlbum',async(data)=>{
    const response = await Axios.post('albums',
        data,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }        
        
    )
    return response.data;
})

export const AsyncDeleteAlbum = createAsyncThunk('album/AsyncDeleteAlbum',async(id)=>{
    const response = await Axios.delete(`Albums/${id}`)
    return response.data;
})

const AlbumSlice = createSlice({
    name:'album',
    initialState,
    reducers:{},
    extraReducers:{
        // pending
        [fetchAsyncAlbums.pending]:()=>{
            console.log("Pending Albums")
        },

        // fulfilled
        [fetchAsyncAlbums.fulfilled]:(state,action)=>{
            console.log("Fetching albums successfully");
            return{
                ...state,
                albums:action.payload
            }
        },
        [fetchAsyncAlbumById.fulfilled]:(state,action)=>{
            console.log("Fetching album by id successfully");
            return{
                ...state,
                album:action.payload
            }
        },
        [AsyncUpdateAlbum.fulfilled]: (state,action) => {
            console.log("Update album successfully")
            return{
                ...state,
                updateresult: action.payload
            }
        },
        [AsyncCreateAlbum.fulfilled]: (state,action) => {
            console.log("Create album successfully")
            console.log(action)
            return{
                ...state,
                createresult: action.payload
            }
        },
        [AsyncDeleteAlbum.fulfilled]:(state,action)=>{
            console.log("Delete album successfully");
            return{
                ...state,
                deleteresult:action.payload
            }
        },
        [AsyncDeleteAlbum.rejected]:()=>{
            console.log("Delete album Rejected");
        },
        [AsyncUpdateAlbum.rejected]: (state,action) => {
            console.log("Update album Rejected");
            return{
                ...state,
                error:action.error
            }
        },
        [fetchAsyncAlbumById.rejected]:()=>{
            console.log('fetching album by id rejected')
        },
        // rejected
        [fetchAsyncAlbums.rejected]: (state,action) => {
            console.log("Albums Fetching Rejected");
            return{
                ...state,
                error:action.error
            }
        },
        [AsyncCreateAlbum.rejected]: (state,action) => {
            console.log("Create Albums Rejected");
            return{
                ...state,
                error:action.error.message
            }
        }
    }
})
export const getListAlbums = (state) =>state.album.albums;
export const getAlbum = (state) =>state.album.album;
export default AlbumSlice.reducer;
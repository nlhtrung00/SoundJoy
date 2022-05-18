import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../Common/Axios';

const initialState = {
    ratingsbyalbum: [],
    rating: {}
}

export const fetchAsyncRatingsByAlbum = createAsyncThunk('ratingalbum/fetchAsyncRatingsByAlbum',async(albumId)=>{
    const response = await Axios.get(`ratingalbums/album/${albumId}`);
    return response.data;
})
export const fetchAsyncRatingsOfUserByAlbum = createAsyncThunk('ratingalbum/fetchAsyncRatingsOfUserByAlbum',async({albumId,userId})=>{
    const response = await Axios.get(`ratingalbums/userwithalbum/${userId}/${albumId}`);
    return response.data;
})
export const asyncCreateRating = createAsyncThunk('ratingalbum/asyncCreateRating',async(data)=>{
    const response = await Axios.post(`ratingalbums`,data);
    return response.data;
})
export const asyncUpdateRating = createAsyncThunk('ratingsong/asyncUpdateRating',async({data,ratingId})=>{
    const response = await Axios.put(`ratingalbums/${ratingId}`,data);
    return response.data;
})
const RatingAlbumSlice = createSlice({
    name:'ratingalbum',
    initialState,
    reducers:{},
    extraReducers:{
        // fetch rating by Album
        [fetchAsyncRatingsByAlbum.fulfilled]:(state,action)=>{
            return{
                ...state,
                ratingsbyalbum:action.payload
            }
        },
        [fetchAsyncRatingsByAlbum.rejected]:(state)=>{
            return{
                ...state,
                ratingsbyalbum:[]
            }
        },
        // fetch rating by user
        [fetchAsyncRatingsOfUserByAlbum.fulfilled]:(state,action)=>{
            return{
                ...state,
                rating:action.payload
            }
        },
        
    }
});
export const getRating = (state) =>state.ratingalbum.rating;
export const getRatingsByAlbum =state=>state.ratingalbum.ratingsbyalbum;
export default RatingAlbumSlice.reducer;
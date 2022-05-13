import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../Common/Axios';

const initialState = {
    ratingsbysong: [],
    rating: {}
}

export const fetchAsyncRatingsBySong = createAsyncThunk('ratingsong/fetchAsyncRatingsBySong',async(songId)=>{
    const response = await Axios.get(`ratingsongs/song/${songId}`);
    return response.data;
})
export const fetchAsyncRatingsOfUserBySong = createAsyncThunk('ratingsong/fetchAsyncRatingsOfUserBySong',async({songId,userId})=>{
    const response = await Axios.get(`ratingsongs/userwithsong/${userId}/${songId}`);
    return response.data;
})
export const asyncCreateRating = createAsyncThunk('ratingsong/asyncCreateRating',async(data)=>{
    const response = await Axios.post(`ratingsongs`,data);
    return response.data;
})
export const asyncUpdateRating = createAsyncThunk('ratingsong/asyncUpdateRating',async({data,ratingId})=>{
    const response = await Axios.put(`ratingsongs/${ratingId}`,data);
    return response.data;
})
const RatingSongSlice = createSlice({
    name:'ratingsong',
    initialState,
    reducers:{},
    extraReducers:{
        // fetch rating by song
        [fetchAsyncRatingsBySong.fulfilled]:(state,action)=>{
            return{
                ...state,
                ratingsbysong:action.payload
            }
        },
        [fetchAsyncRatingsBySong.rejected]:(state)=>{
            return{
                ...state,
                ratingsbysong:[]
            }
        },
        // fetch rating by user
        [fetchAsyncRatingsOfUserBySong.fulfilled]:(state,action)=>{
            return{
                ...state,
                rating:action.payload
            }
        },
        // [fetchAsyncRatingsOfUserBySong.rejected]:(state)=>{
        //     return{
        //         ...state,
        //         rating:{}
        //     }
        // }
    }
});
export const getRating = (state) =>state.ratingsong.rating;
export const getRatingsBySong =state=>state.ratingsong.ratingsbysong;
export default RatingSongSlice.reducer;
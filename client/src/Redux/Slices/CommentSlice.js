import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../Common/Axios";

const initialState={
    comments:[],
    resultcreate:{}
}
export const fetchAsyncCommentsBySong = createAsyncThunk('comment/fetchAsyncCommentsBySong',async(songId)=>{
    const response = await Axios.get(`comments/song/${songId}`);
    return response.data;
})
export const createAsyncComment = createAsyncThunk('comment/createAsyncComment',async(data)=>{
    const response = await Axios.post(`comments`,data);
    return response.data;
})
const CommentSlice = createSlice({
    name:'comment',
    initialState,
    reducers:{},
    extraReducers:{
        [fetchAsyncCommentsBySong.fulfilled]:(state,action)=>{
            return{
                ...state,
                comments:action.payload
            }
        },
        [createAsyncComment.fulfilled]:(state,action)=>{
            return{
                ...state,
                resultcreate:action.payload
            }
        },
    }
})
export const getListComments = state => state.comment.comments
export default CommentSlice.reducer
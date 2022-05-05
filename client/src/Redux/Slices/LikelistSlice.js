import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../Common/Axios';

const initialState = {
    likelists: [],
    likelist: {}
}
export const fetchAsyncLikeListsByUser = createAsyncThunk('likelist/fetchAsyncLikeListsByUser', async (userId) => {
    const response = await Axios.get(`likelists/user/${userId}`);
    return response.data;
})
export const fetchAsyncLikeListById = createAsyncThunk('likelist/fetchAsyncLikeListById', async (Id) => {
    const response = await Axios.get(`likelists/${Id}`);
    return response.data;
})
export const asyncCreateLikeList = createAsyncThunk('likelist/asyncCreateLikeList', async (data) => {
    const response = await Axios.post(`likelists`,
        data,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );
    return response.data;
})
export const asyncUpdateLikeList = createAsyncThunk('likelist/asyncUpdateLikeList', async ({formdata,id}) => {
    const response = await Axios.put(`likelists/${id}`,
        formdata,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );
    return response.data;
})
const LikelistSlice = createSlice({
    name: 'likelist',
    initialState,
    reducers: {},
    extraReducers: {
        // get by user
        [fetchAsyncLikeListsByUser.fulfilled]: (state, action) => {
            return {
                ...state,
                likelists: action.payload
            }
        },
        [fetchAsyncLikeListsByUser.rejected]: (state) => {
            return {
                ...state,
                likelists: []
            }
        },

        // get by id
        [fetchAsyncLikeListById.fulfilled]: (state, action) => {
            return {
                ...state,
                likelist: action.payload
            }
        },
    }
})
export const getListLikelists = state => state.likelist.likelists;
export const getLikelist = state => state.likelist.likelist;
export default LikelistSlice.reducer;
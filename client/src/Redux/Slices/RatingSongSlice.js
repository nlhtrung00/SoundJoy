import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../Common/Axios';

const initialState = {
    ratingsbysong: [],
    rating: {}
}

const RatingSongSlice = createSlice({
    name:'ratingsong',
    initialState,
    reducers:{},
    extraReducers:{

    }
});
export default RatingSongSlice.reducer;
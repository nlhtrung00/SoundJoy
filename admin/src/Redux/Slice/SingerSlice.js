import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../Axios";

const initialState = {
    singers: [],
    singer: {},
    updateresult:{}
}
export const fetchAsyncSingers = createAsyncThunk('singer/fetchAsyncSingers', async () => {
    const response = await Axios.get('singers');
    return response.data;
})
export const fetchAsyncSingerById = createAsyncThunk('singer/fetchAsyncSingerById', async (id) => {
    const response = await Axios.get(`singers/${id}`);

    return response.data;
})
export const AsyncUpdateSinger = createAsyncThunk('singer/AsyncUpdateSinger', async (data) => {
    //console.log(data);
    console.log(data.image)
    await Axios.put(`singers/${data.id}`,
        {
            name: data.name,
            information:data.information,
            image:data.image,
            followers:data.followers
        },        
        
    ).then((response)=>response.data)
    .catch(err=>console.log(err))
    
})
const SingerSlice = createSlice({
    name: 'singer',
    initialState,
    reducers: {

    },
    extraReducers: {
        [fetchAsyncSingers.pending]: () => {
            console.log("Pending Singers");
        },
        [fetchAsyncSingers.fulfilled]: (state, { payload }) => {
            console.log("Fetch Singers Successfully");
            return {
                ...state,
                singers: payload
            }
        },
        [fetchAsyncSingerById.fulfilled]: (state, { payload }) => {
            console.log("Fetch singer by id successfully");

            return {
                ...state,
                singer: payload
            }
        },
        [AsyncUpdateSinger.fulfilled]: (state,{payload}) => {
            console.log("Update singer successfully")
            return{
                ...state,
                updateresult: payload
            }
        },

        [AsyncUpdateSinger.rejected]: () => {
            console.log("Update singer Rejected");
        },
        [fetchAsyncSingers.rejected]: () => {
            console.log("Singers Fetching Rejected");
        }
    }
})
export const getListSingers = (state) => state.singer.singers;
export const getSinger = (state) => state.singer.singer;
export default SingerSlice.reducer;
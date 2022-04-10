import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../Axios";

const initialState = {
    singers: [],
    singer: {},
    updateresult:{},
    createresult:{},
    error:'',
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
    let formData = new FormData();
    formData.append('name',data.name);
    formData.append('information',data.information);
    formData.append('image',data.image);
    formData.append('followers',data.followers);
    
    await Axios.put(`singers/${data.id}`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }        
        
    ).then((response)=>response.data)
    .catch(err=>console.log(err))
    
})
export const AsyncCreateSinger = createAsyncThunk('singer/AsyncCreateSinger',async(data)=>{
    const response = await Axios.post('singers',
        data,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }        
        
    )
    return response.data;
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
        [fetchAsyncSingers.fulfilled]: (state, action) => {
            console.log("Fetch Singers Successfully");
            console.log(action)
            return {
                ...state,
                singers: action.payload
            }
        },
        [fetchAsyncSingerById.fulfilled]: (state, action) => {
            console.log("Fetch singer by id successfully");
            console.log(action)
            return {
                ...state,
                singer: action.payload
            }
        },
        [AsyncUpdateSinger.fulfilled]: (state,action) => {
            console.log("Update singer successfully")
            return{
                ...state,
                updateresult: action.payload
            }
        },
        [AsyncCreateSinger.fulfilled]: (state,action) => {
            console.log("Create singer successfully")
            console.log(action)
            return{
                ...state,
                createresult: action.payload
            }
        },

        [AsyncUpdateSinger.rejected]: (state,action) => {
            console.log("Update singer Rejected");
            return{
                ...state,
                error:action.error
            }
        },
        [fetchAsyncSingers.rejected]: (state,action) => {
            console.log("Singers Fetching Rejected");
            return{
                ...state,
                error:action.error
            }
        },
        [AsyncCreateSinger.rejected]: (state,action) => {
            console.log("Create Singers Rejected");
            return{
                ...state,
                error:action.error.message
            }
        }
    }
})
export const getListSingers = (state) => state.singer.singers;
export const getSinger = (state) => state.singer.singer;
export default SingerSlice.reducer;
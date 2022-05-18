import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../Common/Axios';

const initialState = {
    createresult:{},
    listenbysonganduser:{}
}
export const fetchAsyncListenBySongAndUser = createAsyncThunk('listen/fetchAsyncListenBySongAndUser',async({songId,userId})=>{
    const response = await Axios.get(`listens/getbysongwithuser/${songId}/${userId}`);
    return response.data
})
export const asyncCreateListen = createAsyncThunk('listen/asyncCreateListen',async(data)=>{
    const response = await Axios.post('listens',data);
    return response.data
})
export const asyncUpdateListen = createAsyncThunk('listen/asyncUpdateListen',async({data,listenId})=>{
    const response = await Axios.put(`listens/${listenId}`,data);
    return response.data
})
const ListenSlice = createSlice({
    name:'listen',
    initialState,
    reducers:{},
    extraReducers:{
        [fetchAsyncListenBySongAndUser.fulfilled]:(state,action)=>{
            
            return{
                ...state,
                listenbysonganduser:action.payload
            }
        },
        [asyncCreateListen.fulfilled]:()=>{
            console.log("Create listens success");
        },
        [ asyncUpdateListen.fulfilled]:()=>{
            console.log("Update listens success");
        },
    }
})
export const getListenBySongAndUser = state => state.listen.listenbysonganduser
export default ListenSlice.reducer;
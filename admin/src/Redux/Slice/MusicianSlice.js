import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../Axios";

const initialState={
    musicians:[],
    musician:{}
}
export const fetchAsyncMusicians = createAsyncThunk('musician/fetchAsyncMusicians',async()=>{
    const response = await Axios.get('musicians');
    return response.data;
})
const MusicianSlice = createSlice({
    name:'musician',
    initialState,
    reducers:{

    },
    extraReducers:{
        [fetchAsyncMusicians.pending]:()=>{
            console.log("Pending Musicians");
        },
        [fetchAsyncMusicians.fulfilled]:(state, { payload })=>{
            console.log("Fetch Musicians Successfully");    
            console.log(payload)
            return{
                ...state,
                musicians:payload
            }
        },
        [fetchAsyncMusicians.rejected]:()=>{
            console.log("Musicians Fetching Rejected");
        }
    }
})
export const getListMusicians = (state) => state.musician.musicians;
export const getMusician = (state) => state.musician.musician;
export default MusicianSlice.reducer;
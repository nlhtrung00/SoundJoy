import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../Common/Axios";

const initialState ={
    musicians:[]
};

export const fetchAsyncMusicians = createAsyncThunk('musicians/fetchAsyncMusicians', async() =>{
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
            return{
                ...state,
                musicians:payload
            }
        },
        [fetchAsyncMusicians.rejected]:()=>{
            console.log("Musicians Fetching Rejected");
        }
    }
});
export const getMusicians = (state) => state.musician.musicians;
export default MusicianSlice.reducer;
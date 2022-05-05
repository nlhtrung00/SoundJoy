import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../Common/Axios";

const initialState={
    openBar:false
}
const SongBarSlice =createSlice({
    name:'songbar',
    initialState,
    reducers:{
        OpenBar:(state)=>{
            console.log('open bar')
            return{
                ...state,
                openBar:true
            }
        },
        CloseBar:(state)=>{
            return{
                ...state,
                openBar:false
            }
        },
    }
});
export const {OpenBar,CloseBar} = SongBarSlice.actions;
export const getOpenBar = state => state.songbar.openBar;
export default SongBarSlice.reducer;

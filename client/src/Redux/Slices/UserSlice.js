import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import Axios from '../../Common/Axios';

const initialState={
    user:{},
};
export const fetchAsyncUserByAccount = createAsyncThunk('user/fetchAsyncUserByAccount',async(accountId)=>{
    const response = await Axios.get(`users/account/${accountId}`);
    
    return response.data;
});
const UserSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        clearUser:(state)=>{
            state.user ={}
        }
    },
    extraReducers:{
        [fetchAsyncUserByAccount.pending]:()=>{
            console.log("Pending User Fetching");
        },
        
        [fetchAsyncUserByAccount.fulfilled]:(state,{payload})=>{
            console.log("Fetched User Succesfully");
            console.log(payload);
            return {
                ...state,
                user: payload
            }
        },
        [fetchAsyncUserByAccount.rejected]:()=>{
            console.log("User Fetching Rejected");
        },
        
    },
});
export const {clearUser} = UserSlice.actions;
export const getUser=(state)=>state.user.user;
export default UserSlice.reducer;
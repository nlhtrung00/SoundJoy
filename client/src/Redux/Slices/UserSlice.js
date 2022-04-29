import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import Axios from '../../Common/Axios';

const initialState={
    users:[],
    user:{},
};
export const fetchAsyncUserByAccount = createAsyncThunk('user/fetchAsyncUserByAccount',async(accountId)=>{
    const response = await Axios.get(`users/account/${accountId}`);
    return response.data;
});
export const fetchAsyncUsers = createAsyncThunk('user/fetchAsyncUsers',async()=>{
    const response = await Axios.get(`users`);  
    return response.data;
});
export const fetchAsyncUserById= createAsyncThunk('user/fetchAsyncUserById',async(userId)=>{
    const response = await Axios.get(`users/${userId}`);
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

        // 
        [fetchAsyncUsers.fulfilled]:(state,action)=>{
            return{
                ...state,
                users:action.payload
            }
        }
        
    },
});
export const {clearUser} = UserSlice.actions;
export const getListUsers = state => state.user.users;
export const getUser=(state)=>state.user.user;
export default UserSlice.reducer;
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
export const asyncUpdateUserById= createAsyncThunk('user/asyncUpdateUserById',async(data)=>{
    
    const response = await Axios.put(`users/${data.userId}`,
    data.formData,
    {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    }
    );
    return response.data;
});
export const asyncEmptyfollowMusician= createAsyncThunk('user/asyncUnfollowMusician',async(data)=>{
    
    const response = await Axios.put(`users/emptyfollow_musician/${data.userId}`,
    data.formData,
    {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    }
    );
    return response.data;
});
export const asyncEmptyfollowSinger= createAsyncThunk('user/asyncUnfollowSinger',async(data)=>{
    
    const response = await Axios.put(`users/emptyfollow_singer/${data.userId}`,
    data.formData,
    {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    }
    );
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
        
        
        [fetchAsyncUserByAccount.fulfilled]:(state,{payload})=>{
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
        },
        [asyncUpdateUserById.fulfilled]:(state,action)=>{
            console.log(action.payload)
            return{
                ...state,
                user:action.payload
            }
        },
        [asyncEmptyfollowMusician.fulfilled]:(state,action)=>{
            console.log(action.payload)
            return{
                ...state,
                user:action.payload
            }
        },
        [asyncEmptyfollowSinger.fulfilled]:(state,action)=>{
            console.log(action.payload)
            return{
                ...state,
                user:action.payload
            }
        },
        
    },
});
export const {clearUser} = UserSlice.actions;
export const getListUsers = state => state.user.users;
export const getUser=(state)=>state.user.user;
export default UserSlice.reducer;
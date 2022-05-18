import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../Axios";

const initialState = {
    users:[],
    user:{},
    recentusers:[]
};
export const fetchAsyncUsers = createAsyncThunk('user/fetchAsyncUsers',async()=>{
    const response = await Axios.get('users');
    return response.data;
})
export const fetchAsyncRecentUsers = createAsyncThunk('user/fetchAsyncRecentUsers',async()=>{
    const response = await Axios.get('users/recent/recent');
    return response.data;
})
export const fetchAsyncUserByAccount = createAsyncThunk('user/fetchAsyncUserByAccount',async(accountId)=>{
    const response = await Axios.get(`users/account/${accountId}`);
    return response.data;
});
export const fetchAsyncUserById = createAsyncThunk('user/fetchAsyncUserById',async(userId)=>{
    const response = await Axios.get(`users/${userId}`);
    return response.data;
})
const UserSlice = createSlice({
    name:'user',
    initialState,
    reducers:{

    },
    extraReducers:{
        [fetchAsyncUsers.pending]:()=>{
            console.log("Pending users")
        },
        [fetchAsyncUserById.pending]:()=>{
            console.log("Pending user by id")
        },
        // 
        [fetchAsyncUsers.fulfilled]:(state, {payload})=>{
            console.log("Fetch users successfully");
            //console.log(payload)
            return {
                ...state,
                users:payload
            }
        },
        [fetchAsyncRecentUsers.fulfilled]:(state, {payload})=>{
            console.log("fetch recent user" + payload)
            return {
                ...state,
                recentusers:payload
            }
        },
        [fetchAsyncUserById.fulfilled]:(state, {payload})=>{
            console.log("Fetch user successfully");
            return {
                ...state,
                user:payload
            }
        },
        // 
        [fetchAsyncUsers.rejected]:(state)=>{
            console.log("rejected fetching users")
            return{
                ...state,
                users:[]
            }
        },
        [fetchAsyncUserById.rejected]:(state)=>{
            console.log("rejected fetching user")
            return{
                ...state,
                user:{}
            }
        },
        [fetchAsyncRecentUsers.rejected]:(state)=>{
            console.log("rejected fetching recent user")
            return{
                ...state,
                recentusers:[]
            }
        },
        [fetchAsyncUserByAccount.fulfilled]:(state,{payload})=>{
            return {
                ...state,
                user: payload
            }
        },
    }
});
export const getListUsers = (state) => state.user.users;
export const getUser = (state) => state.user.user;
export const getRecentUsers = (state) => state.user.recentusers;
export default UserSlice.reducer;
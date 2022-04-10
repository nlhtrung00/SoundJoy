import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../Axios";

const initialState = {
    users:[],
    user:{}
};
export const fetchAsyncUsers = createAsyncThunk('users/fetchAsyncUsers',async()=>{
    const response = await Axios.get('users');
    return response.data;
})
export const fetchAsyncUserById = createAsyncThunk('users/fetchAsyncUserById',async(userId)=>{
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
        [fetchAsyncUserById.fulfilled]:(state, {payload})=>{
            console.log("Fetch user successfully");
            return {
                ...state,
                user:payload
            }
        },
        // 
        [fetchAsyncUsers.rejected]:()=>{
            console.log("rejected fetching users")
        },
        [fetchAsyncUserById.rejected]:()=>{
            console.log("rejected fetching user")
        }
    }
});
export const getListUsers = (state) => state.user.users;
export const getUser = (state) => state.user.user;
export default UserSlice.reducer;
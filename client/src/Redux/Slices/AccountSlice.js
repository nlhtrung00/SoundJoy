import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../Common/Axios';

const initialState = {
    loginresult:{},
    signupresult: {}
};

export const fetchAsyncAccount = createAsyncThunk('account/fetchAsyncAccount', async (data) => {
    const response = await Axios.post('accounts/login', {
        username: data.username,
        password: data.password,
    });

    return response.data;
});
export const AsyncRegisterAccount = createAsyncThunk('account/AsyncRegisterAccount', async (value) => {
    const data = JSON.stringify(value);
    console.log(data);
    const response = await Axios.post('accounts/register',
        data,
        {
            headers: {
                "Content-type": "application/json"
            }
        }
    ).then((res) => {
        console.log(res)
    }).catch(err => {
        console.log(err)
    })
    return response.data;
})
const AccountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        Logout: (state) => {
            state.loginresult = {}
        },
        refreshSignup: (state)=>{
            state.signupresult={}
        }
    },
    extraReducers: {
        [fetchAsyncAccount.fulfilled]: (state, { payload }) => {
            // console.log("Fetched Succesfully");
            return {
                ...state,
                loginresult: payload
            }
        },
        [AsyncRegisterAccount.fulfilled]: (state, { payload }) => {
            // console.log("Fetched Register Succesfully");
            console.log(payload);
            return {
                ...state,
                signupresult: payload
            }
        },
        [fetchAsyncAccount.rejected]: () => {
            console.log("Account fetching Rejected");
        },
        [AsyncRegisterAccount.rejected]: () => {
            console.log("Register Fetching Rejected");
        },
    },
});
export const { Logout,refreshSignup } = AccountSlice.actions;
export const getIsLoggedin = (state) => state.account.loginresult;
export const getIsSignedup = (state) => state.account.signupresult;
export default AccountSlice.reducer;
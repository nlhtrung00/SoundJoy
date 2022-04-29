import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../Axios";

const initialState={
    musicians:[],
    musician:{},
    topmusicians:[],
    recentmusicians:[],
    updateresult:{},
    createresult:{},
    error:''
}
export const fetchAsyncMusicians = createAsyncThunk('musician/fetchAsyncMusicians',async()=>{
    const response = await Axios.get('musicians');
    return response.data;
})
export const fetchAsyncTopMusicians = createAsyncThunk('musician/fetchAsyncTopMusicians',async()=>{
    const response = await Axios.get('musicians/top');
    return response.data;
})
export const fetchAsyncRecentMusicians = createAsyncThunk('musician/fetchAsyncRecentMusicians',async()=>{
    const response = await Axios.get('musicians/recent/recent');
    return response.data;
})
export const fetchAsyncMusicianById = createAsyncThunk('musician/fetchAsyncMusicianById', async (id) => {
    const response = await Axios.get(`musicians/${id}`);
    return response.data;
})
export const AsyncUpdateMusician = createAsyncThunk('musician/AsyncUpdateMusician', async (data) => {
    let formData = new FormData();
    formData.append('name',data.name);
    formData.append('information',data.information);
    formData.append('image',data.image);
    formData.append('followers',data.followers);
    
    await Axios.put(`musicians/${data.id}`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }        
        
    ).then((response)=>response.data)
    .catch(err=>console.log(err))
    
})
export const AsyncCreateMusician = createAsyncThunk('musician/AsyncCreateMusician',async(data)=>{
    const response = await Axios.post('musicians',
        data,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }        
        
    )
    return response.data;
})
export const AsyncDeleteMusician = createAsyncThunk('musician/AsyncDeleteMusician',async(id)=>{
    const response = await Axios.delete(`musicians/${id}`)
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
        [fetchAsyncMusicians.fulfilled]:(state, action)=>{
            console.log("Fetch Musicians Successfully");    
            return{
                ...state,
                musicians:action.payload
            }
        },
        [fetchAsyncTopMusicians.fulfilled]:(state, action)=>{
            return{
                ...state,
                musicians:action.payload
            }
        },
        [fetchAsyncRecentMusicians.fulfilled]:(state, action)=>{
            return{
                ...state,
                recentmusicians:action.payload
            }
        },
        [fetchAsyncMusicianById.fulfilled]:(state, action)=>{
            console.log("Fetch Musician by Id Successfully");  
            //console.log(action)  
            return{
                ...state,
                musician:action.payload
            }
        },
        [AsyncUpdateMusician.fulfilled]:(state, action)=>{
            console.log("Update Musicians Successfully");    
            return{
                ...state,
                updateresult:action.payload
            }
        },
        [AsyncCreateMusician.fulfilled]:(state, action)=>{
            console.log("Create Musicians Successfully");    
            return{
                ...state,
                createresult:action.payload
            }
        },
        [AsyncDeleteMusician.fulfilled]:()=>{
            console.log("Delete Musician successfully")
        },

        [fetchAsyncMusicians.rejected]:()=>{
            console.log("Musicians Fetching Rejected");
        },
        [fetchAsyncMusicianById.rejected]:()=>{
            console.log("Fetching musician by Id failed")
        },
        [AsyncUpdateMusician.rejected]:()=>{
            console.log("Update musician rejected");
        },
        [AsyncCreateMusician.rejected]:()=>{
            console.log("Create Musician rejected")
        },
        [AsyncDeleteMusician.rejected]:()=>{
            console.log("Delete Musician rejected");
        },
    }
})
export const getListMusicians = (state) => state.musician.musicians;
export const getMusician = (state) => state.musician.musician;
export const getTopMusicians = (state) => state.musician.topmusicians;
export const getRecentMusicians = (state) => state.musician.recentmusicians;
export default MusicianSlice.reducer;
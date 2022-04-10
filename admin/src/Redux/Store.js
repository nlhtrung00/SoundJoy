import {configureStore} from '@reduxjs/toolkit';
import UserReducer from './Slice/UserSlice';
import SingerReducer from './Slice/SingerSlice';
import MusicianReducer from './Slice/MusicianSlice';
const store = configureStore({
    reducer:{
        user: UserReducer,
        singer: SingerReducer,
        musician: MusicianReducer,
    }
})

export default store;
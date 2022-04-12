import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './Slice/UserSlice';
import SingerReducer from './Slice/SingerSlice';
import MusicianReducer from './Slice/MusicianSlice';
import GenreReducer from './Slice/GenreSlice';
import SongReducer from './Slice/SongSlice';
import AlbumReducer from './Slice/AlbumSlice';
import { combineReducers } from 'redux';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,

} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const persistConfig = {
    key: 'root',
    storage,
    
}
const rootReducer = combineReducers({
    user: UserReducer,
    singer: SingerReducer,
    musician: MusicianReducer,
    genre: GenreReducer,
    song:SongReducer,
    album:AlbumReducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export default store;
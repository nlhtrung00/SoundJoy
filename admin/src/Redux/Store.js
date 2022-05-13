import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './Slice/UserSlice';
import SingerReducer from './Slice/SingerSlice';
import MusicianReducer from './Slice/MusicianSlice';
import GenreReducer from './Slice/GenreSlice';
import SongReducer from './Slice/SongSlice';
import AlbumReducer from './Slice/AlbumSlice';
import CommentReducer from './Slice/CommentSlice';
import ListenReducer from './Slice/ListenSlice';
import RatingSongReducer from './Slice/RatingSongSlice';
import LikelistReducer from './Slice/LikelistSlice';

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
    whitelist: ['']
}



const rootReducer = combineReducers({
    user: UserReducer,
    singer: SingerReducer,
    musician: MusicianReducer,
    genre: GenreReducer,
    song: SongReducer,
    album: AlbumReducer,
    comment: CommentReducer,
    listen: ListenReducer,
    likelist: LikelistReducer,
    rating_song: RatingSongReducer,
})
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export default store;
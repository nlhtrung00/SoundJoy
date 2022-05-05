import { configureStore } from '@reduxjs/toolkit';
import AccountReducer from './Slices/AccountSlice';
import SingerReducer from './Slices/SingerSlice';
import MusicianReducer from './Slices/MusicianSlice';
import UserReducer from './Slices/UserSlice';
import GenreReducer from './Slices/GenreSlice';
import AlbumReducer from './Slices/AlbumSlice';
import SongReducer from './Slices/SongSlice';
import LikelistReducer from './Slices/LikelistSlice';
import CommentReducer from './Slices/CommentSlice';
import SongBarReducer from './Slices/SongBarSlice';
import RatingSongReducer from './Slices/RatingSongSlice';
import ListenReducer from './Slices/ListenSlice';

import { combineReducers } from 'redux';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    createMigrate
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const migrations = {
    0: (state) => {
        // migration clear out device state
        return {
            ...state,
            device: undefined
        }
    },
    1: (state) => {
        // migration to keep only device state
        return {
            device: state.device
        }
    }
}
const persistConfig = {
    key: 'root',
    storage,
    version: 1,
    migrate: createMigrate(migrations, { debug: false })
}

const rootReducer = combineReducers({
    account: AccountReducer,
    user: UserReducer,
    singer: SingerReducer,
    musician: MusicianReducer,
    genre: GenreReducer,
    album: AlbumReducer,
    song: SongReducer,
    comment: CommentReducer,
    likelist: LikelistReducer,
    songbar:SongBarReducer,
    ratingsong:RatingSongReducer,
    listen:ListenReducer
})
// const persistedAccount = persistReducer(persistConfig, AccountReducer);
// const persistedUser = persistReducer(persistConfig, UserReducer);
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});
export default store;
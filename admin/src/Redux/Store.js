import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './Slice/UserSlice';
import SingerReducer from './Slice/SingerSlice';
import MusicianReducer from './Slice/MusicianSlice';
import GenreReducer from './Slice/GenreSlice';
import SongReducer from './Slice/SongSlice';
import AlbumReducer from './Slice/AlbumSlice';
import CommentReducer from './Slice/CommentSlice';
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
const preloadedState = {
    user: {
        users: [{ initial: 'value' }],
        user: { initial: 'value' },
        recentusers: [{ initial: 'value' }]
    },
    musician: {
        musicians: [{ initial: 'value' }],
        musician: { initial: 'value' },
        topmusicians: [{ initial: 'value' }],
        recentmusicians: [{ initial: 'value' }],
    },
    singer: {
        singers: [{ initial: 'value' }],
        singer: { initial: 'value' },
        topsingers: [{ initial: 'value' }],
        recentsingers: [{ initial: 'value' }],
    },
    song: {
        songs: [{ initial: 'value' }],
        song: { initial: 'value' },
        recentsongs: [{ initial: 'value' }],
        top: [{ initial: 'value' }],
        bad: [{ initial: 'value' }],
    }
    // genre: {

    // },
    // album: {

    // },
    // comment: {

    // }
}



const rootReducer = combineReducers({
    user: UserReducer,
    singer: SingerReducer,
    musician: MusicianReducer,
    genre: GenreReducer,
    song: SongReducer,
    album: AlbumReducer,
    comment: CommentReducer,
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
    preloadedState,
})

export default store;
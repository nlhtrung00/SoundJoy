import {configureStore} from '@reduxjs/toolkit';
import AccountReducer from './Slices/AccountSlice';
import SingerReducer from './Slices/SingerSlice';
import MusicianReducer from './Slices/MusicianSlice';
import UserReducer from './Slices/UserSlice';
import GenreReducer from './Slices/GenreSlice';
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
    account: AccountReducer,
    user: UserReducer,
    singer: SingerReducer,
    musician: MusicianReducer,
    genre:GenreReducer,
})
// const persistedAccount = persistReducer(persistConfig, AccountReducer);
// const persistedUser = persistReducer(persistConfig, UserReducer);
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store =  configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});
export default store;
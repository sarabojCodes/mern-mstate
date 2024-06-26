import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import userSlice from './user/userSlice.js'
import storage from 'redux-persist/lib/storage'
import persistStore from 'redux-persist/es/persistStore'

const rootReducer = combineReducers({
    user:userSlice
})

const persistConfig = {
    key:"root",
    storage,
    varsion:1
}
const persistedReducer = persistReducer(persistConfig,rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware:(getDeafultMiddleware)=>getDeafultMiddleware({
    serializableCheck:false
  })
})

export const persistor = persistStore(store)
import { configureStore } from '@reduxjs/toolkit'
import userSlice from './user/userSlice.js'

export const store = configureStore({
  reducer: {
   user:userSlice
  },
  middleware:(getDeafultMiddleware)=>getDeafultMiddleware({
    serializableCheck:false
  })
})
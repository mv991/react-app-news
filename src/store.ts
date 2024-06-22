// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import newsReducer from './slices/newsSlice';

const store = configureStore({
  reducer: {
    data: newsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

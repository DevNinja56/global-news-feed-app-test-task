import { configureStore } from '@reduxjs/toolkit';
import authUserInfo from '@/store/slices/auth.slice';
import { stateQueryApi } from './slices/allRequests';
import uiSlice from './slices/ui.slice';

export const store = configureStore({
  reducer: {
    [stateQueryApi.reducerPath]: stateQueryApi.reducer,
    auth: authUserInfo,
    userInterface: uiSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stateQueryApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

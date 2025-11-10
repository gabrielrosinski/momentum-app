import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import timerReducer from './slices/timerSlice';
import pricingReducer from './slices/pricingSlice';
import checkoutReducer from './slices/checkoutSlice';
import { persistenceMiddleware } from './middleware/persistenceMiddleware';

export const store = configureStore({
  reducer: {
    user: userReducer,
    timer: timerReducer,
    pricing: pricingReducer,
    checkout: checkoutReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(persistenceMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

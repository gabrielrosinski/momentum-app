import AsyncStorage from '@react-native-async-storage/async-storage';
import { Middleware } from '@reduxjs/toolkit';
import { setEmail, setName, generatePromoCode } from '../slices/userSlice';
import { startTimer, expireTimer } from '../slices/timerSlice';
import { completePurchase } from '../slices/checkoutSlice';

export const STORAGE_KEYS = {
  USER_EMAIL: '@momentum/user_email',
  USER_NAME: '@momentum/user_name',
  PROMO_CODE: '@momentum/promo_code',
  TIMER_START: '@momentum/timer_start',
  TIMER_EXPIRED: '@momentum/timer_expired',
  PURCHASE_DETAILS: '@momentum/purchase_details',
};

export const persistenceMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);

  // Sync specific actions to AsyncStorage using type-safe action matching
  if (setEmail.match(action)) {
    AsyncStorage.setItem(STORAGE_KEYS.USER_EMAIL, action.payload).catch((error) =>
      console.error('Error saving email:', error)
    );
  } else if (setName.match(action)) {
    AsyncStorage.setItem(STORAGE_KEYS.USER_NAME, action.payload).catch((error) =>
      console.error('Error saving name:', error)
    );
  } else if (generatePromoCode.match(action)) {
    const state = store.getState();
    AsyncStorage.setItem(STORAGE_KEYS.PROMO_CODE, state.user.promoCode).catch((error) =>
      console.error('Error saving promo code:', error)
    );
  } else if (startTimer.match(action)) {
    const state = store.getState();
    if (state.timer.startTime) {
      AsyncStorage.setItem(
        STORAGE_KEYS.TIMER_START,
        state.timer.startTime.toString()
      ).catch((error) => console.error('Error saving timer start:', error));
    }
  } else if (expireTimer.match(action)) {
    AsyncStorage.setItem(STORAGE_KEYS.TIMER_EXPIRED, 'true').catch((error) =>
      console.error('Error saving timer expired state:', error)
    );
  } else if (completePurchase.match(action)) {
    AsyncStorage.setItem(
      STORAGE_KEYS.PURCHASE_DETAILS,
      JSON.stringify(action.payload)
    ).catch((error) => console.error('Error saving purchase details:', error));
  }

  return result;
};

// Helper function to load persisted data
export const loadPersistedData = async () => {
  try {
    const [email, name, promoCode, timerStart, purchaseDetails] = await Promise.all([
      AsyncStorage.getItem(STORAGE_KEYS.USER_EMAIL),
      AsyncStorage.getItem(STORAGE_KEYS.USER_NAME),
      AsyncStorage.getItem(STORAGE_KEYS.PROMO_CODE),
      AsyncStorage.getItem(STORAGE_KEYS.TIMER_START),
      AsyncStorage.getItem(STORAGE_KEYS.PURCHASE_DETAILS),
    ]);

    return {
      email: email || '',
      name: name || '',
      promoCode: promoCode || '',
      timerStart: timerStart ? parseInt(timerStart) : null,
      purchaseDetails: purchaseDetails ? JSON.parse(purchaseDetails) : null,
    };
  } catch (error) {
    console.error('Error loading persisted data:', error);
    return {
      email: '',
      name: '',
      promoCode: '',
      timerStart: null,
      purchaseDetails: null,
    };
  }
};

// Helper function to clear all persisted data (for development/testing)
export const clearPersistedData = async () => {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.USER_EMAIL,
      STORAGE_KEYS.USER_NAME,
      STORAGE_KEYS.PROMO_CODE,
      STORAGE_KEYS.TIMER_START,
      STORAGE_KEYS.TIMER_EXPIRED,
      STORAGE_KEYS.PURCHASE_DETAILS,
    ]);
    console.log('All persisted data cleared successfully');
  } catch (error) {
    console.error('Error clearing persisted data:', error);
  }
};

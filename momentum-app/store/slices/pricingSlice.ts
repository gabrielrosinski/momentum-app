import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../index';

interface PricingState {
  fullPrice: number;
  discountedPrice: number;
  currency: string;
  duration: string;
  durationDays: number;
}

const initialState: PricingState = {
  fullPrice: 50.0,
  discountedPrice: 25.0,
  currency: 'USD',
  duration: '4 weeks',
  durationDays: 28,
};

const pricingSlice = createSlice({
  name: 'pricing',
  initialState,
  reducers: {},
});

// Selectors
export const selectIsDiscountActive = (state: RootState): boolean => {
  return !state.timer.expired && state.timer.startTime !== null;
};

export const selectCurrentPrice = (state: RootState): number => {
  const isDiscountActive = selectIsDiscountActive(state);
  return isDiscountActive ? state.pricing.discountedPrice : state.pricing.fullPrice;
};

export const selectPerDayPrice = (state: RootState): number => {
  const currentPrice = selectCurrentPrice(state);
  return currentPrice / state.pricing.durationDays;
};

export const selectSavings = (state: RootState): number => {
  const isDiscountActive = selectIsDiscountActive(state);
  if (isDiscountActive) {
    return state.pricing.fullPrice - state.pricing.discountedPrice;
  }
  return 0;
};

export const selectSavingsPercentage = (state: RootState): number => {
  const savings = selectSavings(state);
  if (savings > 0) {
    return (savings / state.pricing.fullPrice) * 100;
  }
  return 0;
};

export default pricingSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PurchaseDetails {
  name: string;
  email: string;
  amount: number;
  promoCode: string;
  timestamp: number;
}

export interface PaymentInfo {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  nameOnCard: string;
}

interface CheckoutState {
  purchaseDetails: PurchaseDetails | null;
  paymentInfo: PaymentInfo;
}

const initialState: CheckoutState = {
  purchaseDetails: null,
  paymentInfo: {
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
  },
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setPaymentInfo: (state, action: PayloadAction<Partial<PaymentInfo>>) => {
      state.paymentInfo = {
        ...state.paymentInfo,
        ...action.payload,
      };
    },
    completePurchase: (state, action: PayloadAction<PurchaseDetails>) => {
      state.purchaseDetails = action.payload;
    },
    loadPurchaseDetails: (state, action: PayloadAction<PurchaseDetails>) => {
      state.purchaseDetails = action.payload;
    },
    resetCheckout: (state) => {
      state.purchaseDetails = null;
      state.paymentInfo = {
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        nameOnCard: '',
      };
    },
  },
});

export const { setPaymentInfo, completePurchase, loadPurchaseDetails, resetCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;

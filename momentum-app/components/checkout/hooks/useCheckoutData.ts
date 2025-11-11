import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

export interface CheckoutData {
  userName: string;
  userEmail: string;
  promoCode: string;
  isDiscountActive: boolean;
  fullPrice: number;
  discountedPrice: number;
  currentPrice: number;
  savingsAmount: number;
}

export const useCheckoutData = (): CheckoutData => {
  // Redux selectors
  const userName = useSelector((state: RootState) => state.user.name);
  const userEmail = useSelector((state: RootState) => state.user.email);
  const promoCode = useSelector((state: RootState) => state.user.promoCode);
  const isDiscountActive = useSelector((state: RootState) =>
    !state.timer.expired && state.timer.startTime !== null
  );

  // Pricing calculations
  const fullPrice = 50.00;
  const discountedPrice = 25.00;
  const currentPrice = isDiscountActive ? discountedPrice : fullPrice;
  const savingsAmount = fullPrice - currentPrice;

  return {
    userName,
    userEmail,
    promoCode,
    isDiscountActive,
    fullPrice,
    discountedPrice,
    currentPrice,
    savingsAmount,
  };
};

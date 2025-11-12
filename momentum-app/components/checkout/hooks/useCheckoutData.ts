import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { PRICING } from '../../../constants/pricing';
import { selectIsDiscountActive } from '../../../store/slices/timerSlice';

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
  const isDiscountActive = useSelector(selectIsDiscountActive);

  // Pricing calculations
  const fullPrice = PRICING.FULL_PRICE;
  const discountedPrice = PRICING.DISCOUNTED_PRICE;
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

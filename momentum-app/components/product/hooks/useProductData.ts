import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { PRICING } from '../../../constants/pricing';
import { selectIsDiscountActive } from '../../../store/slices/timerSlice';

export interface ProductData {
  promoCode: string;
  remainingTime: number;
  startTime: number | null;
  isDiscountActive: boolean;
  fullPrice: number;
  discountedPrice: number;
  currentPrice: number;
  perDayPrice: number;
}

export const useProductData = (): ProductData => {
  // Redux selectors
  const promoCode = useSelector((state: RootState) => state.user.promoCode);
  const remainingTime = useSelector((state: RootState) => state.timer.remainingTime);
  const startTime = useSelector((state: RootState) => state.timer.startTime);
  const isDiscountActive = useSelector(selectIsDiscountActive);

  // Pricing calculations
  const fullPrice = PRICING.FULL_PRICE;
  const discountedPrice = PRICING.DISCOUNTED_PRICE;
  const currentPrice = isDiscountActive ? discountedPrice : fullPrice;
  const perDayPrice = currentPrice / PRICING.DURATION_DAYS;

  return {
    promoCode,
    remainingTime,
    startTime,
    isDiscountActive,
    fullPrice,
    discountedPrice,
    currentPrice,
    perDayPrice,
  };
};

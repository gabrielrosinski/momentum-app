import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

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
  const isDiscountActive = useSelector((state: RootState) =>
    !state.timer.expired && state.timer.startTime !== null
  );

  // Pricing calculations
  const fullPrice = 50.00;
  const discountedPrice = 25.00;
  const currentPrice = isDiscountActive ? discountedPrice : fullPrice;
  const perDayPrice = currentPrice / 28; // 28 days = 4 weeks

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

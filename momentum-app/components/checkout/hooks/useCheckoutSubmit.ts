import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { setPaymentInfo, completePurchase } from '../../../store/slices/checkoutSlice';
import { PaymentFormValues } from './usePaymentForm';
import { TIMING } from '../../../constants/timing';
import { AppRoute } from '../../../types/navigation';

export interface UseCheckoutSubmitParams {
  userName: string;
  userEmail: string;
  promoCode: string;
  currentPrice: number;
  formValues: PaymentFormValues;
  validateAllFields: () => boolean;
}

export interface UseCheckoutSubmitReturn {
  isProcessing: boolean;
  handleSubmit: () => void;
}

export const useCheckoutSubmit = ({
  userName,
  userEmail,
  promoCode,
  currentPrice,
  formValues,
  validateAllFields,
}: UseCheckoutSubmitParams): UseCheckoutSubmitReturn => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isProcessing, setIsProcessing] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleSubmit = () => {
    // Validate all fields
    if (!validateAllFields()) {
      return;
    }

    // Start processing
    setIsProcessing(true);

    // Mock payment processing delay
    timeoutRef.current = setTimeout(() => {
      try {
        // Save payment info to Redux
        dispatch(setPaymentInfo({
          cardNumber: formValues.cardNumber.replace(/\s/g, ''),
          expiryDate: formValues.expiryDate,
          cvv: formValues.cvv,
          nameOnCard: formValues.nameOnCard,
        }));

        // Complete purchase
        dispatch(completePurchase({
          name: userName,
          email: userEmail,
          amount: currentPrice,
          promoCode: promoCode,
          timestamp: Date.now(),
        }));

        // Navigate to thank you screen
        router.push('/thank-you' as AppRoute);
      } finally {
        // Reset processing state
        setIsProcessing(false);
        timeoutRef.current = null;
      }
    }, TIMING.CHECKOUT_PROCESSING_DELAY);
  };

  return {
    isProcessing,
    handleSubmit,
  };
};

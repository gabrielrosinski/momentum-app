import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { setPaymentInfo, completePurchase } from '../../../store/slices/checkoutSlice';
import { PaymentFormValues } from './usePaymentForm';

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

  const handleSubmit = () => {
    // Validate all fields
    if (!validateAllFields()) {
      return;
    }

    // Start processing
    setIsProcessing(true);

    // Mock payment processing delay
    setTimeout(() => {
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
      router.push('/thank-you' as any);
    }, 1000);
  };

  return {
    isProcessing,
    handleSubmit,
  };
};

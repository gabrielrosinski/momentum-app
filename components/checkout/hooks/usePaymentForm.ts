import { useState } from 'react';
import {
  validateCardNumber,
  validateExpiry,
  validateCVV,
  validateCardName,
  getCardNumberError,
  getExpiryError,
  getCVVError,
  getCardNameError,
} from '../../../utils/validation';

export interface PaymentFormValues {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  nameOnCard: string;
}

export interface PaymentFormErrors {
  cardNumberError: string | null;
  expiryError: string | null;
  cvvError: string | null;
  nameError: string | null;
}

export interface PaymentFormHandlers {
  handleCardNumberChange: (text: string) => void;
  handleExpiryChange: (text: string) => void;
  handleCVVChange: (text: string) => void;
  handleNameChange: (text: string) => void;
}

export interface UsePaymentFormReturn {
  values: PaymentFormValues;
  errors: PaymentFormErrors;
  handlers: PaymentFormHandlers;
  validateAllFields: () => boolean;
}

export const usePaymentForm = (): UsePaymentFormReturn => {
  // Form state
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');

  // Validation errors
  const [cardNumberError, setCardNumberError] = useState<string | null>(null);
  const [expiryError, setExpiryError] = useState<string | null>(null);
  const [cvvError, setCvvError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);

  // Format card number with spaces (XXXX XXXX XXXX XXXX)
  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\s/g, '');
    const chunks = cleaned.match(/.{1,4}/g);
    return chunks ? chunks.join(' ') : cleaned;
  };

  // Format expiry date (MM/YY)
  const formatExpiry = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  // Handle card number input
  const handleCardNumberChange = (text: string) => {
    const cleaned = text.replace(/\s/g, '');
    if (cleaned.length <= 16) {
      setCardNumber(formatCardNumber(cleaned));
      setCardNumberError(null);
    }
  };

  // Handle expiry input
  const handleExpiryChange = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length <= 4) {
      setExpiryDate(formatExpiry(cleaned));
      setExpiryError(null);
    }
  };

  // Handle CVV input
  const handleCVVChange = (text: string) => {
    if (text.length <= 4 && /^\d*$/.test(text)) {
      setCvv(text);
      setCvvError(null);
    }
  };

  // Handle name input
  const handleNameChange = (text: string) => {
    setNameOnCard(text);
    setNameError(null);
  };

  // Validate all fields
  const validateAllFields = (): boolean => {
    let isValid = true;

    // Validate card number
    if (!validateCardNumber(cardNumber)) {
      setCardNumberError(getCardNumberError(cardNumber) || 'Card number is required');
      isValid = false;
    }

    // Validate expiry
    if (!validateExpiry(expiryDate)) {
      setExpiryError(getExpiryError(expiryDate) || 'Expiry date is required');
      isValid = false;
    }

    // Validate CVV
    if (!validateCVV(cvv)) {
      setCvvError(getCVVError(cvv) || 'CVV is required');
      isValid = false;
    }

    // Validate name
    if (!validateCardName(nameOnCard)) {
      setNameError(getCardNameError(nameOnCard) || 'Name on card is required');
      isValid = false;
    }

    return isValid;
  };

  return {
    values: {
      cardNumber,
      expiryDate,
      cvv,
      nameOnCard,
    },
    errors: {
      cardNumberError,
      expiryError,
      cvvError,
      nameError,
    },
    handlers: {
      handleCardNumberChange,
      handleExpiryChange,
      handleCVVChange,
      handleNameChange,
    },
    validateAllFields,
  };
};

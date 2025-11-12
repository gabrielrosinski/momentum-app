// Email Validation
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const getEmailError = (email: string): string | null => {
  if (!email) return null;
  return validateEmail(email) ? null : 'Please enter a valid email';
};

// Name Validation
export const validateName = (name: string): boolean => {
  const nameRegex = /^[a-zA-Z]{2,}$/;
  return nameRegex.test(name);
};

export const getNameError = (name: string): string | null => {
  if (!name) return null;
  if (name.length < 2) return 'Name must be at least 2 characters';
  if (!/^[a-zA-Z]+$/.test(name)) return 'Name must contain only letters';
  return null;
};

// Card Number Validation (16 digits, spaces/dashes allowed)
export const validateCardNumber = (cardNumber: string): boolean => {
  const cleanNumber = cardNumber.replace(/[\s-]/g, '');
  const cardRegex = /^\d{16}$/;
  return cardRegex.test(cleanNumber);
};

export const getCardNumberError = (cardNumber: string): string | null => {
  if (!cardNumber) return null;
  const cleanNumber = cardNumber.replace(/[\s-]/g, '');
  if (cleanNumber.length === 0) return null;
  if (!/^\d+$/.test(cleanNumber)) return 'Card number must contain only digits';
  if (cleanNumber.length !== 16) return 'Card number must be 16 digits';
  return null;
};

// Expiry Date Validation (MM/YY format)
export const validateExpiry = (expiry: string): boolean => {
  const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  if (!expiryRegex.test(expiry)) return false;

  // Check if date is not expired
  const [month, year] = expiry.split('/');
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100; // Get last 2 digits
  const currentMonth = currentDate.getMonth() + 1;

  const expiryYear = parseInt(year, 10);
  const expiryMonth = parseInt(month, 10);

  if (expiryYear < currentYear) return false;
  if (expiryYear === currentYear && expiryMonth < currentMonth) return false;

  return true;
};

export const getExpiryError = (expiry: string): string | null => {
  if (!expiry) return null;
  if (expiry.length === 0) return null;
  if (!/^[\d/]+$/.test(expiry)) return 'Invalid format. Use MM/YY';
  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) return 'Invalid format. Use MM/YY';
  if (!validateExpiry(expiry)) return 'Card has expired';
  return null;
};

// CVV Validation (3-4 digits)
export const validateCVV = (cvv: string): boolean => {
  const cvvRegex = /^\d{3,4}$/;
  return cvvRegex.test(cvv);
};

export const getCVVError = (cvv: string): string | null => {
  if (!cvv) return null;
  if (cvv.length === 0) return null;
  if (!/^\d+$/.test(cvv)) return 'CVV must contain only digits';
  if (cvv.length < 3 || cvv.length > 4) return 'CVV must be 3-4 digits';
  return null;
};

// Card Name Validation (alphabetic with spaces)
export const validateCardName = (name: string): boolean => {
  const nameRegex = /^[a-zA-Z\s]{2,}$/;
  return nameRegex.test(name.trim());
};

export const getCardNameError = (name: string): string | null => {
  if (!name) return null;
  const trimmedName = name.trim();
  if (trimmedName.length === 0) return null;
  if (trimmedName.length < 2) return 'Name must be at least 2 characters';
  if (!/^[a-zA-Z\s]+$/.test(trimmedName)) return 'Name must contain only letters';
  return null;
};

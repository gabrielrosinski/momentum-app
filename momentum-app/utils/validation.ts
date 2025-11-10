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

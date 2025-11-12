import { MONTH_NAMES } from '../constants';

/**
 * Generate a promo code in the format: name_month25
 * Example: alex_nov25
 *
 * @param name - User's name
 * @returns Promo code string
 */
export const generatePromoCode = (name: string): string => {
  const now = new Date();

  // Get month from constant
  const month = MONTH_NAMES[now.getMonth()];

  // Year (last 2 digits)
  const year = now.getFullYear().toString().slice(-2);

  // Format: [name]_[month][year]
  return `${name.toLowerCase()}_${month}${year}`;
};

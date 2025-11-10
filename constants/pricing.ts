// Pricing Constants

export const PRICING = {
  FULL_PRICE: 50.0,
  DISCOUNTED_PRICE: 25.0,
  DURATION_DAYS: 28, // 4 weeks
  DURATION_LABEL: '4 WEEK PLAN',
  CURRENCY: 'USD',
  CURRENCY_SYMBOL: '$',
} as const;

export const TIMER = {
  DURATION_MS: 5 * 60 * 1000, // 5 minutes in milliseconds
  DURATION_SECONDS: 5 * 60,   // 5 minutes in seconds
} as const;

// Helper to calculate per-day price
export const calculatePerDayPrice = (price: number): number => {
  return price / PRICING.DURATION_DAYS;
};

// Helper to calculate savings
export const calculateSavings = (fullPrice: number, discountedPrice: number): number => {
  return fullPrice - discountedPrice;
};

// Helper to calculate savings percentage
export const calculateSavingsPercentage = (fullPrice: number, discountedPrice: number): number => {
  return Math.round(((fullPrice - discountedPrice) / fullPrice) * 100);
};

// Format price as string
export const formatPrice = (price: number, showCurrency = true): string => {
  const formatted = price.toFixed(2);
  return showCurrency ? `${PRICING.CURRENCY_SYMBOL}${formatted} ${PRICING.CURRENCY}` : `${PRICING.CURRENCY_SYMBOL}${formatted}`;
};

// Format per-day price
export const formatPerDayPrice = (price: number): string => {
  const perDay = calculatePerDayPrice(price);
  return `${PRICING.CURRENCY_SYMBOL}${perDay.toFixed(2)}`;
};

// Format savings message
export const formatSavingsMessage = (fullPrice: number, discountedPrice: number): string => {
  const savings = calculateSavings(fullPrice, discountedPrice);
  const percentage = calculateSavingsPercentage(fullPrice, discountedPrice);
  return `You just saved ${formatPrice(savings, false)} (${percentage}% OFF)`;
};

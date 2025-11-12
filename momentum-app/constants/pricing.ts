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

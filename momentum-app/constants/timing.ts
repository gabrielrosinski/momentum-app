// Timing constants for the application

export const TIMING = {
  // Checkout processing delay (mock payment)
  CHECKOUT_PROCESSING_DELAY: 1000, // 1 second

  // Timer update interval
  TIMER_UPDATE_INTERVAL: 1000, // 1 second (updates every second)

  // Input validation debounce delay
  INPUT_DEBOUNCE_DELAY: 500, // 0.5 seconds (wait 500ms after user stops typing)
} as const;

// Navigation route types for type-safe routing

/**
 * All valid route names in the app
 */
export type AppRoute = '/' | '/name' | '/product' | '/checkout' | '/thank-you';

/**
 * Type guard to check if a string is a valid route
 */
export const isValidRoute = (route: string): route is AppRoute => {
  const validRoutes: AppRoute[] = ['/', '/name', '/product', '/checkout', '/thank-you'];
  return validRoutes.includes(route as AppRoute);
};

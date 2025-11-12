import { StyleSheet } from 'react-native';
import { colors } from './colors';

/**
 * Shared screen styles used across all screens
 * Prevents duplication of common layout patterns
 */
export const screenStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

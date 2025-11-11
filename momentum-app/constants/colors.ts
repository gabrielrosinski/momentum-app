// Design System Colors - Extracted from Figma designs
export const colors = {
  // Primary
  primary: '#000000',           // Black (buttons, primary text)

  // Accent - Mint/Teal Green (from designs)
  accent: '#50C9A0',            // Green (promo box, success, buy button)
  accentLight: '#D4F4E8',       // Light green background for promo box
  accentDark: '#3BA57D',        // Darker green for pressed states

  // Status Colors
  error: '#FF0000',             // Red (errors, strikethrough prices)
  errorLight: '#FFE6E6',        // Light red (error input backgrounds)
  success: '#0BB881',           // Green (confirmations, thank you)
  warning: '#FFA726',           // Orange (warnings if needed)

  // UI Elements
  disabled: '#7A7A7A',          // Gray (disabled buttons)
  border: '#D1D1D1',            // Light gray (input borders)
  borderLight: '#E8E8E8',       // Very light gray (subtle borders)
  background: '#EFF1F5',        // Light gray-blue (screen background)
  backgroundWhite: '#FFFFFF',   // White (cards, input backgrounds)
  inputBg: '#FFFFFF',           // White (input backgrounds)
  cardBg: '#FFFFFF',            // White (card backgrounds)

  // Text
  textPrimary: '#000000',       // Black (primary text)
  textSecondary: '#999999',     // Dark gray (secondary text)
  textTertiary: '#9B9B9B',      // Light gray (tertiary text, placeholders)
  textPlaceholder: '#A0A0A0',   // Gray (input placeholders)
  textDisabled: '#CCCCCC',      // Very light gray (disabled text)

  // Badge
  badge: '#5B9BF3',             // Blue ("MOST POPULAR" badge)
  badgeText: '#FFFFFF',         // White (badge text)

  // Special
  discount: '#FF0000',          // Red (discount text, savings)
  timerGreen: '#0BB881',        // Green (countdown timer)
  timerBackGround: '#D1F0EA',   // Light mint green background
  promoCodeBorder: '#50C9A0',   // Green (dashed border on promo box)

  // Shadows (for elevation)
  shadowLight: 'rgba(0, 0, 0, 0.05)',
  shadowMedium: 'rgba(0, 0, 0, 0.1)',
  shadowDark: 'rgba(0, 0, 0, 0.15)',
};

// Color aliases for semantic usage
export const semanticColors = {
  buttonPrimary: colors.primary,
  buttonPrimaryText: colors.backgroundWhite,
  buttonSuccess: colors.accent,
  buttonSuccessText: colors.backgroundWhite,
  buttonDisabled: colors.disabled,
  buttonDisabledText: colors.textDisabled,

  inputBackground: colors.inputBg,
  inputBorder: colors.border,
  inputText: colors.textPrimary,
  inputPlaceholder: colors.textPlaceholder,
  inputError: colors.error,
  inputErrorBg: colors.errorLight,

  cardBackground: colors.cardBg,
  screenBackground: colors.background,
};

// Design System Spacing - Extracted from Figma designs

// Base spacing unit: 4px
const BASE_UNIT = 4;

export const spacing = {
  // Base units
  xs: BASE_UNIT * 1,        // 4px
  sm: BASE_UNIT * 2,        // 8px
  md: BASE_UNIT * 4,        // 16px
  lg: BASE_UNIT * 6,        // 24px
  xl: BASE_UNIT * 8,        // 32px
  xxl: BASE_UNIT * 12,      // 48px
  xxxl: BASE_UNIT * 16,     // 64px

  // Component-specific spacing
  buttonPadding: {
    horizontal: BASE_UNIT * 6,  // 24px
    vertical: BASE_UNIT * 4,    // 16px
  },
  inputPadding: {
    horizontal: BASE_UNIT * 4,  // 16px
    vertical: BASE_UNIT * 3,    // 12px
  },
  cardPadding: {
    horizontal: BASE_UNIT * 5,  // 20px
    vertical: BASE_UNIT * 5,    // 20px
  },
  screenPadding: {
    horizontal: BASE_UNIT * 5,  // 20px
    vertical: BASE_UNIT * 6,    // 24px
  },

  // Border radius
  borderRadius: {
    xs: BASE_UNIT * 1,     // 4px
    sm: BASE_UNIT * 2,     // 8px
    md: BASE_UNIT * 3,     // 12px
    lg: BASE_UNIT * 4,     // 16px
    xl: BASE_UNIT * 6,     // 24px
    full: 9999,            // Fully rounded
  },

  // Button specific
  buttonHeight: {
    small: 40,
    medium: 48,
    large: 56,
  },
  buttonRadius: BASE_UNIT * 7,  // 28px (for full rounded buttons)

  // Input specific
  inputHeight: 56,
  inputRadius: BASE_UNIT * 2,   // 8px

  // Card specific
  cardRadius: BASE_UNIT * 3,    // 12px

  // Gap between elements
  gap: {
    xs: BASE_UNIT * 1,      // 4px
    sm: BASE_UNIT * 2,      // 8px
    md: BASE_UNIT * 3,      // 12px
    lg: BASE_UNIT * 4,      // 16px
    xl: BASE_UNIT * 6,      // 24px
    xxl: BASE_UNIT * 8,     // 32px
  },
};

// Layout constants
export const layout = {
  screenPaddingHorizontal: spacing.screenPadding.horizontal,
  screenPaddingVertical: spacing.screenPadding.vertical,
  maxWidth: 600, // Max width for large screens
  headerHeight: 60,
  bottomButtonMargin: spacing.lg,
};

// Icon sizes
export const iconSizes = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
  xxl: 48,
};

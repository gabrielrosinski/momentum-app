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

  // Component-specific spacing
  buttonPadding: {
    horizontal: BASE_UNIT * 6,  // 24px
    vertical: BASE_UNIT * 4,    // 16px
  },
  inputPadding: {
    horizontal: BASE_UNIT * 4,  // 16px
    vertical: BASE_UNIT * 3,    // 12px
  },
  screenPadding: {
    horizontal: BASE_UNIT * 5,  // 20px
    vertical: BASE_UNIT * 6,    // 24px
  },

  // Border radius
  borderRadius: {
    sm: 6,
  },

  // Button specific
  buttonHeight: {
    large: 56,
  },
  buttonRadius: BASE_UNIT * 7,  // 28px (for full rounded buttons)

  // Card specific
  cardRadius: BASE_UNIT * 3,    // 12px
};

// Layout constants
export const layout = {
  headerHeight: 60,
  bottomButtonMargin: spacing.lg,
};

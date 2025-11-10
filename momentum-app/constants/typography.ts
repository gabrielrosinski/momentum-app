// Design System Typography - Extracted from Figma designs

export const typography = {
  // Headers
  h1: {
    font: "Gothic A1",
    fontSize: 30,
    fontWeight: '600' as const,
    fontstyle: 'SemiBold' as const,
    lineHeight: 36,
    letterSpacing: -0.5,
  },
  h2: {
    font: "Gothic A1",
    fontstyle: 'SemiBold' as const,
    fontSize: 30,
    fontWeight: '600' as const,
    lineHeight: 32,
    letterSpacing: -0.3,
  },
  // h3: {
  //   fontSize: 20,
  //   fontWeight: '600' as const,
  //   lineHeight: 28,
  //   letterSpacing: -0.2,
  // },
  // h4: {
  //   fontSize: 18,
  //   fontWeight: '600' as const,
  //   lineHeight: 24,
  //   letterSpacing: 0,
  // },

  // Body Text
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
    letterSpacing: 0,
  },
  bodyMedium: {
    fontSize: 16,
    fontWeight: '500' as const,
    lineHeight: 24,
    letterSpacing: 0,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
    letterSpacing: 0,
  },
  bodySmallMedium: {
    fontSize: 14,
    fontWeight: '500' as const,
    lineHeight: 20,
    letterSpacing: 0,
  },

  // UI Elements
  button: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 20,
    letterSpacing: 0.2,
  },
  buttonLarge: {
    fontSize: 18,
    fontWeight: '600' as const,
    lineHeight: 24,
    letterSpacing: 0.3,
  },
  input: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 20,
    letterSpacing: 0,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500' as const,
    lineHeight: 18,
    letterSpacing: 0,
  },

  // Special Typography
  price: {
    fontSize: 32,
    fontWeight: '700' as const,
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  priceMedium: {
    fontSize: 24,
    fontWeight: '700' as const,
    lineHeight: 32,
    letterSpacing: -0.3,
  },
  priceSmall: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 18,
    letterSpacing: 0,
  },
  priceStrikethrough: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 18,
    letterSpacing: 0,
    textDecorationLine: 'line-through' as const,
  },

  // Timer
  timer: {
    fontSize: 24,
    fontWeight: '700' as const,
    lineHeight: 32,
    letterSpacing: 0,
  },
  timerLabel: {
    fontSize: 10,
    fontWeight: '400' as const,
    lineHeight: 14,
    letterSpacing: 0.5,
  },

  // Badge
  badge: {
    fontSize: 12,
    fontWeight: '700' as const,
    lineHeight: 16,
    letterSpacing: 1,
    textTransform: 'uppercase' as const,
  },

  // Caption / Helper Text
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
    letterSpacing: 0,
  },
  captionMedium: {
    fontSize: 12,
    fontWeight: '500' as const,
    lineHeight: 16,
    letterSpacing: 0,
  },

  // Error Text
  error: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
    letterSpacing: 0,
  },
};

// Font families (using system defaults for React Native)
export const fontFamilies = {
  regular: 'System',
  medium: 'System',
  semiBold: 'System',
  bold: 'System',
};

// Helper to create text style objects
export const createTextStyle = (
  typographyStyle: typeof typography[keyof typeof typography],
  color: string
) => ({
  ...typographyStyle,
  color,
});

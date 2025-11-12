# Momentum - React Native Subscription Funnel App

A mobile subscription funnel application demonstrating onboarding, engagement, and conversion flow with personalized offers and dynamic pricing.

## Table of Contents
- [Getting Started](#getting-started)
- [App Overview](#app-overview)
- [Architecture](#architecture)
- [Development Features](#development-features)
- [Known Limitations](#known-limitations)
- [Project Structure](#project-structure)
- [Learn More](#learn-more)

---

## Getting Started

### Prerequisites

**Windows:**
- Node.js 18+ ([Download](https://nodejs.org/))
- Git ([Download](https://git-scm.com/download/win))
- Expo Go app on your iOS/Android device ([iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))
- Optional: Android Studio for Android Emulator

**macOS:**
- Node.js 18+ ([Download](https://nodejs.org/) or `brew install node`)
- Git (comes pre-installed or `brew install git`)
- Xcode (for iOS Simulator) - [Download from App Store](https://apps.apple.com/us/app/xcode/id497799835)
- Expo Go app on your iOS/Android device ([iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))
- Optional: Android Studio for Android Emulator

### Installation

1. **Clone the repository**
   ```bash
   cd momentum-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run the app**

   After running `npx expo start`, you'll see a QR code in the terminal. You have several options:

   **Option A: Physical Device (Recommended for testing)**
   - **iOS**: Open Camera app → Scan QR code → Tap notification
   - **Android**: Open Expo Go app → Scan QR code

   **Option B: iOS Simulator (macOS only)**
   ```bash
   # Press 'i' in the terminal, or
   npx expo start --ios
   ```

   **Option C: Android Emulator**
   ```bash
   # Press 'a' in the terminal, or
   npx expo start --android
   ```

   **Option D: Web Browser (limited functionality)**
   ```bash
   # Press 'w' in the terminal, or
   npx expo start --web
   ```

### Clearing Cache (If you encounter issues)

```bash
# Clear Expo cache
npx expo start --clear

# Or manually clear npm cache
npm cache clean --force
rm -rf node_modules
npm install
```

---

## App Overview

**Momentum** is a mobile subscription funnel that guides users through a personalized onboarding experience with time-sensitive offers.

### User Flow

1. **Email Screen** → User enters email (validated)
2. **Name Screen** → User enters name (generates promo code)
3. **Product Screen** → Shows 4-week plan with discount countdown timer
4. **Checkout Screen** → Payment form with validation
5. **Thank You Screen** → Purchase confirmation

### Key Features

- ✅ **Personalized Promo Codes**: Generated from user's name + current date (e.g., `alex_dec25`)
- ⏱️ **5-Minute Countdown Timer**: Limited-time 50% discount offer
- 💾 **Offline-First**: All data persisted locally with AsyncStorage
- 🔒 **Form Validation**: Real-time email, name, and credit card validation
- 📱 **Cross-Platform**: iOS, Android, and Web support
- 🎨 **Responsive Design**: Adapts to different screen sizes

---

## Architecture

### Technology Stack

- **Framework**: Expo SDK (React Native)
- **Language**: TypeScript
- **Navigation**: Expo Router (file-based routing)
- **State Management**: Redux Toolkit
- **Data Persistence**: AsyncStorage
- **UI**: React Native with custom components

### State Management

**Redux Store Structure:**

```typescript
RootState
├── user          // Email, name, promo code
├── timer         // Countdown timer state (5 minutes)
├── pricing       // Full price, discounted price, calculations
└── checkout      // Payment info, purchase details
```

**Persistence Strategy:**
- Redux middleware syncs state to AsyncStorage automatically
- Timer uses timestamp-based persistence (not countdown value)
- State survives app restarts and maintains timer accuracy

### Folder Structure

```
momentum-app/
├── app/                    # Expo Router screens (file-based routing)
│   ├── index.tsx          # Email screen (/)
│   ├── name.tsx           # Name screen (/name)
│   ├── product.tsx        # Product/Pricing (/product)
│   ├── checkout.tsx       # Checkout (/checkout)
│   ├── thank-you.tsx      # Thank you (/thank-you)
│   └── _layout.tsx        # Root layout + Redux Provider
├── store/                  # Redux store
│   ├── slices/            # User, Timer, Pricing, Checkout slices
│   └── middleware/        # AsyncStorage persistence middleware
├── components/             # Reusable components
│   ├── common/            # Button, Input, PromoCodeBox, etc.
│   ├── product/           # Product screen components + hooks
│   ├── checkout/          # Checkout screen components + hooks
│   └── layout/            # Header, ErrorBoundary
├── constants/              # Colors, typography, spacing, pricing
├── utils/                  # Validation, date formatting
├── types/                  # TypeScript type definitions
└── assets/                 # Images, icons, fonts
```

### Performance Optimizations

The app implements several React performance best practices:

- **React.memo**: Components memoized to prevent unnecessary re-renders
- **useMemo**: Pricing calculations cached to avoid recalculation
- **useCallback**: Event handlers memoized for stable references
- **Memory Management**: Proper cleanup of timers and intervals

---

## Development Features

### 🔄 Red Reset Button (Dev Tool)

**Location**: Email screen (top-right corner)
**Visibility**: Only in development mode (`__DEV__`)

**Purpose**: Quickly reset all app state during development without reinstalling the app.

**What it clears:**
- All Redux state (user, timer, pricing, checkout)
- All AsyncStorage data
- Timer countdown
- User information
- Purchase history

**How to use:**
1. Tap the red "🔄 Reset" button on the email screen
2. Alert confirms data cleared
3. App returns to fresh state

This is extremely useful for testing the full user flow repeatedly without manual data clearing.

---

## Known Limitations

### iOS Status Bar Color in Expo Go

**Issue**: The status bar (navigation bar) background color remains white/transparent in Expo Go on iOS, despite correct configuration.

**Why this happens:**
- iOS does not allow custom status bar background colors in development (Expo Go)
- This is an **Apple platform limitation**, not a bug in the code
- The `backgroundColor` prop in `StatusBar` component is ignored by iOS in Expo Go

**Configuration (already implemented):**
```typescript
// app/_layout.tsx
<StatusBar
  backgroundColor={colors.background}  // #EFF1F5
  style="dark"
/>

// app.json
"ios": {
  "statusBar": {
    "style": "dark",
    "backgroundColor": "#EFF1F5"
  }
}
```

**Solutions:**

1. **Production Build** (Color will work correctly):
   ```bash
   # Build for iOS
   eas build --platform ios

   # Or use local build
   npx expo prebuild
   npx expo run:ios
   ```

2. **Development Build** (Full control while developing):
   ```bash
   # Install EAS CLI
   npm install -g eas-cli

   # Build development version
   eas build --profile development --platform ios
   ```

3. **Current Workaround**: SafeAreaView background color matches screen background (#EFF1F5), providing visual consistency

**Android**: Status bar color should work in Expo Go on Android, but full control requires production build.

---

## Checkout Screen Validation

The checkout screen includes comprehensive **credit card validation** with real-time error messages:

### Validation Rules

**Credit Card Number:**
- Must be 16 digits
- Auto-formats with spaces (XXXX XXXX XXXX XXXX)
- Luhn algorithm validation (basic)
- Error: "Card number must be 16 digits"

**Expiry Date (MM/YY):**
- Must be valid format (MM/YY)
- Month must be 01-12
- Date must not be expired
- Auto-formats as user types
- Error: "Invalid expiry date"

**CVV:**
- Must be 3-4 digits
- Numeric only
- Error: "CVV must be 3-4 digits"

**Name on Card:**
- Required field
- Minimum 2 characters
- Error: "Name is required"

### User Experience

- ✅ **Real-time validation**: Errors appear as user types
- ✅ **Clear error messages**: Displayed below each field
- ✅ **Auto-formatting**: Card number and expiry date format automatically
- ✅ **Disabled submit**: "Buy Now" button disabled until all fields valid
- ✅ **Visual feedback**: Red border and light red background on error

### Test Credit Card

For testing purposes, you can use any 16-digit number (mock checkout):
```
Card: 4532 1488 0343 6467
Expiry: 12/25
CVV: 123
Name: Test User
```

**Note**: This is a mock checkout flow. No real payment processing occurs.

---

## Project Structure

### Key Files

**Screens:**
- `app/index.tsx` - Email validation and entry point
- `app/name.tsx` - Name collection and promo code generation
- `app/product.tsx` - Pricing card with countdown timer
- `app/checkout.tsx` - Payment form with validation
- `app/thank-you.tsx` - Purchase confirmation

**Redux Store:**
- `store/slices/userSlice.ts` - User data (email, name, promo code)
- `store/slices/timerSlice.ts` - 5-minute countdown timer
- `store/slices/pricingSlice.ts` - Pricing calculations and discount logic
- `store/slices/checkoutSlice.ts` - Payment info and purchase details

**Validation:**
- `utils/validation.ts` - Email, name, and credit card validation functions

**Constants:**
- `constants/colors.ts` - Color palette (#EFF1F5 background, etc.)
- `constants/typography.ts` - Text styles
- `constants/pricing.ts` - Pricing constants ($50 full, $25 discounted)
- `constants/timing.ts` - Timer durations and delays

---

## Scripts

```bash
# Start development server
npm start

# Start with cache cleared
npm run start:clear

# Run on iOS simulator (macOS only)
npm run ios

# Run on Android emulator
npm run android

# Run on web browser
npm run web

# Type checking
npm run typecheck

# Lint code
npm run lint
```

---

## Learn More

### Expo Documentation
- [Expo Router](https://docs.expo.dev/router/introduction/) - File-based routing
- [Expo StatusBar](https://docs.expo.dev/versions/latest/sdk/status-bar/) - Status bar API
- [AsyncStorage](https://docs.expo.dev/versions/latest/sdk/async-storage/) - Local storage

### Redux Documentation
- [Redux Toolkit](https://redux-toolkit.js.org/) - State management
- [React Redux](https://react-redux.js.org/) - React bindings

### Design Reference
- [Figma Design](https://www.figma.com/design/H6kiXN7eRtirMQ0JNHrXGf/Untitled?node-id=0-1) - Original design specs

---

## Support

For issues or questions:
1. Check the [Expo documentation](https://docs.expo.dev/)
2. Search [Expo Discord](https://chat.expo.dev)
3. Review the [project documentation](../CLAUDE.md)

---

**Built with ❤️ using Expo and React Native**

# Momentum - React Native Subscription Funnel App

## Project Overview

**App Name**: Momentum
**Purpose**: Mobile subscription funnel demonstrating onboarding, engagement, and conversion flow with personalized offers and dynamic pricing
**Platform**: iOS & Android (React Native)
**Timeline**: Few hours implementation, 5-day deadline

---

## Technology Stack

### Core Technologies
- **Framework**: Expo SDK (latest)
- **Language**: TypeScript
- **Navigation**: Expo Router (file-based routing)
- **State Management**: Redux Toolkit
- **Data Persistence**: AsyncStorage (offline-first)

### Key Dependencies
```json
{
  "expo": "latest",
  "expo-router": "latest",
  "@react-navigation/native": "latest",
  "@reduxjs/toolkit": "latest",
  "react-redux": "latest",
  "@react-native-async-storage/async-storage": "latest",
  "typescript": "latest"
}
```

### Optional Libraries
- Stripe SDK (test mode) for checkout simulation
- Form validation utilities
- Date/time formatting libraries

---

## Architecture Overview

### Folder Structure
```
momentum-app/
├── app/                          # Expo Router screens
│   ├── index.tsx                 # Email screen (/)
│   ├── name.tsx                  # Name screen (/name)
│   ├── product.tsx               # Product/Pricing (/product)
│   ├── checkout.tsx              # Checkout screen (/checkout)
│   ├── thank-you.tsx             # Thank you screen (/thank-you)
│   └── _layout.tsx               # Root layout
├── store/                        # Redux store
│   ├── index.ts                  # Store configuration
│   ├── slices/
│   │   ├── userSlice.ts         # User data (email, name)
│   │   ├── timerSlice.ts        # Timer state
│   │   ├── pricingSlice.ts      # Pricing logic
│   │   └── checkoutSlice.ts     # Purchase details
│   └── middleware/
│       └── persistenceMiddleware.ts  # AsyncStorage sync
├── components/                   # Reusable components
│   ├── common/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── PromoCodeBox.tsx
│   │   └── CountdownTimer.tsx
│   └── layout/
│       └── Header.tsx
├── utils/                        # Utility functions
│   ├── validation.ts            # Email/name validation
│   ├── promoCode.ts             # Promo code generation
│   ├── storage.ts               # AsyncStorage helpers
│   └── pricing.ts               # Price calculations
├── types/                        # TypeScript types
│   └── index.ts
├── constants/                    # Constants
│   ├── colors.ts
│   ├── typography.ts
│   └── pricing.ts
└── assets/                       # Images, fonts, icons
```

---

## Redux State Structure

### User Slice (`store/slices/userSlice.ts`)
```typescript
interface UserState {
  email: string;
  name: string;
  promoCode: string;
}

// Actions
- setEmail(email: string)
- setName(name: string)
- generatePromoCode() // Format: [name]_[month][year]
- resetUser()
```

### Timer Slice (`store/slices/timerSlice.ts`)
```typescript
interface TimerState {
  startTime: number | null;      // Timestamp when timer started
  duration: number;               // 5 minutes (300000ms)
  expired: boolean;
  remainingTime: number;
}

// Actions
- startTimer()
- updateRemainingTime()
- expireTimer()
- loadTimerFromStorage()
```

### Pricing Slice (`store/slices/pricingSlice.ts`)
```typescript
interface PricingState {
  fullPrice: number;              // 50.00
  discountedPrice: number;        // 25.00
  currency: string;               // "USD"
  duration: string;               // "4 weeks"
  isDiscountActive: boolean;      // Based on timer
  perDayPrice: {
    full: number;                 // 1.78
    discounted: number;           // 0.89
  };
}

// Selectors
- selectCurrentPrice() // Returns price based on timer state
- selectPerDayPrice()
- selectSavings()
```

### Checkout Slice (`store/slices/checkoutSlice.ts`)
```typescript
interface CheckoutState {
  purchaseDetails: {
    name: string;
    email: string;
    amount: number;
    promoCode: string;
    timestamp: number;
  } | null;
  paymentInfo: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    nameOnCard: string;
  };
}

// Actions
- setPaymentInfo(info)
- completePurchase(details)
- resetCheckout()
```

---

## AsyncStorage Schema

### Storage Keys
```typescript
// Storage keys
const STORAGE_KEYS = {
  USER_EMAIL: '@momentum/user_email',
  USER_NAME: '@momentum/user_name',
  PROMO_CODE: '@momentum/promo_code',
  TIMER_START: '@momentum/timer_start',
  TIMER_EXPIRED: '@momentum/timer_expired',
  PURCHASE_DETAILS: '@momentum/purchase_details',
};
```

### Data Persistence Strategy
1. **Redux Middleware**: Sync Redux state changes to AsyncStorage
2. **App Initialization**: Load state from AsyncStorage on app start
3. **Timer Persistence**: Store timer start timestamp, recalculate remaining time on app restart
4. **Purchase History**: Persist purchase details indefinitely

---

## Expo Router Structure

### File-based Routing
```
app/
├── index.tsx          → /          (Email Screen)
├── name.tsx           → /name      (Name Screen)
├── product.tsx        → /product   (Product/Pricing)
├── checkout.tsx       → /checkout  (Checkout)
└── thank-you.tsx      → /thank-you (Thank You)
```

### Navigation Flow
```
/ (Email)
  → Continue → /name
    → Continue + Generate Promo → /product (Start Timer)
      → Get My Plan → /checkout
        → Buy Now (Success) → /thank-you
```

### Back Navigation
- Name → Email (back arrow)
- Product → Name (back arrow)
- Checkout → Product (back arrow / cancel)
- No back navigation from Thank You

---

## Functional Requirements

### Screen 1: Email Input (`app/index.tsx`)

**Purpose**: Capture and validate user's email address

**UI Components**:
- Momentum logo header
- Email input field
- Continue button (disabled until valid)
- Privacy disclaimer text

**Validation**:
- Format: `example@domain.com`
- Real-time validation on input change
- Error state: "Please enter a valid email"
  - Red text
  - Red border
  - Light red background

**Redux Actions**:
```typescript
dispatch(setEmail(email));
```

**Navigation**:
```typescript
router.push('/name');
```

**AsyncStorage**:
```typescript
await AsyncStorage.setItem('@momentum/user_email', email);
```

---

### Screen 2: Name Input (`app/name.tsx`)

**Purpose**: Collect user's name for personalization

**UI Components**:
- Back arrow (top-left)
- Momentum logo header
- Name input field
- Continue button (disabled until valid)

**Validation Rules**:
- Only alphabetic characters (a-z, A-Z)
- Minimum 2 characters
- No numbers, special characters, or spaces

**Business Logic**:
On Continue:
1. Store name in Redux and AsyncStorage
2. Generate promo code: `[name]_[month][year]`
   - Name: lowercase
   - Month: short format (jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec)
   - Year: 2 digits (e.g., 25 for 2025)
   - Example: `alex_nov25`

**Redux Actions**:
```typescript
dispatch(setName(name));
dispatch(generatePromoCode());
```

**Navigation**:
```typescript
router.push('/product');
```

---

### Screen 3: Product/Pricing (`app/product.tsx`)

**Purpose**: Display personalized offer with countdown timer

**UI Components**:
- Back arrow
- Momentum logo
- Green promo code box
  - Checkmark icon
  - "Your Promo Code is Applied!"
  - Promo code display
  - Countdown timer (mm:ss)
- Pricing card
  - "4 WEEK PLAN" title
  - "MOST POPULAR" blue badge
  - Strikethrough full price ($50.00 USD) in red
  - Discounted price ($25.00 USD)
  - Per-day cost ($0.89 USD per day)
  - Radio button (selected)
- "Get My Plan" button (black background)

**Timer Logic**:
- Duration: 5 minutes (300 seconds)
- Starts on first load of this screen
- Format: mm:ss (e.g., "04:59", "00:30")
- Persists across app restarts
- When expired: switch to full price

**Pricing Logic**:
```typescript
// Timer active
discountedPrice: $25.00 USD
perDay: $0.89 USD
savings: $25.00 (50% OFF)

// Timer expired
fullPrice: $50.00 USD
perDay: $1.78 USD
savings: $0.00
```

**Redux Selectors**:
```typescript
const isDiscountActive = useSelector(selectIsDiscountActive);
const currentPrice = useSelector(selectCurrentPrice);
const remainingTime = useSelector(selectRemainingTime);
```

**Effects**:
```typescript
useEffect(() => {
  // Start timer on mount if not already started
  if (!timerStarted) {
    dispatch(startTimer());
  }

  // Update timer every second
  const interval = setInterval(() => {
    dispatch(updateRemainingTime());
  }, 1000);

  return () => clearInterval(interval);
}, []);
```

**Navigation**:
```typescript
router.push('/checkout');
```

---

### Screen 4: Checkout/Payment (`app/checkout.tsx`)

**Purpose**: Simulate checkout process

**UI Components**:
- Back arrow
- Momentum logo
- Pricing summary
  - "4 WEEK PLAN"
  - Full price strikethrough if discount active
  - Final price
  - Savings message (red): "You just saved $25.00 (50% OFF)"
- Payment form
  - Card brand logos (Visa, Mastercard, Maestro, Amex, Discover)
  - Credit card number input (with card icon)
  - Expiry date (MM/YY) and CVV (split fields)
  - Name on card
- "Buy Now" button (green background, lock icon)

**Form Validation**:
- Card number: 16 digits (basic validation)
- Expiry: MM/YY format
- CVV: 3-4 digits
- Name: Required

**Checkout Flow**:
1. **Test Mode**: Use Stripe test mode OR mock checkout
2. **On Success**:
   ```typescript
   dispatch(completePurchase({
     name: user.name,
     email: user.email,
     amount: currentPrice,
     promoCode: user.promoCode,
     timestamp: Date.now()
   }));

   await AsyncStorage.setItem(
     '@momentum/purchase_details',
     JSON.stringify(purchaseDetails)
   );

   router.push('/thank-you');
   ```
3. **On Cancel**: Return to product screen

**Redux Actions**:
```typescript
dispatch(setPaymentInfo(paymentData));
dispatch(completePurchase(purchaseDetails));
```

---

### Screen 5: Thank You (`app/thank-you.tsx`)

**Purpose**: Simple confirmation screen

**UI Components**:
- "Thank you" message (green, centered)
- No back navigation
- Purchase details displayed (optional)

**Data Persistence**:
Purchase details stored in AsyncStorage:
```typescript
{
  name: string,
  email: string,
  amount: number,
  promoCode: string,
  timestamp: number
}
```

---

## Design System

### Figma Reference
**URL**: https://www.figma.com/design/H6kiXN7eRtirMQ0JNHrXGf/Untitled?node-id=0-1&t=DW6NaJRREtVID9Ir-1

### Color Palette

```typescript
// constants/colors.ts
export const colors = {
  // Primary
  primary: '#000000',           // Black (buttons, text)

  // Accent
  accent: '#00FF00',            // Green (promo box, success) - UPDATE FROM FIGMA
  accentLight: '#E6F9E6',       // Light green background

  // Status
  error: '#FF0000',             // Red (errors, strikethrough)
  errorLight: '#FFE6E6',        // Light red (error backgrounds)
  success: '#00C853',           // Green (confirmations)

  // UI Elements
  disabled: '#CCCCCC',          // Gray (disabled buttons)
  border: '#E0E0E0',            // Light gray (borders)
  background: '#FFFFFF',        // White
  inputBg: '#F5F5F5',          // Light gray (input backgrounds)

  // Text
  textPrimary: '#000000',
  textSecondary: '#666666',
  textPlaceholder: '#999999',

  // Badge
  badge: '#2196F3',            // Blue ("MOST POPULAR")
};
```

**Note**: Extract exact hex codes from Figma for green accent color

### Typography

```typescript
// constants/typography.ts
export const typography = {
  // Headers
  h1: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 34,
  },
  h2: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 30,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 26,
  },

  // Body
  body: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },

  // UI Elements
  button: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
  },
  input: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 20,
  },

  // Special
  price: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 38,
  },
  priceSmall: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 18,
  },
};
```

**Note**: Extract exact font families, sizes, and weights from Figma

### Spacing

```typescript
// constants/spacing.ts
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};
```

### Component Specifications

#### Button Component
```typescript
// components/common/Button.tsx
interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'success';
  icon?: ReactNode;
}

// Styles
- Height: 56px
- Border radius: 8px
- Padding: 16px 24px
- Primary: Black background, white text
- Success: Green background, white text
- Disabled: Gray background, light text
```

#### Input Component
```typescript
// components/common/Input.tsx
interface InputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  error?: string;
  keyboardType?: 'email-address' | 'default';
}

// Styles
- Height: 56px
- Background: Light gray (#F5F5F5)
- Border: 1px solid #E0E0E0
- Border radius: 8px
- Padding: 16px
- Error state: Red border, light red background
```

#### PromoCodeBox Component
```typescript
// components/common/PromoCodeBox.tsx
interface PromoCodeBoxProps {
  promoCode: string;
  remainingTime: number; // seconds
}

// Styles
- Background: Green (from Figma)
- Padding: 16px
- Border radius: 8px
- Checkmark icon
- Timer format: mm:ss
```

#### CountdownTimer Component
```typescript
// components/common/CountdownTimer.tsx
interface CountdownTimerProps {
  remainingTime: number; // seconds
}

// Format: mm:ss
// Example: "04:59", "00:30", "00:00"
```

---

## Validation Logic

### Email Validation (`utils/validation.ts`)
```typescript
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const getEmailError = (email: string): string | null => {
  if (!email) return null;
  return validateEmail(email) ? null : 'Please enter a valid email';
};
```

### Name Validation (`utils/validation.ts`)
```typescript
export const validateName = (name: string): boolean => {
  const nameRegex = /^[a-zA-Z]{2,}$/;
  return nameRegex.test(name);
};

export const getNameError = (name: string): string | null => {
  if (!name) return null;
  if (name.length < 2) return 'Name must be at least 2 characters';
  if (!/^[a-zA-Z]+$/.test(name)) return 'Name must contain only letters';
  return null;
};
```

---

## Business Logic

### Promo Code Generation (`utils/promoCode.ts`)
```typescript
export const generatePromoCode = (name: string): string => {
  const now = new Date();

  // Month mapping
  const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun',
                  'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  const month = months[now.getMonth()];

  // Year (last 2 digits)
  const year = now.getFullYear().toString().slice(-2);

  // Format: [name]_[month][year]
  return `${name.toLowerCase()}_${month}${year}`;
};

// Example: "alex_nov25"
```

### Timer Logic (`store/slices/timerSlice.ts`)
```typescript
const TIMER_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

export const timerSlice = createSlice({
  name: 'timer',
  initialState: {
    startTime: null,
    duration: TIMER_DURATION,
    expired: false,
    remainingTime: TIMER_DURATION,
  },
  reducers: {
    startTimer: (state) => {
      if (!state.startTime) {
        state.startTime = Date.now();
        state.remainingTime = TIMER_DURATION;
        state.expired = false;
      }
    },
    updateRemainingTime: (state) => {
      if (state.startTime) {
        const elapsed = Date.now() - state.startTime;
        const remaining = Math.max(0, TIMER_DURATION - elapsed);

        state.remainingTime = remaining;

        if (remaining === 0) {
          state.expired = true;
        }
      }
    },
    loadTimerFromStorage: (state, action) => {
      const startTime = action.payload;
      if (startTime) {
        state.startTime = startTime;
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, TIMER_DURATION - elapsed);

        state.remainingTime = remaining;
        state.expired = remaining === 0;
      }
    },
  },
});

// Helper to format time
export const formatTime = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};
```

### Pricing Calculations (`utils/pricing.ts`)
```typescript
export const PRICING = {
  FULL_PRICE: 50.00,
  DISCOUNTED_PRICE: 25.00,
  DURATION_DAYS: 28, // 4 weeks
  CURRENCY: 'USD',
};

export const calculatePerDayPrice = (price: number): number => {
  return price / PRICING.DURATION_DAYS;
};

export const calculateSavings = (fullPrice: number, discountedPrice: number): number => {
  return fullPrice - discountedPrice;
};

export const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)} ${PRICING.CURRENCY}`;
};

export const formatPerDayPrice = (price: number): string => {
  const perDay = calculatePerDayPrice(price);
  return `$${perDay.toFixed(2)} ${PRICING.CURRENCY} per day`;
};
```

---

## Data Persistence Implementation

### Persistence Middleware (`store/middleware/persistenceMiddleware.ts`)
```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  USER_EMAIL: '@momentum/user_email',
  USER_NAME: '@momentum/user_name',
  PROMO_CODE: '@momentum/promo_code',
  TIMER_START: '@momentum/timer_start',
  TIMER_EXPIRED: '@momentum/timer_expired',
  PURCHASE_DETAILS: '@momentum/purchase_details',
};

export const persistenceMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  // Sync specific actions to AsyncStorage
  switch (action.type) {
    case 'user/setEmail':
      AsyncStorage.setItem(STORAGE_KEYS.USER_EMAIL, action.payload);
      break;

    case 'user/setName':
      AsyncStorage.setItem(STORAGE_KEYS.USER_NAME, action.payload);
      break;

    case 'user/generatePromoCode':
      const state = store.getState();
      AsyncStorage.setItem(STORAGE_KEYS.PROMO_CODE, state.user.promoCode);
      break;

    case 'timer/startTimer':
      const timerState = store.getState();
      AsyncStorage.setItem(
        STORAGE_KEYS.TIMER_START,
        timerState.timer.startTime.toString()
      );
      break;

    case 'checkout/completePurchase':
      AsyncStorage.setItem(
        STORAGE_KEYS.PURCHASE_DETAILS,
        JSON.stringify(action.payload)
      );
      break;
  }

  return result;
};
```

### App Initialization (`app/_layout.tsx`)
```typescript
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RootLayout() {
  const dispatch = useDispatch();

  useEffect(() => {
    loadPersistedData();
  }, []);

  const loadPersistedData = async () => {
    try {
      // Load user data
      const email = await AsyncStorage.getItem('@momentum/user_email');
      const name = await AsyncStorage.getItem('@momentum/user_name');
      const promoCode = await AsyncStorage.getItem('@momentum/promo_code');

      if (email) dispatch(setEmail(email));
      if (name) dispatch(setName(name));
      if (promoCode) dispatch(loadPromoCode(promoCode));

      // Load timer state
      const timerStart = await AsyncStorage.getItem('@momentum/timer_start');
      if (timerStart) {
        dispatch(loadTimerFromStorage(parseInt(timerStart)));
      }

      // Load purchase details
      const purchaseDetails = await AsyncStorage.getItem('@momentum/purchase_details');
      if (purchaseDetails) {
        dispatch(loadPurchaseDetails(JSON.parse(purchaseDetails)));
      }
    } catch (error) {
      console.error('Error loading persisted data:', error);
    }
  };

  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="name" options={{ headerShown: false }} />
        <Stack.Screen name="product" options={{ headerShown: false }} />
        <Stack.Screen name="checkout" options={{ headerShown: false }} />
        <Stack.Screen name="thank-you" options={{ headerShown: false }} />
      </Stack>
    </Provider>
  );
}
```

---

## TypeScript Types

### Main Types (`types/index.ts`)
```typescript
// User Types
export interface User {
  email: string;
  name: string;
  promoCode: string;
}

// Timer Types
export interface Timer {
  startTime: number | null;
  duration: number;
  expired: boolean;
  remainingTime: number;
}

// Pricing Types
export interface Pricing {
  fullPrice: number;
  discountedPrice: number;
  currency: string;
  duration: string;
  isDiscountActive: boolean;
  perDayPrice: {
    full: number;
    discounted: number;
  };
}

// Purchase Types
export interface PurchaseDetails {
  name: string;
  email: string;
  amount: number;
  promoCode: string;
  timestamp: number;
}

export interface PaymentInfo {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  nameOnCard: string;
}

// Checkout Types
export interface Checkout {
  purchaseDetails: PurchaseDetails | null;
  paymentInfo: PaymentInfo;
}

// Root State
export interface RootState {
  user: User;
  timer: Timer;
  pricing: Pricing;
  checkout: Checkout;
}
```

---

## Setup Instructions

### 1. Initialize Expo Project
```bash
# Create new Expo project with TypeScript
npx create-expo-app momentum-app --template tabs

cd momentum-app

# Install Expo Router
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar

# Install Redux
npm install @reduxjs/toolkit react-redux

# Install AsyncStorage
npx expo install @react-native-async-storage/async-storage

# Install additional dependencies
npm install @react-navigation/native
```

### 2. Configure Expo Router
Update `app.json`:
```json
{
  "expo": {
    "scheme": "momentum",
    "plugins": [
      "expo-router"
    ]
  }
}
```

Update `package.json`:
```json
{
  "main": "expo-router/entry"
}
```

### 3. Project Structure Setup
```bash
# Create folder structure
mkdir -p store/slices store/middleware
mkdir -p components/common components/layout
mkdir -p utils constants types assets
```

### 4. Environment Setup
```bash
# Create .env file (if using Stripe)
echo "STRIPE_PUBLISHABLE_KEY=your_test_key" > .env

# Install env support
npx expo install react-native-dotenv
```

---

## Development Workflow

### Running the App
```bash
# Start development server
npx expo start

# Run on iOS
npx expo start --ios

# Run on Android
npx expo start --android

# Run on web
npx expo start --web
```

### Testing
```bash
# Install testing libraries (optional)
npm install --save-dev @testing-library/react-native @testing-library/jest-native jest

# Run tests
npm test
```

### Type Checking
```bash
# Run TypeScript type checking
npx tsc --noEmit
```

---

## Key Implementation Notes

### 1. Offline-First Design
- All data stored locally via AsyncStorage
- No backend or cloud dependencies
- App must function without internet connection
- State persists across app restarts

### 2. Timer Persistence Strategy
- Store timer start timestamp (not remaining time)
- On app restart, recalculate remaining time from start timestamp
- This ensures timer continues accurately even if app is closed

### 3. Redux + AsyncStorage Sync
- Use middleware to automatically sync Redux changes to AsyncStorage
- Load persisted data on app initialization
- Critical for timer and user data persistence

### 4. Expo Router Navigation
- File-based routing (similar to Next.js)
- Use `router.push()` for forward navigation
- Use `router.back()` for back navigation
- Screens auto-register based on file structure

### 5. Form Validation
- Disable buttons until validation passes
- Real-time validation on input change
- Clear error messaging with visual feedback

### 6. Pricing Logic
- Pricing tied to timer state
- Use Redux selectors to compute current price
- Ensure consistency between Product and Checkout screens

---

## Testing Checklist

### User Flow Testing
- [ ] Email validation works correctly
- [ ] Name validation accepts only alphabetic characters
- [ ] Promo code generates in correct format
- [ ] Timer starts on Product screen first load
- [ ] Timer displays countdown in mm:ss format
- [ ] Pricing updates when timer expires
- [ ] Discount applied when timer active
- [ ] Checkout displays correct price
- [ ] Purchase completes and navigates to Thank You

### Persistence Testing
- [ ] Email persists after app restart
- [ ] Name persists after app restart
- [ ] Promo code persists after app restart
- [ ] Timer continues counting after app restart
- [ ] Purchase details persist after app restart
- [ ] Timer expiry state persists

### Navigation Testing
- [ ] Forward navigation works on all screens
- [ ] Back navigation works where applicable
- [ ] No back navigation from Thank You screen

### Validation Testing
- [ ] Invalid email shows error state
- [ ] Invalid name shows error state
- [ ] Continue buttons disabled with invalid input
- [ ] Continue buttons enabled with valid input

### UI/UX Testing
- [ ] All screens match Figma design
- [ ] Colors and typography correct
- [ ] Buttons and inputs styled correctly
- [ ] Error states display properly
- [ ] Loading states handled (if applicable)

---

## Submission Guidelines

### Required Deliverables
1. **Git Repository** (or ZIP with Git history)
2. **README.md** with:
   - Setup instructions
   - How to run the app
   - Dependencies and versions
   - Any special considerations
3. **Clean Code**:
   - Organized folder structure
   - Readable code with comments where needed
   - Proper TypeScript types
4. **Working App**:
   - All 5 screens functional
   - Timer working and persisting
   - Data persisting across restarts

### Evaluation Criteria
- **Functionality**: Does it work end-to-end?
- **Code Quality**: Is it clean, organized, and readable?
- **Architecture**: Is it well-structured?
- **Persistence**: Does state persist correctly?
- **Validation**: Are inputs validated properly?
- **Timer Logic**: Does the timer work and persist?
- **Design**: Does it match the Figma design?

---

## Additional Resources

### Expo Documentation
- Expo Router: https://docs.expo.dev/router/introduction/
- AsyncStorage: https://docs.expo.dev/versions/latest/sdk/async-storage/
- Expo SDK: https://docs.expo.dev/

### Redux Documentation
- Redux Toolkit: https://redux-toolkit.js.org/
- React Redux: https://react-redux.js.org/

### Design Reference
- Figma Link: https://www.figma.com/design/H6kiXN7eRtirMQ0JNHrXGf/Untitled?node-id=0-1&t=DW6NaJRREtVID9Ir-1

---

## Notes

- This document serves as the single source of truth for the project
- Update this document as implementation details are finalized
- Extract exact design specifications from Figma before starting implementation
- Focus on clean, production-level code
- Timer persistence is critical - test thoroughly
- Offline-first architecture is required

---

**Last Updated**: 2025-11-10
**Status**: Initial specification - Ready for implementation

import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { setPaymentInfo, completePurchase } from '../store/slices/checkoutSlice';
import { Header, Button, Input, CardBrandLogos } from '../components';
import { colors, spacing, typography } from '../constants';
import { RootState } from '../store';
import {
  validateCardNumber,
  validateExpiry,
  validateCVV,
  validateCardName,
  getCardNumberError,
  getExpiryError,
  getCVVError,
  getCardNameError,
} from '../utils/validation';

export default function CheckoutScreen() {
  const router = useRouter();
  const dispatch = useDispatch();

  // Redux selectors
  const userName = useSelector((state: RootState) => state.user.name);
  const userEmail = useSelector((state: RootState) => state.user.email);
  const promoCode = useSelector((state: RootState) => state.user.promoCode);
  const isDiscountActive = useSelector((state: RootState) =>
    !state.timer.expired && state.timer.startTime !== null
  );

  // Pricing calculations
  const fullPrice = 50.00;
  const discountedPrice = 25.00;
  const currentPrice = isDiscountActive ? discountedPrice : fullPrice;

  // Form state
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');

  // Validation errors
  const [cardNumberError, setCardNumberError] = useState<string | null>(null);
  const [expiryError, setExpiryError] = useState<string | null>(null);
  const [cvvError, setCvvError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);

  // Loading state
  const [isProcessing, setIsProcessing] = useState(false);

  // Navigation handlers
  const handleBack = () => {
    router.back();
  };

  // Format card number with spaces (XXXX XXXX XXXX XXXX)
  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\s/g, '');
    const chunks = cleaned.match(/.{1,4}/g);
    return chunks ? chunks.join(' ') : cleaned;
  };

  // Format expiry date (MM/YY)
  const formatExpiry = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  // Handle card number input
  const handleCardNumberChange = (text: string) => {
    const cleaned = text.replace(/\s/g, '');
    if (cleaned.length <= 16) {
      setCardNumber(formatCardNumber(cleaned));
      setCardNumberError(null);
    }
  };

  // Handle expiry input
  const handleExpiryChange = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length <= 4) {
      setExpiryDate(formatExpiry(cleaned));
      setExpiryError(null);
    }
  };

  // Handle CVV input
  const handleCVVChange = (text: string) => {
    if (text.length <= 4 && /^\d*$/.test(text)) {
      setCvv(text);
      setCvvError(null);
    }
  };

  // Handle name input
  const handleNameChange = (text: string) => {
    setNameOnCard(text);
    setNameError(null);
  };

  // Validate all fields
  const validateAllFields = (): boolean => {
    let isValid = true;

    // Validate card number
    if (!validateCardNumber(cardNumber)) {
      setCardNumberError(getCardNumberError(cardNumber) || 'Card number is required');
      isValid = false;
    }

    // Validate expiry
    if (!validateExpiry(expiryDate)) {
      setExpiryError(getExpiryError(expiryDate) || 'Expiry date is required');
      isValid = false;
    }

    // Validate CVV
    if (!validateCVV(cvv)) {
      setCvvError(getCVVError(cvv) || 'CVV is required');
      isValid = false;
    }

    // Validate name
    if (!validateCardName(nameOnCard)) {
      setNameError(getCardNameError(nameOnCard) || 'Name on card is required');
      isValid = false;
    }

    return isValid;
  };

  // Handle purchase
  const handleBuyNow = () => {
    // Validate all fields
    if (!validateAllFields()) {
      return;
    }

    // Start processing
    setIsProcessing(true);

    // Mock payment processing delay
    setTimeout(() => {
      // Save payment info to Redux
      dispatch(setPaymentInfo({
        cardNumber: cardNumber.replace(/\s/g, ''),
        expiryDate,
        cvv,
        nameOnCard,
      }));

      // Complete purchase
      dispatch(completePurchase({
        name: userName,
        email: userEmail,
        amount: currentPrice,
        promoCode: promoCode,
        timestamp: Date.now(),
      }));

      // Navigate to thank you screen
      router.push('/thank-you' as any);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.safeArea} testID="checkoutScreen.safeArea">
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        testID="checkoutScreen.keyboardAvoider"
      >
        <Header
          showBackButton={true}
          onBackPress={handleBack}
          title="Complete Checkout"
          testID="checkoutScreen.header"
        />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          testID="checkoutScreen.scrollView"
        >
          {/* Main White Container - All 5 components inside */}
          <View style={styles.formCard} testID="checkoutScreen.formCard">
            {/* Section 1: Pricing with bottom border */}
            <View style={styles.pricingSection} testID="checkoutScreen.pricingSection">
              {/* Row 1: 4 Week Plan */}
              <View style={styles.pricingRow}>
                <Text style={styles.planTitle}>4 Week Plan</Text>
                <Text style={styles.fullPriceText}>${fullPrice.toFixed(2)}</Text>
              </View>

              {/* Row 2: Discount row (if active) */}
              {isDiscountActive && (
                <View style={styles.discountRow}>
                  <Text style={styles.discountLabel}>Your 50% intro discount</Text>
                  <Text style={styles.discountAmount}>-${(fullPrice - currentPrice).toFixed(2)}</Text>
                </View>
              )}

              {/* Row 3: Promo code box (if active) */}
              {isDiscountActive && promoCode && (
                <View style={styles.promoCodeBox}>
                  <Image
                    source={require('../assets/icons/ticket.png')}
                    style={styles.ticketIcon}
                    resizeMode="contain"
                  />
                  <Text style={styles.promoCodeText}>
                    Applied promo code: <Text style={styles.promoCodeValue}>{promoCode}</Text>
                  </Text>
                </View>
              )}
            </View>

            {/* Section 2: Total today */}
            <View style={styles.totalSection}>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total today:</Text>
                <Text style={styles.totalPrice}>${currentPrice.toFixed(2)}</Text>
              </View>

              {/* Savings message (if discount active) */}
              {isDiscountActive && (
                <View style={styles.savingsRow}>
                  <Image
                    source={require('../assets/icons/flame.png')}
                    style={styles.flameIcon}
                    resizeMode="contain"
                  />
                  <Text style={styles.savingsText}>
                    You just saved ${(fullPrice - currentPrice).toFixed(2)} (50% OFF)
                  </Text>
                </View>
              )}
            </View>

            {/* Section 3: Card Brand Logos */}
            <View style={styles.cardBrandsSection}>
              <CardBrandLogos testID="checkoutScreen.cardBrands" />
            </View>

            {/* Section 4: Payment Form Inputs */}
            {/* Credit Card Number */}
            <View style={styles.inputWrapper} testID="checkoutScreen.cardNumberWrapper">
              <View style={styles.inputWithIcon}>
                <Input
                  value={cardNumber}
                  onChangeText={handleCardNumberChange}
                  placeholder="Credit Card"
                  keyboardType="number-pad"
                  error={cardNumberError || undefined}
                  style={styles.input}
                  testID="checkoutScreen.cardNumberInput"
                />
                <Image
                  source={require('../assets/icons/credit-card.png')}
                  style={styles.cardIcon}
                  resizeMode="contain"
                />
              </View>
            </View>

            {/* Expiry and CVV (side by side) */}
            <View style={styles.splitRow} testID="checkoutScreen.splitRow">
              <View style={styles.splitInput} testID="checkoutScreen.expiryWrapper">
                <Input
                  value={expiryDate}
                  onChangeText={handleExpiryChange}
                  placeholder="MM/YY"
                  keyboardType="number-pad"
                  error={expiryError || undefined}
                  testID="checkoutScreen.expiryInput"
                />
              </View>
              <View style={styles.splitInput} testID="checkoutScreen.cvvWrapper">
                <Input
                  value={cvv}
                  onChangeText={handleCVVChange}
                  placeholder="CVV"
                  keyboardType="number-pad"
                  error={cvvError || undefined}
                  testID="checkoutScreen.cvvInput"
                />
              </View>
            </View>

            {/* Name on Card */}
            <View style={styles.inputWrapper} testID="checkoutScreen.nameWrapper">
              <Input
                value={nameOnCard}
                onChangeText={handleNameChange}
                placeholder="Name on card"
                autoCapitalize="words"
                error={nameError || undefined}
                style={styles.input}
                testID="checkoutScreen.nameInput"
              />
            </View>

            {/* Section 5: Buy Now Button */}
            <Button
              title="Buy Now"
              onPress={handleBuyNow}
              variant="success"
              disabled={isProcessing}
              icon={
                <Image
                  source={require('../assets/icons/lock2.png')}
                  style={styles.lockIcon}
                  resizeMode="contain"
                  testID="checkoutScreen.lockIcon"
                />
              }
              testID="checkoutScreen.buyNowButton"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing.screenPadding.horizontal,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  formCard: {
    backgroundColor: colors.backgroundWhite,
    borderRadius: spacing.cardRadius,
    padding: spacing.lg,
    shadowColor: colors.shadowDark,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  // Pricing Section Styles
  pricingSection: {
    paddingBottom: spacing.md,
    marginBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.background, // #EFF1F5
  },
  pricingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  planTitle: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
  },
  fullPriceText: {
    ...typography.bodyMedium,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  discountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  discountLabel: {
    ...typography.bodySmall,
    color: colors.textPrimary,
  },
  discountAmount: {
    ...typography.bodySmall,
    color: colors.error,
    fontWeight: '600',
  },
  promoCodeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background, // #EFF1F5
    padding: spacing.sm,
    borderRadius: 6,
    gap: spacing.xs,
  },
  ticketIcon: {
    width: 18,
    height: 18,
    tintColor: colors.textSecondary,
  },
  promoCodeText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  promoCodeValue: {
    color: colors.textPrimary,
    fontWeight: '600',
  },
  // Total Section
  totalSection: {
    marginBottom: spacing.lg,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12.5,
  },
  totalLabel: {
    ...typography.bodyMedium,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  totalPrice: {
    ...typography.bodyMedium,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  savingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    gap: spacing.xs,
  },
  flameIcon: {
    width: 16,
    height: 16,
  },
  savingsText: {
    ...typography.bodySmallMedium,
    color: colors.error,
    fontWeight: '600',
  },
  // Card Brands Section
  cardBrandsSection: {
    marginBottom: spacing.lg,
  },
  // Input Styles
  inputWrapper: {
    marginBottom: 15,
  },
  inputWithIcon: {
    position: 'relative',
  },
  input: {
    marginBottom: 0,
  },
  cardIcon: {
    position: 'absolute',
    right: spacing.md,
    top: 15,
    width: 24,
    height: 24,
  },
  splitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
    marginBottom: 15,
  },
  splitInput: {
    flex: 1,
  },
  lockIcon: {
    width: 16.3,
    height: 18,
    tintColor: colors.backgroundWhite,
  },
});

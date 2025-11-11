import { useEffect } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { startTimer, updateRemainingTime } from '../store/slices/timerSlice';
import { Header, Button, PromoCodeBox, PricingCard } from '../components';
import { colors, spacing, typography, layout } from '../constants';
import { RootState } from '../store';

export default function ProductScreen() {
  const router = useRouter();
  const dispatch = useDispatch();

  // Redux selectors
  const promoCode = useSelector((state: RootState) => state.user.promoCode);
  const remainingTime = useSelector((state: RootState) => state.timer.remainingTime);
  const startTime = useSelector((state: RootState) => state.timer.startTime);
  const isDiscountActive = useSelector((state: RootState) =>
    !state.timer.expired && state.timer.startTime !== null
  );

  // Pricing calculations
  const fullPrice = 50.00;
  const discountedPrice = 25.00;
  const currentPrice = isDiscountActive ? discountedPrice : fullPrice;
  const perDayPrice = currentPrice / 28; // 28 days = 4 weeks

  // Timer management
  useEffect(() => {
    // Start timer if not already started
    if (!startTime) {
      dispatch(startTimer());
    }

    // Update remaining time every second
    const interval = setInterval(() => {
      dispatch(updateRemainingTime());
    }, 1000);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, [startTime, dispatch]);

  // Navigation handlers
  const handleBack = () => {
    router.back();
  };

  const handleContinue = () => {
    router.push('/checkout' as any);
  };

  return (
    <SafeAreaView style={styles.safeArea} testID="productScreen.safeArea">
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        testID="productScreen.keyboardAvoider"
      >
        <Header
          showBackButton={true}
          onBackPress={handleBack}
          testID="productScreen.header"
        />

        <View style={styles.content} testID="productScreen.content">
          {/* Heading */}
          <Text style={styles.title} testID="productScreen.title">
            Choose the best plan for you
          </Text>

          {/* Promo Code Box - conditional on discount active */}
          {isDiscountActive && promoCode && (
            <PromoCodeBox
              promoCode={promoCode}
              remainingTime={remainingTime}
              style={styles.promoCodeBox}
              testID="productScreen.promoCodeBox"
            />
          )}

          {/* Pricing Card */}
          <PricingCard
            title="4 WEEK PLAN"
            isSelected={true}
            isDiscountActive={isDiscountActive}
            fullPrice={fullPrice}
            currentPrice={currentPrice}
            perDayPrice={perDayPrice}
            testID="productScreen.pricingCard"
          />

          {/* Button with 20px margin under pricing card */}
          <View style={styles.buttonContainer} testID="productScreen.buttonContainer">
            <Button
              title="Get My Plan"
              onPress={handleContinue}
              variant="primary"
              icon={<Text style={styles.buttonIcon} testID="productScreen.buttonIcon">→</Text>}
              testID="productScreen.continueButton"
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  content: {
    paddingHorizontal: spacing.screenPadding.horizontal,
    paddingTop: spacing.lg,
  },
  title: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.xl,
    lineHeight: 32,
    textAlign: 'center',
  },
  promoCodeBox: {
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
  },
  buttonIcon: {
    fontSize: 18,
    color: colors.backgroundWhite,
    marginLeft: spacing.sm,
  },
});

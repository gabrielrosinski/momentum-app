import { useCallback } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Header, CardBrandLogos } from '../components';
import {
  CheckoutPricingSection,
  CheckoutTotalSection,
  PaymentFormFields,
  CheckoutSubmitButton,
  useCheckoutData,
  usePaymentForm,
  useCheckoutSubmit,
} from '../components/checkout';
import { colors, spacing, screenStyles } from '../constants';

export default function CheckoutScreen() {
  const router = useRouter();

  // Get checkout data (Redux selectors + pricing)
  const checkoutData = useCheckoutData();

  // Get payment form state and handlers
  const paymentForm = usePaymentForm();

  // Get checkout submission handler
  const { isProcessing, handleSubmit } = useCheckoutSubmit({
    userName: checkoutData.userName,
    userEmail: checkoutData.userEmail,
    promoCode: checkoutData.promoCode,
    currentPrice: checkoutData.currentPrice,
    formValues: paymentForm.values,
    validateAllFields: paymentForm.validateAllFields,
  });

  // Navigation handlers
  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <SafeAreaView style={screenStyles.safeArea} testID="checkoutScreen.safeArea">
      <KeyboardAvoidingView
        style={screenStyles.container}
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
          keyboardShouldPersistTaps="handled"
          testID="checkoutScreen.scrollView"
        >
          {/* Main White Container - All 5 sections inside */}
          <View style={styles.formCard} testID="checkoutScreen.formCard">
            <CheckoutPricingSection
              fullPrice={checkoutData.fullPrice}
              currentPrice={checkoutData.currentPrice}
              isDiscountActive={checkoutData.isDiscountActive}
              promoCode={checkoutData.promoCode}
              testID="checkoutScreen.pricingSection"
            />

            <CheckoutTotalSection
              currentPrice={checkoutData.currentPrice}
              fullPrice={checkoutData.fullPrice}
              isDiscountActive={checkoutData.isDiscountActive}
              testID="checkoutScreen.totalSection"
            />

            <View style={styles.cardBrandsSection}>
              <CardBrandLogos testID="checkoutScreen.cardBrands" />
            </View>

            <PaymentFormFields
              values={paymentForm.values}
              errors={paymentForm.errors}
              handlers={paymentForm.handlers}
              testID="checkoutScreen.paymentForm"
            />

            <CheckoutSubmitButton
              onPress={handleSubmit}
              isProcessing={isProcessing}
              testID="checkoutScreen.buyNowButton"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  cardBrandsSection: {
    marginBottom: spacing.lg,
  },
});

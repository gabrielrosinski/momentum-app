import { useCallback } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Header } from '../components';
import {
  ProductTitle,
  ProductPlanSection,
  ProductButton,
  useProductData,
  useProductTimer,
} from '../components/product';
import { colors, spacing, screenStyles } from '../constants';
import { AppRoute } from '../types/navigation';

export default function ProductScreen() {
  const router = useRouter();

  // Get product data (Redux selectors + pricing)
  const productData = useProductData();

  // Start and manage timer
  useProductTimer({ startTime: productData.startTime });

  // Navigation handlers
  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleContinue = useCallback(() => {
    router.push('/checkout' as AppRoute);
  }, [router]);

  return (
    <SafeAreaView style={screenStyles.safeArea} testID="productScreen.safeArea">
      <KeyboardAvoidingView
        style={screenStyles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        testID="productScreen.keyboardAvoider"
      >
        <Header
          showBackButton={true}
          onBackPress={handleBack}
          testID="productScreen.header"
        />

        <View style={styles.content} testID="productScreen.content">
          {/* Title */}
          <ProductTitle testID="productScreen.title" />

          {/* Plan Section (PromoCodeBox + PricingCard) */}
          <ProductPlanSection
            promoCode={productData.promoCode}
            remainingTime={productData.remainingTime}
            isDiscountActive={productData.isDiscountActive}
            fullPrice={productData.fullPrice}
            currentPrice={productData.currentPrice}
            perDayPrice={productData.perDayPrice}
            testID="productScreen.planSection"
          />

          {/* Continue Button */}
          <ProductButton
            onPress={handleContinue}
            testID="productScreen.continueButton"
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.screenPadding.horizontal,
    paddingTop: spacing.lg,
  },
});

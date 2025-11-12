import React from 'react';
import { View, StyleSheet } from 'react-native';
import { PromoCodeBox, PricingCard } from '../common';

export interface ProductPlanSectionProps {
  promoCode: string;
  remainingTime: number;
  isDiscountActive: boolean;
  fullPrice: number;
  currentPrice: number;
  perDayPrice: number;
  testID?: string;
}

export const ProductPlanSection: React.FC<ProductPlanSectionProps> = ({
  promoCode,
  remainingTime,
  isDiscountActive,
  fullPrice,
  currentPrice,
  perDayPrice,
  testID,
}) => {
  return (
    <View testID={testID}>
      {/* Promo Code Box - conditional on discount active */}
      {isDiscountActive && promoCode && (
        <PromoCodeBox
          promoCode={promoCode}
          remainingTime={remainingTime}
          style={styles.promoCodeBox}
          testID={`${testID}.promoCodeBox`}
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
        testID={`${testID}.pricingCard`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  promoCodeBox: {
    marginBottom: 20,
  },
});

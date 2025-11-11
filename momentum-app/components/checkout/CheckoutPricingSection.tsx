import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../constants';

export interface CheckoutPricingSectionProps {
  fullPrice: number;
  currentPrice: number;
  isDiscountActive: boolean;
  promoCode: string;
  testID?: string;
}

export const CheckoutPricingSection: React.FC<CheckoutPricingSectionProps> = ({
  fullPrice,
  currentPrice,
  isDiscountActive,
  promoCode,
  testID,
}) => {
  return (
    <View style={styles.pricingSection} testID={testID}>
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
            source={require('../../assets/icons/ticket.png')}
            style={styles.ticketIcon}
            resizeMode="contain"
          />
          <Text style={styles.promoCodeText}>
            Applied promo code: <Text style={styles.promoCodeValue}>{promoCode}</Text>
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
});

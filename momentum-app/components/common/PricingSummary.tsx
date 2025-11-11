import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors, typography, spacing } from '../../constants';

export interface PricingSummaryProps {
  planTitle: string;
  fullPrice: number;
  currentPrice: number;
  promoCode?: string;
  isDiscountActive: boolean;
  testID?: string;
}

export const PricingSummary: React.FC<PricingSummaryProps> = ({
  planTitle,
  fullPrice,
  currentPrice,
  promoCode,
  isDiscountActive,
  testID,
}) => {
  const savings = fullPrice - currentPrice;
  const savingsPercentage = Math.round((savings / fullPrice) * 100);

  return (
    <View style={styles.container} testID={testID ?? 'pricingSummary.container'}>
      {/* Plan Title and Price */}
      <View style={styles.row} testID="pricingSummary.planRow">
        <Text style={styles.planTitle} testID="pricingSummary.planTitle">
          {planTitle}
        </Text>
        <Text style={styles.planPrice} testID="pricingSummary.planPrice">
          ${fullPrice.toFixed(2)}
        </Text>
      </View>

      {/* Strikethrough Price + Promo Code (when discount active) */}
      {isDiscountActive && promoCode && (
        <View style={styles.discountRow} testID="pricingSummary.discountRow">
          <Text style={styles.strikethroughPrice} testID="pricingSummary.strikethroughPrice">
            ${fullPrice.toFixed(2)}
          </Text>
          <Text style={styles.promoCode} testID="pricingSummary.promoCode">
            {promoCode}
          </Text>
        </View>
      )}

      {/* Total Today */}
      <View style={styles.totalRow} testID="pricingSummary.totalRow">
        <Text style={styles.totalLabel} testID="pricingSummary.totalLabel">
          Total today:
        </Text>
        <Text style={styles.totalAmount} testID="pricingSummary.totalAmount">
          ${currentPrice.toFixed(2)}
        </Text>
      </View>

      {/* Savings Message with Flame Icon (when discount active) */}
      {isDiscountActive && savings > 0 && (
        <View style={styles.savingsRow} testID="pricingSummary.savingsRow">
          <Text style={styles.savingsText} testID="pricingSummary.savingsText">
            You just saved ${savings.toFixed(2)} ({savingsPercentage}% OFF)
          </Text>
          <Image
            source={require('../../assets/icons/flame.png')}
            style={styles.flameIcon}
            resizeMode="contain"
            testID="pricingSummary.flameIcon"
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundWhite,
    borderRadius: spacing.cardRadius,
    padding: spacing.md,
    shadowColor: colors.shadowDark,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  planTitle: {
    ...typography.bodyMedium,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  planPrice: {
    ...typography.bodyMedium,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  discountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  strikethroughPrice: {
    ...typography.bodySmall,
    color: colors.error,
    textDecorationLine: 'line-through',
  },
  promoCode: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
  },
  totalLabel: {
    ...typography.bodyMedium,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  totalAmount: {
    ...typography.bodyMedium,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  savingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  savingsText: {
    ...typography.bodySmall,
    color: colors.error,
    fontWeight: '500',
    flex: 1,
  },
  flameIcon: {
    width: 16,
    height: 20,
    marginLeft: spacing.sm,
  },
});

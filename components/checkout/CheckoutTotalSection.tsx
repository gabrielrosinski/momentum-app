import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../constants';

export interface CheckoutTotalSectionProps {
  currentPrice: number;
  fullPrice: number;
  isDiscountActive: boolean;
  testID?: string;
}

export const CheckoutTotalSection: React.FC<CheckoutTotalSectionProps> = ({
  currentPrice,
  fullPrice,
  isDiscountActive,
  testID,
}) => {
  return (
    <View style={styles.totalSection} testID={testID}>
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total today:</Text>
        <Text style={styles.totalPrice}>${currentPrice.toFixed(2)}</Text>
      </View>

      {/* Savings message (if discount active) */}
      {isDiscountActive && (
        <View style={styles.savingsRow}>
          <Image
            source={require('../../assets/icons/flame.png')}
            style={styles.flameIcon}
            resizeMode="contain"
          />
          <Text style={styles.savingsText}>
            You just saved ${(fullPrice - currentPrice).toFixed(2)} (50% OFF)
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
});

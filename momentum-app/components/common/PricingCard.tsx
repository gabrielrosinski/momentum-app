import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../../constants';

export interface PricingCardProps {
  title: string;              // "4 WEEK PLAN"
  isSelected: boolean;        // Radio button state
  isDiscountActive: boolean;  // Controls visual state
  fullPrice: number;          // 50.00
  currentPrice: number;       // 25.00 or 50.00
  perDayPrice: number;        // 0.89 or 1.78
  testID?: string;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  title,
  isSelected,
  isDiscountActive,
  fullPrice,
  currentPrice,
  perDayPrice,
  testID,
}) => {
  // Conditional border color based on discount state
  const borderColor = isDiscountActive ? colors.badge : colors.border;

  return (
    <View style={[styles.container, { borderColor }]} testID={testID}>
      {/* Top Row: Radio + Title | Per Day Price */}
      <View style={styles.topRow}>
        <View style={styles.leftSection}>
          {/* Radio Button */}
          <View style={styles.radioOuter}>
            {isSelected && <View style={styles.radioInner} />}
          </View>

          {/* Title */}
          <Text style={styles.title}>{title}</Text>
        </View>

        <View style={styles.rightSection}>
          {/* Per Day Price */}
          <Text style={styles.perDayPrice}>
            {perDayPrice.toFixed(2)}{' '}
            <Text style={styles.currency}>USD</Text>
          </Text>
          <Text style={styles.perDayLabel}>per day</Text>
        </View>
      </View>

      {/* Price Display Row */}
      <View style={styles.priceRow}>
        {isDiscountActive ? (
          // Discount Active: Show strikethrough full price + discounted price
          <>
            <Text style={styles.priceStrikethrough}>
              ${fullPrice.toFixed(2)} USD
            </Text>
            <Text style={styles.priceDiscounted}>
              {' '}{currentPrice.toFixed(2)} USD
            </Text>
          </>
        ) : (
          // Discount Expired: Show only full price
          <Text style={styles.priceFull}>
            ${currentPrice.toFixed(2)} USD
          </Text>
        )}
      </View>

      {/* Badge */}
      <View style={styles.badge}>
        <Text style={styles.badgeText}>MOST POPULAR</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundWhite,
    borderRadius: spacing.cardRadius,
    borderWidth: 2,
    overflow: 'hidden', // For badge border radius
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rightSection: {
    alignItems: 'flex-end',
  },

  // Radio Button
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },

  // Title
  title: {
    ...typography.bodyMedium,
    fontWeight: '600',
    color: colors.textPrimary,
  },

  // Per Day Price
  perDayPrice: {
    ...typography.bodyMedium,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  currency: {
    ...typography.caption,
    fontWeight: '400',
    color: colors.textPrimary,
  },
  perDayLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },

  // Price Row
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  priceStrikethrough: {
    ...typography.bodyMedium,
    color: colors.error,
    textDecorationLine: 'line-through',
  },
  priceDiscounted: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
  },
  priceFull: {
    ...typography.bodyMedium,
    fontWeight: '600',
    color: colors.textPrimary,
  },

  // Badge
  badge: {
    backgroundColor: colors.badge,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    ...typography.badge,
    color: colors.badgeText,
  },
});

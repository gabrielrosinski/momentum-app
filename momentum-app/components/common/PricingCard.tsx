import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
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
    <View style={[styles.container, { borderColor }]} testID={testID ?? 'pricingCard.container'}>
      {/* Top Row */}
      <View style={styles.topRow} testID="pricingCard.topRow">
        {/* Radio Button - vertically centered */}
        {isSelected && (
          <Image
            source={require('../../assets/icons/circle.png')}
            style={styles.radioImage}
            resizeMode="contain"
            testID="pricingCard.radioImage"
          />
        )}

        {/* Left Section: Title + Price */}
        <View style={styles.leftSection} testID="pricingCard.leftSection">
          {/* Title */}
          <Text style={styles.title} testID="pricingCard.title">{title}</Text>

          {/* Price Display Row */}
          <View style={styles.priceRow} testID="pricingCard.priceRow">
            {isDiscountActive ? (
              // Discount Active: Show strikethrough full price + discounted price
              <>
                <Text style={styles.priceStrikethrough} testID="pricingCard.priceStrikethrough">
                  ${fullPrice.toFixed(2)} USD
                </Text>
                <Text style={styles.priceDiscounted} testID="pricingCard.priceDiscounted">
                  {' '}{currentPrice.toFixed(2)} USD
                </Text>
              </>
            ) : (
              // Discount Expired: Show only full price
              <Text style={styles.priceFull} testID="pricingCard.priceFull">
                ${currentPrice.toFixed(2)} USD
              </Text>
            )}
          </View>
        </View>

        {/* Right Section: Per Day Price */}
        <View style={styles.rightSection} testID="pricingCard.rightSection">
          <View style={styles.perDayRow} testID="pricingCard.perDayRow">
            <Text style={styles.perDayPrice} testID="pricingCard.perDayPrice">
              {perDayPrice.toFixed(2)}
            </Text>
            <Text style={styles.currency} testID="pricingCard.currency">USD</Text>
          </View>
          <Text style={styles.perDayLabel} testID="pricingCard.perDayLabel">per day</Text>
        </View>
      </View>

      {/* Badge */}
      <View style={styles.badge} testID="pricingCard.badge">
        <Text style={styles.badgeText} testID="pricingCard.badgeText">MOST POPULAR</Text>
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
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  leftSection: {
    flexDirection: 'column',
    flex: 1,
  },
  rightSection: {
    alignItems: 'flex-start',
  },
  perDayRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 2,
  },

  // Radio Button
  radioImage: {
    width: 24,
    height: 24,
    marginRight: 10,
  },

  // Title
  title: {
    fontSize: typography.bodyMedium.fontSize,
    fontWeight: '600',
    color: colors.textPrimary,
    lineHeight: typography.bodyMedium.fontSize,
    includeFontPadding: false,
  },

  // Per Day Price
  perDayPrice: {
    fontSize: typography.body.fontSize,
    fontWeight: '600',
    color: colors.textPrimary,
    lineHeight: typography.body.fontSize,
    includeFontPadding: false,
  },
  currency: {
    fontSize: typography.bodySmall.fontSize,
    fontWeight: '400',
    color: colors.textPrimary,
    lineHeight: typography.bodySmall.fontSize,
    includeFontPadding: false,
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
    marginTop: 5,
  },
  priceStrikethrough: {
    fontSize: typography.bodyMedium.fontSize,
    fontWeight: '500',
    color: colors.error,
    textDecorationLine: 'line-through',
    lineHeight: typography.bodyMedium.fontSize,
    includeFontPadding: false,
  },
  priceDiscounted: {
    fontSize: typography.bodyMedium.fontSize,
    fontWeight: '500',
    color: colors.textSecondary,
    lineHeight: typography.bodyMedium.fontSize,
    includeFontPadding: false,
  },
  priceFull: {
    fontSize: typography.bodyMedium.fontSize,
    fontWeight: '600',
    color: colors.textPrimary,
    lineHeight: typography.bodyMedium.fontSize,
    includeFontPadding: false,
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

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../../constants';
import { CountdownTimer } from './CountdownTimer';

export interface PromoCodeBoxProps {
  promoCode: string;
  remainingTime: number; // milliseconds
}

export const PromoCodeBox: React.FC<PromoCodeBoxProps> = ({
  promoCode,
  remainingTime,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.checkmarkContainer}>
          <Text style={styles.checkmark}>✓</Text>
        </View>
        <Text style={styles.headerText}>Your Promo Code is Applied!</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.content}>
        <View style={styles.promoCodeContainer}>
          <View style={styles.checkmarkSmall}>
            <Text style={styles.checkmarkSmallText}>✓</Text>
          </View>
          <Text style={styles.promoCode}>{promoCode}</Text>
        </View>

        <CountdownTimer remainingTime={remainingTime} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.accentLight,
    borderRadius: spacing.cardRadius,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.promoCodeBorder,
    padding: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkmarkContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  checkmark: {
    color: colors.backgroundWhite,
    fontSize: 16,
    fontWeight: '700',
  },
  headerText: {
    ...typography.bodySmallMedium,
    color: colors.textPrimary,
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: colors.promoCodeBorder,
    marginVertical: spacing.md,
    opacity: 0.3,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  promoCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkmarkSmall: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.xs,
  },
  checkmarkSmallText: {
    color: colors.backgroundWhite,
    fontSize: 10,
    fontWeight: '700',
  },
  promoCode: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
  },
});

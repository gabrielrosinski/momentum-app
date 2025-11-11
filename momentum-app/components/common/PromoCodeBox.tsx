import React from 'react';
import { View, Text, StyleSheet, Image, ViewStyle } from 'react-native';
import { colors, typography, spacing } from '../../constants';
import { CountdownTimer } from './CountdownTimer';
import Divider from '../../assets/divider.svg';

export interface PromoCodeBoxProps {
  promoCode: string;
  remainingTime: number; // milliseconds
  style?: ViewStyle;
  testID?: string;
}

export const PromoCodeBox: React.FC<PromoCodeBoxProps> = ({
  promoCode,
  remainingTime,
  style,
  testID,
}) => {
  return (
    <View style={[styles.container, style]} testID={testID ?? 'promoCodeBox.container'}>
      <View style={styles.header} testID="promoCodeBox.header">
        <Image
          source={require('../../assets/icons/ticket.png')}
          style={styles.checkmarkIcon}
          resizeMode="contain"
          testID="promoCodeBox.checkmark"
        />
        <Text style={styles.headerText} testID="promoCodeBox.headerText">
          Your Promo Code is Applied!
        </Text>
      </View>

      <View style={styles.dividerWrapper}>
        <Divider
          width="100%"
          height={20}
          preserveAspectRatio="none"
          style={styles.divider}
          testID="promoCodeBox.divider"
        />
      </View>

      <View style={styles.content} testID="promoCodeBox.content">
        <View style={styles.promoCodeContainer} testID="promoCodeBox.promoCodeContainer">
          <View style={styles.checkmarkSmall} testID="promoCodeBox.checkmarkSmall">
            <Image
              source={require('../../assets/icons/check-mark.png')}
              style={styles.checkmarkSmallImage}
              resizeMode="contain"
              testID="promoCodeBox.checkmarkSmallImage"
            />
          </View>
          <Text style={styles.promoCode} testID="promoCodeBox.promoCode">
            {promoCode}
          </Text>
        </View>

        <View style={styles.timerContainer} testID="promoCodeBox.timerContainer">
          <CountdownTimer remainingTime={remainingTime} testID="promoCodeBox.countdownTimer" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.accentLight,
    borderRadius: spacing.cardRadius,
    padding: spacing.md,
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkIcon: {
    width: 17,
    height: 17,
    marginRight: 10,
  },
  headerText: {
    ...typography.body,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  dividerWrapper: {
    marginHorizontal: -spacing.md,
    marginVertical: spacing.sm,
  },
  divider: {
    width: '100%',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  promoCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    flex: 1,
    marginRight: spacing.md,
    backgroundColor: colors.backgroundWhite,
    borderRadius: spacing.borderRadius.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.promoCodeBorder,
    shadowColor: colors.shadowDark,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 2,
  },
  checkmarkSmall: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkSmallImage: {
    width: 15,
    height: 15,
    marginRight: 7,
  },
  promoCode: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
    flexShrink: 1,
  },
  timerContainer: {
    height: 60,
    backgroundColor: colors.timerBackGround,
    borderRadius: spacing.borderRadius.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
});

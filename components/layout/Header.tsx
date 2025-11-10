import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { colors, typography, spacing, layout } from '../../constants';

export interface HeaderProps {
  showBackButton?: boolean;
  onBackPress?: () => void;
  title?: string;
  style?: ViewStyle;
}

export const Header: React.FC<HeaderProps> = ({
  showBackButton = false,
  onBackPress,
  title,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.leftSection}>
        {showBackButton && (
          <TouchableOpacity
            onPress={onBackPress}
            style={styles.backButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.centerSection}>
        {title ? (
          <Text style={styles.title}>{title}</Text>
        ) : (
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>Momentum</Text>
            <View style={styles.checkmark}>
              <Text style={styles.checkmarkText}>✓</Text>
            </View>
          </View>
        )}
      </View>

      <View style={styles.rightSection} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: layout.headerHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.screenPadding.horizontal,
    backgroundColor: colors.backgroundWhite,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  leftSection: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerSection: {
    flex: 2,
    alignItems: 'center',
  },
  rightSection: {
    flex: 1,
  },
  backButton: {
    padding: spacing.xs,
  },
  backIcon: {
    fontSize: 32,
    color: colors.textPrimary,
    fontWeight: '300',
  },
  title: {
    ...typography.h4,
    color: colors.textPrimary,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    ...typography.h3,
    color: colors.textPrimary,
    fontWeight: '700',
  },
  checkmark: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.xs,
    marginTop: -8,
  },
  checkmarkText: {
    color: colors.backgroundWhite,
    fontSize: 10,
    fontWeight: '700',
  },
});

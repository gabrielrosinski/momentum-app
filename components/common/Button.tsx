import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors, typography, spacing } from '../../constants';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'success';
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  testID?: string;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  variant = 'primary',
  icon,
  style,
  textStyle,
  testID,
}) => {
  const buttonStyle = [
    styles.button,
    variant === 'primary' && styles.buttonPrimary,
    variant === 'success' && styles.buttonSuccess,
    disabled && styles.buttonDisabled,
    style,
  ];

  const buttonTextStyle = [
    styles.buttonText,
    variant === 'primary' && styles.buttonTextPrimary,
    variant === 'success' && styles.buttonTextSuccess,
    disabled && styles.buttonTextDisabled,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      testID={testID}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? colors.backgroundWhite : colors.backgroundWhite}
        />
      ) : (
        <View style={styles.buttonContent}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <Text style={buttonTextStyle}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: spacing.buttonHeight.large,
    borderRadius: spacing.buttonRadius,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.buttonPadding.horizontal,
    paddingVertical: spacing.buttonPadding.vertical,
    flexDirection: 'row',
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
  },
  buttonSuccess: {
    backgroundColor: colors.accent,
  },
  buttonDisabled: {
    backgroundColor: colors.disabled,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: 12,
  },
  buttonText: {
    ...typography.button,
    textAlign: 'center',
  },
  buttonTextPrimary: {
    color: colors.backgroundWhite,
  },
  buttonTextSuccess: {
    color: colors.backgroundWhite,
  },
  buttonTextDisabled: {
    color: colors.textDisabled,
  },
});

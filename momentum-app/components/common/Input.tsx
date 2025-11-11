import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  KeyboardTypeOptions,
} from 'react-native';
import { colors, typography, spacing } from '../../constants';

export interface InputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  error?: string;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  textColor?: string;
  editable?: boolean;
  testID?: string;
}

export const Input: React.FC<InputProps> = ({
  value,
  onChangeText,
  placeholder,
  error,
  keyboardType = 'default',
  autoCapitalize = 'none',
  autoCorrect = false,
  style,
  inputStyle,
  textColor,
  editable = true,
  testID,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const containerStyle = [
    styles.container,
    error && styles.containerError,
    isFocused && !error && styles.containerFocused,
    style,
  ];

  const textInputStyle = [
    styles.input,
    error && styles.inputError,
    textColor && { color: textColor },
    inputStyle,
  ];

  return (
    <View testID={testID}>
      <View style={containerStyle}>
        <TextInput
          style={textInputStyle}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textPlaceholder}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          editable={editable}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundWhite,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    height: 54,
    paddingHorizontal: spacing.inputPadding.horizontal,
    justifyContent: 'center',
  },
  containerFocused: {
    borderColor: colors.primary,
  },
  containerError: {
    backgroundColor: colors.errorLight,
    borderColor: colors.error,
  },
  input: {
    ...typography.input,
    color: colors.textSecondary,
    padding: 0,
    margin: 0,
    textAlignVertical: 'center',
  },
  inputError: {
    color: colors.textSecondary,
  },
  errorText: {
    fontSize: 14,
    fontWeight: typography.error.fontWeight,
    color: colors.error,
    marginTop: -10, // Negative margin to offset: 12px paddingBottom + 1px border + 2px lineHeight = -13px, +5px desired = -8px (using -10 for visual adjustment)
    marginBottom: 0,
    textAlign: 'center',
    lineHeight: 14,
  },
});

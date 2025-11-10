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
    backgroundColor: colors.inputBg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingHorizontal: spacing.inputPadding.horizontal,
    paddingVertical: spacing.inputPadding.vertical,
    justifyContent: 'center',
  },
  containerFocused: {
    borderBottomColor: colors.primary,
  },
  containerError: {
    backgroundColor: colors.errorLight,
    borderBottomColor: colors.error,
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
    ...typography.error,
    color: colors.error,
    marginTop: spacing.xs,
    marginLeft: spacing.inputPadding.horizontal,
  },
});

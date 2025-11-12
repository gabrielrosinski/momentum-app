import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { setName, generatePromoCode } from '../store/slices/userSlice';
import { Header, Button, Input } from '../components';
import { colors, spacing, typography, layout, screenStyles } from '../constants';
import { validateName, getNameError } from '../utils/validation';

export default function NameScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [name, setNameValue] = useState('');
  const [showError, setShowError] = useState(false);

  const error = getNameError(name);
  const isValid = name.length > 0 && validateName(name);

  // Debounced validation - check 500ms after user stops typing
  useEffect(() => {
    if (name.length === 0) {
      setShowError(false);
      return;
    }

    const timer = setTimeout(() => {
      // After 500ms of no typing, validate
      if (!validateName(name)) {
        setShowError(true);
      } else {
        setShowError(false);
      }
    }, 500);

    // Clear timer if user types again before 500ms
    return () => clearTimeout(timer);
  }, [name]);

  const handleBack = () => {
    router.back();
  };

  const handleContinue = () => {
    if (isValid) {
      dispatch(setName(name));
      dispatch(generatePromoCode());
      router.push('/product' as any);
    } else if (name.length > 0) {
      setShowError(true);
    }
  };

  const handleChange = (text: string) => {
    setNameValue(text);
    // Clear error immediately when user starts typing
    if (showError) {
      setShowError(false);
    }
  };

  // Determine input text color based on validation state
  // Gray in all states except valid (black)
  const inputTextColor = isValid && name.length > 0
    ? colors.textPrimary // Valid: black
    : colors.textSecondary; // Empty/Typing/Invalid: gray

  return (
    <SafeAreaView style={screenStyles.safeArea} testID="nameScreen.safeArea">
      <KeyboardAvoidingView
        style={screenStyles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        testID="nameScreen.keyboardAvoider"
      >
        <Header
          showBackButton={true}
          onBackPress={handleBack}
          testID="nameScreen.header"
        />

        <View style={styles.contentWrapper} testID="nameScreen.contentWrapper">
          <View style={styles.content} testID="nameScreen.content">
            <Text style={styles.title} testID="nameScreen.title">
              What's your name?
            </Text>

            <Input
              value={name}
              onChangeText={handleChange}
              placeholder="Name"
              keyboardType="default"
              autoCapitalize="words"
              autoCorrect={false}
              error={showError && error ? error : undefined}
              textColor={inputTextColor}
              style={styles.input}
              inputStyle={
                name.length === 0
                  ? styles.centeredPlaceholder
                  : styles.filledInput
              }
              testID="nameScreen.nameInput"
            />
          </View>
        </View>

        <View style={styles.footer} testID="nameScreen.footer">
          <Button
            title="Continue"
            onPress={handleContinue}
            disabled={!isValid}
            variant="primary"
            icon={<Text style={styles.buttonIcon} testID="nameScreen.buttonIcon">→</Text>}
            testID="nameScreen.continueButton"
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contentWrapper: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.screenPadding.horizontal,
    paddingTop: spacing.lg,
  },
  title: {
    ...typography.h1,
    color: colors.textPrimary,
    marginBottom: spacing.xl,
    lineHeight: 32,
  },
  input: {
    marginBottom: spacing.md,
    height: 70,
    justifyContent: 'center',
    alignContent: 'center',
  },
  centeredPlaceholder: {
    ...typography.h2,
    textAlign: 'center',
  },
  filledInput: {
    ...typography.h1,
  },
  footer: {
    paddingHorizontal: spacing.screenPadding.horizontal,
    paddingBottom: layout.bottomButtonMargin,
    paddingTop: spacing.md,
  },
  buttonIcon: {
    fontSize: 18,
    color: colors.backgroundWhite,
    marginLeft: spacing.sm,
  },
});

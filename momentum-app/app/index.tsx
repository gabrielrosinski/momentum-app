import { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, Image, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { setEmail, resetUser } from '../store/slices/userSlice';
import { resetTimer } from '../store/slices/timerSlice';
import { clearPersistedData } from '../store/middleware/persistenceMiddleware';
import { Header, Button, Input } from '../components';
import { colors, spacing, typography, layout, screenStyles, TIMING } from '../constants';
import { validateEmail, getEmailError } from '../utils/validation';
import { AppRoute } from '../types/navigation';

export default function EmailScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmailValue] = useState('');
  const [showError, setShowError] = useState(false);

  const error = getEmailError(email);
  const isValid = email.length > 0 && validateEmail(email);

  // Debounced validation - check after user stops typing
  useEffect(() => {
    if (email.length === 0) {
      setShowError(false);
      return;
    }

    const timer = setTimeout(() => {
      // After debounce delay, validate
      if (!validateEmail(email)) {
        setShowError(true);
      } else {
        setShowError(false);
      }
    }, TIMING.INPUT_DEBOUNCE_DELAY);

    // Clear timer if user types again before delay completes
    return () => clearTimeout(timer);
  }, [email]);

  const handleContinue = useCallback(() => {
    if (isValid) {
      dispatch(setEmail(email));
      router.push('/name' as AppRoute);
    } else if (email.length > 0) {
      setShowError(true);
    }
  }, [isValid, email, dispatch, router]);

  const handleChange = useCallback((text: string) => {
    setEmailValue(text);
    // Clear error immediately when user starts typing
    if (showError) {
      setShowError(false);
    }
  }, [showError]);

  // Determine input text color based on validation state
  // Gray in all states except valid (black)
  const inputTextColor = isValid && email.length > 0
    ? colors.textPrimary // Valid: black
    : colors.textSecondary; // Empty/Typing/Invalid: gray

  // Dev: Reset all state (only visible in development mode)
  const handleResetState = useCallback(async () => {
    try {
      await clearPersistedData();
      dispatch(resetUser());
      dispatch(resetTimer());
      Alert.alert('Dev Reset', 'All state cleared! (AsyncStorage + Redux)');
    } catch (error) {
      Alert.alert('Error', 'Failed to reset state');
      console.error('Reset error:', error);
    }
  }, [dispatch]);

  return (
    <SafeAreaView style={screenStyles.safeArea} testID="emailScreen.safeArea">
      <KeyboardAvoidingView
        style={screenStyles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        testID="emailScreen.keyboardAvoider"
      >
        <Header testID="emailScreen.header" />

        {/* Dev Reset Button - Only visible in development */}
        {__DEV__ && (
          <TouchableOpacity
            style={styles.devResetButton}
            onPress={handleResetState}
            testID="emailScreen.devResetButton"
          >
            <Text style={styles.devResetText}>🔄 Reset</Text>
          </TouchableOpacity>
        )}

        <View style={styles.contentWrapper} testID="emailScreen.contentWrapper">
          <View style={styles.content} testID="emailScreen.content">
            <Text style={styles.title} testID="emailScreen.title">
              Enter your email to get your personalized Calisthenics Workout Plan
            </Text>

            <Input
              value={email}
              onChangeText={handleChange}
              placeholder="name@domain.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              error={showError && error ? error : undefined}
              textColor={inputTextColor}
              style={styles.input}
              inputStyle={
                email.length === 0
                  ? styles.centeredPlaceholder
                  : styles.filledInput
              }
              testID="emailScreen.emailInput"
            />

            <View style={styles.disclaimer} testID="emailScreen.disclaimer">
              <Image
                source={require('../assets/icons/lock.png')}
                style={styles.disclaimerIcon}
                testID="emailScreen.disclaimerIcon"
              />
              <Text style={styles.disclaimerText} testID="emailScreen.disclaimerText">
                We respect your privacy and are committed to protecting your personal data. We'll
                email you a copy of your results for convenient access.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.footer} testID="emailScreen.footer">
          <Button
            title="Continue"
            onPress={handleContinue}
            disabled={!isValid}
            variant="primary"
            icon={<Text style={styles.buttonIcon} testID="emailScreen.buttonIcon">→</Text>}
            testID="emailScreen.continueButton"
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
    height: 99,
    flexShrink: 1,
    flexWrap: 'wrap',
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
  disclaimer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: spacing.md,
  },
  disclaimerIcon: {
    width: 16,
    height: 18,
    marginRight: spacing.sm,
    marginTop: 2,
    resizeMode: 'contain',
  },
  disclaimerText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    flex: 1,
    lineHeight: 20,
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
  // Dev Reset Button (only visible in development)
  devResetButton: {
    position: 'absolute',
    top: spacing.lg,
    right: spacing.md,
    backgroundColor: colors.error,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 8,
    zIndex: 1000,
  },
  devResetText: {
    color: colors.backgroundWhite,
    fontSize: 12,
    fontWeight: '600',
  },
});

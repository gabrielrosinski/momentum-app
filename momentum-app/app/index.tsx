import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { setEmail } from '../store/slices/userSlice';
import { Header, Button, Input } from '../components';
import { colors, spacing, typography, layout } from '../constants';
import { validateEmail, getEmailError } from '../utils/validation';

export default function EmailScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmailValue] = useState('');
  const [showError, setShowError] = useState(false);

  const error = getEmailError(email);
  const isValid = email.length > 0 && validateEmail(email);

  const handleContinue = () => {
    if (isValid) {
      dispatch(setEmail(email));
      router.push('/name' as any);
    } else if (email.length > 0) {
      setShowError(true);
    }
  };

  const handleChange = (text: string) => {
    setEmailValue(text);
    // Clear error when user starts typing valid email
    if (showError && text.length > 0 && validateEmail(text)) {
      setShowError(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Header />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <Text style={styles.title}>
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
            style={styles.input}
          />

          <View style={styles.disclaimer}>
            <Text style={styles.disclaimerIcon}>🔒</Text>
            <Text style={styles.disclaimerText}>
              We respect your privacy and are committed to protecting your personal data. We'll
              email you a copy of your results for convenient access.
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Continue"
          onPress={handleContinue}
          disabled={!isValid}
          variant="primary"
          icon={<Text style={styles.buttonIcon}>→</Text>}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.screenPadding.horizontal,
    paddingTop: spacing.lg,
  },
  title: {
    ...typography.h2,
    color: colors.textPrimary,
    marginBottom: spacing.xl,
    lineHeight: 32,
  },
  input: {
    marginBottom: spacing.md,
  },
  disclaimer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: spacing.md,
  },
  disclaimerIcon: {
    fontSize: 14,
    marginRight: spacing.sm,
    marginTop: 2,
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
});

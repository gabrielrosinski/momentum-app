import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Input } from '../common/Input';
import { spacing } from '../../constants';
import { PaymentFormValues, PaymentFormErrors, PaymentFormHandlers } from './hooks/usePaymentForm';

export interface PaymentFormFieldsProps {
  values: PaymentFormValues;
  errors: PaymentFormErrors;
  handlers: PaymentFormHandlers;
  testID?: string;
}

export const PaymentFormFields: React.FC<PaymentFormFieldsProps> = ({
  values,
  errors,
  handlers,
  testID,
}) => {
  return (
    <View testID={testID}>
      {/* Credit Card Number */}
      <View style={styles.inputWrapper} testID={`${testID}.cardNumberWrapper`}>
        <View style={styles.inputWithIcon}>
          <Input
            value={values.cardNumber}
            onChangeText={handlers.handleCardNumberChange}
            placeholder="Credit Card"
            keyboardType="number-pad"
            error={errors.cardNumberError || undefined}
            variant="checkout"
            errorTextStyle={{ fontSize: 12, marginTop: 5, marginBottom: 0, textAlign: 'center' }}
            style={styles.input}
            testID={`${testID}.cardNumberInput`}
          />
          <Image
            source={require('../../assets/icons/credit-card.png')}
            style={styles.cardIcon}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Expiry and CVV (side by side) */}
      <View style={styles.splitRow} testID={`${testID}.splitRow`}>
        <View style={styles.splitInputWrapper} testID={`${testID}.expiryWrapper`}>
          <Input
            value={values.expiryDate}
            onChangeText={handlers.handleExpiryChange}
            placeholder="MM/YY"
            keyboardType="number-pad"
            error={errors.expiryError || undefined}
            variant="checkout"
            errorTextStyle={{ fontSize: 12, marginTop: 5, marginBottom: 0, textAlign: 'center' }}
            testID={`${testID}.expiryInput`}
          />
        </View>
        <View style={styles.splitInputWrapper} testID={`${testID}.cvvWrapper`}>
          <Input
            value={values.cvv}
            onChangeText={handlers.handleCVVChange}
            placeholder="CVV"
            keyboardType="number-pad"
            error={errors.cvvError || undefined}
            variant="checkout"
            errorTextStyle={{ fontSize: 12, marginTop: 5, marginBottom: 0, textAlign: 'center' }}
            testID={`${testID}.cvvInput`}
          />
        </View>
      </View>

      {/* Name on Card */}
      <View style={styles.inputWrapper} testID={`${testID}.nameWrapper`}>
        <Input
          value={values.nameOnCard}
          onChangeText={handlers.handleNameChange}
          placeholder="Name on card"
          autoCapitalize="words"
          error={errors.nameError || undefined}
          variant="checkout"
          errorTextStyle={{ fontSize: 12, marginTop: 5, marginBottom: 0, textAlign: 'center' }}
          style={styles.input}
          testID={`${testID}.nameInput`}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    marginBottom: 15,
  },
  inputWithIcon: {
    position: 'relative',
  },
  input: {
    marginBottom: 0,
  },
  cardIcon: {
    position: 'absolute',
    right: spacing.md,
    top: 15,
    width: 24,
    height: 24,
  },
  splitRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 15,
    marginBottom: 15,
  },
  splitInputWrapper: {
    flex: 1,
    flexDirection: 'column',
  },
});

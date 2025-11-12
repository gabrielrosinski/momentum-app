import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Button } from '../common/Button';
import { colors } from '../../constants';

export interface CheckoutSubmitButtonProps {
  onPress: () => void;
  isProcessing: boolean;
  testID?: string;
}

export const CheckoutSubmitButton: React.FC<CheckoutSubmitButtonProps> = ({
  onPress,
  isProcessing,
  testID,
}) => {
  return (
    <Button
      title="Buy Now"
      onPress={onPress}
      variant="success"
      disabled={isProcessing}
      icon={
        <Image
          source={require('../../assets/icons/lock2.png')}
          style={styles.lockIcon}
          resizeMode="contain"
          testID={`${testID}.lockIcon`}
        />
      }
      testID={testID}
    />
  );
};

const styles = StyleSheet.create({
  lockIcon: {
    width: 16.3,
    height: 18,
    tintColor: colors.backgroundWhite,
  },
});

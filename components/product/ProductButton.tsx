import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '../common/Button';
import { colors, spacing } from '../../constants';

export interface ProductButtonProps {
  onPress: () => void;
  testID?: string;
}

export const ProductButton: React.FC<ProductButtonProps> = ({ onPress, testID }) => {
  return (
    <View style={styles.buttonContainer} testID={`${testID}.container`}>
      <Button
        title="Get My Plan"
        onPress={onPress}
        variant="primary"
        icon={<Text style={styles.buttonIcon} testID={`${testID}.icon`}>→</Text>}
        testID={testID}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 20,
  },
  buttonIcon: {
    fontSize: 18,
    color: colors.backgroundWhite,
    marginLeft: spacing.sm,
  },
});

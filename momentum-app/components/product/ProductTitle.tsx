import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../constants';

export interface ProductTitleProps {
  testID?: string;
}

export const ProductTitle: React.FC<ProductTitleProps> = ({ testID }) => {
  return (
    <Text style={styles.title} testID={testID}>
      Choose the best plan for you
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.xl,
    lineHeight: 32,
    textAlign: 'center',
  },
});

import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { spacing } from '../../constants';

export interface CardBrandLogosProps {
  testID?: string;
}

export const CardBrandLogos: React.FC<CardBrandLogosProps> = ({ testID }) => {
  return (
    <View style={styles.container} testID={testID ?? 'cardBrandLogos.container'}>
      <Image
        source={require('../../assets/icons/visa.png')}
        style={styles.logo}
        resizeMode="contain"
        testID="cardBrandLogos.visa"
      />
      <Image
        source={require('../../assets/icons/mastercard.png')}
        style={styles.logo}
        resizeMode="contain"
        testID="cardBrandLogos.mastercard"
      />
      <Image
        source={require('../../assets/icons/maestro.png')}
        style={styles.logo}
        resizeMode="contain"
        testID="cardBrandLogos.maestro"
      />
      <Image
        source={require('../../assets/icons/american-express.png')}
        style={styles.logo}
        resizeMode="contain"
        testID="cardBrandLogos.amex"
      />
      <Image
        source={require('../../assets/icons/discover.png')}
        style={styles.logo}
        resizeMode="contain"
        testID="cardBrandLogos.discover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  logo: {
    width: 50,
    height: 32,
  },
});

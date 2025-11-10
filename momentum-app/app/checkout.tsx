import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../constants';

export default function CheckoutScreen() {
  return (
    <View style={styles.container}>
      <Text>Checkout Screen - Coming Soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
});

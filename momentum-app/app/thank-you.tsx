import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../constants';

export default function ThankYouScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Thank you</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundWhite,
  },
  text: {
    fontSize: 24,
    color: colors.success,
  },
});

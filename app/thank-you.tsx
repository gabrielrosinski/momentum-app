import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../components';
import { colors, screenStyles } from '../constants';

export default function ThankYouScreen() {
  return (
    <SafeAreaView style={screenStyles.safeArea} testID="thankYouScreen.safeArea">
      <View style={screenStyles.container} testID="thankYouScreen.container">
        {/* Header with logo only, no back button */}
        <Header
          showBackButton={false}
          testID="thankYouScreen.header"
        />

        {/* Thank You Message - centered */}
        <View style={styles.messageContainer} testID="thankYouScreen.messageContainer">
          <Text style={styles.message} testID="thankYouScreen.message">
            Thank you
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 48,
    fontWeight: '600',
    color: colors.accent,
    textAlign: 'center',
  },
});

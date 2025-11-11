import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Provider, useDispatch } from 'react-redux';
import { store } from '../store';
import { setEmail, setName, loadPromoCode } from '../store/slices/userSlice';
import { loadTimerFromStorage } from '../store/slices/timerSlice';
import { loadPurchaseDetails } from '../store/slices/checkoutSlice';
import { loadPersistedData } from '../store/middleware/persistenceMiddleware';
import { colors } from '../constants';

function RootNavigator() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Load persisted data on app initialization
    loadPersistedData().then((data) => {
      if (data.email) dispatch(setEmail(data.email));
      if (data.name) dispatch(setName(data.name));
      if (data.promoCode) dispatch(loadPromoCode(data.promoCode));
      if (data.timerStart) dispatch(loadTimerFromStorage(data.timerStart));
      if (data.purchaseDetails) dispatch(loadPurchaseDetails(data.purchaseDetails));
    });
  }, [dispatch]);

  return (
    <>
      <StatusBar
        backgroundColor={colors.background}
        style="dark"
      />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: colors.background,
          },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="name" />
        <Stack.Screen name="product" />
        <Stack.Screen name="checkout" />
        <Stack.Screen name="thank-you" />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}

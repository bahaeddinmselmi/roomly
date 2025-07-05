import '../i18n';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { SplashScreen } from 'expo-router';
import { TokenProvider } from '@/contexts/TokenContext';
import { UserProvider } from '@/contexts/UserContext';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useFrameworkReady();
  
  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <I18nextProvider i18n={i18n}>
      <UserProvider>
        <TokenProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="onboarding" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="chat/[roomId]" />
            <Stack.Screen name="private-match" />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </TokenProvider>
      </UserProvider>
    </I18nextProvider>
  );
}
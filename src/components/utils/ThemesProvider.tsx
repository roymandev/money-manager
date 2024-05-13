import { useCallback, useMemo } from 'react';
import { View, useColorScheme } from 'react-native';
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  adaptNavigationTheme,
} from 'react-native-paper';

import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';

import * as SplashScreen from 'expo-splash-screen';

import { CONFIG_FONTS } from '@/configs/fonts';
import { Lato_400Regular } from '@expo-google-fonts/lato';
import {
  Rubik_400Regular,
  Rubik_500Medium,
  useFonts,
} from '@expo-google-fonts/rubik';
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';

SplashScreen.preventAutoHideAsync();

type Props = {
  children: JSX.Element;
};

function ThemesProvider({ children }: Props) {
  const colorScheme = useColorScheme();
  const { theme: m3Theme } = useMaterial3Theme({
    fallbackSourceColor: '#1B4965',
  });
  const [fontsLoaded, fontError] = useFonts({
    Rubik_400Regular,
    Rubik_500Medium,
    Lato_400Regular,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
  });

  const paperTheme = useMemo(
    () =>
      colorScheme === 'dark'
        ? {
            ...MD3DarkTheme,
            ...DarkTheme,
            colors: {
              ...DarkTheme.colors,
              ...m3Theme.dark,
            },
            fonts: CONFIG_FONTS,
          }
        : {
            ...MD3LightTheme,
            ...LightTheme,
            colors: {
              ...LightTheme.colors,
              ...m3Theme.light,
            },
            fonts: CONFIG_FONTS,
          },
    [DarkTheme, LightTheme, colorScheme, m3Theme.dark, m3Theme.light]
  );

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <PaperProvider theme={paperTheme}>
      <ThemeProvider value={paperTheme}>
        <View
          onLayout={onLayoutRootView}
          style={{ flex: 1, backgroundColor: paperTheme.colors.background }}
        >
          {children}
        </View>
      </ThemeProvider>
    </PaperProvider>
  );
}

export default ThemesProvider;

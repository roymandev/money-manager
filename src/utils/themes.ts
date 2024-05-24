import { MD3Theme, useTheme } from 'react-native-paper';

import { NavigationTheme } from 'react-native-paper/lib/typescript/types';

import { Material3Scheme } from '@pchmn/expo-material3-theme';

export const useAppTheme = () =>
  useTheme<MD3Theme & NavigationTheme & { colors: Material3Scheme }>();

import { Platform } from 'react-native';
import { configureFonts } from 'react-native-paper';

const baseFont = {
  fontFamily: Platform.select({
    android: 'Rubik_400Regular',
    ios: 'System',
    default: 'sans-serif',
  }),
} as const;

const baseVariants = configureFonts({
  config: baseFont,
});

// Assign font family based on fontWeight
const customVariants = Object.keys(baseVariants).reduce((acc, key) => {
  const variant = baseVariants[key as keyof typeof baseVariants];
  const fontFamily =
    variant.fontWeight === '500' ? 'Rubik_500Medium' : 'Rubik_400Regular';

  return {
    ...acc,
    [key]: {
      ...variant,
      fontFamily: Platform.select({
        android: fontFamily,
        ios: 'System',
        default: 'sans-serif',
      }),
    },
  };
}, {});

export const CONFIG_FONTS = configureFonts({
  config: {
    ...baseFont,
    ...customVariants,
  },
});

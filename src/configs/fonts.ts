import { configureFonts } from 'react-native-paper';

const baseFont = {
  fontFamily: 'Rubik_400Regular',
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
      fontFamily,
    },
  };
}, {});

export const CONFIG_FONTS = configureFonts({
  config: {
    ...baseFont,
    ...customVariants,
  },
});

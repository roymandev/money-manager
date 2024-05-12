import { StackHeaderProps } from '@react-navigation/stack';

import * as SplashScreen from 'expo-splash-screen';
import { enGB, registerTranslation } from 'react-native-paper-dates';

import PaperStackHeader from '@/components/PaperStackHeader';
import DatabaseProvider from '@/components/utils/DatabaseProvider';
import PaperStack from '@/components/utils/PaperStack';
import ThemesProvider from '@/components/utils/ThemesProvider';

registerTranslation('en-GB', enGB);

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function Header(props: StackHeaderProps) {
  return <PaperStackHeader {...props} />;
}

export default function RootLayout() {
  return (
    <DatabaseProvider>
      <ThemesProvider>
        <PaperStack
          screenOptions={{
            headerShown: false,
            header: Header,
            transitionSpec: {
              open: {
                animation: 'timing',
                config: { duration: 100, delay: 0 },
              },
              close: {
                animation: 'timing',
                config: { duration: 100, delay: 0 },
              },
            },
          }}
        />
      </ThemesProvider>
    </DatabaseProvider>
  );
}

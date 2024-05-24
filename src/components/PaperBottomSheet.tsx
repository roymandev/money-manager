import { forwardRef, useCallback, useEffect, useRef } from 'react';
import { BackHandler } from 'react-native';
import { Portal } from 'react-native-paper';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAppTheme } from '@/utils/themes';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetProps,
} from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useMergedRef } from '@mantine/hooks';

type Props = BottomSheetProps;

const PaperBottomSheet = forwardRef<BottomSheetMethods, Props>(
  ({ onChange, ...rest }, ref) => {
    const theme = useAppTheme();
    const insets = useSafeAreaInsets();
    const sheetRef = useRef<BottomSheet>(null);
    const mergedRef = useMergedRef(sheetRef, ref);
    const indexRef = useRef(-1);

    const renderBackdrop = useCallback(
      (props2: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props2}
          disappearsOnIndex={-1}
          opacity={1}
          style={{ backgroundColor: theme.colors.scrim }}
        />
      ),
      [theme]
    );

    useEffect(() => {
      const backAction = () => {
        if (indexRef.current === -1) return false;
        indexRef.current -= 1;
        sheetRef.current?.snapToIndex(indexRef.current);
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction
      );

      return () => backHandler.remove();
    }, []);

    return (
      <Portal>
        <BottomSheet
          ref={mergedRef}
          backdropComponent={renderBackdrop}
          backgroundStyle={{
            backgroundColor: theme.colors.surfaceContainerLow,
          }}
          topInset={insets.top}
          onChange={(index) => {
            indexRef.current = index;
            onChange?.(index);
          }}
          {...rest}
        />
      </Portal>
    );
  }
);

PaperBottomSheet.displayName = 'PaperBottomSheet';

export default PaperBottomSheet;

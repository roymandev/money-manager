import { forwardRef, useEffect, useRef, useState } from 'react';
import { Keyboard, TextInput as RnTextInput } from 'react-native';
import { RadioButton } from 'react-native-paper';

import PaperBottomSheet from '@/components/PaperBottomSheet';
import TextInput from '@/components/TextInput';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useUncontrolled } from '@mantine/hooks';
import { FlashList } from '@shopify/flash-list';

import { useCategoriesByType, useCategoryDetail } from './queries';
import { TCategory } from './types';

type Props = {
  label?: string;
  value?: number;
  onSelect?: (value?: number) => void;
  onChange: (value: number | null) => void;
  error?: string;
  type: TCategory['type'];
};

function CategoryList({
  value,
  onChange,
  type,
}: Pick<Props, 'type' | 'value'> & {
  onChange: (value: number) => void;
}) {
  const { data: dataCategory } = useCategoriesByType(type);

  return (
    <FlashList
      data={dataCategory}
      renderItem={({ item }) => (
        <RadioButton.Item label={item.name} value={item.id.toString()} />
      )}
      renderScrollComponent={({ children, ...rest }) => (
        <BottomSheetScrollView {...rest}>
          <RadioButton.Group
            value={value?.toString() || ''}
            onValueChange={(newValue) => {
              if (newValue) onChange?.(Number(newValue));
            }}
          >
            {children}
          </RadioButton.Group>
        </BottomSheetScrollView>
      )}
      estimatedItemSize={48}
      contentContainerStyle={{
        paddingBottom: 88,
      }}
    />
  );
}

const CategorySelector = forwardRef<RnTextInput, Props>(
  ({ label, value, onSelect, onChange, error, type }, ref) => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [mounted, setMounted] = useState(false);

    const prevData = useRef<TCategory | null>(null);

    const [_value, handleChange] = useUncontrolled<number | undefined>({
      value,
      onChange: onSelect,
    });

    const openSheet = () => {
      if (!mounted) setMounted(true);
      const time = Keyboard.isVisible() || !mounted ? 500 : 0;
      Keyboard.dismiss();
      setTimeout(() => {
        bottomSheetRef.current?.snapToIndex(0);
      }, time);
    };

    const { data } = useCategoryDetail(_value);

    useEffect(() => {
      if (prevData.current?.type !== type && data) {
        prevData.current = data;
        onChange(null);
      } else if (prevData.current?.type === type) {
        onChange(prevData.current.id);
      }
    }, [type]);

    const onSelectHandler = (itemId: number) => {
      handleChange(itemId);
      bottomSheetRef.current?.close();
    };

    return (
      <>
        <TextInput
          ref={ref}
          mode="outlined"
          onFocus={openSheet}
          onPressIn={openSheet}
          value={data?.name || ''}
          showSoftInputOnFocus={false}
          label={label}
          error={error}
        />

        {mounted && (
          <PaperBottomSheet
            index={-1}
            ref={bottomSheetRef}
            snapPoints={['40%', '100%']}
            enablePanDownToClose
          >
            <CategoryList
              value={_value}
              onChange={onSelectHandler}
              type={type}
            />
          </PaperBottomSheet>
        )}
      </>
    );
  }
);

CategorySelector.displayName = 'CategorySelector';

export default CategorySelector;

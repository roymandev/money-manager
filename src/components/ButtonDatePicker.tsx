import { forwardRef, useCallback, useState } from 'react';
import { TextInput as RnTextInput, View } from 'react-native';
import { TextInput } from 'react-native-paper';

import { format } from 'date-fns';
import { DatePickerModal } from 'react-native-paper-dates';
import { SingleChange } from 'react-native-paper-dates/lib/typescript/Date/Calendar';

import { useUncontrolled } from '@mantine/hooks';

import InputError from './InputError';

type Props = {
  label?: string;
  value?: string;
  onChange?: (value?: string) => void;
  error?: string;
};

const ButtonDatePicker = forwardRef<RnTextInput, Props>(
  ({ label, value, onChange, error }: Props, ref) => {
    const [open, setOpen] = useState(false);
    const [_value, handleChange] = useUncontrolled<string | undefined>({
      value,
      onChange,
    });

    const onDismissSingle = useCallback(() => {
      setOpen(false);
    }, [setOpen]);

    const onConfirmSingle = useCallback<SingleChange>(
      (params) => {
        setOpen(false);
        handleChange(params.date && params.date.toISOString());
      },
      [setOpen, handleChange]
    );

    return (
      <View>
        <TextInput
          ref={ref}
          mode="outlined"
          onFocus={(e) => {
            e.preventDefault();
            setOpen(true);
          }}
          onPressIn={() => setOpen(true)}
          value={_value && format(_value, 'E, dd MMM yyyy')}
          showSoftInputOnFocus={false}
          label={label}
          error={!!error}
        />

        <InputError message={error} />

        <DatePickerModal
          locale="en-GB"
          mode="single"
          visible={open}
          onDismiss={onDismissSingle}
          date={_value ? new Date(_value) : undefined}
          onConfirm={onConfirmSingle}
        />
      </View>
    );
  }
);

ButtonDatePicker.displayName = 'ButtonDatePicker';

export default ButtonDatePicker;

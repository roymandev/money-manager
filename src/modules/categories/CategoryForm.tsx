import { FAB } from 'react-native-paper';

import { Controller, useForm } from 'react-hook-form';
import { ScrollView } from 'react-native-gesture-handler';

import TextInput from '@/components/TextInput';
import { schemaCategoryInsert } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';

import { TCategoryInsert } from './types';

type Props = {
  onSubmit: (data: TCategoryInsert) => void;
  type: TCategoryInsert['type'];
  defaultValues?: Partial<TCategoryInsert>;
};

function CategoryForm({ onSubmit, defaultValues, type }: Props) {
  const { control, handleSubmit } = useForm<TCategoryInsert>({
    resolver: zodResolver(schemaCategoryInsert),
    defaultValues: {
      ...defaultValues,
      type,
    },
  });

  const onSubmitHandler = handleSubmit(onSubmit);

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 88,
          paddingHorizontal: 16,
          gap: 16,
        }}
      >
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, ...rest }, fieldState }) => (
            <TextInput
              style={{ backgroundColor: 'transparent' }}
              placeholder="Name"
              autoFocus
              onChangeText={onChange}
              error={fieldState.error?.message}
              {...rest}
            />
          )}
        />
      </ScrollView>

      <FAB
        icon="content-save"
        label="Save"
        style={{
          position: 'absolute',
          bottom: 16,
          right: 16,
        }}
        onPress={onSubmitHandler}
      />
    </>
  );
}

export default CategoryForm;

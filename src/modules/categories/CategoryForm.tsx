import { FAB } from 'react-native-paper';

import { Controller, useForm } from 'react-hook-form';
import { ScrollView } from 'react-native-gesture-handler';

import TextInput from '@/components/TextInput';
import { valibotResolver } from '@hookform/resolvers/valibot';

import { TCategoryInput, schemaCategory } from './schema';

type Props = {
  onSubmit: (data: TCategoryInput) => void;
  type: TCategoryInput['type'];
  defaultValues?: Partial<TCategoryInput>;
};

function CategoryForm({ onSubmit, defaultValues, type }: Props) {
  const { control, handleSubmit } = useForm<TCategoryInput>({
    resolver: valibotResolver(schemaCategory),
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

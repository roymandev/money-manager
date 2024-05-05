import { List, ListItemProps, Switch, SwitchProps } from 'react-native-paper';

import { useUncontrolled } from '@mantine/hooks';

type Props = ListItemProps & {
  value?: boolean;
  onValueChange?: SwitchProps['onValueChange'];
};

function ListItemSwitch({ value, onValueChange, ...rest }: Props) {
  const [_value, handleChange] = useUncontrolled({
    value,
    finalValue: false,
    onChange: onValueChange,
  });

  const toggle = () => handleChange(!_value);

  return (
    <List.Item
      right={() => <Switch value={_value} />}
      onPress={toggle}
      {...rest}
    />
  );
}

export default ListItemSwitch;

import { ComponentPropsWithoutRef } from 'react';
import { List } from 'react-native-paper';

function ListItem({
  style,
  contentStyle,
  ...rest
}: ComponentPropsWithoutRef<typeof List.Item>) {
  return (
    <List.Item
      style={[
        {
          paddingLeft: 16,
          paddingRight: 16,
        },
        style,
      ]}
      contentStyle={[
        {
          paddingLeft: 0,
          paddingRight: 0,
        },
        contentStyle,
      ]}
      {...rest}
    />
  );
}

export default ListItem;

import { ComponentPropsWithoutRef } from 'react';
import { List } from 'react-native-paper';

// Height 48, with description: 65

function ListItem({
  style,
  contentStyle,
  ...rest
}: ComponentPropsWithoutRef<typeof List.Item>) {
  return (
    <List.Item
      style={[
        {
          paddingLeft: rest.left ? 16 : 0,
          paddingRight: 16,
        },
        style,
      ]}
      contentStyle={[
        {
          paddingLeft: 16,
          paddingRight: 0,
        },
        contentStyle,
      ]}
      {...rest}
    />
  );
}

export default ListItem;

import { TextStyle, View, ViewStyle } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

type Props = {
  title: string;
  right?: React.ReactNode;
  style?: ViewStyle;
  titleStyle?: TextStyle;
};

function ListSubheader({ style, titleStyle, title, right }: Props) {
  const theme = useTheme();

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: theme.colors.elevation.level1,
          paddingHorizontal: 16,
          paddingVertical: 8,
          height: 40,
        },
        style,
      ]}
    >
      <Text style={[{ color: theme.colors.onSurfaceVariant }, titleStyle]}>
        {title}
      </Text>
      {right && <View>{right}</View>}
    </View>
  );
}

export default ListSubheader;

import { Dimensions, View } from 'react-native';

type Props = {
  children: React.ReactNode;
};

function FlasListEmptyContainer({ children }: Props) {
  const { height } = Dimensions.get('window');

  return (
    <View
      style={{
        height: height / 2,
        paddingTop: 88,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {children}
    </View>
  );
}

export default FlasListEmptyContainer;

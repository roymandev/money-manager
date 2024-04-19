import { Appbar, AppbarProps, Tooltip, useTheme } from 'react-native-paper';

import { StackHeaderProps } from '@react-navigation/stack';

import { router } from 'expo-router';

import { PaperStackOptions } from './utils/PaperStack';

type Props = Partial<StackHeaderProps> & {
  options: PaperStackOptions;
  children?: React.ReactNode;
  mode?: AppbarProps['mode'];
};

function PaperStackHeader({ children, options, back, mode = 'small' }: Props) {
  const theme = useTheme();

  return (
    <Appbar.Header mode={mode} style={{ backgroundColor: 'transparent' }}>
      {back ? (
        <Tooltip title={back.title}>
          <Appbar.BackAction onPress={router.back} />
        </Tooltip>
      ) : null}
      <Appbar.Content
        title={options.title || ''}
        titleStyle={theme.fonts.titleMedium}
      />
      {children}
    </Appbar.Header>
  );
}

export default PaperStackHeader;

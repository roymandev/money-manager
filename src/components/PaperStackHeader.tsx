import { Appbar, AppbarProps, Tooltip, useTheme } from 'react-native-paper';

import { StackHeaderProps } from '@react-navigation/stack';

import { router } from 'expo-router';

import { PaperStackOptions } from './utils/PaperStack';

type Props = Partial<StackHeaderProps> & {
  options: PaperStackOptions;
  children?: React.ReactNode;
  mode?: AppbarProps['mode'];
  withBackButton?: boolean;
};

function PaperStackHeader({
  children,
  options,
  withBackButton,
  back,
  mode = 'small',
}: Props) {
  const theme = useTheme();

  return (
    <Appbar.Header mode={mode} style={{ backgroundColor: 'transparent' }}>
      {withBackButton ? (
        <Tooltip title={back?.title || 'Go Back'}>
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

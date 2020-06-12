import React from 'react';
import TopBar from '../../TopBar';
import ThemedStyles from '../../../styles/ThemedStyles';
import { View } from 'react-native';
import i18n from '../../../common/services/i18n.service';
import NavigationService from '../../../navigation/NavigationService';

type PropsType = {
  store: any;
  children: React.ReactNode;
  hideDone?: boolean;
  doneText?: string;
};

const Wrapper = ({ store, children, hideDone, doneText }: PropsType) => {
  const theme = ThemedStyles.style;
  const rightText =
    hideDone === true ? null : doneText ? doneText : i18n.t('done');

  return (
    <View style={[theme.flexContainer, theme.backgroundPrimary]}>
      <TopBar
        leftText={i18n.t('monetize.title')}
        rightText={rightText}
        onPressRight={NavigationService.goBack}
        onPressBack={NavigationService.goBack}
        store={store}
      />
      {children}
    </View>
  );
};

export default Wrapper;
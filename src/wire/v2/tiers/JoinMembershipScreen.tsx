import React, { Fragment } from 'react';
import { observer, useLocalStore } from 'mobx-react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import ThemedStyles from '../../../styles/ThemedStyles';
import { useSafeArea } from 'react-native-safe-area-context';
import HeaderComponent from '../../../common/components/HeaderComponent';
import UserNamesComponent from '../../../common/components/UserNamesComponent';
import LabeledComponent from '../../../common/components/LabeledComponent';
import StripeCardSelector from '../../methods/StripeCardSelector';
import Switch from 'react-native-switch-pro';
import Colors from '../../../styles/Colors';

const tabList = [
  {
    name: 'tokens',
    label: 'Tokens',
  },
  {
    name: 'usd',
    label: 'USD',
  },
];

type payMethod = 'tokens' | 'usd';

const createJoinMembershipStore = () => {
  const store = {
    card: '' as any,
    payMethod: 'usd' as payMethod,
    setPayMethod(method: payMethod) {
      this.payMethod = method;
    },
    setCard(card: any) {
      this.card = card;
    },
  };

  return store;
};

const JoinMembershipScreen = observer(({ route, navigation }) => {
  /**
   * TODO
   * Get amounts
   * (new) Disable switch if tokens not valid payment
   * show input if tokens is selected payment
   */
  const store = useLocalStore(createJoinMembershipStore);

  const owner = route.params.owner;

  const theme = ThemedStyles.style;

  const insets = useSafeArea();
  const cleanTop = insets.top ? { marginTop: insets.top } : null;
  const switchTextStyle = [styles.switchText, theme.colorPrimaryText];

  return (
    <Fragment>
      <ScrollView
        keyboardShouldPersistTaps={true}
        contentContainerStyle={cleanTop}>
        <View style={styles.container}>
          <HeaderComponent user={owner} />
          <UserNamesComponent user={owner} pay={true} />
        </View>
        <View style={theme.rowJustifyStart}>
          <Text style={switchTextStyle}>{'USD'}</Text>
          <Switch
            value={store.payMethod === 'usd'}
            onSyncPress={store.setPayMethod}
            circleColorActive={Colors.switchCircle}
            circleColorInactive={Colors.switchCircle}
            backgroundActive={Colors.switchBackgroun}
            backgroundInactive={Colors.switchBackgroun}
            style={theme.marginHorizontal2x}
          />
          <Text style={switchTextStyle}>{'Tokens'}</Text>
        </View>
        <LabeledComponent
          label="Select Card"
          wrapperStyle={theme.marginBottom4x}>
          <ScrollView
            contentContainerStyle={[
              theme.paddingLeft2x,
              theme.paddingRight2x,
              theme.columnAlignCenter,
              theme.alignCenter,
              theme.paddingTop2x,
            ]}>
            <StripeCardSelector onCardSelected={store.setCard} />
          </ScrollView>
        </LabeledComponent>
      </ScrollView>
    </Fragment>
  );
});

const styles = StyleSheet.create({
  backIcon: {
    shadowOpacity: 0.4,
    textShadowRadius: 4,
    textShadowOffset: { width: 0, height: 0 },
    elevation: 4,
  },
  container: {
    marginBottom: 10,
  },
  switchText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 15,
  },
});

export default JoinMembershipScreen;
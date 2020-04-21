import React, { useCallback, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import ThemedStyles from '../../styles/ThemedStyles';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { observer } from 'mobx-react';
import type { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import Button from '../../common/components/Button';
import i18n from '../../common/services/i18n.service';
import sessionService from '../../common/services/session.service';
import type UserModel from '../UserModel';
import type { AppStackParamList } from '../../navigation/NavigationTypes';
import {
  FLAG_SUBSCRIBE,
  FLAG_MESSAGE,
  FLAG_EDIT_CHANNEL,
  FLAG_WIRE,
} from '../../common/Permissions';
import ChannelMoreMenu from './ChannelMoreMenu';

type PropsType = {
  channel: UserModel;
  onEditPress: Function;
};

/**
 * Channel buttons
 */
const ChannelButtons = observer((props: PropsType) => {
  const menuRef = useRef<any>();
  const theme = ThemedStyles.style;
  const navigation = useNavigation<
    NativeStackNavigationProp<AppStackParamList, 'Channel'>
  >();
  const subscriptionText = props.channel.subscribed
    ? i18n.t('channel.unsubscribe')
    : '+ ' + i18n.t('channel.subscribe');

  const openMessenger = useCallback(() => {
    navigation.push('Conversation', {
      conversation: {
        guid: props.channel.guid + ':' + sessionService.guid,
      },
    });
  }, [navigation, props.channel]);

  const openWire = useCallback(() => {
    navigation.push('WireFab', {
      owner: props.channel,
    });
  }, [navigation, props.channel]);

  const openMore = useCallback(() => {
    if (menuRef.current) {
      menuRef.current.show();
    }
  }, [menuRef]);

  const showWire =
    !props.channel.blocked &&
    !props.channel.isOwner() &&
    props.channel.can(FLAG_WIRE);

  const showSubscribe =
    !props.channel.isOwner() && props.channel.can(FLAG_SUBSCRIBE);

  const showMessage =
    !props.channel.isOwner() &&
    props.channel.isSubscribed() &&
    props.channel.can(FLAG_MESSAGE);

  const showEdit =
    props.channel.isOwner() && props.channel.can(FLAG_EDIT_CHANNEL);

  return (
    <View style={[theme.rowJustifyEnd, theme.marginTop2x, theme.marginRight2x]}>
      {showEdit ? (
        <Button
          color={ThemedStyles.getColor('secondary_background')}
          text={i18n.t('channel.editChannel')}
          textStyle={theme.fontL}
          containerStyle={styles.button}
          textColor="white"
          onPress={props.channel.toggleSubscription}
          inverted
        />
      ) : (
        <Icon
          raised
          reverse
          name="ios-more"
          type="ionicon"
          color={ThemedStyles.getColor('secondary_background')}
          reverseColor="white"
          size={15}
          onPress={openMore}
        />
      )}
      {showWire && (
        <Icon
          raised
          reverse
          name="coins"
          type="font-awesome-5"
          color={ThemedStyles.getColor('secondary_background')}
          reverseColor="white"
          size={15}
          onPress={openWire}
        />
      )}
      {showMessage && (
        <Icon
          raised
          reverse
          name="chat-bubble-outline"
          type="material"
          color={ThemedStyles.getColor('secondary_background')}
          reverseColor="white"
          size={15}
          onPress={openMessenger}
        />
      )}
      {showSubscribe && (
        <Button
          color={ThemedStyles.getColor('green')}
          text={subscriptionText}
          textStyle={theme.fontL}
          containerStyle={styles.button}
          textColor="white"
          onPress={props.channel.toggleSubscription}
          inverted
        />
      )}
      <ChannelMoreMenu channel={props.channel} ref={menuRef} />
    </View>
  );
});

export default ChannelButtons;

const styles = StyleSheet.create({
  button: {
    padding: 8,
    marginLeft: 5,
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: '#000',
  },
});

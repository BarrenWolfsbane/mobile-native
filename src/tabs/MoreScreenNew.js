import React, {
  Component
} from 'react';

import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  BackHandler,
  Linking,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TouchableHighlight,
} from 'react-native';

import {
  inject
} from 'mobx-react'

import Icon from 'react-native-vector-icons/MaterialIcons';
import IconFa from 'react-native-vector-icons/FontAwesome5';
import CIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ListItem } from 'react-native-elements'

import { CommonStyle as CS } from '../styles/Common';
import testID from '../common/helpers/testID';
import i18n from '../common/services/i18n.service';
import TabIcon from './TabIcon';

import abbrev from '../common/helpers/abbrev';
import shareService from '../share/ShareService';
import featuresService from '../common/services/features.service';
import authService from './../auth/AuthService';
import ThemedStyles from '../styles/ThemedStyles';

const ICON_SIZE = 24;

/**
 * More screen, new design (menu)
 */
export default
@inject('user')
class MoreScreenNew extends Component {

  navToChannel = () => this.props.navigation.push('Channel', { guid: this.props.user.me.guid })

  /**
   * Get Channel Avatar
   */
  getAvatar() {
    return this.props.user.me.getAvatarSource('medium');
  }

  /**
   * Return Options List ready to be rendered
   */
  getOptionsList = () => {
    const CS = ThemedStyles.style;

    let list = [
      {
        name: i18n.t('moreScreen.helpSupport'),
        icon: (<Icon name='help-outline' size={ICON_SIZE} style={ CS.colorIcon }/>),
        onPress: () => {
          this.props.navigation.push('GroupView', { guid: '100000000000000681'});
        }
      },
      {
        name: i18n.t('moreScreen.invite'),
        icon: (<Icon name='share' size={ICON_SIZE} style={ CS.colorIcon }/>),
        onPress: () => {
          shareService.invite(this.props.user.me.guid);
        }
      },
      {
        name: i18n.t('discovery.groups'),
        icon: (<IconFa name='users' size={ICON_SIZE} style={ CS.colorIcon }/>),
        onPress: () => {
          this.props.navigation.navigate('GroupsList');
        }
      }
    ];

    if (featuresService.has('crypto')) {
      list = [
        ...list,
        {
          name: i18n.t('boost'),
          icon: (<CIcon name="bank" size={ICON_SIZE} style={ CS.colorIcon }/>),
          onPress: () => {
            this.props.navigation.navigate('BoostConsole', { navigation: this.props.navigation });
          }
        },
        {
          name: i18n.t('moreScreen.wallet'),
          icon: (<Icon name='trending-up' size={ICON_SIZE} style={ CS.colorIcon }/>),
          onPress: () => {
            this.props.navigation.navigate('Wallet', {});
          }
        },
      ];
    }

    list = [
      ...list,
      {
        name: i18n.t('moreScreen.settings'),
        icon: (<Icon name='settings' size={ICON_SIZE} style={ CS.colorIcon }/>),
        onPress: () => {
          this.props.navigation.navigate('Settings');
        }
      },
      {
        name: i18n.t('settings.logout'),
        hideChevron: true,
        icon: (<Icon name='power-settings-new' size={ICON_SIZE} style={ CS.colorIcon } />),
        onPress: () => {
          authService.logout();
        }
      }
    ];

    return list;
  }

  render() {
    const avatar = this.getAvatar(),
          channel = this.props.user.me;

    const CS = ThemedStyles.style;

    return (
      <SafeAreaView style={[
        CS.flexContainer,
        CS.backgroundPrimary,
      ]}>
      <ScrollView
        style={[
          CS.flexContainer,
          CS.backgroundPrimary,
          CS.marginTop11x,
        ]}
      >
        <View style={styles.headerContainer} >
          <TouchableOpacity onPress={this.navToChannel}>
            <Image source={avatar} style={styles.wrappedAvatar}/>
          </TouchableOpacity>
          <Text style={[CS.titleText, CS.colorPrimaryText, CS.marginTop]}>{channel.name}</Text>
          <Text style={[CS.subTitleText, CS.colorSecondaryText, CS.fontNormal]}>@{channel.username}</Text>
          <Text style={[CS.subTitleText, CS.colorTertiaryText, CS.fontNormal, CS.marginTop3x]}>
            {`${abbrev(channel.subscribers_count, 0)} ${i18n.t('subscribers')}   ·   ${abbrev(channel.subscriptions_count, 0)} ${i18n.t('subscriptions')}`}
          </Text>
        </View>
        <View style={styles.body}>
          {
            this.getOptionsList().map((l, i) => (
              <ListItem
                key={i}
                title={l.name}
                titleStyle={[styles.menuText, CS.colorSecondaryText]}
                containerStyle={[styles.listItem, CS.backgroundPrimary]}
                switchButton={l.switchButton}
                hideChevron ={l.hideChevron}
                leftIcon={l.icon}
                onPress= {l.onPress}
                noBorder
                {...testID(l.name)}
              />
            ))
          }
        </View>
      </ScrollView>

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: 23,
    paddingLeft: 40,
    paddingBottom: 25,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#CCC',
  },
  menuText: {
    fontSize: 24,
    fontWeight: '700',
    paddingLeft: 10
  },
  wrappedAvatar: {
    height: 55,
    width: 55,
    borderRadius: 55
  },
  body: {
    paddingLeft: 24,
    paddingTop: 52,
  },
  container: {
    borderTopWidth: 0,
    borderBottomWidth: 0,
    paddingLeft: 30,
  },
  listItem: {
    borderBottomWidth: 0,
    borderBottomColor: '#ddd',
    paddingTop: 0,
    paddingBottom: 37,
    //height:20
  },
});

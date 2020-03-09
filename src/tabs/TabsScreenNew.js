import React, { useCallback } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Platform, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';

import NewsfeedScreen from '../newsfeed/NewsfeedScreen';
import NotificationsScreen from '../notifications/NotificationsScreen';
import DiscoveryScreen from '../discovery/DiscoveryScreen';
import MoreScreenNew from './MoreScreenNew';
import ThemedStyles from '../styles/ThemedStyles';
import TabIcon from './TabIcon';
import NotificationIcon from '../notifications/NotificationsTabIcon';
import AppStores from '../../AppStores';
import { MINDS_CDN_URI } from '../config/Config';
import gatheringService from '../common/services/gathering.service';
import { observer } from 'mobx-react';
import isIphoneX from '../common/helpers/isIphoneX';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import OtherScreen from '../settings/screens/OtherScreen';
import AccountScreen from '../settings/screens/AccountScreen';
import SecurityScreen from '../settings/screens/SecurityScreen';
import BillingScreen from '../settings/screens/BillingScreen';
import SettingsScreenNew from '../settings/SettingsScreenNew';
import EmailScreen from '../settings/screens/EmailScreen';
import i18n from '../common/services/i18n.service';
import PasswordScreenNew from '../settings/screens/PasswordScreenNew';

const Tab = createBottomTabNavigator();
const MenuStackNav = createNativeStackNavigator();

const hideHeader = { headerShown: false };

const MenuStack = function({ navigation }) {

  /**
   * Add tabPress event to navigate to main when user tap in menu tab
   */
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', () => {
      navigation.navigate('Main');
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <MenuStackNav.Navigator
      screenOptions={{
        title: '',
        ...ThemedStyles.defaultScreenOptions,
      }}>
      <MenuStackNav.Screen
        name="Main"
        component={MoreScreenNew}
        options={hideHeader}
      />
      <MenuStackNav.Screen
        name="Settings"
        component={SettingsScreenNew}
        options={hideHeader}
      />
      <MenuStackNav.Screen
        name="Account"
        component={AccountScreen}
        options={{ title: i18n.t('settings.account') }}
      />
      <MenuStackNav.Screen
        name="Security"
        component={SecurityScreen}
        options={{ title: i18n.t('settings.security') }}
      />
      <MenuStackNav.Screen
        name="Billing"
        component={BillingScreen}
        options={{ title: i18n.t('settings.billing') }}
      />
      <MenuStackNav.Screen
        name="Other"
        component={OtherScreen}
        options={{ title: i18n.t('settings.other') }}
      />
      <MenuStackNav.Screen 
        name="SettingsEmail"
        component={EmailScreen}
        options={{ title: i18n.t('settings.accountOptions.1') }}
      />
      <MenuStackNav.Screen 
        name="SettingsPassword"
        component={PasswordScreenNew}
        options={{ title: i18n.t('settings.accountOptions.3') }}
      />
    </MenuStackNav.Navigator>
  );
};

/**
 * Main tabs
 * @param {Object} props
 */
const Tabs = observer(function({ navigation }) {
  const isIOS = Platform.OS === 'ios';

  const navToCapture = useCallback(() => navigation.push('Capture'), [
    navigation,
  ]);

  if (gatheringService.inGatheringScreen) {
    return null;
  }

  const height = isIOS ? (Platform.isPad ? 100 : isIphoneX ? 85 : 70) : 65;

  return (
    <Tab.Navigator
      initialRouteName="Newsfeed"
      tabBarOptions={{
        showLabel: false,
        showIcon: true,
        activeTintColor: ThemedStyles.getColor('link'),
        inactiveTintColor: ThemedStyles.getColor('text_secondary'),
        style: {
          borderTopWidth: 0,
          backgroundColor: ThemedStyles.getColor('secondary_background'),
          height,
          paddingTop: isIOS && isIphoneX ? 30 : 2,
          paddingLeft: 25,
          paddingRight: 25,
        },
        tabStyle: {
          height,
          ...ThemedStyles.style.centered,
        },
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size, tabStyle }) => {
          let iconName,
            iconsize = 28;

          switch (route.name) {
            case 'Menu':
              return (
                <View>
                  {focused && <View style={[styles.acitivity]} />}
                  <Avatar
                    rounded
                    source={{
                      uri:
                        MINDS_CDN_URI +
                        'icon/' +
                        AppStores.user.me.guid +
                        '/medium/' +
                        AppStores.user.me.icontime,
                    }}
                    width={34}
                    height={34}
                    testID="AvatarButton"
                  />
                </View>
              );
              break;
            case 'Newsfeed':
              iconName = 'home';
              iconsize = 28;
              break;
            case 'Discovery':
              iconName = 'hashtag';
              break;
            case 'Notifications':
              return <NotificationIcon tintColor={color} size={iconsize} />;
            case 'Capture':
              iconName = 'plus';
              iconsize = 64;
              break;
          }

          if (Platform.isPad) {
            iconsize = Math.round(iconsize * 1.2)
          }

          // You can return any component that you like here!
          return <TabIcon name={iconName} size={iconsize} color={color} />;
        },
      })}>
      <Tab.Screen
        name="Newsfeed"
        component={NewsfeedScreen}
        options={{ tabBarTestID: 'Menu tab button', headerShown: false }}
      />
      <Tab.Screen
        name="Discovery"
        component={DiscoveryScreen}
        options={{ tabBarTestID: 'Discovery tab button' }}
      />
      <Tab.Screen
        name="Capture"
        component={View}
        options={{
          tabBarTestID: 'Capture tab button',
          tabBarButton: props => (
            <TouchableOpacity {...props} onPress={navToCapture} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{ tabBarTestID: 'Notifications tab button' }}
      />
      <Tab.Screen
        name="Menu"
        component={MenuStack}
        options={{ tabBarTestID: 'Menu tab button' }}
      />
    </Tab.Navigator>
  );
});

const styles = {
  acitivity: {
    zIndex: 9990,
    top: -5,
    left: -5,
    right: -5,
    bottom: -5,
    borderWidth: 2.5,
    borderRadius: 35,
    position: 'absolute',
    borderColor: colors.primary,
  },
};

export default Tabs;

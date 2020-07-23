import React from 'react';

import { View } from 'react-native';
import { observer } from 'mobx-react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { DiscoveryTrendsList } from './trends/DiscoveryTrendsList';
import Topbar from '../../topbar/Topbar';
import ThemedStyles from '../../styles/ThemedStyles';
import { useDiscoveryV2Store } from './DiscoveryV2Context';
import { TDiscoveryV2Tabs } from './DiscoveryV2Store';
import TopbarTabbar from '../../common/components/topbar-tabbar/TopbarTabbar';
import { DiscoveryTagsList } from './tags/DiscoveryTagsList';
import { DrawerParamList } from '../../navigation/NavigationTypes';
import i18n from '../../common/services/i18n.service';

type PlusDiscoveryScreenRouteProp = RouteProp<
  DrawerParamList,
  'PlusDiscoveryScreen'
>;
type PlusDiscoveryScreenNavigationProp = StackNavigationProp<
  DrawerParamList,
  'PlusDiscoveryScreen'
>;

type PropsType = {
  navigation: PlusDiscoveryScreenNavigationProp;
};

/**
 * Discovery Feed Screen
 */
const PlusDiscoveryScreen = observer(({ navigation }: PropsType) => {
  const store = useDiscoveryV2Store();

  const screen = () => {
    switch (store.activeTabId) {
      case 'foryou':
        return <DiscoveryTrendsList plus={true} />;
      case 'your-tags':
        return <DiscoveryTagsList type="your" plus={true} />;
      case 'trending-tags':
        return <DiscoveryTagsList type="trending" plus={true} />;
      default:
        return <View />;
    }
  };

  return (
    <View style={ThemedStyles.style.flexContainer}>
      <Topbar navigation={navigation} />
      <View style={ThemedStyles.style.backgroundSecondary}>
        <TopbarTabbar
          current={store.activeTabId}
          onChange={(tabId) => {
            store.setTabId(tabId as TDiscoveryV2Tabs);
          }}
          tabs={[
            { id: 'foryou', title: i18n.t('discovery.justForYou') },
            { id: 'your-tags', title: i18n.t('discovery.yourTags') },
            { id: 'trending-tags', title: i18n.t('discovery.trending') },
          ]}
        />
      </View>
      <View style={ThemedStyles.style.flexContainer}>{screen()}</View>
    </View>
  );
});

export default PlusDiscoveryScreen;

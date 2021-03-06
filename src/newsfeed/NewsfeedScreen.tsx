import React, { Component } from 'react';

import { observer, inject } from 'mobx-react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { View } from 'react-native';

import GroupsBar from '../groups/GroupsBar';
import FeedList from '../common/components/FeedList';
import type { AppStackParamList } from '../navigation/NavigationTypes';
import type MessengerListStore from '../messenger/MessengerListStore';
import type UserStore from '../auth/UserStore';
import type NewsfeedStore from './NewsfeedStore';
import type NotificationsStore from '../notifications/NotificationsStore';
import CheckLanguage from '../common/components/CheckLanguage';
import ActivityPlaceHolder from './ActivityPlaceHolder';

type NewsfeedScreenRouteProp = RouteProp<AppStackParamList, 'Newsfeed'>;
type NewsfeedScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  'Newsfeed'
>;

type PropsType = {
  navigation: NewsfeedScreenNavigationProp;
  user: UserStore;
  messengerList: MessengerListStore;
  notifications: NotificationsStore;
  newsfeed: NewsfeedStore<any>;
  route: NewsfeedScreenRouteProp;
};

/**
 * News Feed Screen
 */
@inject('newsfeed', 'user', 'messengerList', 'notifications')
@observer
class NewsfeedScreen extends Component<PropsType> {
  disposeTabPress?: Function;
  groupsBar: GroupsBar | null = null;

  /**
   * Nav to activity full screen
   */
  navToCapture = () => {
    this.props.navigation.navigate('Capture', {});
  };

  refreshNewsfeed = (e) => {
    if (this.props.navigation.isFocused()) {
      this.props.newsfeed.scrollToTop();
      this.props.newsfeed.feedStore.refresh();
      e && e.preventDefault();
    }
  };

  /**
   * Load data on mount
   */
  componentDidMount() {
    this.disposeTabPress = this.props.navigation.addListener(
      //@ts-ignore
      'tabPress',
      this.refreshNewsfeed,
    );

    this.loadFeed();
    // this.props.newsfeed.loadBoosts();
  }

  async loadFeed() {
    // this.props.discovery.init();

    await this.props.newsfeed.feedStore.fetchRemoteOrLocal();

    // load groups after the feed
    if (this.groupsBar) await this.groupsBar.initialLoad();

    // load messenger
    this.props.messengerList.loadList();

    // listen socket on app start
    this.props.messengerList.listen();

    // load notifications
    try {
      await this.props.notifications.readLocal();
    } finally {
      this.props.notifications.loadList(true);
    }
  }

  /**
   * Component will unmount
   */
  componentWillUnmount() {
    this.props.messengerList.unlisten();
    if (this.disposeTabPress) {
      this.disposeTabPress();
    }
  }

  setGroupsBarRef = (r) => (this.groupsBar = r);

  /**
   * Render
   */
  render() {
    const newsfeed = this.props.newsfeed;

    const header = (
      <View>
        <CheckLanguage />
      </View>
    );

    // Show placeholder before the loading as an empty component.
    const additionalProps = newsfeed.feedStore.loaded
      ? {}
      : {
          ListEmptyComponent: (
            <View>
              <ActivityPlaceHolder />
              <ActivityPlaceHolder />
            </View>
          ),
        };

    return (
      <FeedList
        ref={newsfeed.setListRef}
        header={header}
        feedStore={newsfeed.feedStore}
        navigation={this.props.navigation}
        {...additionalProps}
      />
    );
  }
}

export default NewsfeedScreen;

import React, { useEffect, useCallback } from 'react';
import { View, Text } from 'react-native';
import { observer, useLocalStore } from 'mobx-react';
import FeedList from '../../common/components/FeedList';
import createChannelStore from './createChannelStore';
import CenteredLoading from '../../common/components/CenteredLoading';
import ChannelHeader from './ChannelHeader';
import ThemedStyles from '../../styles/ThemedStyles';
import BlogCard from '../../blogs/BlogCard';
import type BlogModel from '../../blogs/BlogModel';
import i18n from '../../common/services/i18n.service';

type PropsType = {
  navigation: any;
  route: any;
};

/**
 * Channel screen
 */
const ChannelScreen = observer((props: PropsType) => {
  const theme = ThemedStyles.style;
  const store = useLocalStore(createChannelStore);

  useEffect(() => {
    const params = props.route.params;
    if (params) {
      store.initialLoad(params);
    }
  }, [props.route, store]);

  const renderBlog = useCallback(
    (row: { item: BlogModel }) => {
      return <BlogCard entity={row.item} navigation={props.navigation} />;
    },
    [props.navigation],
  );

  const renderActivity = store.filter === 'blogs' ? renderBlog : undefined;

  if (!store.loaded) {
    return <CenteredLoading />;
  }

  const emptyMessage = store.channel!.isOwner() ? (
    <View style={theme.centered}>
      <Text style={[theme.fontXL, theme.textCenter, theme.padding2x]}>
        {i18n.t('channel.createFirstPost')}
      </Text>
      <Text
        style={[theme.fontXL, theme.textCenter, theme.padding2x]}
        onPress={() => props.navigation.navigate('Capture')}>
        {i18n.t('create')}
      </Text>
    </View>
  ) : undefined;

  return (
    <FeedList
      feedStore={store.feedStore}
      renderActivity={renderActivity}
      header={<ChannelHeader store={store} />}
      navigation={props.navigation}
      emptyMessage={emptyMessage}
      style={[theme.backgroundSecondary, theme.flexContainer]}
    />
  );
});

export default ChannelScreen;

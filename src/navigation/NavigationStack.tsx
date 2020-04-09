//@ts-nocheck
import React, { Fragment } from 'react';

import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import LoginScreen from '../auth/LoginScreen';
import ForgotScreen from '../auth/ForgotScreen';
import TabsScreen from '../tabs/TabsScreen';
import TabsScreenNew from '../tabs/TabsScreenNew';
import NotificationsScreen from '../notifications/NotificationsScreen';
import ActivityScreen from '../newsfeed/ActivityScreen';
import ChannelScreen from '../channel/ChannelScreen';
import ChannelSubscribers from '../channel/subscribers/ChannelSubscribers';
import CapturePoster from '../capture/CapturePoster';
import RegisterScreen from '../auth/RegisterScreen';
import ConversationScreen from '../messenger/ConversationScreen';
import GroupsListScreen from '../groups/GroupsListScreen';
import GroupViewScreen from '../groups/GroupViewScreen';
import WalletScreen from '../wallet/WalletScreen';
import WalletHistoryScreen from '../wallet/WalletHistoryScreen';
import BoostConsoleScreen from '../boost/BoostConsoleScreen';
import BlogsListScreen from '../blogs/BlogsListScreen';
import BlogsViewScreen from '../blogs/BlogsViewScreen';
import FabScreen from '../wire/FabScreen';
import ViewImageScreen from '../media/ViewImageScreen';
import BoostScreen from '../boost/creator/BoostScreen';
import ContributionsScreen from '../wallet/tokens/ContributionsScreen';
import TransactionsScreen from '../wallet/tokens/TransactionsScreen';
import BlockchainWalletScreen from '../blockchain/wallet/BlockchainWalletScreen';
import BlockchainWalletModalScreen from '../blockchain/wallet/modal/BlockchainWalletModalScreen';
import BlockchainWalletImportScreen from '../blockchain/wallet/import/BlockchainWalletImportScreen';
import BlockchainWalletDetailsScreen from '../blockchain/wallet/details/BlockchainWalletDetailsScreen';
import ReportScreen from '../report/ReportScreen';
import MoreScreen from '../tabs/MoreScreen';
import WithdrawScreen from '../wallet/tokens/WithdrawScreen';
import WalletOnboardingScreen from '../wallet/onboarding/WalletOnboardingScreen';
import ComingSoonScreen from '../static-views/ComingSoonScreen';
import NotSupportedScreen from '../static-views/NotSupportedScreen';
import OnboardingScreen from '../onboarding/OnboardingScreen';
import IssueReportScreen from '../issues/IssueReportScreen';
import Wizard from '../common/components/Wizard';
import UpdatingScreen from '../update/UpdateScreen';
import { withErrorBoundaryScreen } from '../common/components/ErrorBoundary';
// import LogsScreen from '../logs/LogsScreen';
import DiscoveryFeedScreen from '../discovery/DiscoveryFeedScreen';
import Gathering from '../gathering/Gathering';
import OnboardingScreenNew from '../onboarding/OnboardingScreenNew';
import EmailConfirmationScreen from '../onboarding/EmailConfirmationScreen';
import featuresService from '../common/services/features.service';
import ThemedStyles from '../styles/ThemedStyles';
import MessengerScreen from '../messenger/MessengerScreen';
import Topbar from '../topbar/Topbar';
import i18n from '../common/services/i18n.service';
import ComposeScreen from '../compose/ComposeScreen';
import TagSelector from '../compose/TagSelector';
import NsfwSelector from '../compose/NsfwSelector';
import ScheduleSelector from '../compose/ScheduleSelector';
import MonetizeSelector from '../compose/MonetizeSelector';
import LicenseSelector from '../compose/LicenseSelector';

const hideHeader = { headerShown: false };
const messengerOptions = { title: 'Messenger' };
const discoveryOptions = ({ route }) => ({ title: route.params.title || '' });
const captureOptions = {
  title: '',
  stackAnimation: 'fade',
  headerShown: false,
};

const activityOptions = ({ route }) => ({
  title: route.params.entity ? route.params.entity.ownerObj.name : '',
});

const AppStackNav = createNativeStackNavigator();
const AuthStackNav = createNativeStackNavigator();
const RootStackNav = createNativeStackNavigator();

const AppStack = function (props) {
  let CurrentComposeScreen;

  // if (featuresService.has('compose')) {
  CurrentComposeScreen = ComposeScreen;
  // } else {
  //   CurrentComposeScreen = CapturePoster;
  //   captureOptions.headerShown = true;
  // }

  return (
    <AppStackNav.Navigator
      screenOptions={{
        title: '',
        ...ThemedStyles.defaultScreenOptions,
      }}>
      <AppStackNav.Screen
        name="Tabs"
        component={TabsScreenNew}
        options={hideHeader}
        // component={TabsScreen}
        // options={({ navigation, route }) => ({
        //   header: props => <Topbar {...props} />,
        // })}
      />
      <AppStackNav.Screen
        name="TagSelector"
        component={TagSelector}
        options={hideHeader}
      />
      <AppStackNav.Screen
        name="NsfwSelector"
        component={NsfwSelector}
        options={hideHeader}
      />
      <AppStackNav.Screen
        name="ScheduleSelector"
        component={ScheduleSelector}
        options={hideHeader}
      />
      <AppStackNav.Screen
        name="MonetizeSelector"
        component={MonetizeSelector}
        options={hideHeader}
      />
      <AppStackNav.Screen
        name="LicenseSelector"
        component={LicenseSelector}
        options={hideHeader}
      />
      <AppStackNav.Screen
        name="EmailConfirmation"
        component={EmailConfirmationScreen}
      />
      <AppStackNav.Screen name="Update" component={UpdatingScreen} />
      <AppStackNav.Screen
        name="Boost"
        component={BoostScreen}
        options={{ gesturesEnabled: false }}
      />
      <AppStackNav.Screen
        name="Notifications"
        component={NotificationsScreen}
      />
      <AppStackNav.Screen
        name="Channel"
        component={ChannelScreen}
        options={hideHeader}
      />
      <AppStackNav.Screen
        name="Capture"
        component={CurrentComposeScreen}
        options={captureOptions}
      />
      <AppStackNav.Screen
        name="Activity"
        component={ActivityScreen}
        options={activityOptions}
      />
      <AppStackNav.Screen name="Conversation" component={ConversationScreen} />
      <AppStackNav.Screen
        name="DiscoveryFeed"
        component={DiscoveryFeedScreen}
        options={discoveryOptions}
      />
      <AppStackNav.Screen name="Subscribers" component={ChannelSubscribers} />
      <AppStackNav.Screen
        name="GroupsList"
        component={GroupsListScreen}
        options={{ title: i18n.t('discovery.groups') }}
      />
      <AppStackNav.Screen
        name="GroupView"
        component={GroupViewScreen}
        options={hideHeader}
      />
      <AppStackNav.Screen name="Wallet" component={WalletScreen} />
      <AppStackNav.Screen
        name="BlogList"
        component={BlogsListScreen}
        options={{ title: i18n.t('blogs.blogs') }}
      />
      <AppStackNav.Screen
        name="BoostConsole"
        component={BoostConsoleScreen}
        options={{ title: i18n.t('boost') }}
      />
      <AppStackNav.Screen
        name="BlogView"
        component={BlogsViewScreen}
        options={hideHeader}
      />
      <AppStackNav.Screen
        name="WireFab"
        component={FabScreen}
        options={hideHeader}
      />
      <AppStackNav.Screen
        name="WalletHistory"
        component={WalletHistoryScreen}
      />
      <AppStackNav.Screen
        name="ViewImage"
        component={ViewImageScreen}
        options={{
          headerStyle: {
            backgroundColor: '#000',
          },
        }}
      />
      <AppStackNav.Screen
        name="BlockchainWallet"
        component={BlockchainWalletScreen}
        options={{ title: i18n.t('blockchain.walletAddresses') }}
      />
      <AppStackNav.Screen
        name="Contributions"
        component={ContributionsScreen}
        options={{ title: i18n.t('wallet.contributionsTitle') }}
      />
      <AppStackNav.Screen
        name="Transactions"
        component={TransactionsScreen}
        options={{ title: i18n.t('wallet.transactionsTitle') }}
      />
      <AppStackNav.Screen
        name="BlockchainWalletModal"
        component={BlockchainWalletModalScreen}
        options={{ gesturesEnabled: false }}
      />
      <AppStackNav.Screen
        name="BlockchainWalletImport"
        component={BlockchainWalletImportScreen}
      />
      <AppStackNav.Screen
        name="BlockchainWalletDetails"
        component={BlockchainWalletDetailsScreen}
      />
      <AppStackNav.Screen
        name="Report"
        component={ReportScreen}
        options={{ title: i18n.t('report') }}
      />
      <AppStackNav.Screen
        name="More"
        component={MoreScreen}
        options={{ title: i18n.t('report') }}
      />
      <AppStackNav.Screen name="Withdraw" component={WithdrawScreen} />
      <AppStackNav.Screen
        name="WalletOnboarding"
        component={WalletOnboardingScreen}
        options={{ title: 'Wallet' }}
      />
      <AppStackNav.Screen name="NotSupported" component={NotSupportedScreen} />
      <AppStackNav.Screen
        name="OnboardingScreen"
        component={OnboardingScreen}
      />
      <AppStackNav.Screen
        name="OnboardingScreenNew"
        component={OnboardingScreenNew}
        options={hideHeader}
      />
      <AppStackNav.Screen
        name="Messenger"
        component={MessengerScreen}
        options={messengerOptions}
      />
    </AppStackNav.Navigator>
  );
};

const AuthStack = function (props) {
  return (
    <AuthStackNav.Navigator>
      <AuthStackNav.Screen
        name="Login"
        component={LoginScreen}
        options={hideHeader}
      />
      <AuthStackNav.Screen
        name="Forgot"
        component={ForgotScreen}
        options={hideHeader}
      />
      <AuthStackNav.Screen
        name="Register"
        component={RegisterScreen}
        options={hideHeader}
      />
    </AuthStackNav.Navigator>
  );
};

const RootStack = function (props) {
  const initial = props.isLoggedIn ? 'App' : 'Auth';

  return (
    <RootStackNav.Navigator
      initialRouteName={initial}
      mode="modal"
      screenOptions={{
        headerShown: false,
        ...ThemedStyles.defaultScreenOptions,
      }}>
      {props.isLoggedIn ? (
        <Fragment>
          <RootStackNav.Screen name="App" component={AppStack} />
          <RootStackNav.Screen name="Gathering" component={Gathering} />
        </Fragment>
      ) : (
        <RootStackNav.Screen name="Auth" component={AuthStack} />
      )}
    </RootStackNav.Navigator>
  );
};

export default RootStack;

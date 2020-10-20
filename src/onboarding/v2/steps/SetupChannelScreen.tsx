import { observer, useLocalStore } from 'mobx-react';
import React from 'react';
import { View } from 'react-native';
import Button from '../../../common/components/Button';
import InputContainer from '../../../common/components/InputContainer';
import useCurrentUser from '../../../common/hooks/useCurrentUser';
import i18n from '../../../common/services/i18n.service';
import NavigationService from '../../../navigation/NavigationService';
import ThemedStyles from '../../../styles/ThemedStyles';
import ModalContainer from './ModalContainer';

/**
 * Verify Email Modal Screen
 */
export default observer(function SetupChannelScreen() {
  const theme = ThemedStyles.style;
  const user = useCurrentUser();

  const store = useLocalStore(() => ({
    name: user?.name || '',
    bio: user?.briefdescription || '',
    setName(value: string) {
      store.name = value;
    },
    setBio(value: string) {
      store.bio = value;
    },
  }));

  return (
    <ModalContainer
      title={i18n.t('onboarding.setupChannel')}
      onPressBack={NavigationService.goBack}>
      <InputContainer
        placeholder={i18n.t('channel.edit.displayName')}
        onChangeText={store.setName}
        value={store.name}
        noBottomBorder
      />
      <InputContainer
        //TODO: Implement autogrow on InputContainer
        placeholder={i18n.t('channel.edit.bio')}
        onChangeText={store.setBio}
        multiline={true}
        scrollEnabled={false}
        maxHeight={110}
        value={store.bio}
      />
      <View style={theme.flexContainer} />
      <View style={theme.paddingHorizontal4x}>
        <Button
          onPress={NavigationService.goBack}
          text={i18n.t('save')}
          containerStyle={[
            theme.transparentButton,
            theme.paddingVertical3x,
            theme.fullWidth,
            theme.marginTop,
            theme.borderPrimary,
          ]}
          textStyle={theme.buttonText}
        />
      </View>
    </ModalContainer>
  );
});

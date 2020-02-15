import React, {
  useCallback
} from 'react';

import {
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { CommonStyle as CS} from '../../../styles/Common';
import Counter from './Counter';
import withPreventDoubleTap from '../../../common/components/PreventDoubleTap';
import testID from '../../../common/helpers/testID';
import { FLAG_REMIND } from '../../../common/Permissions';
import { useRoute, useNavigation } from '@react-navigation/native';
import ThemedStyles from '../../../styles/ThemedStyles';

// prevent double tap in touchable
const TouchableOpacityCustom = withPreventDoubleTap(TouchableOpacity);

/**
 * Remind Action Component
 */
export default function({ entity, size = 20, vertical = false }) {
  const color = entity.can(FLAG_REMIND)
    ? entity.reminds > 0
      ? ThemedStyles.style.colorLink
      : ThemedStyles.style.colorIcon
    : CS.colorLightGreyed;

  const route = useRoute();
  const navigation = useNavigation();

  /**
   * Open remind
   */
  const remind = useCallback(() => {
    // check permission and show alert
    if (!entity.can(FLAG_REMIND, true)) return;

    const { key } = route;
    navigation.push('Capture', {isRemind: true, entity, parentKey: key});
  }, [route, entity, navigation]);

  return (
    <TouchableOpacityCustom
      style={[
        CS.flexContainer,
        CS.centered,
        vertical === true ? CS.columnAlignCenter : CS.rowJustifyCenter,
      ]}
      onPress={remind}
      {...testID('Remind activity button')}>
      <Icon style={[color, CS.marginRight]} name='repeat' size={size} />
      <Counter count={entity['reminds']} size={size * 0.70} />
    </TouchableOpacityCustom>
  );
}

//@ts-nocheck
import React from 'react';
import ThemedStyles from '../../styles/ThemedStyles';
import { View } from 'react-native';
import Input from './Input';

type inputType = 'textInput' | 'phoneInput' | 'dateInput';

type PropsType = {
  placeholder: string;
  onChangeText: Function;
  value: string;
  testID: string;
  onFocus?: Function;
  onBlur?: Function;
  onError?: Function;
  wrapperBorder: any;
  ref?: any;
  secureTextEntry?: boolean;
  inputType?: inputType;
  selectTextOnFocus?: boolean;
  multiline?: boolean;
};

const SettingInput = ({ onError, ref, ...props }: PropsType) => {
  const theme = ThemedStyles.style;

  const wrapperStyle = [
    theme.paddingLeft3x,
    theme.paddingTop3x,
    theme.backgroundSecondary,
    props.wrapperBorder,
    theme.borderPrimary,
  ];

  const labelStyle = [theme.colorSecondaryText, theme.fontL, theme.paddingLeft];

  return (
    <View style={wrapperStyle}>
      <Input
        style={[
          theme.border0x,
          props.multiline ? styles.areaHeight : styles.inputHeight,
        ]}
        labelStyle={labelStyle}
        onError={onError ?? (() => {})}
        ref={ref ?? (() => {})}
        {...props}
      />
    </View>
  );
};

const styles = {
  inputHeight: {
    height: 40,
  },
  areaHeight: {
    height: 230,
  },
};

export default SettingInput;

import React, {PropsWithChildren} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleProp,
  ViewStyle,
} from 'react-native';
import CommonStyles from '../utils/CommonStyles';

interface KeyboardAvoidCommonViewProps {
  style?: StyleProp<ViewStyle>;
}

const behaviorProps: any = {};
if (Platform.OS === 'ios') {
  behaviorProps.behavior = 'padding';
}

const KeyboardAvoidCommonView = (
  props: PropsWithChildren<KeyboardAvoidCommonViewProps>,
) => {
  const style = props.style || {};
  return (
    <KeyboardAvoidingView style={[CommonStyles.flex, style]} {...behaviorProps}>
      {props.children}
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoidCommonView;

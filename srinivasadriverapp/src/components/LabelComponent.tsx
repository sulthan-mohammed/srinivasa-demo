import React from 'react';
import {
  FlexStyle,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from 'react-native';
import {Colors, FontConfig} from '../utils';
import {scale, verticalScale} from 'react-native-size-matters';

export interface LabelComponentProps {
  title: string;
  style?: StyleProp<FlexStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const LabelComponent = (props: LabelComponentProps) => {
  const {title, style, textStyle} = props;
  return (
    <View style={[styles.label, style]}>
      <Text style={[styles.labelText, textStyle]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    justifyContent: 'center',
  },
  labelText: {
    fontFamily: FontConfig.primary.Medium,
    color: Colors.textLight,
    fontSize: scale(14),
    marginBottom: verticalScale(2),
  },
});

export default LabelComponent;

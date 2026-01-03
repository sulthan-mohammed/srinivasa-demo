import React, {PropsWithChildren} from 'react';
import {Platform, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {Colors} from '../utils';
import {verticalScale, moderateScale} from 'react-native-size-matters';

export interface CardComponentProps {
  style?: StyleProp<ViewStyle>;
}

const CardComponent = (props: PropsWithChildren<CardComponentProps>) => {
  const {style} = props;
  return <View style={[styles.wrapper, style]}>{props.children}</View>;
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: verticalScale(8),
    backgroundColor: Colors.backgroundColor,
    padding: moderateScale(15),
    borderRadius: 5,
    borderColor: Colors.borderColor,
      elevation: Platform.OS === 'android' ? 4 : 0,
    shadowOffset: {width: 0, height: 0.5 * 4},
    shadowOpacity: 0.3,
    shadowRadius: 0.8 * 4,
  },
});

export default CardComponent;

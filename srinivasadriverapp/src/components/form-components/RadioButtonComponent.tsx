import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Animated,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import LabelComponent from '../LabelComponent';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Colors, FontConfig} from '../../utils';

export interface RadioButtonComponentProps {
  checked?: boolean;
  style?: StyleProp<ViewStyle>;
  value?: string | number | boolean;
  onChange?: (value: string | number | boolean | undefined) => void;
  label?: string;
  class?: 'primary' | 'secondary' | 'success';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  labelStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
}

const sizesWrapper = {
  xs: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  sm: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  md: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  lg: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
};
const sizesInner = {
  xs: 10,
  sm: 14,
  md: 19,
  lg: 26,
};

const RadioButtonComponent = (props: RadioButtonComponentProps) => {
  const {checked, onChange, value, label, disabled, labelStyle} = props;

  const size = props.size || 'sm';
  const style = props.style || {};
  const className = props.class || 'primary';

  const [isSelected, setIsSelected] = useState(!!checked);
  const animationValue = useRef(new Animated.Value(0)).current;

  const updateSelected = useCallback(
    (checkedValue: boolean) => {
      setIsSelected(checkedValue);
      if (onChange) {
        onChange(value);
      }
    },
    [onChange, value],
  );

  useEffect(() => {
    setIsSelected(!!checked);
  }, [checked]);

  useEffect(() => {
    const toValue = isSelected ? sizesInner[size] : 0;
    Animated.timing(animationValue, {
      useNativeDriver: false, //Add this line
      toValue,
      duration: 100,
    }).start();
  }, [animationValue, isSelected, size]);

  const fillColor =
    className === 'primary'
      ? Colors.primary
      : className === 'secondary'
      ? Colors.textDark
      : Colors.success;

  return (
    <TouchableOpacity
      style={[styles.mainWrapper, style]}
      activeOpacity={disabled ? 1 : 0.9}
      onPress={() => {
        if (!disabled) {
          updateSelected(true);
        }
      }}>
      <View
        style={[
          styles.radioCircle,
          sizesWrapper[size],
          {borderColor: isSelected ? fillColor : Colors.textLight},
        ]}>
        <Animated.View
          style={[
            styles.radioFill,
            {backgroundColor: fillColor},
            {width: animationValue, height: animationValue},
          ]}
        />
      </View>
      {!!label && (
        <LabelComponent
          style={styles.labelHolder}
          textStyle={
            disabled ? styles.disabledText : [styles.labelText, labelStyle]
          }
          title={label}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 0,
    alignItems: 'center',
    flexDirection: 'row',
    padding: moderateScale(4),
    marginHorizontal: moderateScale(10),
  },
  radioCircle: {
    width: moderateScale(28),
    height: verticalScale(28),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    padding: moderateScale(2),
    borderRadius: 14,
  },
  radioFill: {
    backgroundColor: Colors.primary,
    width: moderateScale(18),
    height: verticalScale(18),
    borderRadius: 20,
  },
  labelHolder: {
    marginHorizontal: moderateScale(10),
    marginRight: moderateScale(20),
    marginTop: verticalScale(2),
    flex: 0,
  },
  labelText: {
    fontSize: scale(15),
    color: Colors.textDark,
    fontFamily: FontConfig.primary.Regular,
  },
  disabledText: {
    color: Colors.textLight,
  },
});

export default RadioButtonComponent;

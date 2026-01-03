import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Animated,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import LabelComponent from '../LabelComponent';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {Colors, FontConfig, ImageConfig} from '../../utils';
import CommonStyles from '../../utils/CommonStyles.tsx';

export interface CheckboxComponentProps {
  checked?: boolean;
  onUpdate?: (isChecked: boolean) => void;
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  testID?: string;
  labelText?: string;
  contentWrapper?: StyleProp<ViewStyle>;
  labelTextStyle?: StyleProp<TextStyle>;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  class?: 'primary' | 'secondary' | 'success';
  showLabel?: boolean;
  isRequired?: boolean;
}

const sizesWrapper = {
  xs: {
    width: 20,
    height: 20,
  },
  sm: {
    width: 24,
    height: 24,
  },
  md: {
    width: 28,
    height: 28,
  },
  lg: {
    width: 36,
    height: 36,
  },
};

const CheckboxComponent = (props: CheckboxComponentProps) => {
  console.log(props, 'props****');
  const {
    checked,
    onUpdate,
    label,
    labelStyle,
    disabled,
    testID,
    labelText,
    contentWrapper,
    labelTextStyle,
  } = props;
  const size = props.size || 'sm';
  const className = props.class || 'primary';
  const showLabel =
    props.showLabel !== undefined
      ? props.showLabel
      : !!(labelText && labelText.length > 0);
  const isRequired = props.isRequired !== undefined ? props.isRequired : true;

  const [isChecked, setIsChecked] = useState(!!checked);
  const animationValue = useRef(new Animated.Value(0)).current;
  const updateChecked = useCallback(
    (check: boolean) => {
      setIsChecked(check);
      if (onUpdate) {
        onUpdate(check);
      }
    },
    [onUpdate, setIsChecked],
  );

  useEffect(() => {
    setIsChecked(!!checked);
  }, [checked]);

  useEffect(() => {
    const toValue = isChecked ? styles.checkInner.opacity : 0;
    Animated.timing(animationValue, {
      useNativeDriver: true, //Add this line
      toValue,
      duration: 100,
    }).start();
  }, [animationValue, isChecked]);

  const borderColor =
    className === 'primary'
      ? Colors.primary
      : className === 'secondary'
      ? Colors.primary
      : Colors.success;
  const textColor =
    className === 'primary'
      ? Colors.labelText
      : className === 'secondary'
      ? Colors.backgroundColor
      : Colors.success;

  return (
    <View style={[CommonStyles.formWrapper, contentWrapper]}>
      {showLabel && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <LabelComponent
            title={labelText || ''}
            style={[labelTextStyle]}
            // textStyle={CommonStyles.formLabelText}
          />
          {isRequired && <Text style={CommonStyles.required}>*</Text>}
        </View>
      )}
      <TouchableOpacity
        testID={testID}
        style={styles.mainWrapper}
        activeOpacity={disabled ? 1 : 0.9}
        onPress={() => {
          if (!disabled) {
            updateChecked(!isChecked);
            console.log('checked');
          }
        }}>
        {!isChecked && (
          <View
            style={[
              styles.checkBox,
              sizesWrapper[size],
              {borderColor: isChecked ? borderColor : '#4A8ECC2B'},
            ]}>
            <Animated.View
              style={[
                styles.checkInner,
                {
                  backgroundColor: isChecked ? borderColor : Colors.primary,
                },
                sizesWrapper[size],
                {opacity: animationValue},
              ]}>
              <ImageConfig.CheckIcon
                color={textColor}
                width={sizesWrapper[size].width}
                height={sizesWrapper[size].height}
              />
            </Animated.View>
          </View>
        )}
        {isChecked && (
          <View>
            <ImageConfig.CheckBtnIcon width={24} height={24} />
          </View>
        )}
        {!!label && (
          <LabelComponent
            style={styles.labelHolder}
            title={label}
            textStyle={[
              styles.labelStyle,
              {color: disabled ? Colors.borderColor : Colors.textDark},
              labelStyle,
            ]}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(4),
    alignSelf: 'flex-start',
  },
  checkBox: {
    // marginVertical: verticalScale(3),
    width: moderateScale(28),
    height: verticalScale(28),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    padding: moderateScale(2),
    borderRadius: 4,
    // marginBottom: verticalScale(5),
  },

  checkInner: {
    opacity: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    width: moderateScale(26),
    borderRadius: 4,
    height: verticalScale(26),
    paddingBottom: verticalScale(3),
  },
  labelHolder: {marginHorizontal: moderateScale(5)},
  labelStyle: {
    fontSize: moderateScale(14),
    color: Colors.textDark,
    fontFamily: FontConfig.secondary.Regular,
  },
});
export default CheckboxComponent;

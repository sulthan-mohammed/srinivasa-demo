import React from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {Colors, FontConfig, ImageConfig} from '../utils';
import {SvgProps} from 'react-native-svg';
import CustomButton from './ButtonComponent';
import {moderateScale, verticalScale} from 'react-native-size-matters';

export interface ErrorComponentProps {
  style?: StyleProp<ViewStyle>;
  errDescStyle?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  text?: string;
  textColor?: string;
  textSize?: number;
  icon?: React.FC<SvgProps>;
  color?: string;
  width?: number;
  height?: number;
  onRefresh?: () => void;
  buttonText?: string;
  buttonClass?: 'primary' | 'secondary';
  descriptionText?: string;
  descriptionTextColor?: string;
  descriptionTextSize?: number;
}

const ErrorComponent = (props: ErrorComponentProps) => {
  const style = props.style;
  const errDescStyle = props.errDescStyle;
  const backgroundColor = props.backgroundColor || '#FFF';
  const text = props.text || 'Oops... Something went wrong!';
  const textColor = props.textColor;
  const textSize = props.textSize || 20;

  const descriptionText = props.descriptionText || undefined;
  const descriptionTextColor = props.descriptionTextColor;
  const descriptionTextSize = props.descriptionTextSize || 16;
  const color = props.color || Colors.textLight;
  const width = props.width || 62;
  const height = props.height || 62;

  const Icon = props.icon || ImageConfig.ErrorIcon;

  const onRefresh = props.onRefresh;
  const buttonText = props.buttonText || 'reload';
  const buttonClass = props.buttonClass || 'secondary';

  return (
    <View style={[styles.screen, style, {backgroundColor}]}>
      {<Icon width={width} height={height} color={color} />}
      <View style={styles.errorHolder}>
        <Text
          style={[
            styles.errorText,
            {
              color: textColor || Colors.accent,
              fontSize: textSize,
              fontFamily: FontConfig.primary.Bold,
            },
          ]}>
          {text}
        </Text>
      </View>
      {descriptionText && (
        <View style={[styles.errorDescHolder, errDescStyle]}>
          <Text
            style={[
              styles.errorDescText,
              {
                color: descriptionTextColor || Colors.textDark,
                fontSize: descriptionTextSize,
                fontFamily: FontConfig.primary.Regular,
              },
            ]}>
            {descriptionText}
          </Text>
        </View>
      )}
      {onRefresh && (
        <CustomButton
          style={{paddingHorizontal: 10}}
          title={buttonText}
          class={buttonClass}
          onPress={onRefresh}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: moderateScale(10),
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: verticalScale(200),
  },
  errorHolder: {
    marginVertical: verticalScale(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    lineHeight: 30,
    textAlign: 'center',
  },
  errorDescHolder: {
    marginBottom: verticalScale(30),
  },
  errorDescText: {
    lineHeight: 24,
    textAlign: 'center',
  },
});

export default ErrorComponent;

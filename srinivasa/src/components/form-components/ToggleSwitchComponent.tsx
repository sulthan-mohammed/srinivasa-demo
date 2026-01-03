import React, {useEffect, useRef} from 'react';
import {
  Animated,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import LabelComponent from '../LabelComponent';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {Colors} from '../../utils';
import CommonStyles from '../../utils/CommonStyles.tsx';

export interface ToggleSwitchComponentProps {
  isOn?: boolean;
  label?: string;
  onColor?: string;
  offColor?: string;
  size?: 'small' | 'large' | 'medium';
  labelStyle?: TextStyle;
  onToggle: (val: boolean) => void;
  icon?: any;
  disabled?: boolean;
  testID?: string;
  contentWrapper?: StyleProp<ViewStyle>;
}

const ToggleSwitchComponent = (props: ToggleSwitchComponentProps) => {
  const defaultProps = {
    isOn: false,
    onColor: Colors.primary,
    offColor: Colors.borderColor,
    size: 'medium',
    labelStyle: {},
    thumbOnStyle: {},
    thumbOffStyle: {},
    trackOnStyle: {},
    trackOffStyle: {},
    icon: null,
    disabled: false,
  };
  // @ts-ignore
  props = {...defaultProps, ...props};

  const {
    isOn,
    onToggle,
    disabled,
    label,
    icon,
    size,
    offColor,
    onColor,
    testID,
    contentWrapper,
  } = props;

  console.log(isOn, 'isOn');

  const calculateDimensions = (sizes: string) => {
    switch (sizes) {
      case 'small':
        return {
          width: moderateScale(40),
          padding: moderateScale(10),
          circleWidth: moderateScale(15),
          circleHeight: verticalScale(15),
          translateX: 22,
        };
      case 'large':
        return {
          width: moderateScale(70),
          padding: moderateScale(20),
          circleWidth: moderateScale(30),
          circleHeight: verticalScale(30),
          translateX: 38,
        };
      default:
        return {
          width: moderateScale(46),
          padding: moderateScale(12),
          circleWidth: moderateScale(18),
          circleHeight: verticalScale(18),
          translateX: 26,
        };
    }
  };

  const offsetX = useRef(new Animated.Value(0)).current;
  const dimensions = calculateDimensions(size || defaultProps.size);

  const createToggleSwitchStyle = (): StyleProp<ViewStyle> => ({
    justifyContent: 'center',
    width: dimensions.width,
    borderRadius: 20,
    padding: dimensions.padding,
    marginTop: moderateScale(8),
    backgroundColor: isOn ? onColor : offColor,
    ...(isOn ? defaultProps.trackOnStyle : defaultProps.trackOffStyle),
  });

  const createInsideCircleStyle: any = () => ({
    alignItems: 'center',
    justifyContent: 'center',
    margin: moderateScale(4),
    position: 'absolute',
    backgroundColor: 'white',
    transform: [{translateX: offsetX}],
    width: dimensions.circleWidth,
    height: dimensions.circleHeight,
    borderRadius: dimensions.circleWidth / 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: verticalScale(2),
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 1.5,
    ...(isOn ? defaultProps.thumbOnStyle : defaultProps.thumbOffStyle),
  });

  useEffect(() => {
    const toValue = isOn ? dimensions.width - dimensions.translateX : 0;

    Animated.timing(offsetX, {
      useNativeDriver: true, //Add this line
      toValue,
      duration: 300,
    }).start();
  }, [dimensions.translateX, dimensions.width, isOn, offsetX]);

  return (
    <View style={[CommonStyles.formWrapper, contentWrapper]}>
      <View style={styles.container}>
        {!!label && <LabelComponent style={styles.labelStyle} title={label} />}
        <TouchableOpacity
          testID={testID}
          style={createToggleSwitchStyle()}
          activeOpacity={0.8}
          onPress={() => {
            if (disabled) {
              null;
            } else {
              onToggle(!isOn);
            }
          }}>
          <Animated.View style={createInsideCircleStyle()}>
            {icon}
          </Animated.View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between',
  },
  labelStyle: {
    marginRight: moderateScale(10),
  },
});
export default ToggleSwitchComponent;

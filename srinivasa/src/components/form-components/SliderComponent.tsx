import React, {useCallback} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
// @ts-ignore
import Slider from 'react-native-slider';
import LabelComponent from '../LabelComponent';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Colors, FontConfig} from '../../utils';
import CommonStyles from '../../utils/CommonStyles';

export interface SliderComponentProps {
  labelText?: string;
  showLabel?: boolean;
  minValue: number;
  maxValue: number;
  showMinMax?: boolean;
  step?: number;
  value?: number;
  thumbImage?: any;
  testID?: string;
  minimumTintColor?: string;
  headerStyle?: StyleProp<ViewStyle>;
  contentWrapper?: StyleProp<ViewStyle>;
  thumbStyle?: StyleProp<ViewStyle>;
  trackStyle?: StyleProp<ViewStyle>;
  valueExtractor?: (num: number) => string;
  onChange?: (val: number) => void;
  labelTextStyle?: StyleProp<TextStyle>;
}

const SliderComponent = (props: SliderComponentProps) => {
  const {
    labelText,
    onChange,
    value,
    minValue,
    maxValue,
    // minimumTintColor,
    headerStyle,
    contentWrapper,
    // trackStyle,
    // thumbStyle,
    // testID,
    labelTextStyle,
  } = props;
  const step = props.step === undefined ? 0 : props.step;
  // const thumbImage = props.thumbImage || null;
  const showMinMax = props.showMinMax === undefined ? true : props.showMinMax;
  const showLabel =
    props.showLabel !== undefined
      ? props.showLabel
      : !!(labelText && labelText.length > 0);
  // const [sliderValue, setSliderValue] = useState<number>(0);
  const onSlidingComplete = useCallback(
    (val: number) => {
      // const tmpValue = Math.floor(val);
      const tmpValue = parseFloat(val.toFixed(1));
      // setSliderValue(tmpValue);
      if (onChange) {
        onChange(tmpValue);
      }
    },
    [onChange],
  );
  const defaultValueExtractor = useCallback((val: number): number => {
    return val;
  }, []);
  const valueExtractor = props.valueExtractor || defaultValueExtractor;
  // useEffect(() => {
  //   setSliderValue(value || 0);
  // }, [value]);
  // @ts-ignore
  return (
    <View
      style={[
        CommonStyles.formWrapper,
        contentWrapper,
        {borderWidth: 0, margin: 0},
      ]}>
      {showLabel && (
        <LabelComponent
          title={labelText || ''}
          style={[labelTextStyle]}
          textStyle={{color: Colors.labelText, paddingBottom: 6}}
        />
      )}
      <View style={styles.sliderWrapper}>
        {showMinMax && (
          <View style={[styles.infoWrapper, headerStyle]}>
            <Text style={styles.infoBoldText}>Min</Text>
            <Text style={styles.infoBoldText}>Max</Text>
          </View>
        )}
        <View style={styles.valuesWrapper}>
          {showMinMax && (
            <Text style={styles.infoText}>{valueExtractor(minValue)}</Text>
          )}
          <Text style={[styles.infoBoldText, {color: Colors.textDark}]}>
            {value}
          </Text>
          {showMinMax && (
            <Text style={styles.infoText}>{valueExtractor(maxValue)}</Text>
          )}
        </View>
        <Slider
            style={{width: '100%'}}
          // testID={testID}
          // minimumValue={minValue}
          // maximumValue={maxValue}
          step={step}
          value={value}
          onSlidingComplete={onSlidingComplete}
          // minimumTrackTintColor={minimumTintColor || Colors.primary}
          // thumbTintColor={Colors.primary}
          // trackStyle={trackStyle}
          // thumbImage={thumbImage}
          // thumbStyle={thumbStyle}
          onValueChange={() => {
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoWrapper: {
    flex: 1,
    paddingHorizontal: moderateScale(10),
    paddingVertical: verticalScale(5),
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  infoBoldText: {
    fontSize: scale(14),
    color: Colors.textDark,
    fontFamily: FontConfig.primary.Bold,
  },
  infoText: {
    fontSize: scale(14),
    fontWeight: '400',
    color: 'black',
    fontFamily: FontConfig.primary.Regular,
  },
  sliderWrapper: {flex: 0},
  valuesWrapper: {
    flex: 0,
    paddingHorizontal: moderateScale(13),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  valueItem: {flex: 0, alignItems: 'center'},
  valueItemText: {
    fontFamily: FontConfig.primary.Bold,
    fontSize: scale(16),
    color: Colors.textDark,
  },
});

export default SliderComponent;

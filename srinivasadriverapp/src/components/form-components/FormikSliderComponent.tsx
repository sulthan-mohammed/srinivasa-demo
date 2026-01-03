import React, {useEffect, useState} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {FieldProps} from 'formik';
import SliderComponent from './SliderComponent';
import {verticalScale} from 'react-native-size-matters';
import CommonStyles from '../../utils/CommonStyles.tsx';

export interface FormikSliderComponentProps {
  labelText?: string;
  formikField: FieldProps;
  errorMessage?: any;
  errorText?: StyleProp<TextStyle>;
  testID?: string;
  minValue: any;
  maxValue: any;
  step?: any;
  trackStyle?: StyleProp<ViewStyle>;
  thumbStyle?: StyleProp<ViewStyle>;
  headerStyle?: StyleProp<ViewStyle>;
  onUpdate?: (value: any) => void;
  thumbImage?: any;
  showMinMax?: boolean;
  baseStyle?: StyleProp<ViewStyle>;
  errorContainerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
}

const FormikSliderComponent = (props: FormikSliderComponentProps) => {
  const {
    labelText,
    formikField,
    errorMessage,
    errorText,
    testID,
    minValue,
    maxValue,
    step,
    trackStyle,
    thumbStyle,
    headerStyle,
    onUpdate,
  } = props;

  const {field, form} = formikField;
  const thumbImage = props.thumbImage || null;
  const showMinMax = props.showMinMax === undefined ? true : props.showMinMax;
  const baseStyle = props.baseStyle || {};
  const errorContainerStyle = props.errorContainerStyle || {};
  const [selected, setSelected] = useState<any>(field.value);

  useEffect(() => {
    setSelected(field.value);
    console.log(field.value, 'selected value');
  }, [field.value]);

  const hasError =
    form.touched[field.name] && form.errors && form.errors[field.name];
  const style: any = props.style || {};

  return (
    <View style={[styles.inputBaseWrapper, baseStyle]}>
      <View style={[styles.inputWrapper, style]}>
        {(errorMessage || hasError) && (
          <View
            style={[
              CommonStyles.errorContainer,
              CommonStyles.baseErrorContainerStyle,
              errorContainerStyle,
            ]}>
            <Text style={[CommonStyles.errorText, errorText]}>
              {errorMessage || form.errors[field.name]}
            </Text>
          </View>
        )}

        <SliderComponent
          labelText={labelText}
          minValue={minValue}
          maxValue={maxValue}
          step={step}
          thumbImage={thumbImage}
          testID={testID}
          value={selected || minValue}
          trackStyle={trackStyle}
          showMinMax={showMinMax}
          thumbStyle={thumbStyle}
          // wrapperStyle={wrapperStyle}
          headerStyle={headerStyle}
          onChange={value => {
            setSelected(value);
            console.log(value, 'slider value');
            form.setFieldTouched(field.name, true);
            form.setFieldValue(field.name, value);
            if (onUpdate) {
              onUpdate(value);
            }
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputBaseWrapper: {
    marginVertical: verticalScale(5),
  },
  inputWrapper: {
    marginBottom: verticalScale(5),
  },
});

export default FormikSliderComponent;

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
import DatePickerComponent from './DatePickerComponent';
import CommonStyles from '../../utils/CommonStyles.tsx';
import {Colors} from '../../utils';
import {verticalScale} from 'react-native-size-matters';

export interface FormikDatepickerComponentProps {
  labelText?: string;
  formikField: FieldProps;
  onUpdate?: (value: any) => void;
  showLabel?: boolean;
  minDate?: string;
  maxDate?: string;
  errorText?: StyleProp<TextStyle>;
  testID?: string;
  errorMessage?: any;
  contentWrapper?: StyleProp<ViewStyle>;
  isRequired?: boolean;
  baseStyle?: StyleProp<ViewStyle>;
  errorContainerStyle?: StyleProp<ViewStyle>;
  // inputStyles?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
}

const FormikDatepickerComponent = (props: FormikDatepickerComponentProps) => {
  const {
    labelText,
    formikField,
    onUpdate,
    showLabel,
    minDate,
    maxDate,
    errorText,
    testID,
    errorMessage,
    contentWrapper,
    isRequired,
  } = props;
  const {field, form} = formikField;
  const baseStyle = props.baseStyle || {};
  const errorContainerStyle = props.errorContainerStyle || {};
  const [selected, setSelected] = useState<string>(field.value);

  useEffect(() => {
    setSelected(field.value);
  }, [field.value]);

  const hasError =
    form.touched[field.name] && form.errors && form.errors[field.name];
  const style: any = props.style || {};

  return (
    <View style={[styles.inputBaseWrapper, baseStyle, style]}>
      <View>
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
        <View>
          <DatePickerComponent
            style={hasError ? {borderColor: Colors.warn} : {}}
            labelText={labelText}
            testID={testID}
            showLabel={showLabel}
            date={selected}
            minDate={minDate}
            maxDate={maxDate}
            isRequired={isRequired}
            contentWrapper={contentWrapper}
            onUpdate={value => {
              setSelected(value);
              form.setFieldTouched(field.name, true);
              form.setFieldValue(field.name, value);
              if (onUpdate) {
                onUpdate(value);
              }
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputBaseWrapper: {
    marginVertical: verticalScale(5),
  },
});

export default FormikDatepickerComponent;

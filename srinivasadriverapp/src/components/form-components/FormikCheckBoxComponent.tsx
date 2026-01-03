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
import CheckboxComponent from './CheckBoxComponent';
import {verticalScale} from 'react-native-size-matters';
import CommonStyles from '../../utils/CommonStyles.tsx';

export interface FormikCheckboxComponentProps {
  labelText?: string;
  formikField: FieldProps;
  onUpdate?: (value: any) => void;
  disabled?: boolean;
  errorText?: StyleProp<TextStyle>;
  errorMessage?: any;
  testID?: string;
  label: string;
  contentWrapper?: StyleProp<ViewStyle>;
  class?: 'primary' | 'secondary' | 'success';
  baseStyle?: StyleProp<ViewStyle>;
  errorContainerStyle?: StyleProp<ViewStyle>;
  // showLabel?: boolean;
  // inputStyles?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  // direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
}

const FormikCheckboxComponent = (props: FormikCheckboxComponentProps) => {
  const {
    labelText,
    formikField,
    onUpdate,
    disabled,
    errorText,
    errorMessage,
    testID,
    label,
    contentWrapper,
  } = props;
  const {field, form} = formikField;
  const classType = props.class === undefined ? 'primary' : props.class;
  const baseStyle = props.baseStyle || {};
  const errorContainerStyle = props.errorContainerStyle || {};
  const [selected, setSelected] = useState<boolean>(field.value);

  useEffect(() => {
    setSelected(field.value);
  }, [field.value]);

  console.log(field.value, testID, 'field.value');
  const hasError = form.errors && form.errors[field.name];
  const style: any = props.style || {};

  return (
    <View style={[baseStyle]}>
      <View style={[style]}>
        {(errorMessage || hasError) && (
          <View
            style={[
              styles.errorContainer,
              styles.baseErrorContainerStyle,
              errorContainerStyle,
            ]}>
            <Text style={[CommonStyles.errorText, errorText]}>
              {errorMessage || form.errors[field.name]}
            </Text>
          </View>
        )}
        <View>
          <CheckboxComponent
            testID={testID}
            class={classType}
            disabled={disabled}
            checked={selected}
            contentWrapper={contentWrapper}
            onUpdate={value => {
              setSelected(value);
              form.setFieldTouched(field.name, true);
              form.setFieldValue(field.name, value);
              if (onUpdate) {
                onUpdate(value);
              }
            }}
            label={label}
            labelText={labelText}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  baseErrorContainerStyle: {
    top: verticalScale(-30),
  },
  errorContainer: {
    marginVertical: verticalScale(3),
    position: 'absolute',
    right: 0,
  },
});

export default FormikCheckboxComponent;

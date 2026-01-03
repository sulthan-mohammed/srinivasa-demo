import React, {useState} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {FieldProps} from 'formik';
import TextInputComponent from './TextInputComponent';
import {verticalScale} from 'react-native-size-matters';
import {Colors} from '../../utils';
import CommonStyles from '../../utils/CommonStyles.tsx';

export interface FormikInputComponentProps {
  showLabel?: boolean;
  labelText: string;
  focusBackgroundColor?: StyleProp<TextStyle>;
  onBlurBackgroundColor?: string;
  inputStyles?: StyleProp<TextStyle>;
  labelTextStyle?: StyleProp<TextStyle>;
  errorText?: StyleProp<TextStyle>;
  errorContainerStyle?: StyleProp<ViewStyle>;
  baseStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  inputWrapperStyle?: StyleProp<ViewStyle>;
  isPassword?: boolean;
  formikField: FieldProps;
  onUpdate?: (value: any) => void;
  inputProperties?: TextInputProps;
  trimSpaces?: boolean;
  trimSpecialCharacters?: boolean;
  trimNumbers?: boolean;
  trimLeft?: boolean;
  trimCharacters?: boolean;
  secureTextEntry?: any;
  errorMessage?: any;
  isRequired?: boolean;
  editable?: boolean;
  placeholder?: string;
}

const FormikInputComponent = (props: FormikInputComponentProps) => {
  const {
    labelText,
    formikField,
    inputProperties,
    onUpdate,
    errorMessage,
    errorText,
    labelTextStyle,
    editable,
    showLabel,
    placeholder,
  } = props;

  // const {field, form} = formikField;
  const [hasFocus, setHasFocus] = useState(false);

  const inputStyles = props.inputStyles || {};
  const baseStyle = props.baseStyle || {};
  const inputWrapperStyle = props.inputWrapperStyle || {};
  const errorContainerStyle = props.errorContainerStyle || {};

  const {field, form} = formikField;
  const hasError =
    form.touched[field.name] && form.errors && form.errors[field.name];
  const trimLeft = props.trimLeft === undefined ? false : props.trimLeft;
  const trimCharacters =
    props.trimCharacters === undefined ? false : props.trimCharacters;
  const trimNumbers =
    props.trimNumbers === undefined ? false : props.trimNumbers;
  const isRequired = props.isRequired !== undefined ? props.isRequired : true;
  const trimSpecialCharacters =
    props.trimSpecialCharacters === undefined
      ? false
      : props.trimSpecialCharacters;
  const trimSpaces = props.trimSpaces === undefined ? false : props.trimSpaces;

  const onUpdates = (text: string) => {
    form.setFieldTouched(field.name);
    form.setFieldValue(field.name, text);
    if (onUpdate) {
      onUpdate(text);
    }
  };

  const onInputBlur = () => {
    setHasFocus(false);
    form.handleBlur(field.name);
    form.setFieldTouched(field.name);
  };
  const onFocus = () => {
    setHasFocus(true);
  };

  // console.log(hasError, field, 'caecae');

  return (
    <View style={[styles.inputBaseWrapper, baseStyle, inputWrapperStyle]}>
      <TextInputComponent
        trimSpaces={trimSpaces}
        editable={editable}
        trimSpecialCharacters={trimSpecialCharacters}
        trimNumbers={trimNumbers}
        trimCharacters={trimCharacters}
        trimLeft={trimLeft}
        onUpdate={onUpdates}
        placeholderTextColor={'#D3D3D3'}
        inputStyles={[
          inputStyles,
          {
            borderColor: hasFocus
              ? Colors.primary
              : hasError
              ? Colors.error
              : Colors.textDark,
          },
        ]}
        inputProperties={inputProperties}
        value={field.value}
        onFocus={onFocus}
        nativeID={field.name}
        placeholder={placeholder}
        testID={field.name}
        onInputBlur={onInputBlur}
        labelText={labelText}
        showLabel={showLabel}
        labelTextStyle={labelTextStyle}
        isRequired={isRequired}
      />

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
    </View>
  );
};

const styles = StyleSheet.create({
  inputBaseWrapper: {
    marginVertical: verticalScale(5),
    // borderWidth: 1,
  },
});

export default FormikInputComponent;

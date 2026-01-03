import React, {PropsWithChildren} from 'react';
import {StyleProp, Text, TextStyle, View, ViewStyle} from 'react-native';
import {FieldProps} from 'formik';
import DropdownComponent from './DropdownComponent';
import {Colors} from '../../utils';
import CommonStyles from '../../utils/CommonStyles.tsx';

export interface FormikDropdownComponentProps {
  data: any;
  formikField: FieldProps;
  onUpdate?: (value: any) => void;
  contentWrapper?: StyleProp<ViewStyle>;
  search?: boolean;
  placeholder?: string;
  multiple?: boolean;
  style?: StyleProp<ViewStyle>;
  errorText?: StyleProp<TextStyle>;
  showLabel?: boolean;
  errorMessage?: any;
  labelText: string;
  isRequired?: boolean;
  testID?: string;
  errorContainerStyle?: StyleProp<ViewStyle>;
  dropdownPosition?: 'top' | 'bottom' | 'auto';
}

const FormikDropdownComponent = (
  props: PropsWithChildren<FormikDropdownComponentProps>,
) => {
  const {
    data,
    formikField,
    onUpdate,
    contentWrapper,
    errorText,
    search,
    placeholder,
    multiple,
    style,
    showLabel,
    errorMessage,
    labelText,
    isRequired,
    testID,
  } = props;
  const {field, form} = formikField;
  const hasError =
    form.touched[field.name] && form.errors && form.errors[field.name];
  const errorContainerStyle = props.errorContainerStyle || {};

  console.log(errorMessage, 'errorMessage');
  return (
    <View style={[contentWrapper]}>
      <View>
        {/*<Text*/}
        {/*  style={{*/}
        {/*    color: Colors.error,*/}
        {/*    fontFamily: FontConfig.primary.Regular,*/}
        {/*    fontSize: moderateScale(14),*/}
        {/*    marginHorizontal: moderateScale(20),*/}
        {/*    // borderWidth: 1,*/}
        {/*  }}>*/}
        {/*  {errorMessage}*/}
        {/*</Text>*/}
        <DropdownComponent
          dropdownPosition={props?.dropdownPosition}
          testID={testID}
          data={data}
          value={field.value}
          search={search}
          showLabel={showLabel}
          labelText={labelText}
          isRequired={isRequired}
          contentWrapper={contentWrapper}
          multiple={multiple}
          onUpdate={option => {
            form.setFieldTouched(field.name);
            form.handleChange(field.name);
            form.setFieldValue(field.name, option);
            if (onUpdate) {
              onUpdate(option);
            }
          }}
          placeholder={placeholder}
          style={[
            {borderColor: hasError ? Colors.warn : Colors.borderColor},
            style,
          ]}
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
    </View>
  );
};

export default FormikDropdownComponent;

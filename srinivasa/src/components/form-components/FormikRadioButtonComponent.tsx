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
import RadioButtonComponent from './RadioButtonComponent';
import LabelComponent from '../LabelComponent';
import {verticalScale} from 'react-native-size-matters';
import CommonStyles from '../../utils/CommonStyles.tsx';
import {Colors} from '../../utils';

export interface RadioButtonType {
  id: string | number | boolean;
  title: string;
  disabled?: boolean;
}

export interface FormikRadioGroupComponentProps {
  radioButtons: RadioButtonType[];
  labelText?: string;
  radioStyle?: StyleProp<ViewStyle>;
  formikField: FieldProps;
  onUpdate?: (value: any) => void;
  labelStyle?: StyleProp<TextStyle>;
  errorMessage?: any;
  labelTextStyle?: StyleProp<TextStyle>;
  errorText?: StyleProp<TextStyle>;
  testID?: string;
  contentWrapper?: StyleProp<ViewStyle>;
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  showLabel?: boolean;
  isRequired?: boolean;
  errorContainerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
}

const FormikRadioGroupComponent = (props: FormikRadioGroupComponentProps) => {
  const {
    radioButtons,
    labelText,
    radioStyle,
    formikField,
    onUpdate,
    labelStyle,
    errorMessage,
    labelTextStyle,
    errorText,
    testID,
    contentWrapper,
  } = props;
  const {field, form} = formikField;
  const direction = props.direction || 'row';
  const showLabel =
    props.showLabel !== undefined
      ? props.showLabel
      : !!(labelText && labelText.length > 0);
  const isRequired = props.isRequired !== undefined ? props.isRequired : true;
  const errorContainerStyle = props.errorContainerStyle || {};
  const [selectedRadio, setSelectedRadio] = useState<
    string | number | boolean | undefined
  >(field.value);

  useEffect(() => {
    setSelectedRadio(field.value);
  }, [field.value]);

  const hasError =
    form.touched[field.name] && form.errors && form.errors[field.name];
  const style: any = props.style || {};

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
            textStyle={CommonStyles.formLabelText}
          />
          {isRequired && (
            <Text style={{color: Colors.primary, top: -4}}>*</Text>
          )}
        </View>
      )}
      <View style={[style]}>
        {/*{props.sideIcon && <Ionicons size={20} color={Colors.textLight} name={props.sideIcon}/>}*/}
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
        <View
          testID={testID}
          style={[
            {
              flexWrap: 'wrap',
              flexDirection: direction,
              alignItems: direction === 'row' ? 'flex-start' : 'flex-start',
              justifyContent: direction === 'row' ? 'flex-start' : 'flex-start',
            },
            props.buttonStyle,
          ]}>
          {radioButtons &&
            radioButtons.map(radioButton => {
              return (
                <RadioButtonComponent
                  disabled={radioButton.disabled}
                  style={[
                    {
                      marginBottom: 6,
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    },
                    radioStyle,
                  ]}
                  checked={selectedRadio === radioButton.id}
                  labelStyle={labelStyle}
                  key={radioButton.id + '_' + radioButton.title}
                  label={radioButton.title}
                  onChange={value => {
                    if (!radioButton.disabled) {
                      setSelectedRadio(value);
                      form.setFieldTouched(field.name, true);
                      form.setFieldValue(field.name, value);
                      if (onUpdate) {
                        onUpdate(value);
                      }
                    }
                  }}
                  size={'xs'}
                  value={radioButton.id}
                />
              );
            })}
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

export default FormikRadioGroupComponent;

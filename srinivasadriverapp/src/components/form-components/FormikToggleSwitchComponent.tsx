import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {FieldProps} from 'formik';
import ToggleSwitchComponent from './ToggleSwitchComponent';
import {scale, verticalScale} from 'react-native-size-matters';
import {Colors, FontConfig} from '../../utils';
import CommonStyles from '../../utils/CommonStyles.tsx';

export interface FormikToggleSwitchComponentProps {
  labelText?: string;
  inputStyles?: StyleProp<TextStyle>;
  errorText?: StyleProp<TextStyle>;
  errorContainerStyle?: StyleProp<ViewStyle>;
  baseStyle?: StyleProp<ViewStyle>;
  contentWrapper?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  formikField: FieldProps;
  onUpdate?: (value: any) => void;
  disabled?: boolean;
  testID?: string;
  errorMessage?: any;
  size?: any;
  onColor?: string;
  offColor?: string;
}

const FormikToggleSwitchComponent = (
  props: FormikToggleSwitchComponentProps,
) => {
  const {
    labelText,
    formikField,
    onUpdate,
    disabled,
    errorText,
    size,
    testID,
    contentWrapper,
    errorMessage,
  } = props;
  const onColor = props.onColor || Colors.borderColor;
  const offColor = props.offColor || Colors.borderColor;
  const {field, form} = formikField;
  const baseStyle = props.baseStyle || {};
  const errorContainerStyle = props.errorContainerStyle || {};
  // const [selected, setSelected] = useState<boolean>(field.value);

  // useEffect(() => {
  //   setSelected(field.value);
  // }, [field.value]);

  const hasError =
    form.touched[field.name] && form.errors && form.errors[field.name];
  const style: any = props.style || {};

  return (
    <View style={[styles.inputBaseWrapper, baseStyle]}>
      {/*{showLabel && (*/}
      {/*  <LabelComponent style={{paddingBottom: 10}} title={labelText || ''} />*/}
      {/*)}*/}
      <View style={[styles.inputWrapper, style]}>
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
          <ToggleSwitchComponent
            testID={testID}
            contentWrapper={contentWrapper}
            isOn={field.value}
            onToggle={value => {
              console.log(value, 'valueeee');
              // setSelected(value);
              form.setFieldTouched(field.name, true);
              form.setFieldValue(field.name, value);
              if (onUpdate) {
                onUpdate(value);
              }
            }}
            label={labelText}
            size={size}
            disabled={disabled}
            offColor={offColor}
            onColor={onColor}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputBaseWrapper: {
    marginVertical: 8,
    // borderWidth: 1
  },
  labelText: {
    fontFamily: FontConfig.primary.Regular,
    fontSize: scale(14),
    color: Colors.textDark,
  },
  baseErrorContainerStyle: {
    top: verticalScale(-30),
  },

  inputWrapper: {
    marginVertical: verticalScale(5),
  },
  input: {
    height: verticalScale(40),
    width: '100%',
    paddingHorizontal: 0,
    color: Colors.textDark,
    fontFamily: FontConfig.primary.Regular,
    fontSize: scale(16),
  },
  errorContainer: {
    marginVertical: verticalScale(3),
    position: 'absolute',
    right: 0,
  },
});

export default FormikToggleSwitchComponent;

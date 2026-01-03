import React from 'react';
import {
  StyleProp,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import LabelComponent from '../LabelComponent';
import {Colors} from '../../utils';
import CommonStyles from '../../utils/CommonStyles.tsx';

export interface textInputComponentProps {
  trimSpaces?: boolean;
  trimSpecialCharacters?: boolean;
  trimNumbers?: boolean;
  trimCharacters?: boolean;
  trimLeft?: boolean;
  onUpdate?: (value: any) => void;
  inputStyles?: StyleProp<TextStyle>;
  inputProperties?: TextInputProps;
  contentWrapper?: StyleProp<ViewStyle>;
  testID?: string;
  placeholder?: string;
  value?: any;
  nativeID?: any;
  onFocus?: any;
  onInputBlur?: any;
  editable?: boolean;
  showLabel?: boolean;
  labelText?: string;
  placeholderTextColor?: string;
  isRequired?: boolean;
  labelTextStyle?: StyleProp<TextStyle>;
}

const TextInputComponent = (props: textInputComponentProps) => {
  const {
    labelText,
    trimSpaces,
    trimSpecialCharacters,
    trimNumbers,
    trimCharacters,
    trimLeft,
    onUpdate,
    // keyboardType,
    inputProperties,
    contentWrapper,
    testID,
    labelTextStyle,
    value,
    nativeID,
    onFocus,
    onInputBlur,
  } = props;
  const inputStyles = props.inputStyles || {};
  const placeholderTextColor =
    props.placeholderTextColor !== undefined
      ? props.placeholderTextColor
      : Colors.borderColor;
  const editable = props.editable === undefined ? true : props.editable;
  const placeholder =
    props.placeholder === undefined ? `Enter ${labelText}` : props.placeholder;
  const showLabel =
    props.showLabel !== undefined
      ? props.showLabel
      : !!(labelText && labelText.length > 0);
  const isRequired = props.isRequired !== undefined ? props.isRequired : true;

  const textChangeHandler = (text: string) => {
    // console.log(form.dirty);
    if (trimSpaces) {
      text = text.replace(/ /g, '');
    }
    if (trimSpecialCharacters) {
      text = text.replace(/[^a-zA-Z0-9 ]/g, '');
    }
    if (trimNumbers) {
      text = text.replace(/[^a-zA-Z ]/g, '');
    }
    if (trimCharacters) {
      text = text.replace(/[^0-9 ]/g, '');
      text = text.replace(/^0+/, '');
    }
    if (trimLeft) {
      text = text.trimLeft();
    }
    if (onUpdate) {
      onUpdate(text);
    }
  };

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
          {isRequired && <Text style={CommonStyles.required}>*</Text>}
        </View>
      )}
      <TextInput
        placeholderTextColor={placeholderTextColor}
        style={[
          CommonStyles.inputStyle,
          {
            color: editable ? Colors.borderColor : Colors.borderColor,
          },
          inputStyles,
        ]}
        placeholder={placeholder}
        value={value}
        autoCapitalize={'none'}
        autoCorrect={false}
        editable={editable}
        onFocus={onFocus}
        nativeID={nativeID}
        testID={testID}
        onChangeText={textChangeHandler}
        onBlur={onInputBlur}
        {...inputProperties}
      />
    </View>
  );
};

export default TextInputComponent;

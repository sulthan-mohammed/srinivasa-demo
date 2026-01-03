import React, {PropsWithChildren, useState} from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import LabelComponent from '../LabelComponent';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import CommonStyles from '../../utils/CommonStyles.tsx';

export interface DropdownComponentProps {
  data: [];
  onUpdate?: (value: any) => void;
  contentWrapper?: StyleProp<ViewStyle>;
  search?: boolean;
  labelText?: string;
  value: any;
  style?: StyleProp<ViewStyle>;
  showLabel?: boolean;
  multiple?: boolean;
  placeholder?: string;
  testID?: string;
  isRequired?: boolean;
  dropdownPosition?: 'auto' | 'top' | 'bottom';
}

const DropdownComponent = (
  props: PropsWithChildren<DropdownComponentProps>,
) => {
  const {data, onUpdate, contentWrapper, search, labelText, value, style} =
    props;
  const showLabel =
    props.showLabel !== undefined
      ? props.showLabel
      : !!(labelText && labelText.length > 0);
  const multiple = props.multiple === undefined ? false : props.multiple;
  const placeholder =
    props.placeholder === undefined ? 'Select Item' : props.placeholder;
  const testID = props.testID;
  const isRequired = props.isRequired !== undefined ? props.isRequired : true;
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={[CommonStyles.formWrapper, contentWrapper]}>
      <View style={styles.container}>
        {showLabel && (
          <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
            <LabelComponent
              title={labelText || ''}
              textStyle={{paddingBottom: 6}}
            />
            {isRequired && <Text style={CommonStyles.required}>*</Text>}
          </View>
        )}
        {multiple ? (
          <MultiSelect
            style={[CommonStyles.inputStyle, style]}
            placeholderStyle={CommonStyles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            search
            data={data}
            labelField="label"
            valueField="value"
            placeholder={placeholder}
            searchPlaceholder="Search..."
            value={value}
            onChange={item => {
              console.log(item, 'item');
              if (onUpdate) {
                onUpdate(item);
              }
            }}
            selectedStyle={styles.selectedStyle}
          />
        ) : (
          <Dropdown
            testID={testID}
            style={[CommonStyles.inputStyle, style]}
            placeholderStyle={CommonStyles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            dropdownPosition={props.dropdownPosition}
            search={search}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? placeholder : '...'}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              console.log(item.value, 'item');
              setIsFocus(false);
              if (onUpdate) {
                onUpdate(item.value);
              }
            }}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'white',
  },
  selectedTextStyle: {
    fontSize: scale(16),
  },
  iconStyle: {
    width: moderateScale(32),
    height: verticalScale(22),
  },
  inputSearchStyle: {
    height: verticalScale(40),
    fontSize: scale(16),
  },
  selectedStyle: {
    borderRadius: 12,
  },
});

export default DropdownComponent;

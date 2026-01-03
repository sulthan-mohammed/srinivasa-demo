import React from 'react';
import {
    ActivityIndicator,
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    TouchableOpacityProps,
    ViewStyle,
} from 'react-native';
import { Colors } from '../utils';
import { SvgProps } from 'react-native-svg';
import { moderateScale, verticalScale } from 'react-native-size-matters';

export interface CustomButtonProps {
    title: string;
    isLoading?: boolean;
    showLoading?: boolean;
    loadingPercent?: number;
    class?: 'primary' | 'secondary';
    type?: 'normal' | 'outline';
    disabled?: boolean;
    Icon?: any;
    iconPosition?: 'left' | 'right';
    iconStyle?: StyleProp<SvgProps>;
    iconColor?: string;
    iconSize?: number;
    style?: StyleProp<ViewStyle>;
    textStyle?: TextStyle;
    onPress?: () => void;
    autoWidth?: boolean;
    touchProps?: TouchableOpacityProps;
    testID?: string;
    buttonTitleTestId?: string;
}

const CustomButton = ({
    title,
    isLoading = false,
    // showLoading = false,
    class: btnClass = 'secondary',
    type = 'normal',
    disabled = false,
    Icon,
    iconPosition = 'right',
    iconColor,
    iconSize = 28,
    style,
    textStyle,
    onPress,
    autoWidth = false,
    touchProps = {},
    testID,
    buttonTitleTestId,
}: CustomButtonProps) => {
    const textColor =
        type === 'normal'
            ? Colors.backgroundColor
            : btnClass === 'primary'
            ? Colors.primary
            : Colors.textDark;

    const touchWidth = autoWidth
        ? isLoading
            ? { width: '35%' }
            : {}
        : { width: '100%' };

    const disabledStyle = disabled ? styles.disabled : {};

    const getIcon = () => {
        if (!Icon) {return null;}
        return <Icon color={iconColor || textColor} width={iconSize} />;
    };

    const getOutlineBtn = (cls: string) => (
        <TouchableOpacity
            testID={testID}
            activeOpacity={disabled ? 1 : 0.6}
            {...touchProps}
            disabled={disabled}
            style={[
                styles.buttonOutline,
                { borderColor: cls === 'primary' ? Colors.primary : Colors.textDark },
                style,
                touchWidth,
                disabledStyle,
            ]}
            onPress={onPress}
        >
            {isLoading ? (
                <ActivityIndicator
                    color={cls === 'primary' ? Colors.primary : Colors.textDark}
                    size="large"
                />
            ) : (
                <>
                    {iconPosition === 'left' && getIcon()}
                    <Text
                        testID={buttonTitleTestId}
                        numberOfLines={1}
                        style={[
                            styles.buttonCommonText,
                            { color: disabled ? Colors.backgroundColor : textColor },
                            textStyle,
                        ]}
                    >
                        {title}
                    </Text>
                    {iconPosition === 'right' && getIcon()}
                </>
            )}
        </TouchableOpacity>
    );

    if (type === 'outline' && ['primary', 'secondary'].includes(btnClass)) {
        return getOutlineBtn(btnClass);
    }

    return (
        <TouchableOpacity
            testID={testID}
            activeOpacity={disabled ? 1 : 0.6}
            {...touchProps}
            disabled={disabled}
            style={[
                styles.button,
                btnClass === 'primary' ? styles.buttonPrimary : styles.buttonSecondary,
                touchWidth,
                style,
                disabledStyle,
                btnClass === 'secondary' && disabled && {
                    backgroundColor: Colors.borderColor,
                    borderColor: Colors.borderColor,
                },
            ]}
            onPress={onPress}
        >
            {isLoading ? (
                <ActivityIndicator
                    color={btnClass === 'primary' ? Colors.backgroundColor : Colors.backgroundColor}
                    size={'large'}
                />
            ) : (
                <>
                    {iconPosition === 'left' && getIcon()}
                    <Text
                        testID={buttonTitleTestId}
                        numberOfLines={1}
                        style={[
                            styles.buttonCommonText,
                            btnClass === 'primary'
                                ? styles.buttonText
                                : styles.buttonSecondaryText,
                            {
                                color: btnClass === 'primary'
                                    ? disabled
                                        ? Colors.backgroundColor
                                        : textColor
                                    : Colors.backgroundColor,
                                // fontFamily:
                                //     btnClass === 'secondary'
                                //         ? FontConfig.secondary.Regular
                                //         : undefined,
                            },
                            textStyle,
                        ]}
                    >
                        {title}
                    </Text>
                    {iconPosition === 'right' && getIcon()}
                </>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    progressBarHolder: {
        backgroundColor: '#EEE',
        borderWidth: StyleSheet.hairlineWidth,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        height: moderateScale(6),
        borderRadius: 8,
    },
    progressBar: {
        width: '0%',
        height: moderateScale(5),
        borderRadius: 8,
    },
    buttonOutline: {
        borderRadius: 10,
        flexDirection: 'row',
        height: moderateScale(42),
        marginVertical: verticalScale(10),
        paddingHorizontal: moderateScale(10),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.5,
    },
    button: {
        borderRadius: 10,
        marginVertical: verticalScale(10),
        height: verticalScale(42),
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: moderateScale(10),
        flexDirection: 'row',
    },
    disabled: {
        backgroundColor: Colors.borderColor,
        borderColor: Colors.borderColor,
    },
    buttonPrimary: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    buttonSecondary: {
        backgroundColor: Colors.textDark,
        borderColor: Colors.primary,
    },
    buttonCommonText: {
        fontSize: moderateScale(16),
        textAlign: 'center',
        // fontFamily: FontConfig.secondary.Regular,
    },
    buttonText: {
        color: Colors.backgroundColor,
    },
    buttonSecondaryText: {
        color: Colors.backgroundColor,
    },
});

export default CustomButton;

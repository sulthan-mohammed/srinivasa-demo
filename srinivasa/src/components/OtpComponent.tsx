import React, {useEffect, useState} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
// @ts-ignore
// import CountDown from 'react-native-countdown-component';
import {Colors, FontConfig} from '../utils';
import CustomButton from './ButtonComponent';
// @ts-ignore
import BackgroundTimer from 'react-native-background-timer';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

// @ts-ignore
declare module 'react-native-background-timer' {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  interface BackgroundTimer {
    setInterval: (callback: () => void, delay: number) => number;
    clearInterval: (intervalId: number) => void;
  }

  const BackgroundTimer: BackgroundTimer;

  export default BackgroundTimer;
}

export interface OTPComponentProps {
  style?: StyleProp<ViewStyle>;
  onComplete: (otp: string) => void;
  onCancel?: () => void;
  resendOtp: () => void;
  otp?: string;
  disableCancel?: boolean;
  isLoading?: boolean;
  rootStyle?: StyleProp<ViewStyle>;
  wrapper?: StyleProp<ViewStyle>;
  showInvalidOtp?: boolean;
}

const CELL_COUNT = 4;
const OTPComponent = (props: OTPComponentProps) => {
  const {onComplete, otp, rootStyle, resendOtp, isLoading, showInvalidOtp} =
    props;
  const [value, setValue] = useState('');
  const [otpProps, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const [disable, setDisable] = useState(true);
  console.log(disable, 'disable');
  const [secondsRemaining, setSecondsRemaining] = useState(60);
  const startTimer = () => {
    const id = BackgroundTimer.setInterval(() => {
      setSecondsRemaining(prevSeconds => prevSeconds - 1);
    }, 1000);
    setIntervalId(id);
  };

  const stopTimer = () => {
    BackgroundTimer.clearInterval(intervalId as number);
    setIntervalId(null);
  };

  const handleResendOtp = () => {
    setSecondsRemaining(60);
    resendOtp();
  };

  const handleTextInput = (text: string) => {
    // Remove any non-digit character
    const digitsOnly = text.replace(/[^0-9]/g, '');

    setValue(digitsOnly);
  };

  useEffect(() => {
    if (secondsRemaining > 0) {
      startTimer();
    }
    return () => {
      stopTimer();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); //don't add dependencies here

  useEffect(() => {
    if (otp) {
      setValue(otp);
      if (otp.length === 6) {
        setDisable(false);
      }
    }
  }, [otp]);

  return (
    <View>
      <View>
        <CodeField
          testID={'barcode_input'}
          ref={ref}
          {...otpProps}
          value={value}
          onChangeText={handleTextInput}
          cellCount={CELL_COUNT}
          rootStyle={[styles.codeFieldRoot]}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <View
              key={index}
              style={[styles.cell, isFocused && styles.focusCell, rootStyle]}
              onLayout={getCellOnLayoutHandler(index)}>
              <Text style={styles.cellText}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
          )}
        />
      </View>
      {showInvalidOtp && (
        <View style={styles.invalidOtpText}>
          <Text style={{color: '#F28888'}}>
            Invalid OTP. Please enter valid OTP.
          </Text>
        </View>
      )}
      <View style={{marginHorizontal: scale(24), marginTop: verticalScale(24)}}>
        <CustomButton
          onPress={() => {
            console.log(value);
            onComplete(value);
            setValue('');
          }}
          isLoading={isLoading}
          title={'Verify OTP'}
          class={'primary'}
          disabled={value.length < 4}
        />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 24,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View>
              {secondsRemaining > 0 ? (
                <Text
                  style={{
                    color: '#727272',
                    fontSize: 14,
                    fontFamily: FontConfig.secondary.Regular,
                    padding: 8,
                  }}>{`Resend OTP in ${secondsRemaining} seconds`}</Text>
              ) : (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: moderateScale(14),
                      fontFamily: FontConfig.secondary.Regular,
                      color: Colors.borderColor,
                    }}>
                    Didn’t receive a code?
                  </Text>
                  <TouchableOpacity onPress={handleResendOtp}>
                    <Text
                      testID={'submit-otp'}
                      style={{
                        fontSize: moderateScale(14),
                        fontFamily: FontConfig.secondary.Bold,
                        color: Colors.primary,
                        marginHorizontal: 5,
                        textDecorationLine: 'underline',
                      }}>
                      Resend OTP
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  codeFieldRoot: {
    // marginTop: 20,
    // paddingHorizontal: 20,
    // backgroundColor: Colors.textGrey,
    alignItems: 'center',
    // width: '100%',
    marginHorizontal: 45,
  },

  cell: {
    width: moderateScale(46),
    height: moderateScale(46),
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 10,
    backgroundColor: Colors.backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellText: {
    fontSize: 20,
    textAlign: 'center',
    color: Colors.borderColor,
    fontFamily: FontConfig.secondary.Regular,
  },
  focusCell: {
    textAlign: 'center',
    borderColor: Colors.primary,
  },
  // cell: {
  //   width: 50,
  //   height: 44,
  //   lineHeight: 38,
  //   marginVertical: 10,
  //   fontSize: 24,
  //   fontFamily: FontConfig.primary.bold,
  //   borderWidth: 2,
  //   borderColor: Colors.border,
  //   borderRadius: 5,
  //   textAlign: 'center',
  //   backgroundColor: Colors.backgroundColor,
  //   color: Colors.textLight,
  // },
  // focusCell: {
  //   borderColor: Colors.primary,
  // },
  forgotPasswordHolder: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  forgotPasswordText: {
    fontSize: 16,
    fontFamily: FontConfig.secondary.Medium,
    color: Colors.primary,
  },
  button: {
    marginTop: 100,
    width: 100,
    backgroundColor: Colors.primary,
  },
  invalidOtpText: {
    marginTop: 10,
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: FontConfig.secondary.Regular,
    color: '#F28888',
  },
});

export default OTPComponent;

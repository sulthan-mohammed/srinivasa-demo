import {StyleSheet} from 'react-native';
import FontConfig from './FontConfig';
import {Colors} from './index';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

const CommonStyles = StyleSheet.create({
  pageTitle: {
    fontFamily: FontConfig.primary.Bold,
    fontSize: 24,
    color: Colors.primary,
  },
  flexZeroCenter: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexRowLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelText: {
    fontFamily: FontConfig.primary.Medium,
    marginTop: 5,
    fontSize: 16,
    color: '#CFD0D0',
  },
  formLabelText: {
    color: Colors.labelText,
    paddingBottom: 6,
  },
  flex: {
    flex: 1,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexRowTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  flexLeftTop: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  formWrapper: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  placeHolder: {
    textAlign: 'center',
    fontSize: 20,
    color: Colors.placeholder,
    fontFamily: FontConfig.primary.SemiBold,
  },
  required: {
    color: Colors.primary,
    top: -4,
  },
  inputStyle: {
    height: verticalScale(40),
    color: Colors.textDark,
    fontFamily: FontConfig.primary.Regular,
    fontSize: scale(15),
    backgroundColor: Colors.textOnPrimary,
    flex: 1,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    paddingHorizontal: moderateScale(10),
    justifyContent: 'center',
  },
  placeholderStyle: {
    fontSize: scale(16),
    color: Colors.placeholder,
  },
  baseErrorContainerStyle: {
    top: verticalScale(0),
    marginRight: moderateScale(20),
  },
  errorContainer: {
    marginVertical: verticalScale(10),
    position: 'absolute',
    right: 0,
  },
  errorText: {
    fontFamily: FontConfig.primary.Medium,
    color: Colors.warn,
    fontSize: scale(13),
    textTransform: 'capitalize',
  },
});

export default CommonStyles;

import React, {PropsWithChildren, useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleProp,
  StyleSheet,
  StatusBar,
  View,
  ViewStyle,
  ImageStyle,
} from 'react-native';
import {Colors, ImageConfig} from '../utils';
import NetInfo from '@react-native-community/netinfo';
import CommonStyles from '../utils/CommonStyles.tsx';

export interface BaseViewComponentProps {
  style?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  isLoading?: boolean;
  loadingPercent?: number;
  noScroll?: boolean;
  normal?: boolean;
  Icon?: any;
  contentContainerStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
}

const BaseViewComponent = (
  props: PropsWithChildren<BaseViewComponentProps>,
) => {
  const {imageStyle} = props;
  const style = props.style || {};
  const Icon = props.Icon;
  const contentContainerStyle = props.contentContainerStyle || {flexGrow: 1};
  const backgroundColor = props.backgroundColor || Colors.transparent;
  const isLoading = props.isLoading || false;
  const loadingPercent = props.loadingPercent || 0;
  const noScroll = props.noScroll || false;
  const normal = props.normal || false;
  const [isOnline, setIsOnline] = useState(true);

  const [isPageLoading, setIsPageLoading] = useState(false);
  const [pageLoadingPercent, setPageLoadingPercent] = useState(0);

  console.log(pageLoadingPercent, 'pageLoadingPercent');

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOnline(state?.isConnected ? state?.isConnected : false);
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
    });

    // Unsubscribe
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setIsPageLoading(isLoading);
    setPageLoadingPercent(loadingPercent);
  }, [isLoading, loadingPercent]);

  const getLoadingBar = () => {
    return (
      <View style={[styles.progressBarHolder, {}]}>
        <View style={[styles.progressBar]} />
      </View>
    );
  };

  const getStatusBarAndLoader = () => {
    return (
      <>
        <StatusBar
           barStyle="light-content"
           backgroundColor="#6a51ae"
        />
        {isPageLoading && getLoadingBar()}
      </>
    );
  };
  const getSafeArea = () => {
    return (
      <>
        <SafeAreaView style={[styles.screen, style, {backgroundColor}]}>
          {props.children}
        </SafeAreaView>
      </>
    );
  };

  const getScrollView = (children: any) => {
    return (
      <ScrollView
        contentContainerStyle={[contentContainerStyle]}
        style={[styles.scroll, {backgroundColor}]}
        keyboardShouldPersistTaps={'handled'}>
        {children}
      </ScrollView>
    );
  };

  return (
    <>
      {!isOnline && (
        <View style={CommonStyles.flexCenter}>
          <Image source={ImageConfig.NoInternet} />
        </View>
      )}
      {isOnline && (
        <>
          <View style={{flex: 1, zIndex: 1}}>
            {getStatusBarAndLoader()}
            {noScroll && (normal ? props.children : getSafeArea())}
            {!noScroll &&
              (normal
                ? getScrollView(props.children)
                : getScrollView(getSafeArea()))}
          </View>
          <Image
            source={Icon}
            resizeMethod={'auto'}
            resizeMode={'contain'}
            style={[
              {
                position: 'absolute',
                zIndex: 0,
                bottom: 0,
              },
              imageStyle,
            ]}
          />
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // paddingBottom: 20, // required if screen have bottom tabs visible
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  scroll: {flex: 1},
  progressBarHolder: {
    backgroundColor: Colors.backgroundColor,
    // borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderColor,
    width: '100%',
    height: 4,
    borderRadius: 8,
  },

  progressBar: {
    // color: '#0dd2b9',
    backgroundColor: Colors.primary,
    width: '0%',
    height: 4,
    borderRadius: 8,
  },
  loader: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BaseViewComponent;

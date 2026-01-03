import React, {useEffect, useRef} from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import LottieView from 'lottie-react-native';
import {Colors} from '../utils';

export interface LoadingComponentProps {
  backgroundColor?: string;
  color?: string;
  size?: 'large' | 'small';
  style?: StyleProp<ViewStyle>;
  isNormal?: boolean;
}

const LoadingComponent = (props: LoadingComponentProps) => {
  const backgroundColor = props.backgroundColor || 'white';
  const animationRef = useRef<LottieView>(null);
  const color = props.color || Colors.primary;
  const size = props.size || 'large';
  const style = props.style || {};
  const isNormal = props.isNormal === undefined ? false : props.isNormal;
  const dimensions = useWindowDimensions();

  useEffect(() => {
    animationRef.current?.play();

    // Or set a specific startFrame and endFrame with:
    animationRef.current?.play(30, 120);
  }, []);

  return (
    <View style={[styles.screen, style, {backgroundColor}]}>
      {isNormal && <ActivityIndicator color={color} size={size} />}
      {!isNormal && (
        <View
          style={{
            backgroundColor: Colors.textDark,
            width: dimensions.width,
            height: dimensions.height,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <LottieView
            ref={animationRef}
            source={require('../assets/lottie-files/Loading.json')}
            autoPlay
            style={{width: 150, height: 150}}
            // autoSize={true}
            speed={1}
            loop
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default LoadingComponent;

import React, { useEffect, useRef, useCallback } from 'react';
import { Linking, StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api_service from '../services/api_service.ts';
import { ENV, RoutesConfig } from '../utils';
import { CommonService } from '../services';
import LoadingComponent from '../components/LoadingComponent.tsx';
import { hideSplash } from 'react-native-splash-view';

const StartupScreen = ({ navigation }: any) => {
    const lottieRef = useRef<LottieView | null>(null);

    const checkLogin = useCallback(
        async (token: string) => {
            try {
                const response = await Api_service.get(
                    ENV.apiUrl + 'login',
                    {},
                    CommonService.getAuthHeader(token),
                );
                //   handle deeplinks logic
            } catch (error) {
            }
        },
        [],
    );

    useEffect(() => {
        // hideSplash();
        lottieRef.current?.play();
    }, []);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const isFirstTime = await AsyncStorage.getItem('isFirstTimeUser');
                if (!isFirstTime) {
                    // First time user - set the flag
                    await AsyncStorage.setItem('isFirstTimeUser', 'false');
                }
                const token = await AsyncStorage.getItem('token');
                if (!token) {
                    navigation.navigate(RoutesConfig.HOME);
                } else {
                    await checkLogin(token);
                }
            } catch (error) {
                console.error('Error retrieving token:', error);
            }
            hideSplash();
        };

        const deepLinkRouting = (routeLink: any) => {
            console.log(routeLink, 'routeLink');
            const location = CommonService.parseQueryString(routeLink);
            console.log(location.query, 'actions');
            const query = location.query;
            console.log(query, 'query');
        };

        const handleDeepLinks = (e: { url: string | null }) => {
            if (e.url) {
                deepLinkRouting(e.url);
            } else {
                checkAuth();
            }
        };

        const getDeepLinks = async () => {
            try {
                const initialUrl = await Linking.getInitialURL();
                Linking.addEventListener('url', handleDeepLinks);
                await handleDeepLinks({ url: initialUrl });
            } catch (error) {
                console.log('error', error);
            }
        };
        // showSplash();
        getDeepLinks()
            .then(() => {
                console.log('deep links');
            })
            .catch(() => {
                console.log('error');
            });
    }, [checkLogin, navigation]);

    return (
        <View style={styles.screen}>
            <LoadingComponent />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default StartupScreen;

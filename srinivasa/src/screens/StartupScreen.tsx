import React, { useEffect } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../utils/colors';
import LoadingComponent from '../components/LoadingComponent.tsx';

const StartupScreen = ({ navigation }: any) => {
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                // Simulate a short delay for the "Startup" feel
                await new Promise(resolve => setTimeout(() => resolve(true), 1500));

                const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');

                if (isLoggedIn === 'true') {
                    navigation.replace('CustomerHome');
                } else {
                    navigation.replace('Login');
                }
            } catch (error) {
                console.error('Error checking login status:', error);
                navigation.replace('Login');
            }
        };

        checkLoginStatus();
    }, [navigation]);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
            <LoadingComponent />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default StartupScreen;

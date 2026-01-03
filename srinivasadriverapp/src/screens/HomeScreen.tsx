import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { hideSplash } from 'react-native-splash-view';

const HomeScreen = () => {
    useEffect(() => {
        console.log('HomeScreen mounted!');
        hideSplash();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Home Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default HomeScreen;

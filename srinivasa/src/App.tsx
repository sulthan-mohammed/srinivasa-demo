import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainNavigation from './navigation/MainNavigation';

const App = () => {
    return (
        <SafeAreaProvider>
            <MainNavigation />
        </SafeAreaProvider>
    );
};

export default App;

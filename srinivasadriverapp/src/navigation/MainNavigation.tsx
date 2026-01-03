import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from '../utils/colors';

// Screens
import DriverHomeScreen from '../screens/DriverHomeScreen';
import RideRequestScreen from '../screens/RideRequestScreen';
import ActiveRideDriverScreen from '../screens/ActiveRideDriverScreen';

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="DriverHome"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: Colors.cardBackground,
                    },
                    headerTintColor: Colors.textPrimary,
                    headerTitleStyle: {
                        fontWeight: '600',
                        fontSize: 18,
                    },
                    headerShadowVisible: false,
                    contentStyle: {
                        backgroundColor: Colors.background,
                    },
                }}
            >
                <Stack.Screen
                    name="DriverHome"
                    component={DriverHomeScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="RideRequest"
                    component={RideRequestScreen}
                    options={{
                        title: 'Ride Request',
                        headerBackTitle: 'Back',
                    }}
                />
                <Stack.Screen
                    name="ActiveRideDriver"
                    component={ActiveRideDriverScreen}
                    options={{
                        title: 'Active Ride',
                        headerBackTitle: 'Back',
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MainNavigation;

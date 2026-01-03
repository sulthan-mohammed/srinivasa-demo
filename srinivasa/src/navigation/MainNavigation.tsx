import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import StartupScreen from '../screens/StartupScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import CustomerHomeScreen from '../screens/CustomerHomeScreen';
import AirportBookingScreen from '../screens/AirportBookingScreen';
import RentalBookingScreen from '../screens/RentalBookingScreen';
import OutstationBookingScreen from '../screens/OutstationBookingScreen';
import MapRouteScreen from '../screens/MapRouteScreen';
import VehicleSelectionScreen from '../screens/VehicleSelectionScreen';
import BookingConfirmationScreen from '../screens/BookingConfirmationScreen';
import ActiveRideScreen from '../screens/ActiveRideScreen';
import { Colors } from '../utils/colors';

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Startup"
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
                    name="Startup"
                    component={StartupScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SignUp"
                    component={SignupScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="CustomerHome"
                    component={CustomerHomeScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="AirportBooking"
                    component={AirportBookingScreen}
                    options={{
                        title: 'Airport Transfer',
                        headerBackTitle: 'Back'
                    }}
                />
                <Stack.Screen
                    name="RentalBooking"
                    component={RentalBookingScreen}
                    options={{
                        title: 'Rental Booking',
                        headerBackTitle: 'Back'
                    }}
                />
                <Stack.Screen
                    name="OutstationBooking"
                    component={OutstationBookingScreen}
                    options={{
                        title: 'Outstation Trip',
                        headerBackTitle: 'Back'
                    }}
                />
                <Stack.Screen
                    name="MapRoute"
                    component={MapRouteScreen}
                    options={{
                        title: 'Route',
                        headerBackTitle: 'Back'
                    }}
                />
                <Stack.Screen
                    name="VehicleSelection"
                    component={VehicleSelectionScreen}
                    options={{
                        title: 'Choose Vehicle',
                        headerBackTitle: 'Back'
                    }}
                />
                <Stack.Screen
                    name="BookingConfirmation"
                    component={BookingConfirmationScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="ActiveRide"
                    component={ActiveRideScreen}
                    options={{
                        title: 'Your Ride',
                        headerBackTitle: 'Back'
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MainNavigation;

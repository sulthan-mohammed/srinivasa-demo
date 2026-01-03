import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    StatusBar,
    SafeAreaView,
    TouchableOpacity,
    Text,
    ActivityIndicator,
} from 'react-native';
import { Colors, Spacing, BorderRadius, Typography } from '../utils/colors';
import { ArrowForwardIcon, CalendarIcon, CloseIcon } from '../components/Icons';
import AirportModeTabs from '../components/AirportModeTabs';
import AirportMapView from '../components/AirportMapView';
import LocationInput from '../components/LocationInput';
import LocationPermissionModal from '../components/LocationPermissionModal';
import DateTimePickerModal from '../components/DateTimePickerModal';
import SearchLocationModal from '../components/SearchLocationModal';
import { useLocation } from '../hooks/useLocation';
import moment from 'moment';

const GOOGLE_MAPS_API_KEY = 'AIzaSyBw9X_i_hwBXa5wZqIVABtUh9mtOun-pbc';
const HYDERABAD_AIRPORT = {
    latitude: 17.2403,
    longitude: 78.4294,
    address: 'Rajiv Gandhi International Airport, Hyderabad, Telangana',
    name: 'Rajiv Gandhi International Airport, Hyderabad',
};

const AirportBookingScreen = ({ navigation }: any) => {
    const [mode, setMode] = useState<'toAirport' | 'fromAirport'>('toAirport');
    const { location: currentLocation, loading: locationLoading, permissionDenied, fetchLocation, setPermissionDenied } = useLocation();
    const [userInput, setUserInput] = useState('');
    const [showDateTimePicker, setShowDateTimePicker] = useState(false);
    const [showSearchModal, setShowSearchModal] = useState<{ visible: boolean, type: 'pickup' | 'dropoff' }>({ visible: false, type: 'dropoff' });
    const [scheduledDateTime, setScheduledDateTime] = useState<{ date: string, time: string } | null>(null);
    const [selectedLocationCoords, setSelectedLocationCoords] = useState<{ latitude: number, longitude: number } | null>(null);

    const handleContinue = () => {
        const pickup = mode === 'toAirport'
            ? (currentLocation?.address || 'My Location')
            : HYDERABAD_AIRPORT.name;
        const dropoff = mode === 'fromAirport'
            ? userInput
            : HYDERABAD_AIRPORT.name;

        navigation.navigate('MapRoute', {
            pickup,
            dropoff,
            scheduledAt: scheduledDateTime ? `${scheduledDateTime.date} ${scheduledDateTime.time}` : null
        });
    };

    const isFormValid = mode === 'toAirport'
        ? (locationLoading || !!currentLocation)
        : (!!userInput && userInput.length > 2);

    const getMapLocations = () => {
        if (mode === 'toAirport') {
            const pickupCoords = selectedLocationCoords || (currentLocation ? { latitude: currentLocation.latitude, longitude: currentLocation.longitude } : null);
            return {
                pickup: pickupCoords,
                dropoff: { latitude: HYDERABAD_AIRPORT.latitude, longitude: HYDERABAD_AIRPORT.longitude },
            };
        } else {
            return {
                pickup: { latitude: HYDERABAD_AIRPORT.latitude, longitude: HYDERABAD_AIRPORT.longitude },
                dropoff: selectedLocationCoords,
            };
        }
    };

    const { pickup: mapPickup, dropoff: mapDropoff } = getMapLocations();

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

            {/* 1. Mode Selector (Top) */}
            <View style={styles.topSection}>
                <AirportModeTabs mode={mode} onModeChange={(m) => {
                    setMode(m);
                    setUserInput('');
                }} />
            </View>

            {/* 2. Input Fields */}
            <View style={styles.inputSection}>
                {mode === 'toAirport' ? (
                    <>
                        <LocationInput
                            label="PICKUP LOCATION"
                            value={currentLocation?.address || (locationLoading ? 'Fetching location...' : 'My Location')}
                            onPress={() => setShowSearchModal({ visible: true, type: 'pickup' })}
                            placeholder="Detecting your location..."
                            disabled={false}
                        />
                        <LocationInput
                            label="DROP LOCATION"
                            value={HYDERABAD_AIRPORT.name}
                            isFixed={true}
                        />
                    </>
                ) : (
                    <>
                        <LocationInput
                            label="PICKUP LOCATION"
                            value={HYDERABAD_AIRPORT.name}
                            isFixed={true}
                        />
                        <LocationInput
                            label="DROP LOCATION"
                            value={userInput}
                            onPress={() => setShowSearchModal({ visible: true, type: 'dropoff' })}
                            placeholder="Search drop-off address"
                            disabled={false}
                        />
                    </>
                )}
            </View>

            {/* 3. Map (Remaining Space) */}
            <View style={styles.mapFlexContainer}>
                <AirportMapView
                    pickup={mapPickup}
                    dropoff={mapDropoff}
                    apiKey={GOOGLE_MAPS_API_KEY}
                />

                {scheduledDateTime && (
                    <View style={styles.scheduleBadge}>
                        <CalendarIcon size={14} color={Colors.cardBackground} />
                        <Text style={styles.scheduleBadgeText}>
                            Scheduled: {moment(scheduledDateTime.date).format('MMM DD')} at {moment(scheduledDateTime.time, 'HH:mm').format('hh:mm A')}
                        </Text>
                        <TouchableOpacity
                            onPress={() => setScheduledDateTime(null)}
                            style={styles.clearScheduleButton}
                        >
                            <CloseIcon size={12} color={Colors.secondary} />
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            {/* 4. Action Buttons (Footer) */}
            <View style={styles.footer}>
                <View style={styles.buttonRow}>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.bookLaterButton]}
                        onPress={() => setShowDateTimePicker(true)}
                        activeOpacity={0.8}
                    >
                        <CalendarIcon size={18} color={Colors.primary} />
                        <Text style={styles.bookLaterText}>Book Later</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.actionButton,
                            styles.confirmButton,
                            !isFormValid && styles.disabledButton
                        ]}
                        onPress={handleContinue}
                        disabled={!isFormValid}
                        activeOpacity={0.8}
                    >
                        {locationLoading && <ActivityIndicator size="small" color={Colors.cardBackground} />}
                        <Text style={styles.confirmButtonText}>
                            {scheduledDateTime ? 'Confirm' : 'Book Now'}
                        </Text>
                        <ArrowForwardIcon size={18} color={Colors.cardBackground} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Modals */}
            <LocationPermissionModal
                visible={permissionDenied}
                onAllow={() => {
                    setPermissionDenied(false);
                    fetchLocation();
                }}
                onRetry={() => {
                    fetchLocation();
                }}
            />

            <DateTimePickerModal
                visible={showDateTimePicker}
                onClose={() => setShowDateTimePicker(false)}
                onConfirm={(date, time) => {
                    setScheduledDateTime({ date, time });
                    setShowDateTimePicker(false);
                }}
            />

            <SearchLocationModal
                visible={showSearchModal.visible}
                onClose={() => setShowSearchModal({ ...showSearchModal, visible: false })}
                onSelect={(loc) => {
                    setUserInput(loc.name);
                    setSelectedLocationCoords({ latitude: loc.latitude, longitude: loc.longitude });
                }}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    topSection: {
        paddingTop: 0,
        marginTop: -Spacing.sm,
    },
    inputSection: {
        paddingHorizontal: Spacing.lg,
        paddingBottom: Spacing.sm,
    },
    mapFlexContainer: {
        flex: 1,
        position: 'relative',
    },
    scheduleBadge: {
        position: 'absolute',
        top: 16,
        left: 16,
        right: 16,
        backgroundColor: Colors.secondary,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: BorderRadius.full,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
        zIndex: 100,
    },
    scheduleBadgeText: {
        ...Typography.small,
        color: Colors.cardBackground,
        fontWeight: '700',
        marginLeft: 8,
        flex: 1,
    },
    clearScheduleButton: {
        backgroundColor: Colors.cardBackground,
        borderRadius: BorderRadius.full,
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 8,
    },
    footer: {
        backgroundColor: Colors.cardBackground,
        padding: Spacing.lg,
        paddingBottom: Spacing.xl,
        borderTopWidth: 1,
        borderTopColor: Colors.borderLight,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: Spacing.md,
    },
    actionButton: {
        flex: 1,
        height: 48,
        borderRadius: BorderRadius.md,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bookLaterButton: {
        backgroundColor: Colors.background,
        borderWidth: 1.5,
        borderColor: Colors.primary,
        gap: 8,
    },
    confirmButton: {
        backgroundColor: Colors.primary,
        gap: 8,
    },
    disabledButton: {
        backgroundColor: Colors.textTertiary,
        borderColor: Colors.textTertiary,
    },
    bookLaterText: {
        ...Typography.bodyMedium,
        color: Colors.primary,
        fontWeight: '600',
    },
    confirmButtonText: {
        ...Typography.bodyMedium,
        color: Colors.cardBackground,
        fontWeight: '600',
    },
});

export default AirportBookingScreen;

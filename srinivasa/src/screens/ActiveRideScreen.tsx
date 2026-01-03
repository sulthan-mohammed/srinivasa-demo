import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    SafeAreaView,
    Alert,
} from 'react-native';
import { Colors, Spacing, BorderRadius, Typography } from '../utils/colors';
import { PersonIcon, CarIcon, SOSIcon, NavigationIcon } from '../components/Icons';

const ActiveRideScreen = ({ route }: any) => {
    const { pickup, dropoff, driver, otp } = route.params;

    const handleSOS = () => {
        Alert.alert(
            'Emergency SOS',
            'Are you sure you want to trigger emergency alert?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Yes, Alert', style: 'destructive' },
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.secondary} />

            {/* Map Container */}
            <View style={styles.mapContainer}>
                <View style={styles.mapPlaceholder}>
                    <View style={styles.routeLine} />
                    <View style={styles.carMarker}>
                        <CarIcon size={24} color={Colors.cardBackground} />
                    </View>
                    <Text style={styles.mapLabel}>Live Tracking</Text>
                </View>

                {/* SOS Button */}
                <TouchableOpacity
                    style={styles.sosButton}
                    onPress={handleSOS}
                    activeOpacity={0.8}
                >
                    <SOSIcon size={24} color={Colors.cardBackground} />
                    <Text style={styles.sosText}>SOS</Text>
                </TouchableOpacity>
            </View>

            {/* Bottom Info Sheet */}
            <View style={styles.bottomSheet}>
                <View style={styles.handle} />

                <View style={styles.sheetContent}>
                    {/* Status */}
                    <View style={styles.statusContainer}>
                        <View style={styles.statusDot} />
                        <Text style={styles.statusText}>Driver is on the way</Text>
                    </View>

                    {/* Driver Card */}
                    <View style={styles.driverCard}>
                        <View style={styles.driverAvatar}>
                            <PersonIcon size={28} color={Colors.primary} />
                        </View>
                        <View style={styles.driverInfo}>
                            <Text style={styles.driverName}>{driver.name}</Text>
                            <Text style={styles.driverVehicle}>
                                {driver.vehicle} • {driver.vehicleNumber}
                            </Text>
                            <View style={styles.ratingContainer}>
                                <Text style={styles.ratingText}>★ {driver.rating}</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.callButton} activeOpacity={0.7}>
                            <Text style={styles.callButtonText}>Call</Text>
                        </TouchableOpacity>
                    </View>

                    {/* OTP Display */}
                    <View style={styles.otpContainer}>
                        <Text style={styles.otpLabel}>Your OTP</Text>
                        <Text style={styles.otpValue}>{otp}</Text>
                    </View>

                    {/* Trip Info */}
                    <View style={styles.tripInfo}>
                        <View style={styles.tripRow}>
                            <View style={styles.locationDot} />
                            <View style={styles.locationInfo}>
                                <Text style={styles.locationLabel}>Pickup</Text>
                                <Text style={styles.locationValue} numberOfLines={1}>
                                    {pickup}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.locationConnector} />

                        <View style={styles.tripRow}>
                            <View style={[styles.locationDot, styles.locationDotEnd]} />
                            <View style={styles.locationInfo}>
                                <Text style={styles.locationLabel}>Drop-off</Text>
                                <Text style={styles.locationValue} numberOfLines={1}>
                                    {dropoff}
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* Navigation Hint */}
                    <View style={styles.navigationHint}>
                        <NavigationIcon size={16} color={Colors.primary} />
                        <Text style={styles.navigationText}>
                            Estimated arrival: 8 mins
                        </Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    mapContainer: {
        flex: 1,
        backgroundColor: Colors.secondary,
        position: 'relative',
    },
    mapPlaceholder: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E8E6F2',
    },
    routeLine: {
        position: 'absolute',
        top: '25%',
        left: '15%',
        right: '15%',
        height: 3,
        backgroundColor: Colors.primary,
        borderRadius: 2,
        transform: [{ rotate: '20deg' }],
    },
    carMarker: {
        width: 56,
        height: 56,
        borderRadius: BorderRadius.full,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: Colors.shadowDark,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    mapLabel: {
        ...Typography.caption,
        color: Colors.textSecondary,
        marginTop: Spacing.xl,
    },
    sosButton: {
        position: 'absolute',
        top: Spacing.xl,
        right: Spacing.lg,
        backgroundColor: Colors.alert,
        borderRadius: BorderRadius.full,
        paddingVertical: Spacing.sm,
        paddingHorizontal: Spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: Colors.shadowDark,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,
    },
    sosText: {
        ...Typography.bodyMedium,
        color: Colors.cardBackground,
        marginLeft: Spacing.xs,
    },
    bottomSheet: {
        backgroundColor: Colors.cardBackground,
        borderTopLeftRadius: BorderRadius.xl,
        borderTopRightRadius: BorderRadius.xl,
        paddingTop: Spacing.sm,
        shadowColor: Colors.shadowDark,
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    },
    handle: {
        width: 40,
        height: 4,
        backgroundColor: Colors.border,
        borderRadius: 2,
        alignSelf: 'center',
        marginBottom: Spacing.md,
    },
    sheetContent: {
        paddingHorizontal: Spacing.lg,
        paddingBottom: Spacing.lg,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F3FF',
        borderRadius: BorderRadius.md,
        padding: Spacing.md,
        marginBottom: Spacing.md,
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: BorderRadius.full,
        backgroundColor: Colors.success,
        marginRight: Spacing.sm,
    },
    statusText: {
        ...Typography.bodyMedium,
        color: Colors.primary,
    },
    driverCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.background,
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        marginBottom: Spacing.md,
    },
    driverAvatar: {
        width: 56,
        height: 56,
        borderRadius: BorderRadius.full,
        backgroundColor: '#F5F3FF',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Spacing.md,
    },
    driverInfo: {
        flex: 1,
    },
    driverName: {
        ...Typography.bodyMedium,
        color: Colors.textPrimary,
        marginBottom: Spacing.xs / 2,
    },
    driverVehicle: {
        ...Typography.caption,
        color: Colors.textSecondary,
        marginBottom: Spacing.xs / 2,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        ...Typography.caption,
        color: '#FFB800',
    },
    callButton: {
        backgroundColor: Colors.primary,
        borderRadius: BorderRadius.md,
        paddingVertical: Spacing.sm,
        paddingHorizontal: Spacing.md,
    },
    callButtonText: {
        ...Typography.bodyMedium,
        color: Colors.cardBackground,
    },
    otpContainer: {
        backgroundColor: Colors.success,
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    otpLabel: {
        ...Typography.caption,
        color: Colors.cardBackground,
        marginBottom: Spacing.xs / 2,
    },
    otpValue: {
        fontSize: 32,
        fontWeight: '700',
        color: Colors.cardBackground,
        letterSpacing: 6,
    },
    tripInfo: {
        backgroundColor: Colors.background,
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        marginBottom: Spacing.md,
    },
    tripRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    locationDot: {
        width: 10,
        height: 10,
        borderRadius: BorderRadius.full,
        backgroundColor: Colors.primary,
        marginTop: 4,
        marginRight: Spacing.sm,
    },
    locationDotEnd: {
        backgroundColor: Colors.alert,
    },
    locationConnector: {
        width: 2,
        height: 20,
        backgroundColor: Colors.border,
        marginLeft: 4,
        marginVertical: Spacing.xs / 2,
    },
    locationInfo: {
        flex: 1,
    },
    locationLabel: {
        ...Typography.small,
        color: Colors.textSecondary,
        marginBottom: Spacing.xs / 2,
    },
    locationValue: {
        ...Typography.caption,
        color: Colors.textPrimary,
    },
    navigationHint: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Spacing.sm,
    },
    navigationText: {
        ...Typography.caption,
        color: Colors.textSecondary,
        marginLeft: Spacing.xs,
    },
});

export default ActiveRideScreen;

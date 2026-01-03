import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    SafeAreaView,
} from 'react-native';
import { Colors, Spacing, BorderRadius, Typography } from '../utils/colors';
import { CheckCircleIcon, PersonIcon, CarIcon, LocationIcon } from '../components/Icons';
import mockData from '../data/mockData.json';

const BookingConfirmationScreen = ({ navigation, route }: any) => {
    const { pickup, dropoff, vehicleType, price } = route.params;

    // Get a random available driver
    const availableDriver = mockData.drivers.find(d => d.status === 'available') || mockData.drivers[0];
    const otp = '4521';

    const handleViewRide = () => {
        navigation.navigate('ActiveRide', {
            pickup,
            dropoff,
            vehicleType,
            price,
            driver: availableDriver,
            otp,
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />

            {/* Success Header */}
            <View style={styles.successHeader}>
                <CheckCircleIcon size={64} color={Colors.success} />
                <Text style={styles.successTitle}>Booking Confirmed!</Text>
                <Text style={styles.successSubtitle}>Your ride is on the way</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* OTP Card */}
                <View style={styles.otpCard}>
                    <Text style={styles.otpLabel}>Your OTP</Text>
                    <Text style={styles.otpValue}>{otp}</Text>
                    <Text style={styles.otpHint}>Share this with your driver</Text>
                </View>

                {/* Driver Info */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Driver Details</Text>
                    <View style={styles.driverCard}>
                        <View style={styles.driverAvatar}>
                            <PersonIcon size={32} color={Colors.primary} />
                        </View>
                        <View style={styles.driverInfo}>
                            <Text style={styles.driverName}>{availableDriver.name}</Text>
                            <Text style={styles.driverVehicle}>
                                {availableDriver.vehicle} • {availableDriver.vehicleNumber}
                            </Text>
                            <View style={styles.ratingContainer}>
                                <Text style={styles.ratingText}>★ {availableDriver.rating}</Text>
                                <Text style={styles.ratingSubtext}>
                                    {availableDriver.totalRides} trips
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Trip Details */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Trip Details</Text>
                    <View style={styles.tripCard}>
                        <View style={styles.tripRow}>
                            <LocationIcon size={20} color={Colors.primary} />
                            <View style={styles.tripLocation}>
                                <Text style={styles.tripLabel}>Pickup</Text>
                                <Text style={styles.tripValue}>{pickup}</Text>
                            </View>
                        </View>

                        <View style={styles.tripDivider} />

                        <View style={styles.tripRow}>
                            <LocationIcon size={20} color={Colors.alert} />
                            <View style={styles.tripLocation}>
                                <Text style={styles.tripLabel}>Drop-off</Text>
                                <Text style={styles.tripValue}>{dropoff}</Text>
                            </View>
                        </View>

                        <View style={styles.tripDivider} />

                        <View style={styles.tripRow}>
                            <CarIcon size={20} color={Colors.textSecondary} />
                            <View style={styles.tripLocation}>
                                <Text style={styles.tripLabel}>Vehicle</Text>
                                <Text style={styles.tripValue}>{vehicleType}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Price Summary */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Fare Summary</Text>
                    <View style={styles.priceCard}>
                        <View style={styles.priceRow}>
                            <Text style={styles.priceLabel}>Base Fare</Text>
                            <Text style={styles.priceValue}>₹{price}</Text>
                        </View>
                        <View style={styles.priceDivider} />
                        <View style={styles.priceRow}>
                            <Text style={styles.priceTotalLabel}>Total Amount</Text>
                            <Text style={styles.priceTotalValue}>₹{price}</Text>
                        </View>
                        <Text style={styles.priceNote}>Fixed pricing • No surge</Text>
                    </View>
                </View>
            </ScrollView>

            {/* View Ride Button */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.viewRideButton}
                    onPress={handleViewRide}
                    activeOpacity={0.8}
                >
                    <Text style={styles.viewRideButtonText}>View Ride</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    successHeader: {
        backgroundColor: Colors.primary,
        paddingVertical: Spacing.xxl,
        alignItems: 'center',
        borderBottomLeftRadius: BorderRadius.xl,
        borderBottomRightRadius: BorderRadius.xl,
    },
    successTitle: {
        ...Typography.h1,
        color: Colors.cardBackground,
        marginTop: Spacing.md,
        marginBottom: Spacing.xs,
    },
    successSubtitle: {
        ...Typography.body,
        color: Colors.cardBackground,
        opacity: 0.9,
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: Spacing.xl,
    },
    otpCard: {
        marginHorizontal: Spacing.lg,
        marginTop: -Spacing.xl,
        backgroundColor: Colors.success,
        borderRadius: BorderRadius.lg,
        padding: Spacing.lg,
        alignItems: 'center',
        shadowColor: Colors.shadowDark,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 12,
        elevation: 6,
    },
    otpLabel: {
        ...Typography.caption,
        color: Colors.cardBackground,
        marginBottom: Spacing.xs,
    },
    otpValue: {
        fontSize: 48,
        fontWeight: '700',
        color: Colors.cardBackground,
        letterSpacing: 8,
        marginBottom: Spacing.xs,
    },
    otpHint: {
        ...Typography.small,
        color: Colors.cardBackground,
        opacity: 0.9,
    },
    section: {
        paddingHorizontal: Spacing.lg,
        marginTop: Spacing.xl,
    },
    sectionTitle: {
        ...Typography.h3,
        color: Colors.textPrimary,
        marginBottom: Spacing.md,
    },
    driverCard: {
        flexDirection: 'row',
        backgroundColor: Colors.cardBackground,
        borderRadius: BorderRadius.lg,
        padding: Spacing.lg,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    driverAvatar: {
        width: 64,
        height: 64,
        borderRadius: BorderRadius.full,
        backgroundColor: '#F5F3FF',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Spacing.md,
    },
    driverInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    driverName: {
        ...Typography.h3,
        color: Colors.textPrimary,
        marginBottom: Spacing.xs / 2,
    },
    driverVehicle: {
        ...Typography.caption,
        color: Colors.textSecondary,
        marginBottom: Spacing.xs,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        ...Typography.bodyMedium,
        color: '#FFB800',
        marginRight: Spacing.sm,
    },
    ratingSubtext: {
        ...Typography.small,
        color: Colors.textSecondary,
    },
    tripCard: {
        backgroundColor: Colors.cardBackground,
        borderRadius: BorderRadius.lg,
        padding: Spacing.lg,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    tripRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    tripLocation: {
        flex: 1,
        marginLeft: Spacing.md,
    },
    tripLabel: {
        ...Typography.caption,
        color: Colors.textSecondary,
        marginBottom: Spacing.xs / 2,
    },
    tripValue: {
        ...Typography.bodyMedium,
        color: Colors.textPrimary,
    },
    tripDivider: {
        height: 1,
        backgroundColor: Colors.borderLight,
        marginVertical: Spacing.md,
    },
    priceCard: {
        backgroundColor: Colors.cardBackground,
        borderRadius: BorderRadius.lg,
        padding: Spacing.lg,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    priceLabel: {
        ...Typography.body,
        color: Colors.textSecondary,
    },
    priceValue: {
        ...Typography.bodyMedium,
        color: Colors.textPrimary,
    },
    priceDivider: {
        height: 1,
        backgroundColor: Colors.borderLight,
        marginVertical: Spacing.md,
    },
    priceTotalLabel: {
        ...Typography.h3,
        color: Colors.textPrimary,
    },
    priceTotalValue: {
        ...Typography.h2,
        color: Colors.primary,
    },
    priceNote: {
        ...Typography.small,
        color: Colors.success,
        marginTop: Spacing.sm,
        textAlign: 'center',
    },
    footer: {
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.md,
        backgroundColor: Colors.cardBackground,
        borderTopWidth: 1,
        borderTopColor: Colors.borderLight,
    },
    viewRideButton: {
        backgroundColor: Colors.primary,
        borderRadius: BorderRadius.md,
        paddingVertical: Spacing.md,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    viewRideButtonText: {
        ...Typography.bodyMedium,
        color: Colors.cardBackground,
        fontSize: 18,
    },
});

export default BookingConfirmationScreen;

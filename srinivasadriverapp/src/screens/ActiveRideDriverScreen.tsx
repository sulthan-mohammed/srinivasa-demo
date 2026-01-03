import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    SafeAreaView,
    Alert,
} from 'react-native';
import { Colors, Spacing, BorderRadius, Typography } from '../utils/colors';
import { PersonIcon, LocationIcon, CheckIcon } from '../components/Icons';

type RideStatus = 'arrived' | 'started' | 'completed';

const ActiveRideDriverScreen = ({ route, navigation }: any) => {
    const { ride } = route.params;
    const [rideStatus, setRideStatus] = useState<RideStatus>('arrived');

    const handleStatusUpdate = () => {
        if (rideStatus === 'arrived') {
            setRideStatus('started');
        } else if (rideStatus === 'started') {
            setRideStatus('completed');
            setTimeout(() => {
                Alert.alert(
                    'Ride Completed!',
                    `You earned ₹${ride.fare} for this trip.`,
                    [
                        {
                            text: 'Done',
                            onPress: () => navigation.navigate('DriverHome'),
                        },
                    ]
                );
            }, 500);
        }
    };

    const getButtonText = () => {
        switch (rideStatus) {
            case 'arrived':
                return 'Start Ride';
            case 'started':
                return 'Complete Ride';
            case 'completed':
                return 'Ride Completed';
            default:
                return 'Continue';
        }
    };

    const getStatusText = () => {
        switch (rideStatus) {
            case 'arrived':
                return 'Arrived at pickup';
            case 'started':
                return 'Ride in progress';
            case 'completed':
                return 'Ride completed';
            default:
                return '';
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

            {/* Status Header */}
            <View style={styles.statusHeader}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>{getStatusText()}</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Customer Info */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Customer</Text>
                    <View style={styles.customerCard}>
                        <View style={styles.customerAvatar}>
                            <PersonIcon size={28} color={Colors.primary} />
                        </View>
                        <View style={styles.customerInfo}>
                            <Text style={styles.customerName}>{ride.customerName}</Text>
                            <Text style={styles.customerLabel}>Verified Customer</Text>
                        </View>
                        <TouchableOpacity style={styles.callButton} activeOpacity={0.7}>
                            <Text style={styles.callButtonText}>Call</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* OTP Section (only show when arrived) */}
                {rideStatus === 'arrived' && (
                    <View style={styles.otpSection}>
                        <Text style={styles.otpLabel}>Ask customer for OTP</Text>
                        <View style={styles.otpInputContainer}>
                            <Text style={styles.otpPlaceholder}>Enter 4-digit OTP</Text>
                        </View>
                    </View>
                )}

                {/* Trip Details */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Trip Details</Text>
                    <View style={styles.tripCard}>
                        <View style={styles.tripRow}>
                            <View style={styles.locationDot} />
                            <View style={styles.locationInfo}>
                                <Text style={styles.locationLabel}>
                                    {rideStatus === 'arrived' ? 'Pickup Location' : 'From'}
                                </Text>
                                <Text style={styles.locationValue}>{ride.pickup}</Text>
                            </View>
                            {rideStatus === 'arrived' && (
                                <TouchableOpacity style={styles.navigateButton}>
                                    <Text style={styles.navigateButtonText}>Navigate</Text>
                                </TouchableOpacity>
                            )}
                        </View>

                        <View style={styles.locationConnector} />

                        <View style={styles.tripRow}>
                            <View style={[styles.locationDot, styles.locationDotEnd]} />
                            <View style={styles.locationInfo}>
                                <Text style={styles.locationLabel}>
                                    {rideStatus === 'arrived' ? 'Drop Location' : 'To'}
                                </Text>
                                <Text style={styles.locationValue}>{ride.dropoff}</Text>
                            </View>
                            {rideStatus === 'started' && (
                                <TouchableOpacity style={styles.navigateButton}>
                                    <Text style={styles.navigateButtonText}>Navigate</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                </View>

                {/* Fare Info */}
                <View style={styles.fareCard}>
                    <Text style={styles.fareLabel}>Trip Fare</Text>
                    <Text style={styles.fareValue}>₹{ride.fare}</Text>
                    <Text style={styles.fareNote}>Fixed pricing</Text>
                </View>

                {/* Completion Message */}
                {rideStatus === 'completed' && (
                    <View style={styles.completionCard}>
                        <CheckIcon size={48} color={Colors.success} />
                        <Text style={styles.completionTitle}>Trip Completed!</Text>
                        <Text style={styles.completionText}>
                            Great job! You earned ₹{ride.fare}
                        </Text>
                    </View>
                )}
            </ScrollView>

            {/* Action Button */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={[
                        styles.actionButton,
                        rideStatus === 'completed' && styles.actionButtonCompleted,
                    ]}
                    onPress={handleStatusUpdate}
                    disabled={rideStatus === 'completed'}
                    activeOpacity={0.8}
                >
                    <Text style={styles.actionButtonText}>{getButtonText()}</Text>
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
    statusHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F3FF',
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: Colors.borderLight,
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
    scrollContent: {
        flexGrow: 1,
        paddingBottom: Spacing.xl,
    },
    section: {
        paddingHorizontal: Spacing.lg,
        marginTop: Spacing.lg,
    },
    sectionTitle: {
        ...Typography.h3,
        color: Colors.textPrimary,
        marginBottom: Spacing.md,
    },
    customerCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.cardBackground,
        borderRadius: BorderRadius.lg,
        padding: Spacing.lg,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    customerAvatar: {
        width: 56,
        height: 56,
        borderRadius: BorderRadius.full,
        backgroundColor: '#F5F3FF',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Spacing.md,
    },
    customerInfo: {
        flex: 1,
    },
    customerName: {
        ...Typography.bodyMedium,
        color: Colors.textPrimary,
        marginBottom: Spacing.xs / 2,
    },
    customerLabel: {
        ...Typography.caption,
        color: Colors.success,
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
    otpSection: {
        paddingHorizontal: Spacing.lg,
        marginTop: Spacing.lg,
    },
    otpLabel: {
        ...Typography.bodyMedium,
        color: Colors.textPrimary,
        marginBottom: Spacing.sm,
    },
    otpInputContainer: {
        backgroundColor: Colors.cardBackground,
        borderRadius: BorderRadius.md,
        padding: Spacing.lg,
        borderWidth: 2,
        borderColor: Colors.primary,
        borderStyle: 'dashed',
    },
    otpPlaceholder: {
        ...Typography.body,
        color: Colors.textTertiary,
        textAlign: 'center',
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
    locationDot: {
        width: 12,
        height: 12,
        borderRadius: BorderRadius.full,
        backgroundColor: Colors.primary,
        marginTop: 4,
        marginRight: Spacing.md,
    },
    locationDotEnd: {
        backgroundColor: Colors.alert,
    },
    locationConnector: {
        width: 2,
        height: 24,
        backgroundColor: Colors.border,
        marginLeft: 5,
        marginVertical: Spacing.xs,
    },
    locationInfo: {
        flex: 1,
    },
    locationLabel: {
        ...Typography.caption,
        color: Colors.textSecondary,
        marginBottom: Spacing.xs / 2,
    },
    locationValue: {
        ...Typography.bodyMedium,
        color: Colors.textPrimary,
    },
    navigateButton: {
        backgroundColor: '#F5F3FF',
        borderRadius: BorderRadius.sm,
        paddingVertical: Spacing.xs,
        paddingHorizontal: Spacing.sm,
    },
    navigateButtonText: {
        ...Typography.caption,
        color: Colors.primary,
    },
    fareCard: {
        marginHorizontal: Spacing.lg,
        marginTop: Spacing.lg,
        backgroundColor: '#F5F3FF',
        borderRadius: BorderRadius.lg,
        padding: Spacing.lg,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.primary,
    },
    fareLabel: {
        ...Typography.caption,
        color: Colors.textSecondary,
        marginBottom: Spacing.xs,
    },
    fareValue: {
        ...Typography.h1,
        color: Colors.primary,
        marginBottom: Spacing.xs / 2,
    },
    fareNote: {
        ...Typography.small,
        color: Colors.textSecondary,
    },
    completionCard: {
        marginHorizontal: Spacing.lg,
        marginTop: Spacing.lg,
        backgroundColor: Colors.cardBackground,
        borderRadius: BorderRadius.lg,
        padding: Spacing.xl,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: Colors.success,
    },
    completionTitle: {
        ...Typography.h2,
        color: Colors.success,
        marginTop: Spacing.md,
        marginBottom: Spacing.xs,
    },
    completionText: {
        ...Typography.body,
        color: Colors.textSecondary,
        textAlign: 'center',
    },
    footer: {
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.md,
        backgroundColor: Colors.cardBackground,
        borderTopWidth: 1,
        borderTopColor: Colors.borderLight,
    },
    actionButton: {
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
    actionButtonCompleted: {
        backgroundColor: Colors.success,
    },
    actionButtonText: {
        ...Typography.bodyMedium,
        color: Colors.cardBackground,
        fontSize: 18,
    },
});

export default ActiveRideDriverScreen;

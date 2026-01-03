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
import { LocationIcon, MoneyIcon, RouteIcon, TimeIcon, PersonIcon } from '../components/Icons';

const RideRequestScreen = ({ navigation }: any) => {
    // Mock ride request data
    const rideRequest = {
        id: 'r1',
        customerName: 'Demo User',
        pickup: 'Koramangala, Bangalore',
        dropoff: 'Kempegowda International Airport',
        distance: '42 km',
        duration: '1 hr 15 min',
        fare: 1200,
    };

    const handleAccept = () => {
        navigation.navigate('ActiveRideDriver', { ride: rideRequest });
    };

    const handleReject = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>New Ride Request</Text>
                    <Text style={styles.subtitle}>Review and accept the ride</Text>
                </View>

                {/* Customer Info */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Customer</Text>
                    <View style={styles.customerCard}>
                        <View style={styles.customerAvatar}>
                            <PersonIcon size={28} color={Colors.primary} />
                        </View>
                        <View style={styles.customerInfo}>
                            <Text style={styles.customerName}>{rideRequest.customerName}</Text>
                            <Text style={styles.customerLabel}>Verified Customer</Text>
                        </View>
                    </View>
                </View>

                {/* Trip Details */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Trip Details</Text>
                    <View style={styles.tripCard}>
                        <View style={styles.tripRow}>
                            <View style={styles.locationDot} />
                            <View style={styles.locationInfo}>
                                <Text style={styles.locationLabel}>Pickup</Text>
                                <Text style={styles.locationValue}>{rideRequest.pickup}</Text>
                            </View>
                        </View>

                        <View style={styles.locationConnector} />

                        <View style={styles.tripRow}>
                            <View style={[styles.locationDot, styles.locationDotEnd]} />
                            <View style={styles.locationInfo}>
                                <Text style={styles.locationLabel}>Drop-off</Text>
                                <Text style={styles.locationValue}>{rideRequest.dropoff}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Ride Info */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Ride Information</Text>
                    <View style={styles.infoGrid}>
                        <View style={styles.infoCard}>
                            <View style={styles.infoIconContainer}>
                                <RouteIcon size={20} color={Colors.primary} />
                            </View>
                            <Text style={styles.infoValue}>{rideRequest.distance}</Text>
                            <Text style={styles.infoLabel}>Distance</Text>
                        </View>

                        <View style={styles.infoCard}>
                            <View style={styles.infoIconContainer}>
                                <TimeIcon size={20} color={Colors.primary} />
                            </View>
                            <Text style={styles.infoValue}>{rideRequest.duration}</Text>
                            <Text style={styles.infoLabel}>Duration</Text>
                        </View>
                    </View>
                </View>

                {/* Fare */}
                <View style={styles.fareCard}>
                    <View style={styles.fareIconContainer}>
                        <MoneyIcon size={24} color={Colors.primary} />
                    </View>
                    <View style={styles.fareInfo}>
                        <Text style={styles.fareLabel}>Total Fare</Text>
                        <Text style={styles.fareValue}>₹{rideRequest.fare}</Text>
                    </View>
                </View>
            </ScrollView>

            {/* Action Buttons */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.rejectButton}
                    onPress={handleReject}
                    activeOpacity={0.7}
                >
                    <Text style={styles.rejectButtonText}>Reject</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.acceptButton}
                    onPress={handleAccept}
                    activeOpacity={0.8}
                >
                    <Text style={styles.acceptButtonText}>Accept Ride</Text>
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
    scrollContent: {
        flexGrow: 1,
        paddingBottom: Spacing.xl,
    },
    header: {
        paddingHorizontal: Spacing.lg,
        paddingTop: Spacing.xl,
        paddingBottom: Spacing.lg,
    },
    title: {
        ...Typography.h1,
        color: Colors.textPrimary,
        marginBottom: Spacing.xs,
    },
    subtitle: {
        ...Typography.caption,
        color: Colors.textSecondary,
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
        ...Typography.h3,
        color: Colors.textPrimary,
        marginBottom: Spacing.xs / 2,
    },
    customerLabel: {
        ...Typography.caption,
        color: Colors.success,
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
    infoGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    infoCard: {
        flex: 1,
        backgroundColor: Colors.cardBackground,
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        marginRight: Spacing.sm,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.border,
    },
    infoIconContainer: {
        width: 40,
        height: 40,
        borderRadius: BorderRadius.md,
        backgroundColor: '#F5F3FF',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Spacing.sm,
    },
    infoValue: {
        ...Typography.bodyMedium,
        color: Colors.textPrimary,
        marginBottom: Spacing.xs / 2,
    },
    infoLabel: {
        ...Typography.caption,
        color: Colors.textSecondary,
    },
    fareCard: {
        marginHorizontal: Spacing.lg,
        marginTop: Spacing.lg,
        backgroundColor: '#F5F3FF',
        borderRadius: BorderRadius.lg,
        padding: Spacing.lg,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: Colors.primary,
    },
    fareIconContainer: {
        width: 56,
        height: 56,
        borderRadius: BorderRadius.md,
        backgroundColor: Colors.cardBackground,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Spacing.md,
    },
    fareInfo: {
        flex: 1,
    },
    fareLabel: {
        ...Typography.caption,
        color: Colors.textSecondary,
        marginBottom: Spacing.xs / 2,
    },
    fareValue: {
        ...Typography.h1,
        color: Colors.primary,
    },
    footer: {
        flexDirection: 'row',
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.md,
        backgroundColor: Colors.cardBackground,
        borderTopWidth: 1,
        borderTopColor: Colors.borderLight,
    },
    rejectButton: {
        flex: 1,
        backgroundColor: Colors.cardBackground,
        borderWidth: 2,
        borderColor: Colors.border,
        borderRadius: BorderRadius.md,
        paddingVertical: Spacing.md,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Spacing.sm,
    },
    rejectButtonText: {
        ...Typography.bodyMedium,
        color: Colors.textSecondary,
        fontSize: 16,
    },
    acceptButton: {
        flex: 2,
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
    acceptButtonText: {
        ...Typography.bodyMedium,
        color: Colors.cardBackground,
        fontSize: 16,
    },
});

export default RideRequestScreen;

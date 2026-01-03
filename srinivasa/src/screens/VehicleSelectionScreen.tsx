import React, { useState } from 'react';
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
import { CarIcon, PersonIcon, MoneyIcon } from '../components/Icons';
import mockData from '../data/mockData.json';

const VehicleSelectionScreen = ({ navigation, route }: any) => {
    const { pickup, dropoff, distance, duration } = route.params;
    const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);

    const handleSelectVehicle = (vehicleId: string, price: number, type: string) => {
        navigation.navigate('BookingConfirmation', {
            pickup,
            dropoff,
            distance,
            duration,
            vehicleType: type,
            price,
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Select Vehicle</Text>
                    <Text style={styles.subtitle}>Fixed pricing, no hidden charges</Text>
                </View>

                {/* Route Summary */}
                <View style={styles.routeSummary}>
                    <View style={styles.routeRow}>
                        <Text style={styles.routeLabel}>From:</Text>
                        <Text style={styles.routeValue}>{pickup}</Text>
                    </View>
                    <View style={styles.routeRow}>
                        <Text style={styles.routeLabel}>To:</Text>
                        <Text style={styles.routeValue}>{dropoff}</Text>
                    </View>
                    <View style={styles.routeStats}>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>{distance}</Text>
                            <Text style={styles.statLabel}>Distance</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>{duration}</Text>
                            <Text style={styles.statLabel}>Duration</Text>
                        </View>
                    </View>
                </View>

                {/* Vehicle Cards */}
                <View style={styles.vehiclesContainer}>
                    {mockData.vehicles.map((vehicle) => (
                        <TouchableOpacity
                            key={vehicle.id}
                            style={[
                                styles.vehicleCard,
                                selectedVehicle === vehicle.id && styles.vehicleCardSelected,
                            ]}
                            onPress={() => setSelectedVehicle(vehicle.id)}
                            activeOpacity={0.7}
                        >
                            <View style={styles.vehicleIconContainer}>
                                <CarIcon
                                    size={40}
                                    color={selectedVehicle === vehicle.id ? Colors.primary : Colors.textSecondary}
                                />
                            </View>

                            <View style={styles.vehicleInfo}>
                                <Text
                                    style={[
                                        styles.vehicleType,
                                        selectedVehicle === vehicle.id && styles.vehicleTypeSelected,
                                    ]}
                                >
                                    {vehicle.type}
                                </Text>
                                <Text style={styles.vehicleDescription}>{vehicle.description}</Text>

                                <View style={styles.vehicleDetails}>
                                    <View style={styles.detailItem}>
                                        <PersonIcon size={16} color={Colors.textSecondary} />
                                        <Text style={styles.detailText}>{vehicle.capacity} seats</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.priceContainer}>
                                <View style={styles.priceIconContainer}>
                                    <MoneyIcon size={20} color={Colors.primary} />
                                </View>
                                <Text style={styles.priceAmount}>₹{vehicle.price}</Text>
                                <Text style={styles.priceLabel}>Fixed</Text>
                            </View>

                            <TouchableOpacity
                                style={styles.selectButton}
                                onPress={() => handleSelectVehicle(vehicle.id, vehicle.price, vehicle.type)}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.selectButtonText}>Select</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
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
    routeSummary: {
        marginHorizontal: Spacing.lg,
        backgroundColor: Colors.cardBackground,
        borderRadius: BorderRadius.lg,
        padding: Spacing.lg,
        marginBottom: Spacing.lg,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    routeRow: {
        marginBottom: Spacing.sm,
    },
    routeLabel: {
        ...Typography.caption,
        color: Colors.textSecondary,
        marginBottom: Spacing.xs / 2,
    },
    routeValue: {
        ...Typography.bodyMedium,
        color: Colors.textPrimary,
    },
    routeStats: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Spacing.md,
        paddingTop: Spacing.md,
        borderTopWidth: 1,
        borderTopColor: Colors.borderLight,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statValue: {
        ...Typography.h3,
        color: Colors.primary,
        marginBottom: Spacing.xs / 2,
    },
    statLabel: {
        ...Typography.small,
        color: Colors.textSecondary,
    },
    statDivider: {
        width: 1,
        height: 40,
        backgroundColor: Colors.borderLight,
    },
    vehiclesContainer: {
        paddingHorizontal: Spacing.lg,
    },
    vehicleCard: {
        backgroundColor: Colors.cardBackground,
        borderRadius: BorderRadius.lg,
        padding: Spacing.lg,
        marginBottom: Spacing.md,
        borderWidth: 2,
        borderColor: Colors.border,
    },
    vehicleCardSelected: {
        borderColor: Colors.primary,
        backgroundColor: '#F5F3FF',
    },
    vehicleIconContainer: {
        width: 64,
        height: 64,
        borderRadius: BorderRadius.md,
        backgroundColor: Colors.background,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Spacing.md,
    },
    vehicleInfo: {
        marginBottom: Spacing.md,
    },
    vehicleType: {
        ...Typography.h3,
        color: Colors.textPrimary,
        marginBottom: Spacing.xs,
    },
    vehicleTypeSelected: {
        color: Colors.primary,
    },
    vehicleDescription: {
        ...Typography.caption,
        color: Colors.textSecondary,
        marginBottom: Spacing.sm,
    },
    vehicleDetails: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: Spacing.md,
    },
    detailText: {
        ...Typography.caption,
        color: Colors.textSecondary,
        marginLeft: Spacing.xs,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.background,
        borderRadius: BorderRadius.md,
        padding: Spacing.md,
        marginBottom: Spacing.md,
    },
    priceIconContainer: {
        marginRight: Spacing.sm,
    },
    priceAmount: {
        ...Typography.h2,
        color: Colors.primary,
        marginRight: Spacing.xs,
    },
    priceLabel: {
        ...Typography.caption,
        color: Colors.textSecondary,
    },
    selectButton: {
        backgroundColor: Colors.primary,
        borderRadius: BorderRadius.md,
        paddingVertical: Spacing.md,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectButtonText: {
        ...Typography.bodyMedium,
        color: Colors.cardBackground,
        fontSize: 16,
    },
});

export default VehicleSelectionScreen;

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    SafeAreaView,
    Dimensions,
} from 'react-native';
import { Colors, Spacing, BorderRadius, Typography } from '../utils/colors';
import { RouteIcon, TimeIcon, MoneyIcon, ArrowForwardIcon } from '../components/Icons';

const { width } = Dimensions.get('window');

const MapRouteScreen = ({ navigation, route }: any) => {
    const { pickup, dropoff } = route.params;

    // Simulated route data
    const distance = '42 km';
    const duration = '1 hr 15 min';

    const handleContinue = () => {
        navigation.navigate('VehicleSelection', {
            pickup,
            dropoff,
            distance,
            duration,
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.secondary} />

            {/* Static Map Placeholder */}
            <View style={styles.mapContainer}>
                <View style={styles.mapPlaceholder}>
                    <View style={styles.routeLine} />
                    <View style={[styles.marker, styles.markerStart]}>
                        <View style={styles.markerDot} />
                    </View>
                    <View style={[styles.marker, styles.markerEnd]}>
                        <View style={styles.markerDot} />
                    </View>
                    <Text style={styles.mapLabel}>Route Preview</Text>
                </View>
            </View>

            {/* Bottom Sheet */}
            <View style={styles.bottomSheet}>
                <View style={styles.handle} />

                <View style={styles.sheetContent}>
                    <Text style={styles.sheetTitle}>Route Summary</Text>

                    {/* Route Details */}
                    <View style={styles.routeCard}>
                        <View style={styles.routeItem}>
                            <View style={styles.routeIconContainer}>
                                <RouteIcon size={20} color={Colors.primary} />
                            </View>
                            <View style={styles.routeInfo}>
                                <Text style={styles.routeLabel}>Distance</Text>
                                <Text style={styles.routeValue}>{distance}</Text>
                            </View>
                        </View>

                        <View style={styles.routeDivider} />

                        <View style={styles.routeItem}>
                            <View style={styles.routeIconContainer}>
                                <TimeIcon size={20} color={Colors.primary} />
                            </View>
                            <View style={styles.routeInfo}>
                                <Text style={styles.routeLabel}>Estimated Time</Text>
                                <Text style={styles.routeValue}>{duration}</Text>
                            </View>
                        </View>

                        <View style={styles.routeDivider} />

                        <View style={styles.routeItem}>
                            <View style={styles.routeIconContainer}>
                                <MoneyIcon size={20} color={Colors.primary} />
                            </View>
                            <View style={styles.routeInfo}>
                                <Text style={styles.routeLabel}>Starting From</Text>
                                <Text style={styles.routeValue}>₹1,200</Text>
                            </View>
                        </View>
                    </View>

                    {/* Locations */}
                    <View style={styles.locationsCard}>
                        <View style={styles.locationRow}>
                            <View style={styles.locationDot} />
                            <View style={styles.locationInfo}>
                                <Text style={styles.locationLabel}>Pickup</Text>
                                <Text style={styles.locationValue}>{pickup}</Text>
                            </View>
                        </View>

                        <View style={styles.locationConnector} />

                        <View style={styles.locationRow}>
                            <View style={[styles.locationDot, styles.locationDotEnd]} />
                            <View style={styles.locationInfo}>
                                <Text style={styles.locationLabel}>Drop-off</Text>
                                <Text style={styles.locationValue}>{dropoff}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Continue Button */}
                    <TouchableOpacity
                        style={styles.continueButton}
                        onPress={handleContinue}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.continueButtonText}>Choose Vehicle</Text>
                        <ArrowForwardIcon size={20} color={Colors.cardBackground} />
                    </TouchableOpacity>
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
    },
    mapPlaceholder: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E8E6F2',
        position: 'relative',
    },
    routeLine: {
        position: 'absolute',
        top: '30%',
        left: '20%',
        right: '20%',
        height: 4,
        backgroundColor: Colors.primary,
        borderRadius: 2,
        transform: [{ rotate: '15deg' }],
    },
    marker: {
        position: 'absolute',
        width: 24,
        height: 24,
        borderRadius: BorderRadius.full,
        backgroundColor: Colors.cardBackground,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
    },
    markerStart: {
        top: '28%',
        left: '18%',
        borderColor: Colors.primary,
    },
    markerEnd: {
        top: '42%',
        right: '18%',
        borderColor: Colors.alert,
    },
    markerDot: {
        width: 8,
        height: 8,
        borderRadius: BorderRadius.full,
        backgroundColor: Colors.primary,
    },
    mapLabel: {
        ...Typography.caption,
        color: Colors.textSecondary,
        marginTop: 100,
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
    sheetTitle: {
        ...Typography.h2,
        color: Colors.textPrimary,
        marginBottom: Spacing.md,
    },
    routeCard: {
        backgroundColor: '#F5F3FF',
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        marginBottom: Spacing.md,
    },
    routeItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    routeIconContainer: {
        width: 40,
        height: 40,
        borderRadius: BorderRadius.md,
        backgroundColor: Colors.cardBackground,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Spacing.md,
    },
    routeInfo: {
        flex: 1,
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
    routeDivider: {
        height: 1,
        backgroundColor: Colors.borderLight,
        marginVertical: Spacing.sm,
    },
    locationsCard: {
        backgroundColor: Colors.background,
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        marginBottom: Spacing.md,
    },
    locationRow: {
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
        ...Typography.body,
        color: Colors.textPrimary,
    },
    continueButton: {
        flexDirection: 'row',
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
    continueButtonText: {
        ...Typography.bodyMedium,
        color: Colors.cardBackground,
        fontSize: 18,
        marginRight: Spacing.sm,
    },
});

export default MapRouteScreen;

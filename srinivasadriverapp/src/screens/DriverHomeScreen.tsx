import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    SafeAreaView,
    Switch,
} from 'react-native';
import { Colors, Spacing, BorderRadius, Typography } from '../utils/colors';
import { MoneyIcon, TimeIcon, CheckCircleIcon } from '../components/Icons';

const DriverHomeScreen = ({ navigation }: any) => {
    const [isAvailable, setIsAvailable] = useState(true);

    // Mock today's stats
    const todayStats = {
        earnings: 2840,
        trips: 8,
        hours: 6.5,
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>Welcome Back</Text>
                        <Text style={styles.driverName}>Rahul Kumar</Text>
                    </View>
                </View>

                {/* Status Toggle */}
                <View style={styles.statusCard}>
                    <View style={styles.statusInfo}>
                        <View
                            style={[
                                styles.statusIndicator,
                                isAvailable ? styles.statusAvailable : styles.statusOffline,
                            ]}
                        />
                        <View style={styles.statusTextContainer}>
                            <Text style={styles.statusLabel}>Status</Text>
                            <Text
                                style={[
                                    styles.statusValue,
                                    isAvailable ? styles.statusValueAvailable : styles.statusValueOffline,
                                ]}
                            >
                                {isAvailable ? 'Available' : 'Offline'}
                            </Text>
                        </View>
                    </View>
                    <Switch
                        value={isAvailable}
                        onValueChange={setIsAvailable}
                        trackColor={{ false: Colors.border, true: Colors.primaryLight }}
                        thumbColor={isAvailable ? Colors.primary : Colors.textTertiary}
                    />
                </View>

                {/* Today's Summary */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Today's Summary</Text>

                    <View style={styles.statsGrid}>
                        <View style={styles.statCard}>
                            <View style={styles.statIconContainer}>
                                <MoneyIcon size={24} color={Colors.primary} />
                            </View>
                            <Text style={styles.statValue}>₹{todayStats.earnings}</Text>
                            <Text style={styles.statLabel}>Earnings</Text>
                        </View>

                        <View style={styles.statCard}>
                            <View style={styles.statIconContainer}>
                                <CheckCircleIcon size={24} color={Colors.success} />
                            </View>
                            <Text style={styles.statValue}>{todayStats.trips}</Text>
                            <Text style={styles.statLabel}>Trips</Text>
                        </View>

                        <View style={styles.statCard}>
                            <View style={styles.statIconContainer}>
                                <TimeIcon size={24} color={Colors.textSecondary} />
                            </View>
                            <Text style={styles.statValue}>{todayStats.hours}h</Text>
                            <Text style={styles.statLabel}>Online</Text>
                        </View>
                    </View>
                </View>

                {/* Quick Actions */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Quick Actions</Text>

                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => navigation.navigate('RideRequest')}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.actionButtonText}>View Ride Requests</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.actionButton, styles.actionButtonSecondary]}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.actionButtonTextSecondary}>Trip History</Text>
                    </TouchableOpacity>
                </View>

                {/* Info Card */}
                <View style={styles.infoCard}>
                    <Text style={styles.infoTitle}>💡 Tip</Text>
                    <Text style={styles.infoText}>
                        Stay online during peak hours (8-10 AM, 6-9 PM) to maximize your earnings
                    </Text>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    greeting: {
        ...Typography.caption,
        color: Colors.textSecondary,
        marginBottom: Spacing.xs,
    },
    driverName: {
        ...Typography.h1,
        color: Colors.textPrimary,
    },
    statusCard: {
        marginHorizontal: Spacing.lg,
        backgroundColor: Colors.cardBackground,
        borderRadius: BorderRadius.lg,
        padding: Spacing.lg,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: Colors.border,
        marginBottom: Spacing.lg,
    },
    statusInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusIndicator: {
        width: 16,
        height: 16,
        borderRadius: BorderRadius.full,
        marginRight: Spacing.md,
    },
    statusAvailable: {
        backgroundColor: Colors.success,
    },
    statusOffline: {
        backgroundColor: Colors.textTertiary,
    },
    statusTextContainer: {},
    statusLabel: {
        ...Typography.caption,
        color: Colors.textSecondary,
        marginBottom: Spacing.xs / 2,
    },
    statusValue: {
        ...Typography.h3,
    },
    statusValueAvailable: {
        color: Colors.success,
    },
    statusValueOffline: {
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
    statsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statCard: {
        flex: 1,
        backgroundColor: Colors.cardBackground,
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        marginRight: Spacing.sm,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.border,
    },
    statIconContainer: {
        width: 48,
        height: 48,
        borderRadius: BorderRadius.md,
        backgroundColor: Colors.background,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Spacing.sm,
    },
    statValue: {
        ...Typography.h2,
        color: Colors.textPrimary,
        marginBottom: Spacing.xs / 2,
    },
    statLabel: {
        ...Typography.caption,
        color: Colors.textSecondary,
    },
    actionButton: {
        backgroundColor: Colors.primary,
        borderRadius: BorderRadius.md,
        paddingVertical: Spacing.md,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Spacing.md,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 3,
    },
    actionButtonText: {
        ...Typography.bodyMedium,
        color: Colors.cardBackground,
        fontSize: 16,
    },
    actionButtonSecondary: {
        backgroundColor: Colors.cardBackground,
        borderWidth: 2,
        borderColor: Colors.primary,
        shadowOpacity: 0,
    },
    actionButtonTextSecondary: {
        ...Typography.bodyMedium,
        color: Colors.primary,
        fontSize: 16,
    },
    infoCard: {
        marginHorizontal: Spacing.lg,
        marginTop: Spacing.lg,
        backgroundColor: '#F5F3FF',
        borderRadius: BorderRadius.lg,
        padding: Spacing.lg,
        borderWidth: 1,
        borderColor: Colors.primaryLight,
    },
    infoTitle: {
        ...Typography.bodyMedium,
        color: Colors.textPrimary,
        marginBottom: Spacing.xs,
    },
    infoText: {
        ...Typography.caption,
        color: Colors.textSecondary,
        lineHeight: 20,
    },
});

export default DriverHomeScreen;

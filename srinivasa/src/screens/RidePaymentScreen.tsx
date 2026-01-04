import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import { Colors, Spacing, BorderRadius, Typography } from '../utils/colors';
import { MoneyIcon, RouteIcon, TimeIcon, CheckIcon } from '../components/Icons';

const RidePaymentScreen = ({ navigation, route }: any) => {
    const { price, distance, time } = route.params;
    const [selectedMethod, setSelectedMethod] = useState('upi');

    const handlePayNow = () => {
        navigation.navigate('RideCompleted', {
            rideId: `SRN${Math.floor(100000 + Math.random() * 899999)}`,
            amount: price,
            method: selectedMethod === 'upi' ? 'UPI' : 'Wallet'
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />

            <View style={styles.header}>
                <Text style={styles.headerTitle}>Ride Summary</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Final Fare Card */}
                <View style={styles.fareCard}>
                    <Text style={styles.fareLabel}>Total Fare</Text>
                    <Text style={styles.fareAmount}>{price}</Text>
                    <View style={styles.fareDetails}>
                        <View style={styles.detailItem}>
                            <RouteIcon size={16} color={Colors.textTertiary} />
                            <Text style={styles.detailText}>{distance}</Text>
                        </View>
                        <View style={styles.detailDivider} />
                        <View style={styles.detailItem}>
                            <TimeIcon size={16} color={Colors.textTertiary} />
                            <Text style={styles.detailText}>{time}</Text>
                        </View>
                    </View>
                </View>

                {/* Bill Breakdown */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Bill Breakdown</Text>
                    <View style={styles.billRow}>
                        <Text style={styles.billLabel}>Base Fare</Text>
                        <Text style={styles.billValue}>₹150.00</Text>
                    </View>
                    <View style={styles.billRow}>
                        <Text style={styles.billLabel}>Distance Fare (8.5 km)</Text>
                        <Text style={styles.billValue}>₹425.00</Text>
                    </View>
                    <View style={styles.billRow}>
                        <Text style={styles.billLabel}>Tolls & Taxes</Text>
                        <Text style={styles.billValue}>₹174.00</Text>
                    </View>
                    <View style={[styles.billRow, styles.totalRow]}>
                        <Text style={styles.totalLabel}>Total Payable</Text>
                        <Text style={styles.totalValue}>{price}</Text>
                    </View>
                </View>

                {/* Payment Options */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Payment Method</Text>

                    <TouchableOpacity
                        style={[styles.paymentMethod, selectedMethod === 'wallet' && styles.selectedMethod]}
                        onPress={() => setSelectedMethod('wallet')}
                    >
                        <View style={styles.methodIconBox}>
                            <MoneyIcon size={20} color={Colors.primary} />
                        </View>
                        <View style={styles.methodInfo}>
                            <Text style={styles.methodName}>Pay with Wallet</Text>
                            <Text style={styles.methodSub}>Available Balance: ₹2,450</Text>
                        </View>
                        {selectedMethod === 'wallet' && <CheckIcon size={20} color={Colors.primary} />}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.paymentMethod, selectedMethod === 'upi' && styles.selectedMethod]}
                        onPress={() => setSelectedMethod('upi')}
                    >
                        <View style={styles.methodIconBox}>
                            <MoneyIcon size={20} color={Colors.primary} />
                        </View>
                        <View style={styles.methodInfo}>
                            <Text style={styles.methodName}>Pay with UPI</Text>
                            <Text style={styles.methodSub}>Google Pay, PhonePe, Paytm</Text>
                        </View>
                        {selectedMethod === 'upi' && <CheckIcon size={20} color={Colors.primary} />}
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.payButton}
                    onPress={handlePayNow}
                    activeOpacity={0.8}
                >
                    <Text style={styles.payButtonText}>Pay Now {price}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        padding: Spacing.lg,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: Colors.borderLight,
    },
    headerTitle: {
        ...Typography.h2,
        color: Colors.textPrimary,
        textAlign: 'center',
    },
    content: {
        padding: Spacing.md,
    },
    fareCard: {
        backgroundColor: 'white',
        borderRadius: BorderRadius.xl,
        padding: Spacing.xl,
        alignItems: 'center',
        marginVertical: Spacing.md,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    fareLabel: {
        ...Typography.small,
        color: Colors.textSecondary,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    fareAmount: {
        ...Typography.h1,
        color: Colors.textPrimary,
        fontSize: 42,
        marginVertical: 8,
    },
    fareDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailText: {
        ...Typography.small,
        color: Colors.textSecondary,
        marginLeft: 6,
    },
    detailDivider: {
        width: 1,
        height: 12,
        backgroundColor: Colors.border,
        marginHorizontal: 12,
    },
    section: {
        backgroundColor: 'white',
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        marginTop: Spacing.md,
    },
    sectionTitle: {
        ...Typography.bodyMedium,
        fontWeight: 'bold',
        color: Colors.textPrimary,
        marginBottom: Spacing.md,
    },
    billRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: Spacing.sm,
    },
    billLabel: {
        ...Typography.body,
        color: Colors.textSecondary,
    },
    billValue: {
        ...Typography.body,
        color: Colors.textPrimary,
    },
    totalRow: {
        marginTop: Spacing.sm,
        paddingTop: Spacing.sm,
        borderTopWidth: 1,
        borderTopColor: Colors.borderLight,
    },
    totalLabel: {
        ...Typography.bodyMedium,
        fontWeight: 'bold',
        color: Colors.textPrimary,
    },
    totalValue: {
        ...Typography.bodyMedium,
        fontWeight: 'bold',
        color: Colors.primary,
    },
    paymentMethod: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Spacing.md,
        borderRadius: BorderRadius.md,
        borderWidth: 1,
        borderColor: Colors.borderLight,
        marginBottom: Spacing.sm,
    },
    selectedMethod: {
        borderColor: Colors.primary,
        backgroundColor: Colors.accent,
    },
    methodIconBox: {
        width: 40,
        height: 40,
        borderRadius: BorderRadius.md,
        backgroundColor: '#F0F2F5',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    methodInfo: {
        flex: 1,
    },
    methodName: {
        ...Typography.bodyMedium,
        fontWeight: '700',
        color: Colors.textPrimary,
    },
    methodSub: {
        ...Typography.small,
        color: Colors.textSecondary,
    },
    footer: {
        padding: Spacing.lg,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: Colors.borderLight,
    },
    payButton: {
        backgroundColor: Colors.primary,
        height: 54,
        borderRadius: BorderRadius.md,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    payButtonText: {
        ...Typography.bodyMedium,
        color: 'white',
        fontWeight: 'bold',
    },
});

export default RidePaymentScreen;

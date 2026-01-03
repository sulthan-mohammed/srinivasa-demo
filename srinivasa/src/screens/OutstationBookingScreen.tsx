import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    SafeAreaView,
    TextInput,
} from 'react-native';
import { Colors, Spacing, BorderRadius, Typography } from '../utils/colors';
import { LocationIcon, ArrowForwardIcon, CalendarIcon } from '../components/Icons';

const OutstationBookingScreen = ({ navigation }: any) => {
    const [pickup, setPickup] = useState('');
    const [dropoff, setDropoff] = useState('');
    const [tripType, setTripType] = useState<'oneWay' | 'roundTrip'>('oneWay');

    const handleContinue = () => {
        navigation.navigate('MapRoute', {
            pickup: pickup || 'Your Location',
            dropoff: dropoff || 'Destination',
        });
    };

    const isFormValid = pickup && dropoff;

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Outstation Trip</Text>
                    <Text style={styles.subtitle}>Intercity travel made easy</Text>
                </View>

                {/* Trip Type */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Trip Type</Text>

                    <View style={styles.tripTypeContainer}>
                        <TouchableOpacity
                            style={[
                                styles.tripTypeCard,
                                tripType === 'oneWay' && styles.tripTypeCardSelected,
                            ]}
                            onPress={() => setTripType('oneWay')}
                            activeOpacity={0.7}
                        >
                            <Text
                                style={[
                                    styles.tripTypeText,
                                    tripType === 'oneWay' && styles.tripTypeTextSelected,
                                ]}
                            >
                                One Way
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.tripTypeCard,
                                tripType === 'roundTrip' && styles.tripTypeCardSelected,
                            ]}
                            onPress={() => setTripType('roundTrip')}
                            activeOpacity={0.7}
                        >
                            <Text
                                style={[
                                    styles.tripTypeText,
                                    tripType === 'roundTrip' && styles.tripTypeTextSelected,
                                ]}
                            >
                                Round Trip
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Locations */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Trip Details</Text>

                    <View style={styles.inputContainer}>
                        <LocationIcon size={20} color={Colors.primary} />
                        <TextInput
                            style={styles.input}
                            placeholder="Pickup city"
                            placeholderTextColor={Colors.textTertiary}
                            value={pickup}
                            onChangeText={setPickup}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <LocationIcon size={20} color={Colors.alert} />
                        <TextInput
                            style={styles.input}
                            placeholder="Destination city"
                            placeholderTextColor={Colors.textTertiary}
                            value={dropoff}
                            onChangeText={setDropoff}
                        />
                    </View>
                </View>

                {/* Info Card */}
                <View style={styles.infoCard}>
                    <Text style={styles.infoTitle}>ℹ️ Outstation Benefits</Text>
                    <Text style={styles.infoText}>
                        • Fixed per-kilometer pricing{'\n'}
                        • No hidden charges{'\n'}
                        • Professional drivers{'\n'}
                        • 24/7 support
                    </Text>
                </View>
            </ScrollView>

            {/* Continue Button */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={[
                        styles.continueButton,
                        !isFormValid && styles.continueButtonDisabled,
                    ]}
                    onPress={handleContinue}
                    disabled={!isFormValid}
                    activeOpacity={0.8}
                >
                    <Text style={styles.continueButtonText}>Continue</Text>
                    <ArrowForwardIcon size={20} color={Colors.cardBackground} />
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
    tripTypeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    tripTypeCard: {
        flex: 1,
        backgroundColor: Colors.cardBackground,
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        marginRight: Spacing.sm,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: Colors.border,
    },
    tripTypeCardSelected: {
        borderColor: Colors.primary,
        backgroundColor: '#F5F3FF',
    },
    tripTypeText: {
        ...Typography.bodyMedium,
        color: Colors.textSecondary,
    },
    tripTypeTextSelected: {
        color: Colors.primary,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.cardBackground,
        borderRadius: BorderRadius.md,
        padding: Spacing.md,
        borderWidth: 1,
        borderColor: Colors.border,
        marginBottom: Spacing.md,
    },
    input: {
        flex: 1,
        marginLeft: Spacing.sm,
        ...Typography.body,
        color: Colors.textPrimary,
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
        marginBottom: Spacing.sm,
    },
    infoText: {
        ...Typography.caption,
        color: Colors.textSecondary,
        lineHeight: 20,
    },
    footer: {
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.md,
        backgroundColor: Colors.cardBackground,
        borderTopWidth: 1,
        borderTopColor: Colors.borderLight,
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
    continueButtonDisabled: {
        backgroundColor: Colors.border,
        shadowOpacity: 0,
    },
    continueButtonText: {
        ...Typography.bodyMedium,
        color: Colors.cardBackground,
        fontSize: 18,
        marginRight: Spacing.sm,
    },
});

export default OutstationBookingScreen;

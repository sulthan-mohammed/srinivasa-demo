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
import { LocationIcon, ArrowForwardIcon, TimeIcon } from '../components/Icons';

const RentalBookingScreen = ({ navigation }: any) => {
    const [pickup, setPickup] = useState('');
    const [hours, setHours] = useState('4');

    const handleContinue = () => {
        navigation.navigate('MapRoute', {
            pickup: pickup || 'Your Location',
            dropoff: 'Round trip',
        });
    };

    const isFormValid = pickup && hours;

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Hourly Rental</Text>
                    <Text style={styles.subtitle}>Book a car for flexible hours</Text>
                </View>

                {/* Pickup Location */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Pickup Location</Text>
                    <View style={styles.inputContainer}>
                        <LocationIcon size={20} color={Colors.textSecondary} />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter pickup location"
                            placeholderTextColor={Colors.textTertiary}
                            value={pickup}
                            onChangeText={setPickup}
                        />
                    </View>
                </View>

                {/* Duration */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Rental Duration</Text>

                    <View style={styles.durationOptions}>
                        {['2', '4', '6', '8'].map((hour) => (
                            <TouchableOpacity
                                key={hour}
                                style={[
                                    styles.durationCard,
                                    hours === hour && styles.durationCardSelected,
                                ]}
                                onPress={() => setHours(hour)}
                                activeOpacity={0.7}
                            >
                                <TimeIcon
                                    size={24}
                                    color={hours === hour ? Colors.primary : Colors.textSecondary}
                                />
                                <Text
                                    style={[
                                        styles.durationText,
                                        hours === hour && styles.durationTextSelected,
                                    ]}
                                >
                                    {hour} hrs
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Info Card */}
                <View style={styles.infoCard}>
                    <Text style={styles.infoTitle}>ℹ️ How it works</Text>
                    <Text style={styles.infoText}>
                        • Choose your rental duration{'\n'}
                        • Driver stays with you for the entire period{'\n'}
                        • Fixed pricing, no extra charges{'\n'}
                        • Perfect for multiple stops
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
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.cardBackground,
        borderRadius: BorderRadius.md,
        padding: Spacing.md,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    input: {
        flex: 1,
        marginLeft: Spacing.sm,
        ...Typography.body,
        color: Colors.textPrimary,
    },
    durationOptions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    durationCard: {
        flex: 1,
        backgroundColor: Colors.cardBackground,
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        marginRight: Spacing.sm,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: Colors.border,
    },
    durationCardSelected: {
        borderColor: Colors.primary,
        backgroundColor: '#F5F3FF',
    },
    durationText: {
        ...Typography.bodyMedium,
        color: Colors.textSecondary,
        marginTop: Spacing.xs,
    },
    durationTextSelected: {
        color: Colors.primary,
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

export default RentalBookingScreen;

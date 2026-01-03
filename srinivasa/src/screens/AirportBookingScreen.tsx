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
import { LocationIcon, ArrowForwardIcon } from '../components/Icons';

type TripType = 'toAirport' | 'fromAirport' | null;

const AirportBookingScreen = ({ navigation }: any) => {
    const [tripType, setTripType] = useState<TripType>(null);
    const [pickup, setPickup] = useState('');
    const [dropoff, setDropoff] = useState('');

    const handleContinue = () => {
        navigation.navigate('MapRoute', {
            pickup: tripType === 'fromAirport' ? 'Kempegowda International Airport' : pickup,
            dropoff: tripType === 'toAirport' ? 'Kempegowda International Airport' : dropoff,
        });
    };

    const isFormValid = tripType && (tripType === 'fromAirport' ? dropoff : pickup);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Airport Transfer</Text>
                    <Text style={styles.subtitle}>Fixed pricing, no surge</Text>
                </View>

                {/* Trip Type Selection */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Select Trip Type</Text>

                    <TouchableOpacity
                        style={[
                            styles.optionCard,
                            tripType === 'toAirport' && styles.optionCardSelected,
                        ]}
                        onPress={() => {
                            setTripType('toAirport');
                            setDropoff('Kempegowda International Airport');
                        }}
                        activeOpacity={0.7}
                    >
                        <View style={styles.optionContent}>
                            <Text
                                style={[
                                    styles.optionTitle,
                                    tripType === 'toAirport' && styles.optionTitleSelected,
                                ]}
                            >
                                To Airport
                            </Text>
                            <Text style={styles.optionSubtitle}>
                                Drop-off at Kempegowda Airport
                            </Text>
                        </View>
                        <View
                            style={[
                                styles.radioButton,
                                tripType === 'toAirport' && styles.radioButtonSelected,
                            ]}
                        >
                            {tripType === 'toAirport' && <View style={styles.radioButtonInner} />}
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.optionCard,
                            tripType === 'fromAirport' && styles.optionCardSelected,
                        ]}
                        onPress={() => {
                            setTripType('fromAirport');
                            setPickup('Kempegowda International Airport');
                        }}
                        activeOpacity={0.7}
                    >
                        <View style={styles.optionContent}>
                            <Text
                                style={[
                                    styles.optionTitle,
                                    tripType === 'fromAirport' && styles.optionTitleSelected,
                                ]}
                            >
                                From Airport
                            </Text>
                            <Text style={styles.optionSubtitle}>
                                Pick-up from Kempegowda Airport
                            </Text>
                        </View>
                        <View
                            style={[
                                styles.radioButton,
                                tripType === 'fromAirport' && styles.radioButtonSelected,
                            ]}
                        >
                            {tripType === 'fromAirport' && <View style={styles.radioButtonInner} />}
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Location Inputs */}
                {tripType && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Enter Location</Text>

                        {tripType === 'toAirport' ? (
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
                        ) : (
                            <View style={styles.inputContainer}>
                                <LocationIcon size={20} color={Colors.textSecondary} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter drop-off location"
                                    placeholderTextColor={Colors.textTertiary}
                                    value={dropoff}
                                    onChangeText={setDropoff}
                                />
                            </View>
                        )}

                        <View style={styles.prefilledContainer}>
                            <LocationIcon size={20} color={Colors.primary} />
                            <Text style={styles.prefilledText}>
                                Kempegowda International Airport
                            </Text>
                        </View>
                    </View>
                )}
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
    optionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.cardBackground,
        borderRadius: BorderRadius.lg,
        padding: Spacing.lg,
        marginBottom: Spacing.md,
        borderWidth: 2,
        borderColor: Colors.border,
    },
    optionCardSelected: {
        borderColor: Colors.primary,
        backgroundColor: '#F5F3FF',
    },
    optionContent: {
        flex: 1,
    },
    optionTitle: {
        ...Typography.bodyMedium,
        color: Colors.textPrimary,
        marginBottom: Spacing.xs,
    },
    optionTitleSelected: {
        color: Colors.primary,
    },
    optionSubtitle: {
        ...Typography.caption,
        color: Colors.textSecondary,
    },
    radioButton: {
        width: 24,
        height: 24,
        borderRadius: BorderRadius.full,
        borderWidth: 2,
        borderColor: Colors.border,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioButtonSelected: {
        borderColor: Colors.primary,
    },
    radioButtonInner: {
        width: 12,
        height: 12,
        borderRadius: BorderRadius.full,
        backgroundColor: Colors.primary,
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
    prefilledContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F3FF',
        borderRadius: BorderRadius.md,
        padding: Spacing.md,
        borderWidth: 1,
        borderColor: Colors.primary,
    },
    prefilledText: {
        flex: 1,
        marginLeft: Spacing.sm,
        ...Typography.bodyMedium,
        color: Colors.primary,
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

export default AirportBookingScreen;

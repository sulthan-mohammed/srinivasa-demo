import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    ScrollView,
    TextInput,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { Colors, Spacing, BorderRadius, Typography } from '../utils/colors';
import LottieView from 'lottie-react-native';
import { CheckIcon, StarIcon, ArrowForwardIcon } from '../components/Icons';

const SuccessLottie = require('../assets/lottie-files/Success.json');

const RideCompletedScreen = ({ navigation, route }: any) => {
    const { rideId, amount, method, pickup, dropoff } = route.params;
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleGoHome = () => {
        navigation.navigate('CustomerHome');
    };

    const handleSubmit = () => {
        if (rating === 0) return;
        setIsSubmitted(true);
        // Logic would go here
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" backgroundColor="white" translucent={false} />

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {/* Success Header */}
                    <View style={styles.header}>
                        <View style={styles.successCircle}>
                            <LottieView
                                source={SuccessLottie}
                                autoPlay
                                loop={false}
                                style={styles.lottieIcon}
                            />
                        </View>
                        <Text style={styles.title}>Ride Completed!</Text>
                        <Text style={styles.subtitle}>Thank you for riding with Srinivasa</Text>
                    </View>

                    {/* Receipt Card */}
                    <View style={styles.receiptCard}>
                        <View style={styles.receiptHeader}>
                            <Text style={styles.rideIdLabel}>Transaction ID</Text>
                            <Text style={styles.rideIdValue}>{rideId}</Text>
                        </View>

                        <View style={styles.receiptDivider} />

                        <View style={styles.receiptRow}>
                            <Text style={styles.receiptLabel}>Total Fare</Text>
                            <Text style={styles.receiptValue}>₹{amount}</Text>
                        </View>
                        <View style={styles.receiptRow}>
                            <Text style={styles.receiptLabel}>Payment</Text>
                            <Text style={styles.receiptValue}>{method || 'Cash'}</Text>
                        </View>

                        <View style={styles.receiptDivider} />

                        <View style={styles.ratingSection}>
                            {isSubmitted ? (
                                <View style={styles.submittedBox}>
                                    <Text style={styles.submittedTitle}>Feedback Received!</Text>
                                    <View style={styles.starsRow}>
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <StarIcon
                                                key={s}
                                                size={24}
                                                color={s <= rating ? Colors.secondary : Colors.border}
                                            />
                                        ))}
                                    </View>
                                </View>
                            ) : (
                                <>
                                    <Text style={styles.ratingTitle}>Rate your experience</Text>
                                    <View style={styles.starsRow}>
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <TouchableOpacity
                                                key={s}
                                                onPress={() => setRating(s)}
                                                style={styles.starButton}
                                            >
                                                <StarIcon
                                                    size={36}
                                                    color={s <= rating ? Colors.secondary : Colors.border}
                                                />
                                            </TouchableOpacity>
                                        ))}
                                    </View>

                                    {rating > 0 && (
                                        <View style={styles.feedbackContainer}>
                                            <TextInput
                                                style={styles.feedbackInput}
                                                placeholder="Any feedback for the captain? (Optional)"
                                                placeholderTextColor={Colors.textTertiary}
                                                multiline
                                                numberOfLines={3}
                                                value={feedback}
                                                onChangeText={setFeedback}
                                            />
                                            <TouchableOpacity
                                                style={styles.submitBtn}
                                                onPress={handleSubmit}
                                            >
                                                <Text style={styles.submitText}>Submit Feedback</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                </>
                            )}
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.homeButton}
                        onPress={handleGoHome}
                    >
                        <Text style={styles.homeButtonText}>Book Another Ride</Text>
                        <ArrowForwardIcon size={20} color="white" />
                    </TouchableOpacity>

                    <View style={styles.footerSpacing} />
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    scrollContent: {
        padding: 24,
        alignItems: 'center',
    },
    header: {
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 32,
    },
    successCircle: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: '#E8F5E9',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    lottieIcon: {
        width: 120,
        height: 120,
    },
    title: {
        fontSize: 28,
        fontWeight: '900',
        color: Colors.textPrimary,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 15,
        color: Colors.textSecondary,
        textAlign: 'center',
    },
    receiptCard: {
        width: '100%',
        backgroundColor: Colors.cardBackground,
        borderRadius: 24,
        padding: 24,
        marginBottom: 32,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 4,
    },
    receiptHeader: {
        alignItems: 'center',
        marginBottom: 16,
    },
    rideIdLabel: {
        fontSize: 10,
        fontWeight: 'bold',
        color: Colors.textTertiary,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    rideIdValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.textPrimary,
        marginTop: 4,
    },
    receiptDivider: {
        height: 1,
        backgroundColor: Colors.borderLight,
        marginVertical: 20,
    },
    receiptRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    receiptLabel: {
        fontSize: 14,
        color: Colors.textSecondary,
    },
    receiptValue: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.textPrimary,
    },
    ratingSection: {
        alignItems: 'center',
    },
    ratingTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.textPrimary,
        marginBottom: 16,
    },
    starsRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 8,
    },
    starButton: {
        padding: 4,
    },
    feedbackContainer: {
        width: '100%',
        marginTop: 20,
    },
    feedbackInput: {
        width: '100%',
        backgroundColor: Colors.background,
        borderRadius: 16,
        padding: 16,
        color: Colors.textPrimary,
        fontSize: 14,
        textAlignVertical: 'top',
        minHeight: 100,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    submitBtn: {
        backgroundColor: Colors.accent,
        height: 48,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
    },
    submitText: {
        color: Colors.primary,
        fontWeight: 'bold',
        fontSize: 14,
    },
    submittedBox: {
        alignItems: 'center',
        paddingVertical: 10,
    },
    submittedTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.success,
        marginBottom: 12,
    },
    homeButton: {
        width: '100%',
        backgroundColor: Colors.textPrimary,
        height: 56,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
    },
    homeButtonText: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
    footerSpacing: {
        height: 40,
    },
});

export default RideCompletedScreen;

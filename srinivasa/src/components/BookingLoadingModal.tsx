import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    Animated,
    Easing,
    SafeAreaView,
} from 'react-native';
import { Colors, Spacing, BorderRadius, Typography } from '../utils/colors';

interface BookingLoadingModalProps {
    visible: boolean;
    vehicleName: string;
}

const BookingLoadingModal = ({ visible, vehicleName }: BookingLoadingModalProps) => {
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const [statusText, setStatusText] = useState('Contacting nearby drivers...');

    useEffect(() => {
        if (visible) {
            // Pulse animation for the center icon
            Animated.loop(
                Animated.sequence([
                    Animated.timing(pulseAnim, {
                        toValue: 1.2,
                        duration: 800,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                    Animated.timing(pulseAnim, {
                        toValue: 1,
                        duration: 800,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                ])
            ).start();

            // Dynamic status texts scaled for 10 seconds
            const timers = [
                setTimeout(() => setStatusText(`Matching with the best ${vehicleName}...`), 3000),
                setTimeout(() => setStatusText('Negotiating with 5 nearby drivers...'), 6000),
                setTimeout(() => setStatusText('Driver found! Finalizing details...'), 8500),
            ];

            return () => {
                timers.forEach(clearTimeout);
                pulseAnim.setValue(1);
            };
        }
    }, [visible, vehicleName]);

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.content}>
                        {/* Animated Pulses */}
                        <View style={styles.animationContainer}>
                            <Animated.View
                                style={[
                                    styles.pulseCircle,
                                    { transform: [{ scale: pulseAnim }], opacity: 0.3 }
                                ]}
                            />
                            <Animated.View
                                style={[
                                    styles.pulseCircleInner,
                                    { transform: [{ scale: pulseAnim }], opacity: 0.5 }
                                ]}
                            />
                            <View style={styles.centerIcon}>
                                <Text style={styles.iconText}>🚕</Text>
                            </View>
                        </View>

                        <Text style={styles.mainTitle}>Searching for your ride</Text>
                        <Text style={styles.statusText}>{statusText}</Text>

                        <View style={styles.progressBarBg}>
                            <Animated.View style={styles.progressBarFill} />
                        </View>
                    </View>
                </SafeAreaView>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '100%',
        alignItems: 'center',
    },
    content: {
        width: '80%',
        alignItems: 'center',
    },
    animationContainer: {
        width: 200,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Spacing.xl,
    },
    pulseCircle: {
        position: 'absolute',
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: Colors.primaryLight,
    },
    pulseCircleInner: {
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: Colors.primary,
    },
    centerIcon: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: Colors.cardBackground,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    iconText: {
        fontSize: 30,
    },
    mainTitle: {
        ...Typography.h2,
        color: Colors.textPrimary,
        marginBottom: Spacing.sm,
        textAlign: 'center',
    },
    statusText: {
        ...Typography.body,
        color: Colors.textSecondary,
        textAlign: 'center',
        marginBottom: Spacing.xl,
        height: 24, // Keep height consistent
    },
    progressBarBg: {
        width: '100%',
        height: 4,
        backgroundColor: Colors.borderLight,
        borderRadius: 2,
        overflow: 'hidden',
    },
    progressBarFill: {
        width: '60%', // Static in this mock, but implies progress
        height: '100%',
        backgroundColor: Colors.primary,
    },
});

export default BookingLoadingModal;

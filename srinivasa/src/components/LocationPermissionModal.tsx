import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Spacing, BorderRadius, Typography } from '../utils/colors';

interface LocationPermissionModalProps {
    visible: boolean;
    onAllow: () => void;
    onRetry: () => void;
}

const LocationPermissionModal = ({ visible, onAllow, onRetry }: LocationPermissionModalProps) => {
    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>Location Permission Required</Text>
                    <Text style={styles.message}>
                        Location access is required to detect your pickup point and provide an accurate booking experience.
                    </Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
                            <Text style={styles.retryButtonText}>Retry</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.allowButton} onPress={onAllow}>
                            <Text style={styles.allowButtonText}>Allow Location</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: Spacing.xl,
    },
    container: {
        backgroundColor: Colors.cardBackground,
        borderRadius: BorderRadius.lg,
        padding: Spacing.lg,
        width: '100%',
        alignItems: 'center',
    },
    title: {
        ...Typography.h3,
        color: Colors.textPrimary,
        marginBottom: Spacing.md,
        textAlign: 'center',
    },
    message: {
        ...Typography.body,
        color: Colors.textSecondary,
        textAlign: 'center',
        marginBottom: Spacing.xl,
        lineHeight: 22,
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        gap: Spacing.md,
    },
    allowButton: {
        flex: 2,
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        borderRadius: BorderRadius.md,
        alignItems: 'center',
    },
    allowButtonText: {
        ...Typography.bodyMedium,
        color: Colors.cardBackground,
    },
    retryButton: {
        flex: 1,
        backgroundColor: Colors.background,
        paddingVertical: 12,
        borderRadius: BorderRadius.md,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.border,
    },
    retryButtonText: {
        ...Typography.bodyMedium,
        color: Colors.textSecondary,
    },
});

export default LocationPermissionModal;

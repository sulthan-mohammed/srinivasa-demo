import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Spacing, BorderRadius, Typography } from '../utils/colors';
import { LocationIcon } from './Icons';

interface LocationInputProps {
    label: string;
    value: string;
    onChangeText?: (text: string) => void;
    placeholder?: string;
    disabled?: boolean;
    isFixed?: boolean;
    onPress?: () => void;
}

const LocationInput = ({
    label,
    value,
    onChangeText,
    placeholder,
    disabled = false,
    isFixed = false,
    onPress,
}: LocationInputProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TouchableOpacity
                activeOpacity={disabled || isFixed ? 1 : 0.7}
                onPress={onPress}
                style={[
                    styles.inputWrapper,
                    (disabled || isFixed) && styles.disabledInput,
                ]}
            >
                <LocationIcon
                    size={18}
                    color={isFixed ? Colors.alert : (disabled ? Colors.textTertiary : Colors.primary)}
                />
                <TextInput
                    style={[
                        styles.input,
                        (disabled || isFixed) && styles.disabledText,
                    ]}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor={Colors.textTertiary}
                    editable={!disabled && !isFixed && !!onChangeText}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: Spacing.sm,
    },
    label: {
        fontSize: 11,
        fontWeight: '600',
        color: Colors.textSecondary,
        marginBottom: 2,
        marginLeft: 4,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.cardBackground,
        borderRadius: BorderRadius.md,
        paddingHorizontal: Spacing.md,
        height: 42,
        borderWidth: 1,
        borderColor: Colors.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1,
    },
    disabledInput: {
        backgroundColor: Colors.cardBackground,
        borderColor: Colors.borderLight,
    },
    input: {
        flex: 1,
        marginLeft: Spacing.sm,
        fontSize: 14,
        fontWeight: '400',
        color: Colors.textPrimary,
        height: '100%',
    },
    disabledText: {
        color: Colors.textSecondary,
    },
});

export default LocationInput;

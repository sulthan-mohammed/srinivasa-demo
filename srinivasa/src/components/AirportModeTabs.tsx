import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Spacing, BorderRadius, Typography } from '../utils/colors';

interface AirportModeTabsProps {
    mode: 'toAirport' | 'fromAirport';
    onModeChange: (mode: 'toAirport' | 'fromAirport') => void;
}

const AirportModeTabs = ({ mode, onModeChange }: AirportModeTabsProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tab, mode === 'toAirport' && styles.activeTab]}
                    onPress={() => onModeChange('toAirport')}
                    activeOpacity={0.8}
                >
                    <Text style={[styles.tabText, mode === 'toAirport' && styles.activeTabText]}>
                        To Airport
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, mode === 'fromAirport' && styles.activeTab]}
                    onPress={() => onModeChange('fromAirport')}
                    activeOpacity={0.8}
                >
                    <Text style={[styles.tabText, mode === 'fromAirport' && styles.activeTabText]}>
                        From Airport
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: Spacing.lg,
        marginTop: Spacing.sm,
        marginBottom: Spacing.md,
        alignItems: 'center',
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#EAEAEE',
        borderRadius: BorderRadius.full,
        padding: 4,
        width: '100%',
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: BorderRadius.full,
    },
    activeTab: {
        backgroundColor: Colors.primary,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    tabText: {
        ...Typography.bodyMedium,
        color: Colors.textSecondary,
        fontSize: 14,
        fontWeight: '600',
    },
    activeTabText: {
        color: Colors.cardBackground,
        fontWeight: 'bold',
    },
});

export default AirportModeTabs;

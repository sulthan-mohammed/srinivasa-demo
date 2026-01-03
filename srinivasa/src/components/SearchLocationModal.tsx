import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TextInput,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
} from 'react-native';
import { Colors, Spacing, BorderRadius, Typography } from '../utils/colors';
import { LocationIcon, CloseIcon } from './Icons';

interface LocationResult {
    name: string;
    latitude: number;
    longitude: number;
}

interface SearchLocationModalProps {
    visible: boolean;
    onClose: () => void;
    onSelect: (location: LocationResult) => void;
}

const HYDERABAD_AREAS: LocationResult[] = [
    { name: 'Gachibowli, Hyderabad', latitude: 17.4401, longitude: 78.3489 },
    { name: 'Jubilee Hills, Hyderabad', latitude: 17.4301, longitude: 78.4079 },
    { name: 'Banjara Hills, Hyderabad', latitude: 17.4126, longitude: 78.4430 },
    { name: 'HITEC City, Hyderabad', latitude: 17.4435, longitude: 78.3773 },
    { name: 'Secunderabad, Hyderabad', latitude: 17.4399, longitude: 78.4983 },
    { name: 'Madhapur, Hyderabad', latitude: 17.4483, longitude: 78.3915 },
    { name: 'Kukatpally, Hyderabad', latitude: 17.4875, longitude: 78.3953 },
    { name: 'Balanagar, Hyderabad', latitude: 17.4589, longitude: 78.4430 },
    { name: 'Begumpet, Hyderabad', latitude: 17.4447, longitude: 78.4664 },
    { name: 'Kondapur, Hyderabad', latitude: 17.4622, longitude: 78.3568 },
    { name: 'Miyapur, Hyderabad', latitude: 17.4948, longitude: 78.3400 },
    { name: 'Charminar Area, Hyderabad', latitude: 17.3616, longitude: 78.4747 },
    { name: 'Ameerpet, Hyderabad', latitude: 17.4375, longitude: 78.4482 },
    { name: 'Mehdipatnam, Hyderabad', latitude: 17.3959, longitude: 78.4312 },
    { name: 'L.B. Nagar, Hyderabad', latitude: 17.3457, longitude: 78.5522 },
];

const SearchLocationModal = ({ visible, onClose, onSelect }: SearchLocationModalProps) => {
    const [query, setQuery] = useState('');
    const filteredResults = HYDERABAD_AREAS.filter(r => r.name.toLowerCase().includes(query.toLowerCase()));

    return (
        <Modal visible={visible} animationType="slide">
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <CloseIcon size={24} color={Colors.textPrimary} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Search Area in Hyderabad</Text>
                </View>

                <View style={styles.searchBar}>
                    <LocationIcon size={20} color={Colors.primary} />
                    <TextInput
                        style={styles.input}
                        placeholder="Search for area (e.g. Gachibowli)..."
                        value={query}
                        onChangeText={setQuery}
                        autoFocus
                    />
                </View>

                <FlatList
                    data={filteredResults}
                    keyExtractor={(item) => item.name}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.resultItem}
                            onPress={() => {
                                onSelect(item);
                                onClose();
                            }}
                        >
                            <View style={styles.iconContainer}>
                                <LocationIcon size={18} color={Colors.textTertiary} />
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.resultText}>{item.name}</Text>
                                <Text style={styles.subText}>Hyderabad, Telangana</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    contentContainerStyle={styles.list}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>No areas found matching "{query}"</Text>
                        </View>
                    }
                />
            </SafeAreaView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.cardBackground,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: Colors.borderLight,
    },
    closeButton: {
        padding: Spacing.sm,
    },
    title: {
        ...Typography.h3,
        fontSize: 18,
        marginLeft: Spacing.md,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: Spacing.md,
        paddingHorizontal: Spacing.md,
        backgroundColor: Colors.background,
        borderRadius: BorderRadius.md,
        height: 50,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    input: {
        flex: 1,
        marginLeft: Spacing.sm,
        ...Typography.body,
        fontSize: 15,
        color: Colors.textPrimary,
    },
    list: {
        paddingHorizontal: Spacing.md,
    },
    resultItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: Spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: Colors.borderLight,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        marginLeft: Spacing.md,
        flex: 1,
    },
    resultText: {
        ...Typography.bodyMedium,
        fontSize: 15,
        color: Colors.textPrimary,
    },
    subText: {
        ...Typography.small,
        color: Colors.textTertiary,
        marginTop: 2,
    },
    emptyContainer: {
        padding: Spacing.xl,
        alignItems: 'center',
    },
    emptyText: {
        ...Typography.body,
        color: Colors.textSecondary,
        textAlign: 'center',
    },
});

export default SearchLocationModal;

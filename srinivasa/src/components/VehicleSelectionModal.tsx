import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    FlatList,
    Image,
    SafeAreaView,
    Dimensions,
} from 'react-native';
import { Colors, Spacing, BorderRadius, Typography } from '../utils/colors';
import { CloseIcon, PersonIcon } from './Icons';

const { width } = Dimensions.get('window');

interface VehicleType {
    id: string;
    name: string;
    capacity: number;
    description: string;
    eta: string;
    price: string;
    image: any;
    isEV?: boolean;
}

const VEHICLES: VehicleType[] = [
    {
        id: '1',
        name: 'Auto',
        capacity: 3,
        description: 'Open air ride, affordable',
        eta: '3 min',
        price: '₹349',
        image: require('../assets/vehicles/auto.png'),
    },
    {
        id: '2',
        name: 'Prime Mini',
        capacity: 4,
        description: 'Comfy hatchbacks',
        eta: '5 min',
        price: '₹749',
        image: require('../assets/vehicles/mini.png'),
    },
    {
        id: '3',
        name: 'Swift EV',
        capacity: 4,
        description: 'Eco-friendly electric sedan',
        eta: '6 min',
        price: '₹899',
        image: require('../assets/vehicles/ev.png'),
        isEV: true,
    },
    {
        id: '4',
        name: 'Prime SUV',
        capacity: 6,
        description: 'Spacious 6-seater SUVs',
        eta: '8 min',
        price: '₹1,249',
        image: require('../assets/vehicles/suv.png'),
    },
    {
        id: '5',
        name: 'Luxe Grand',
        capacity: 8,
        description: 'Premium 8-seater minivan',
        eta: '12 min',
        price: '₹1,899',
        image: require('../assets/vehicles/minivan.png'),
    },
];

interface VehicleSelectionModalProps {
    visible: boolean;
    onClose: () => void;
    onConfirm: (vehicle: VehicleType) => void;
}

const VehicleSelectionModal = ({ visible, onClose, onConfirm }: VehicleSelectionModalProps) => {
    const [selectedId, setSelectedId] = React.useState('3'); // Default select EV

    const selectedVehicle = VEHICLES.find(v => v.id === selectedId);

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    {/* Header */}
                    <View style={styles.header}>
                        <View style={styles.dragHandle} />
                        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                            <CloseIcon size={24} color={Colors.textSecondary} />
                        </TouchableOpacity>
                        <Text style={styles.title}>Choose a Ride</Text>
                    </View>

                    {/* Vehicle List */}
                    <FlatList
                        data={VEHICLES}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={[
                                    styles.vehicleItem,
                                    selectedId === item.id && styles.selectedItem
                                ]}
                                onPress={() => setSelectedId(item.id)}
                            >
                                <Image source={item.image} style={styles.vehicleImage} resizeMode="contain" />
                                <View style={styles.vehicleInfo}>
                                    <View style={styles.nameRow}>
                                        <Text style={styles.vehicleName}>{item.name}</Text>
                                        {item.isEV && (
                                            <View style={styles.evBadge}>
                                                <Text style={styles.evText}>EV</Text>
                                            </View>
                                        )}
                                        <View style={styles.capacityRow}>
                                            <PersonIcon size={14} color={Colors.textTertiary} />
                                            <Text style={styles.capacityText}>{item.capacity}</Text>
                                        </View>
                                    </View>
                                    <Text style={styles.description} numberOfLines={1}>{item.description}</Text>
                                    <Text style={styles.eta}>{item.eta} away</Text>
                                </View>
                                <View style={styles.priceContainer}>
                                    <Text style={styles.price}>{item.price}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        contentContainerStyle={styles.listContainer}
                        showsVerticalScrollIndicator={false}
                    />

                    {/* Footer / Confirm Button */}
                    <View style={styles.footer}>
                        <TouchableOpacity
                            style={styles.confirmButton}
                            onPress={() => selectedVehicle && onConfirm(selectedVehicle)}
                        >
                            <Text style={styles.confirmButtonText}>
                                Confirm {selectedVehicle?.name}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: Colors.cardBackground,
        borderTopLeftRadius: BorderRadius.xl,
        borderTopRightRadius: BorderRadius.xl,
        height: '70%',
        width: '100%',
    },
    header: {
        paddingTop: Spacing.sm,
        paddingBottom: Spacing.md,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: Colors.borderLight,
    },
    dragHandle: {
        width: 40,
        height: 5,
        backgroundColor: Colors.border,
        borderRadius: BorderRadius.full,
        marginBottom: Spacing.sm,
    },
    closeButton: {
        position: 'absolute',
        right: Spacing.md,
        top: Spacing.md,
        zIndex: 1,
    },
    title: {
        ...Typography.h3,
        color: Colors.textPrimary,
    },
    listContainer: {
        padding: Spacing.md,
    },
    vehicleItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Spacing.md,
        borderRadius: BorderRadius.lg,
        borderWidth: 2,
        borderColor: 'transparent',
        marginBottom: Spacing.sm,
        backgroundColor: '#F9FAFB',
    },
    selectedItem: {
        borderColor: Colors.primary,
        backgroundColor: Colors.accent,
    },
    vehicleImage: {
        width: 70,
        height: 50,
        marginRight: Spacing.md,
    },
    vehicleInfo: {
        flex: 1,
    },
    nameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    vehicleName: {
        ...Typography.bodyMedium,
        fontWeight: '700',
        color: Colors.textPrimary,
    },
    evBadge: {
        backgroundColor: '#E1F5FE',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    evText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#0288D1',
    },
    capacityRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 'auto',
    },
    capacityText: {
        ...Typography.small,
        color: Colors.textTertiary,
        marginLeft: 2,
    },
    description: {
        ...Typography.small,
        color: Colors.textSecondary,
        marginTop: 2,
    },
    eta: {
        ...Typography.small,
        color: Colors.primary,
        fontWeight: '600',
        marginTop: 2,
    },
    priceContainer: {
        marginLeft: Spacing.sm,
    },
    price: {
        ...Typography.bodyMedium,
        fontWeight: 'bold',
        color: Colors.textPrimary,
    },
    footer: {
        padding: Spacing.lg,
        borderTopWidth: 1,
        borderTopColor: Colors.borderLight,
        backgroundColor: Colors.cardBackground,
    },
    confirmButton: {
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
    confirmButtonText: {
        ...Typography.bodyMedium,
        color: 'white',
        fontWeight: 'bold',
    },
});

export default VehicleSelectionModal;

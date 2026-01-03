import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    ScrollView,
    FlatList,
    Dimensions,
} from 'react-native';
import { Colors, Spacing, BorderRadius, Typography } from '../utils/colors';
import moment from 'moment';

const { height } = Dimensions.get('window');

interface DateTimePickerModalProps {
    visible: boolean;
    onClose: () => void;
    onConfirm: (date: string, time: string) => void;
}

const DateTimePickerModal = ({ visible, onClose, onConfirm }: DateTimePickerModalProps) => {
    const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
    const [selectedTime, setSelectedTime] = useState('');

    // Generate next 7 days
    const dates = Array.from({ length: 7 }).map((_, i) => moment().add(i, 'days'));

    // Generate times with 30-min intervals
    const generateTimes = () => {
        const times = [];
        let start = moment().startOf('day').add(6, 'hours'); // Start from 6 AM
        const end = moment().startOf('day').add(23, 'hours').add(30, 'minutes');

        while (start <= end) {
            times.push(start.format('HH:mm'));
            start = start.add(30, 'minutes');
        }
        return times;
    };

    const times = generateTimes();

    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.overlay}>
                <TouchableOpacity style={styles.dismissArea} onPress={onClose} />
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Select Date & Time</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Text style={styles.closeText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionLabel}>Date</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dateList}>
                            {dates.map((date) => {
                                const isSelected = selectedDate === date.format('YYYY-MM-DD');
                                return (
                                    <TouchableOpacity
                                        key={date.format('YYYY-MM-DD')}
                                        style={[styles.dateCard, isSelected && styles.selectedDateCard]}
                                        onPress={() => setSelectedDate(date.format('YYYY-MM-DD'))}
                                    >
                                        <Text style={[styles.dateDay, isSelected && styles.selectedDateText]}>
                                            {date.format('ddd')}
                                        </Text>
                                        <Text style={[styles.dateNum, isSelected && styles.selectedDateText]}>
                                            {date.format('DD')}
                                        </Text>
                                        <Text style={[styles.dateMonth, isSelected && styles.selectedDateText]}>
                                            {date.format('MMM')}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </ScrollView>
                    </View>

                    <View style={[styles.section, { flex: 1 }]}>
                        <Text style={styles.sectionLabel}>Time (30 min intervals)</Text>
                        <FlatList
                            data={times}
                            numColumns={4}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => {
                                const isSelected = selectedTime === item;
                                return (
                                    <TouchableOpacity
                                        style={[styles.timeSlot, isSelected && styles.selectedTimeSlot]}
                                        onPress={() => setSelectedTime(item)}
                                    >
                                        <Text style={[styles.timeText, isSelected && styles.selectedTimeText]}>
                                            {moment(item, 'HH:mm').format('hh:mm A')}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            }}
                            contentContainerStyle={styles.timeGrid}
                        />
                    </View>

                    <TouchableOpacity
                        style={[styles.confirmButton, (!selectedDate || !selectedTime) && styles.disabledButton]}
                        disabled={!selectedDate || !selectedTime}
                        onPress={() => onConfirm(selectedDate, selectedTime)}
                    >
                        <Text style={styles.confirmButtonText}>Confirm Schedule</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    dismissArea: {
        flex: 1,
    },
    container: {
        backgroundColor: Colors.cardBackground,
        borderTopLeftRadius: BorderRadius.xl,
        borderTopRightRadius: BorderRadius.xl,
        height: height * 0.75,
        padding: Spacing.lg,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.xl,
    },
    title: {
        ...Typography.h2,
        color: Colors.textPrimary,
    },
    closeText: {
        ...Typography.body,
        color: Colors.alert,
    },
    section: {
        marginBottom: Spacing.xl,
    },
    sectionLabel: {
        ...Typography.caption,
        fontWeight: '700',
        color: Colors.textSecondary,
        marginBottom: Spacing.md,
        textTransform: 'uppercase',
    },
    dateList: {
        paddingRight: Spacing.lg,
    },
    dateCard: {
        width: 70,
        height: 90,
        borderRadius: BorderRadius.md,
        backgroundColor: Colors.background,
        marginRight: Spacing.md,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors.border,
    },
    selectedDateCard: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    dateDay: {
        ...Typography.small,
        color: Colors.textSecondary,
        marginBottom: 4,
    },
    dateNum: {
        ...Typography.h3,
        color: Colors.textPrimary,
    },
    dateMonth: {
        ...Typography.small,
        color: Colors.textSecondary,
        marginTop: 2,
    },
    selectedDateText: {
        color: Colors.cardBackground,
    },
    timeGrid: {
        paddingBottom: Spacing.xl,
    },
    timeSlot: {
        flex: 1,
        height: 45,
        backgroundColor: Colors.background,
        borderRadius: BorderRadius.sm,
        margin: 4,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors.border,
    },
    selectedTimeSlot: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    timeText: {
        ...Typography.small,
        color: Colors.textPrimary,
        fontWeight: '600',
    },
    selectedTimeText: {
        color: Colors.cardBackground,
    },
    confirmButton: {
        backgroundColor: Colors.primary,
        paddingVertical: Spacing.md,
        borderRadius: BorderRadius.md,
        alignItems: 'center',
        marginTop: Spacing.md,
    },
    disabledButton: {
        backgroundColor: Colors.textTertiary,
    },
    confirmButtonText: {
        ...Typography.bodyMedium,
        color: Colors.cardBackground,
        fontWeight: '700',
    },
});

export default DateTimePickerModal;

import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    Dimensions,
    Image,
    ScrollView,
    Animated,
} from 'react-native';
import { Colors, Spacing, BorderRadius, Typography } from '../utils/colors';
import {
    PhoneIcon,
    MessageIcon,
    ShieldIcon,
    StarIcon,
    ArrowForwardIcon,
    CloseIcon,
    RouteIcon,
} from '../components/Icons';
import AirportMapView from '../components/AirportMapView';

const { width, height } = Dimensions.get('window');
const GOOGLE_MAPS_API_KEY = 'AIzaSyDYjHQx5xcjnoCBw1DcSEINcKulOUE9nvw';

const driverAvatar = require('../assets/images/driver-avatar.png');

const RideInProgressScreen = ({ navigation, route }: any) => {
    const { pickup, dropoff, vehicle, price, driverInfo, vehicleDetails } = route.params;

    // Simulation states
    const [progress, setProgress] = useState(65); // Start at 65% for prototype feel
    const [currentPos, setCurrentPos] = useState({
        latitude: pickup.latitude + (dropoff.latitude - pickup.latitude) * 0.65,
        longitude: pickup.longitude + (dropoff.longitude - pickup.longitude) * 0.65,
    });
    const [showSupport, setShowSupport] = useState(false);

    // Calculate dynamic arrival time (Current + 10 mins)
    const [arrivalTime] = useState(() => {
        const date = new Date(Date.now() + 10 * 60 * 1000);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    });

    const progressAnim = useRef(new Animated.Value(0.65)).current;

    useEffect(() => {
        // Simulate slow progress for realism
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                const next = prev + 0.1;

                // Update marker position roughly on line
                const factor = next / 100;
                setCurrentPos({
                    latitude: pickup.latitude + (dropoff.latitude - pickup.latitude) * factor,
                    longitude: pickup.longitude + (dropoff.longitude - pickup.longitude) * factor,
                });

                return next;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleEndRide = () => {
        navigation.navigate('RideCompleted', {
            pickup,
            dropoff,
            vehicle,
            price,
            driverInfo,
            amount: price,
            method: 'Cash',
            rideId: 'BK-' + Math.random().toString(36).substr(2, 9).toUpperCase()
        });
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

            {/* 1. Map Layer */}
            <View style={styles.mapWrapper}>
                <AirportMapView
                    pickup={pickup}
                    dropoff={dropoff}
                    driver={currentPos}
                    apiKey={GOOGLE_MAPS_API_KEY}
                />

                {/* SOS & Safety Header */}
                <View style={styles.topActions}>
                    <View style={styles.statusBadge}>
                        <View style={styles.pulseDot} />
                        <Text style={styles.statusText}>On Trip</Text>
                    </View>
                    <TouchableOpacity style={styles.sosButton}>
                        <ShieldIcon size={18} color="white" />
                        <Text style={styles.sosText}>SOS</Text>
                    </TouchableOpacity>
                </View>

                {/* Floating Map Controls */}
                <View style={styles.mapControls}>
                    <TouchableOpacity style={styles.mapActionCircle}>
                        <RouteIcon size={18} color={Colors.primary} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.mapActionCircle, { marginTop: 12 }]}
                        onPress={() => console.log('Sharing trip...')}
                    >
                        <Text style={styles.shareIconText}>📤</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* 2. Bottom Content */}
            <View style={styles.bottomSheet}>
                <View style={styles.handle} />

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.sheetContent}>
                    {/* Destination Arrival Header */}
                    <View style={styles.arrivalHeader}>
                        <View>
                            <Text style={styles.arrivalTitle}>Arriving at {arrivalTime}</Text>
                            <Text style={styles.arrivalSub}>Heading to {dropoff.label?.split(',')[0] || 'Destination'}</Text>
                        </View>
                        <View style={styles.distBadge}>
                            <Text style={styles.distText}>2.4 km</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    {/* Driver & Vehicle Row */}
                    <View style={styles.driverRow}>
                        <View style={styles.driverCore}>
                            <Image
                                source={driverAvatar}
                                style={styles.driverAvatar}
                            />
                            <View style={styles.driverMeta}>
                                <Text style={styles.driverName}>{driverInfo.name}</Text>
                                <View style={styles.vehicleInfoRow}>
                                    <Text style={styles.vehicleText}>{driverInfo.vehicleNo} • {driverInfo.vehicleModel}</Text>
                                    <View style={styles.starRow}>
                                        <StarIcon size={12} color={Colors.secondary} />
                                        <Text style={styles.ratingText}>{driverInfo.rating}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.callBtn}>
                            <PhoneIcon size={20} color="white" />
                        </TouchableOpacity>
                    </View>

                    {/* Location Timeline (Mini) */}
                    <View style={styles.timelineContainer}>
                        <View style={styles.timelineTrack}>
                            <View style={[styles.timelineDot, { backgroundColor: Colors.secondary }]} />
                            <View style={styles.timelineLine} />
                            <View style={[styles.timelineDot, { backgroundColor: Colors.primary }]} />
                        </View>
                        <View style={styles.timelineLabels}>
                            <Text style={styles.timelineText} numberOfLines={1}>{pickup.label || pickup.address}</Text>
                            <Text style={styles.timelineText} numberOfLines={1}>{dropoff.label || dropoff.address}</Text>
                        </View>
                    </View>

                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            style={styles.secondaryBtn}
                            onPress={() => setShowSupport(true)}
                        >
                            <MessageIcon size={18} color={Colors.primary} />
                            <Text style={styles.secondaryBtnText}>Support</Text>
                        </TouchableOpacity>
                        <View style={{ width: 12 }} />
                        <TouchableOpacity
                            style={styles.primaryBtn}
                            onPress={handleEndRide}
                        >
                            <Text style={styles.primaryBtnText}>End Trip Simulation</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>

            {/* Support Modal Overlay */}
            {showSupport && (
                <View style={styles.modalOverlay}>
                    <TouchableOpacity
                        style={styles.modalBlur}
                        activeOpacity={1}
                        onPress={() => setShowSupport(false)}
                    />
                    <View style={styles.modalContent}>
                        <View style={styles.handle} />
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Srinivasa Support</Text>
                            <TouchableOpacity onPress={() => setShowSupport(false)}>
                                <CloseIcon size={24} color={Colors.textPrimary} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.supportOptions}>
                            <TouchableOpacity style={styles.supportItem}>
                                <View style={styles.supportIconBox}>
                                    <PhoneIcon size={20} color={Colors.primary} />
                                </View>
                                <View>
                                    <Text style={styles.supportText}>Call Help Desk</Text>
                                    <Text style={styles.supportSub}>+91 98765 43210</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.supportItem}>
                                <View style={styles.supportIconBox}>
                                    <MessageIcon size={20} color={Colors.primary} />
                                </View>
                                <View>
                                    <Text style={styles.supportText}>Chat with us</Text>
                                    <Text style={styles.supportSub}>Typical response time: 2 mins</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.supportItem, { borderBottomWidth: 0 }]}>
                                <View style={styles.supportIconBox}>
                                    <ShieldIcon size={20} color={Colors.alert} />
                                </View>
                                <View>
                                    <Text style={[styles.supportText, { color: Colors.alert }]}>Report Safety Issue</Text>
                                    <Text style={styles.supportSub}>Connect to emergency team</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    mapWrapper: {
        flex: 1,
    },
    topActions: {
        position: 'absolute',
        top: 60,
        left: 20,
        right: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.9)',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    pulseDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: Colors.success,
        marginRight: 8,
    },
    statusText: {
        color: Colors.textPrimary,
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    sosButton: {
        backgroundColor: Colors.alert,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        shadowColor: Colors.alert,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    sosText: {
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 6,
        fontSize: 14,
    },
    mapControls: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    mapActionCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 4,
    },
    shareIconText: {
        fontSize: 18,
    },
    bottomSheet: {
        backgroundColor: Colors.cardBackground,
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        maxHeight: height * 0.45,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -8 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 10,
    },
    handle: {
        width: 40,
        height: 4,
        backgroundColor: Colors.border,
        borderRadius: 2,
        alignSelf: 'center',
        marginTop: 12,
    },
    sheetContent: {
        padding: 24,
        paddingTop: 16,
    },
    arrivalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    arrivalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.textPrimary,
    },
    arrivalSub: {
        fontSize: 14,
        color: Colors.textSecondary,
        marginTop: 2,
    },
    distBadge: {
        backgroundColor: Colors.accent,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    distText: {
        color: Colors.primary,
        fontWeight: 'bold',
        fontSize: 14,
    },
    progressContainer: {
        marginBottom: 24,
    },
    progressBarBg: {
        height: 8,
        backgroundColor: Colors.background,
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: Colors.primary,
    },
    progressLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    progressLabelText: {
        fontSize: 12,
        color: Colors.textTertiary,
        fontWeight: '600',
    },
    divider: {
        height: 1,
        backgroundColor: Colors.borderLight,
        marginBottom: 20,
    },
    driverRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    driverCore: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    driverAvatar: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: Colors.background,
    },
    driverMeta: {
        marginLeft: 12,
        flex: 1,
    },
    driverName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.textPrimary,
    },
    vehicleInfoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
    },
    vehicleText: {
        fontSize: 12,
        color: Colors.textSecondary,
    },
    starRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 8,
    },
    ratingText: {
        fontSize: 12,
        color: Colors.textPrimary,
        fontWeight: 'bold',
        marginLeft: 4,
    },
    callBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
    },
    timelineContainer: {
        flexDirection: 'row',
        marginBottom: 24,
        backgroundColor: Colors.background,
        padding: 16,
        borderRadius: 16,
    },
    timelineTrack: {
        alignItems: 'center',
        width: 14,
        marginRight: 12,
        paddingVertical: 4,
    },
    timelineDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    timelineLine: {
        width: 1.5,
        height: 20,
        backgroundColor: Colors.border,
        marginVertical: 4,
    },
    timelineLabels: {
        flex: 1,
        justifyContent: 'space-between',
    },
    timelineText: {
        fontSize: 13,
        color: Colors.textSecondary,
        fontWeight: '500',
    },
    buttonRow: {
        flexDirection: 'row',
    },
    secondaryBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.5,
        borderColor: Colors.border,
        paddingHorizontal: 20,
        borderRadius: 14,
        height: 54,
    },
    secondaryBtnText: {
        color: Colors.primary,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    primaryBtn: {
        flex: 1,
        backgroundColor: Colors.textPrimary,
        borderRadius: 14,
        height: 54,
        alignItems: 'center',
        justifyContent: 'center',
    },
    primaryBtnText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    // Support Modal Styles
    modalOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
    },
    modalBlur: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    modalContent: {
        backgroundColor: Colors.cardBackground,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        padding: 24,
        paddingTop: 12,
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.textPrimary,
    },
    supportOptions: {
        paddingBottom: 20,
    },
    supportItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.borderLight,
    },
    supportIconBox: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Colors.background,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    supportText: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.textPrimary,
    },
    supportSub: {
        fontSize: 13,
        color: Colors.textSecondary,
        marginTop: 2,
    },
});

export default RideInProgressScreen;


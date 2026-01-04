import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    SafeAreaView,
    Dimensions,
    Image,
    ScrollView,
    TextInput,
} from 'react-native';
import { Colors, Spacing, BorderRadius, Typography } from '../utils/colors';
import {
    RouteIcon,
    TimeIcon,
    MoneyIcon,
    ArrowForwardIcon,
    PersonIcon,
    StarIcon,
    CloseIcon,
    PhoneIcon,
    MessageIcon,
    ShieldIcon,
} from '../components/Icons';
import AirportMapView from '../components/AirportMapView';

const { width, height } = Dimensions.get('window');

// API Key for actual maps
const GOOGLE_MAPS_API_KEY = 'AIzaSyDYjHQx5xcjnoCBw1DcSEINcKulOUE9nvw';

const driverAvatar = require('../assets/images/driver-avatar.png');

const MapRouteScreen = ({ navigation, route }: any) => {
    const { pickup, dropoff, vehicle, price, vehicleDetails } = route.params;

    const [otp] = useState(['5', '9', '5', '5']); // Hardcoded to match image for prototype
    const [driverInfo] = useState({
        name: 'Abdul Kareem Mohd',
        vehicleNo: 'TG12T4516',
        vehicleModel: 'Ertiga',
        rating: '4.7',
        eta: '11',
    });

    // Simulated driver position roughly 1km away for path rendering
    const [driverPos] = useState({
        latitude: pickup.latitude + 0.005,
        longitude: pickup.longitude - 0.005,
    });

    const [showTripDetails, setShowTripDetails] = useState(false);
    const [cancellationStep, setCancellationStep] = useState<'details' | 'reasons' | 'confirmed'>('details');

    const handleStartRide = () => {
        navigation.navigate('RideInProgress', {
            pickup,
            dropoff,
            vehicle,
            vehicleDetails,
            price,
            driverInfo,
            otp: otp.join('')
        });
    };

    const handleCancelRide = () => {
        setCancellationStep('reasons');
    };

    const confirmCancellation = () => {
        setCancellationStep('confirmed');
        setTimeout(() => {
            setShowTripDetails(false);
            setCancellationStep('details');
            navigation.navigate('AirportBooking');
        }, 2000);
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

            {/* 1. Real Map Layer */}
            <View style={styles.mapWrapper}>
                <AirportMapView
                    pickup={pickup}
                    dropoff={dropoff}
                    driver={driverPos}
                    apiKey={GOOGLE_MAPS_API_KEY}
                />

                {/* Floating Header Actions */}
                <View style={styles.floatingHeader}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backButton}
                    >
                        <CloseIcon size={24} color={Colors.textPrimary} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.safetyButton}>
                        <ShieldIcon size={16} color={Colors.primary} />
                        <Text style={styles.safetyText}>Safety</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.recenterButton}>
                    <View style={styles.innerRecenter} />
                </TouchableOpacity>
            </View>

            {/* 2. Modal-style Bottom Sheet */}
            <View style={styles.bottomSheet}>
                <View style={styles.handle} />

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.sheetContent}>
                    {/* Status Header */}
                    <View style={styles.statusHeader}>
                        <Text style={styles.statusText}>Captain on the way</Text>
                        <View style={styles.etaBadge}>
                            <Text style={styles.etaLabel}>{driverInfo.eta} mins</Text>
                        </View>
                    </View>

                    {/* Improvised PIN Display */}
                    <View style={styles.pinRow}>
                        <View>
                            <Text style={styles.pinSmallLabel}>RIDE PIN</Text>
                            <Text style={styles.pinLabel}>Share with captain to start</Text>
                        </View>
                        <View style={styles.pinBoxes}>
                            {otp.map((digit, i) => (
                                <View key={i} style={styles.pinBox}>
                                    <Text style={styles.pinDigit}>{digit}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Driver Card */}
                    <View style={styles.driverCard}>
                        <View style={styles.driverInfoLeft}>
                            <Text style={styles.vehicleNo}>{driverInfo.vehicleNo}</Text>
                            <Text style={styles.vehicleModel}>{driverInfo.vehicleModel}</Text>
                            <Text style={styles.driverNameText}>{driverInfo.name}</Text>
                        </View>
                        <View style={styles.driverInfoRight}>
                            <View style={styles.avatarBorder}>
                                <Image
                                    source={driverAvatar}
                                    style={styles.driverAvatarImg}
                                />
                                <View style={styles.ratingBadge}>
                                    <Text style={styles.ratingNum}>{driverInfo.rating}</Text>
                                    <StarIcon size={10} color="white" />
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Communication Row - Updated Call Button */}
                    <View style={styles.commRow}>
                        <TouchableOpacity style={styles.callCircle}>
                            <PhoneIcon size={20} color="white" />
                        </TouchableOpacity>
                        <View style={styles.messageInputBox}>
                            <MessageIcon size={18} color={Colors.textTertiary} />
                            <TextInput
                                placeholder={`Message ${driverInfo.name.split(' ')[0]}`}
                                placeholderTextColor={Colors.textTertiary}
                                style={styles.messageInput}
                            />
                        </View>
                    </View>

                    <View style={styles.horizontalDivider} />

                    {/* Improved Locations UI */}
                    <View style={styles.locationSection}>
                        <View style={styles.locationTrack}>
                            <View style={[styles.locationDot, { backgroundColor: Colors.secondary }]} />
                            <View style={styles.locationLine} />
                            <View style={[styles.locationDot, { backgroundColor: Colors.primary }]} />
                        </View>
                        <View style={styles.locationDetails}>
                            <View style={styles.locationItem}>
                                <Text style={styles.locLabel}>Pickup</Text>
                                <Text style={styles.locValue} numberOfLines={1}>{pickup.label || pickup.address}</Text>
                            </View>
                            <View style={styles.locationItem}>
                                <Text style={styles.locLabel}>Drop-off</Text>
                                <Text style={styles.locValue} numberOfLines={1}>{dropoff.label || dropoff.address}</Text>
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.tripDetailsBtn}
                        onPress={() => setShowTripDetails(true)}
                    >
                        <Text style={styles.tripDetailsText}>Trip Details & Support</Text>
                        <ArrowForwardIcon size={16} color={Colors.primary} />
                    </TouchableOpacity>

                    <View style={styles.dashedDivider} />

                    {/* Start Ride Trigger (for prototype flow) */}
                    <TouchableOpacity style={styles.primaryActionBtn} onPress={handleStartRide}>
                        <Text style={styles.primaryActionBtnText}>Driver is here? Start Ride</Text>
                    </TouchableOpacity>

                    {/* Footer Row */}
                    <View style={styles.footerOptions}>
                        <TouchableOpacity style={styles.footerLink}>
                            <View style={styles.questionCircle}>
                                <Text style={styles.questionText}>?</Text>
                            </View>
                            <Text style={styles.footerLinkText}>Issue with Pickup?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.footerLink}>
                            <Text style={[styles.footerLinkText, { color: Colors.primary }]}>Share feedback</Text>
                            <ArrowForwardIcon size={14} color={Colors.primary} />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>

            {/* Trip Details & Cancellation Modal */}
            {showTripDetails && (
                <View style={styles.modalOverlay}>
                    <TouchableOpacity
                        style={styles.modalBlur}
                        activeOpacity={1}
                        onPress={() => setShowTripDetails(false)}
                    />
                    <View style={styles.modalContent}>
                        <View style={styles.handle} />

                        {cancellationStep === 'details' && (
                            <View>
                                <View style={styles.modalHeader}>
                                    <Text style={styles.modalTitle}>Trip Details</Text>
                                    <TouchableOpacity onPress={() => setShowTripDetails(false)}>
                                        <CloseIcon size={24} color={Colors.textPrimary} />
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.modalStatsRow}>
                                    <View style={styles.modalStat}>
                                        <Text style={styles.modalStatVal}>₹{price}</Text>
                                        <Text style={styles.modalStatLab}>Est. Fare</Text>
                                    </View>
                                    <View style={styles.modalStat}>
                                        <Text style={styles.modalStatVal}>Cash</Text>
                                        <Text style={styles.modalStatLab}>Payment</Text>
                                    </View>
                                </View>

                                <View style={styles.modalActions}>
                                    <TouchableOpacity style={styles.modalActionItem}>
                                        <ShieldIcon size={20} color={Colors.textSecondary} />
                                        <Text style={styles.modalActionText}>Safety Support</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.modalActionItem}>
                                        <MessageIcon size={20} color={Colors.textSecondary} />
                                        <Text style={styles.modalActionText}>Contact Support</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.modalActionItem, { borderBottomWidth: 0 }]}
                                        onPress={handleCancelRide}
                                    >
                                        <CloseIcon size={20} color={Colors.alert} />
                                        <Text style={[styles.modalActionText, { color: Colors.alert }]}>Cancel Ride</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}

                        {cancellationStep === 'reasons' && (
                            <View>
                                <Text style={styles.modalTitle}>Why are you canceling?</Text>
                                <Text style={styles.modalSub}>Cancellation helps us improve our service.</Text>

                                {['Driver didn\'t arrive', 'Wrong location', 'Found another ride', 'Changed my mind'].map((reason, idx) => (
                                    <TouchableOpacity
                                        key={idx}
                                        style={styles.reasonItem}
                                        onPress={confirmCancellation}
                                    >
                                        <Text style={styles.reasonText}>{reason}</Text>
                                        <View style={styles.radioOut}><View style={styles.radioIn} /></View>
                                    </TouchableOpacity>
                                ))}

                                <TouchableOpacity
                                    style={styles.backToDetailsBtn}
                                    onPress={() => setCancellationStep('details')}
                                >
                                    <Text style={styles.backToDetailsText}>Go Back</Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        {cancellationStep === 'confirmed' && (
                            <View style={styles.confirmedBox}>
                                <View style={[styles.questionCircle, { backgroundColor: Colors.alert, width: 48, height: 48, borderRadius: 24, marginBottom: 16 }]}>
                                    <CloseIcon size={32} color="white" />
                                </View>
                                <Text style={styles.modalTitle}>Ride Cancelled</Text>
                                <Text style={styles.modalSub}>Heading back to screen...</Text>
                            </View>
                        )}
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
    floatingHeader: {
        position: 'absolute',
        top: 50, // Margin for status bar
        left: 16,
        right: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 10,
    },
    backButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Colors.cardBackground,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    safetyButton: {
        backgroundColor: Colors.cardBackground,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    safetyText: {
        color: Colors.primary,
        fontSize: 12,
        fontWeight: 'bold',
        marginLeft: 6,
    },
    recenterButton: {
        position: 'absolute',
        bottom: 20,
        right: 16,
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Colors.cardBackground,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    innerRecenter: {
        width: 14,
        height: 14,
        borderRadius: 7,
        borderWidth: 2,
        borderColor: Colors.primary,
    },
    bottomSheet: {
        backgroundColor: Colors.cardBackground,
        borderTopLeftRadius: BorderRadius.xl,
        borderTopRightRadius: BorderRadius.xl,
        maxHeight: height * 0.5,
        paddingTop: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 10,
    },
    handle: {
        width: 40,
        height: 4,
        backgroundColor: Colors.primary,
        borderRadius: 2,
        alignSelf: 'center',
    },
    sheetContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
        paddingTop: 20,
    },
    statusHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    statusText: {
        color: Colors.primary,
        fontSize: 18,
        fontWeight: 'bold',
    },
    etaBadge: {
        backgroundColor: Colors.accent,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    etaLabel: {
        color: Colors.primary,
        fontWeight: 'bold',
        fontSize: 14,
    },
    pinRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        backgroundColor: Colors.background,
        padding: 12,
        borderRadius: BorderRadius.md,
    },
    pinSmallLabel: {
        fontSize: 10,
        fontWeight: 'bold',
        color: Colors.textTertiary,
        letterSpacing: 1,
    },
    pinLabel: {
        color: Colors.textSecondary,
        fontSize: 12,
        marginTop: 2,
    },
    pinBoxes: {
        flexDirection: 'row',
        gap: 4,
    },
    pinBox: {
        backgroundColor: Colors.cardBackground,
        width: 32,
        height: 36,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.5,
        borderColor: Colors.primary,
    },
    pinDigit: {
        color: Colors.primary,
        fontWeight: '900',
        fontSize: 18,
    },
    driverCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    driverInfoLeft: {
        flex: 1,
    },
    vehicleNo: {
        color: Colors.textPrimary,
        fontSize: 22,
        fontWeight: '900',
        letterSpacing: 0.5,
    },
    vehicleModel: {
        color: Colors.textSecondary,
        fontSize: 14,
        marginTop: 1,
    },
    driverNameText: {
        color: Colors.textSecondary,
        fontSize: 14,
    },
    driverInfoRight: {
        alignItems: 'flex-end',
    },
    avatarBorder: {
        position: 'relative',
    },
    driverAvatarImg: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: Colors.background,
    },
    ratingBadge: {
        position: 'absolute',
        bottom: -2,
        right: -4,
        backgroundColor: Colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: Colors.cardBackground,
    },
    ratingNum: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
        marginRight: 2,
    },
    commRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 16,
    },
    callCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    messageInputBox: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.background,
        height: 44,
        borderRadius: 22,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    messageInput: {
        flex: 1,
        color: Colors.textPrimary,
        marginLeft: 10,
        fontSize: 14,
    },
    horizontalDivider: {
        height: 1,
        backgroundColor: Colors.borderLight,
        marginVertical: 12,
    },
    locationSection: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    locationTrack: {
        alignItems: 'center',
        width: 20,
        marginRight: 12,
        paddingVertical: 10,
    },
    locationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    locationLine: {
        width: 1.5,
        flex: 1,
        backgroundColor: Colors.border,
        marginVertical: 4,
    },
    locationDetails: {
        flex: 1,
    },
    locationItem: {
        marginBottom: 12,
    },
    locLabel: {
        color: Colors.textTertiary,
        fontSize: 11,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    locValue: {
        color: Colors.textPrimary,
        fontSize: 14,
        fontWeight: '600',
        marginTop: 2,
    },
    tripDetailsBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: Colors.border,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
        marginBottom: 16,
    },
    tripDetailsText: {
        color: Colors.primary,
        fontSize: 14,
        fontWeight: '700',
    },
    dashedDivider: {
        height: 1,
        borderWidth: 0.5,
        borderColor: Colors.border,
        borderStyle: 'dashed',
        marginBottom: 16,
    },
    primaryActionBtn: {
        backgroundColor: Colors.primary,
        height: 52,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    primaryActionBtnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footerOptions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    footerLink: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    questionCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
    },
    questionText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    footerLinkText: {
        color: Colors.textSecondary,
        fontSize: 13,
    },
    // Modal Styles
    modalOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 100,
    },
    modalBlur: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: Colors.cardBackground,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        paddingTop: 12,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.textPrimary,
    },
    modalSub: {
        fontSize: 14,
        color: Colors.textSecondary,
        marginBottom: 20,
    },
    modalStatsRow: {
        flexDirection: 'row',
        backgroundColor: Colors.background,
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
    },
    modalStat: {
        flex: 1,
        alignItems: 'center',
    },
    modalStatVal: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.primary,
    },
    modalStatLab: {
        fontSize: 12,
        color: Colors.textSecondary,
        marginTop: 2,
    },
    modalActions: {
        backgroundColor: Colors.cardBackground,
    },
    modalActionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.borderLight,
    },
    modalActionText: {
        fontSize: 16,
        color: Colors.textPrimary,
        marginLeft: 16,
        fontWeight: '500',
    },
    reasonItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.borderLight,
    },
    reasonText: {
        fontSize: 15,
        color: Colors.textPrimary,
    },
    radioOut: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioIn: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: Colors.primary,
    },
    backToDetailsBtn: {
        marginTop: 24,
        alignItems: 'center',
    },
    backToDetailsText: {
        color: Colors.textTertiary,
        fontSize: 14,
        fontWeight: '600',
    },
    confirmedBox: {
        alignItems: 'center',
        paddingVertical: 20,
    },
});

export default MapRouteScreen;

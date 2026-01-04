import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    SafeAreaView,
    TextInput,
    Image,
    Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dropdown } from 'react-native-element-dropdown';
import { Colors, Spacing, BorderRadius, Typography } from '../utils/colors';
import {
    FlightIcon,
    CarIcon,
    CalendarIcon,
    LocationIcon,
    BoltIcon,
    ShieldIcon,
    TimeIcon,
    MoneyIcon,
    CloseIcon,
} from '../components/Icons';
import mockData from '../data/mockData.json';

// Assets
const airportImage = require('../assets/images/airport-car-image.jpg');
const rentalImage = require('../assets/images/rental-car.jpg');
const outstationImage = require('../assets/images/outstanding.jpg');

type ServiceType = 'airport' | 'rental' | 'outstation' | null;

const CustomerHomeScreen = ({ navigation }: any) => {
    const [selectedService, setSelectedService] = useState<ServiceType>(null);
    const [userName, setUserName] = useState('Guest User');
    const [userEmail, setUserEmail] = useState('');
    const [city, setCity] = useState('HYD');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const storedName = await AsyncStorage.getItem('userName');
                const storedEmail = await AsyncStorage.getItem('userEmail');
                if (storedName) setUserName(storedName);
                if (storedEmail) setUserEmail(storedEmail);
            } catch (error) {
                console.error('Error loading user data:', error);
            }
        };
        loadUserData();
    }, []);

    const cities = [
        { label: 'HYD', value: 'HYD' },
        { label: 'BOM', value: 'BOM' },
        { label: 'DEL', value: 'DEL' },
        { label: 'BLR', value: 'BLR' },
        { label: 'MAA', value: 'MAA' },
        { label: 'PNQ', value: 'PNQ' },
    ];

    const getTimeBasedTheme = () => {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) {
            return {
                bg: '#FFFAF0', // Morning: Soft Cream
                highlight: '#FFF9E1'
            };
        } else if (hour >= 12 && hour < 17) {
            return {
                bg: '#F0F9FF', // Afternoon: Light Sky
                highlight: '#E1F5FE'
            };
        } else if (hour >= 17 && hour < 20) {
            return {
                bg: '#FFF5F1', // Evening: Warm Sunset
                highlight: '#FFF3E0'
            };
        } else {
            return {
                bg: '#F5F5FA', // Night: Cool Indigo
                highlight: '#F0F0FF'
            };
        }
    };

    const theme = getTimeBasedTheme();

    useEffect(() => {
        const loadUserData = async () => {
            const storedName = await AsyncStorage.getItem('userName');
            if (storedName) {
                setUserName(storedName);
            }
        };
        loadUserData();
    }, []);

    const services = [
        {
            id: 'airport',
            title: 'Airport',
            subtitle: 'Punctual airport transfers with zero wait time and professional chauffeurs.',
            icon: FlightIcon,
            gradient: [Colors.accent, Colors.border],
            image: airportImage,
        },
        {
            id: 'rental',
            title: 'Rental',
            subtitle: 'Flexible hourly car rentals starting from 1 hour. Perfect for city errands.',
            icon: CarIcon,
            gradient: [Colors.accent, Colors.border],
            image: rentalImage,
        },
        {
            id: 'outstation',
            title: 'Outstation',
            subtitle: 'Comfortable intercity travel for safe and predictable long-distance trips.',
            icon: CalendarIcon,
            gradient: [Colors.accent, Colors.border],
            image: outstationImage,
        },
    ];

    const features = [
        {
            title: '100% Electric',
            subtitle: 'Zero emissions',
            icon: BoltIcon,
            color: Colors.primary,
        },
        {
            title: 'Fixed Price',
            subtitle: 'No surprises',
            icon: ShieldIcon,
            color: Colors.primary,
        },
        {
            title: 'Zero Cancel',
            subtitle: 'Always reliable',
            icon: TimeIcon,
            color: Colors.primary,
        },
    ];

    const recentPlaces = [
        {
            title: 'Mumbai Airport T2',
            subtitle: '10 km away',
        },
        {
            title: 'Bandra Kurla Complex',
            subtitle: '5 km away',
        },
        {
            title: 'Worli Sea Face',
            subtitle: '8 km away',
        },
    ];

    const handleServiceSelect = (serviceId: string) => {
        if (serviceId === 'airport') {
            navigation.navigate('AirportBooking');
        } else if (serviceId === 'rental') {
            navigation.navigate('RentalBooking');
        } else if (serviceId === 'outstation') {
            navigation.navigate('OutstationBooking');
        }
    };

    const handleAction = (feature: string) => {
        Alert.alert('Coming Soon', `${feature} feature is currently in progress.`);
    };

    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to log out?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: async () => {
                        await AsyncStorage.setItem('isLoggedIn', 'false');
                        navigation.replace('Login');
                    }
                }
            ]
        );
    };

    const getCurrentGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 17) return 'Good Afternoon';
        return 'Good Evening';
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
            <StatusBar barStyle="dark-content" backgroundColor={theme.bg} translucent={false} />

            {/* Side Drawer Overlay */}
            {isDrawerOpen && (
                <View style={styles.drawerOverlay}>
                    <TouchableOpacity
                        style={styles.drawerBackdrop}
                        activeOpacity={1}
                        onPress={() => setIsDrawerOpen(false)}
                    />
                    <View style={styles.drawerContent}>
                        <View style={styles.drawerHeader}>
                            <View style={styles.drawerProfileCircle}>
                                <Text style={styles.drawerProfileInitial}>{userName.charAt(0)}</Text>
                            </View>
                            <View style={styles.drawerProfileInfo}>
                                <Text style={styles.drawerProfileName}>{userName}</Text>
                                <Text style={styles.drawerProfileSub}>{userEmail || 'Srinivasa Premium Member'}</Text>
                            </View>
                            <TouchableOpacity onPress={() => setIsDrawerOpen(false)} style={styles.drawerCloseBtn}>
                                <CloseIcon size={24} color={Colors.textPrimary} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.drawerMenu}>
                            <TouchableOpacity style={styles.drawerMenuItem} onPress={() => handleAction('Ride History')}>
                                <TimeIcon size={22} color={Colors.primary} />
                                <Text style={styles.drawerMenuText}>My Rides</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.drawerMenuItem} onPress={() => handleAction('Payments')}>
                                <MoneyIcon size={22} color={Colors.primary} />
                                <Text style={styles.drawerMenuText}>Payments</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.drawerMenuItem} onPress={() => handleAction('Safety Support')}>
                                <ShieldIcon size={22} color={Colors.primary} />
                                <Text style={styles.drawerMenuText}>Safety & Support</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.drawerMenuItem} onPress={() => handleAction('Referrals')}>
                                <BoltIcon size={22} color={Colors.primary} />
                                <Text style={styles.drawerMenuText}>Refer & Earn</Text>
                            </TouchableOpacity>

                            <View style={styles.drawerDivider} />

                            <TouchableOpacity style={styles.drawerMenuItem} onPress={() => handleAction('Settings')}>
                                <Text style={styles.drawerMenuTextSecondary}>Settings</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                                <Text style={styles.logoutText}>Log Out</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.drawerFooter}>
                            <Text style={styles.versionText}>v1.0.4 Premium</Text>
                        </View>
                    </View>
                </View>
            )}

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity
                        style={styles.menuButton}
                        onPress={() => setIsDrawerOpen(true)}
                    >
                        <View style={styles.menuLine} />
                        <View style={styles.menuLine} />
                        <View style={styles.menuLine} />
                    </TouchableOpacity>
                </View>
                <View style={styles.headerCenter}>
                    <Text style={styles.greeting}>{getCurrentGreeting()}</Text>
                    <Text style={styles.userName}>{userName}</Text>
                </View>
                <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    data={cities}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="City"
                    value={city}
                    onChange={item => setCity(item.value)}
                    renderRightIcon={() => (
                        <View style={{ marginLeft: 2 }}>
                            <Text style={{ fontSize: 8, color: Colors.primary }}>▼</Text>
                        </View>
                    )}
                />
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.servicesSection}>
                    <Text style={styles.sectionTitle}>Services</Text>
                    <View style={styles.servicesList}>
                        {services.map((service) => {
                            const isSelected = selectedService === service.id;

                            return (
                                <TouchableOpacity
                                    key={service.id}
                                    style={[
                                        styles.serviceCard,
                                        isSelected && styles.serviceCardSelected,
                                    ]}
                                    onPress={() => handleServiceSelect(service.id)}
                                    activeOpacity={0.7}
                                >
                                    <View style={[
                                        styles.servicePill,
                                        { backgroundColor: service.gradient[0] }
                                    ]}>
                                        {service.image ? (
                                            <Image
                                                source={service.image}
                                                style={styles.serviceImagePill}
                                                resizeMode="cover"
                                            />
                                        ) : (
                                            <View style={styles.placeholderPill} />
                                        )}
                                    </View>
                                    <View style={styles.serviceContent}>
                                        <Text style={[
                                            styles.serviceTitle,
                                            isSelected && styles.serviceTitleSelected
                                        ]}>
                                            {service.title}
                                        </Text>
                                        <Text style={styles.serviceSubtitle}>
                                            {service.subtitle}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>

                {/* Features Section */}
                <View style={styles.featuresCard}>
                    {features.map((feature, index) => (
                        <View key={index} style={styles.featureItem}>
                            <View style={styles.featureIconContainer}>
                                <feature.icon size={20} color={feature.color} />
                            </View>
                            <Text style={styles.featureTitle}>{feature.title}</Text>
                            <Text style={styles.featureSubtitle}>{feature.subtitle}</Text>
                        </View>
                    ))}
                </View>

                {/* Recent Section */}
                <View style={styles.recentSection}>
                    <Text style={styles.recentLabel}>RECENT</Text>
                    {recentPlaces.map((place, index) => (
                        <TouchableOpacity key={index} style={styles.recentItem} activeOpacity={0.7} onPress={() => handleAction('Location details')}>
                            <View style={styles.recentIconContainer}>
                                <TimeIcon size={18} color={Colors.primary} />
                            </View>
                            <View style={styles.recentTextContainer}>
                                <Text style={styles.recentTitle}>{place.title}</Text>
                                <Text style={styles.recentSubtitle}>{place.subtitle}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: Spacing.xxl,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Spacing.lg,
        paddingTop: Spacing.md,
        paddingBottom: Spacing.md,
        backgroundColor: Colors.cardBackground,
        borderBottomWidth: 1,
        borderBottomColor: Colors.borderLight,
    },
    headerLeft: {
        width: 40,
    },
    menuButton: {
        width: 24,
        height: 24,
        justifyContent: 'space-between',
        paddingVertical: 4,
    },
    menuLine: {
        width: 24,
        height: 2,
        backgroundColor: Colors.textPrimary,
        borderRadius: 1,
    },
    headerCenter: {
        flex: 1,
        alignItems: 'center',
    },
    greeting: {
        ...Typography.caption,
        color: Colors.textSecondary,
        marginBottom: 2,
    },
    userName: {
        ...Typography.bodyMedium,
        color: Colors.textPrimary,
        fontSize: 18,
    },
    locationBadge: {
        backgroundColor: Colors.accent,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.xs,
        borderRadius: BorderRadius.md,
        borderWidth: 1,
        borderColor: Colors.primary,
    },
    locationText: {
        ...Typography.bodyMedium,
        color: Colors.primary,
        fontSize: 14,
    },
    dropdown: {
        width: 90,
        height: 32,
        backgroundColor: Colors.accent,
        paddingHorizontal: Spacing.sm,
        paddingVertical: Spacing.xs,
        borderRadius: BorderRadius.md,
        borderWidth: 1,
        borderColor: Colors.primary,
    },
    placeholderStyle: {
        fontSize: 14,
        color: Colors.primary,
    },
    selectedTextStyle: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.primary,
    },
    servicesSection: {
        paddingHorizontal: Spacing.lg,
        marginTop: Spacing.md,
    },
    sectionTitle: {
        ...Typography.h3,
        color: Colors.textPrimary,
        marginBottom: Spacing.sm,
        fontWeight: '700',
    },
    servicesList: {
        flexDirection: 'column',
    },
    serviceCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.cardBackground,
        borderRadius: BorderRadius.lg,
        padding: Spacing.sm, // Decreased padding
        marginBottom: Spacing.md,
        borderWidth: 1,
        borderColor: Colors.primary,
        shadowColor: Colors.shadowLight,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 2,
    },
    serviceCardSelected: {
        borderColor: Colors.primary,
        backgroundColor: Colors.accent,
    },
    servicePill: {
        width: 100,
        height: 75,
        borderRadius: BorderRadius.lg,
        overflow: 'hidden',
        marginRight: Spacing.md,
        backgroundColor: Colors.background,
    },
    serviceImagePill: {
        width: '100%',
        height: '100%',
    },
    placeholderPill: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.border,
    },
    serviceContent: {
        flex: 1,
    },
    serviceTitle: {
        ...Typography.h3,
        fontSize: 19,
        color: Colors.textPrimary,
        marginBottom: 2,
    },
    serviceTitleSelected: {
        color: Colors.primary,
        fontWeight: '600',
    },
    serviceSubtitle: {
        ...Typography.caption,
        color: Colors.textPrimary,
        lineHeight: 18,
    },

    // Features styles
    featuresCard: {
        flexDirection: 'row',
        backgroundColor: Colors.cardBackground,
        marginHorizontal: Spacing.lg,
        marginTop: Spacing.lg,
        paddingVertical: Spacing.md,
        borderRadius: BorderRadius.lg,
        borderWidth: 1,
        borderColor: Colors.borderLight,
        shadowColor: Colors.shadowLight,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 2,
    },
    featureItem: {
        flex: 1,
        alignItems: 'center',
    },
    featureIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.accent,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Spacing.xs,
    },
    featureTitle: {
        ...Typography.caption,
        fontWeight: '700',
        color: Colors.textPrimary,
        textAlign: 'center',
    },
    featureSubtitle: {
        ...Typography.small,
        color: Colors.textPrimary,
        textAlign: 'center',
    },

    // Recent styles
    recentSection: {
        paddingHorizontal: Spacing.lg,
        marginTop: Spacing.xl,
    },
    recentLabel: {
        ...Typography.caption,
        fontWeight: '800',
        color: Colors.textPrimary,
        marginBottom: Spacing.sm,
        letterSpacing: 1.5,
    },
    recentItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.cardBackground,
        padding: Spacing.md,
        borderRadius: BorderRadius.lg,
        marginBottom: Spacing.sm,
        borderWidth: 1,
        borderColor: Colors.borderLight,
    },
    recentIconContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: Colors.accent,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Spacing.md,
    },
    recentTextContainer: {
        flex: 1,
    },
    recentTitle: {
        ...Typography.bodyMedium,
        color: Colors.textPrimary,
        fontSize: 15,
    },
    recentSubtitle: {
        ...Typography.small,
        color: Colors.textPrimary,
    },
    // Drawer Styles
    drawerOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2000,
        flexDirection: 'row',
    },
    drawerBackdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    drawerContent: {
        width: '80%',
        height: '100%',
        backgroundColor: Colors.cardBackground,
        paddingTop: 60,
        shadowColor: '#000',
        shadowOffset: { width: 10, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 10,
    },
    drawerHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 24,
        marginBottom: 40,
        position: 'relative',
    },
    drawerProfileCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    drawerProfileInitial: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    drawerProfileInfo: {
        flex: 1,
    },
    drawerProfileName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.textPrimary,
    },
    drawerProfileSub: {
        fontSize: 12,
        color: Colors.textSecondary,
        marginTop: 2,
    },
    drawerCloseBtn: {
        position: 'absolute',
        top: -30,
        right: 16,
        padding: 8,
    },
    drawerMenu: {
        flex: 1,
        paddingHorizontal: 16,
    },
    drawerMenuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 12,
        borderRadius: 12,
        marginBottom: 4,
    },
    drawerMenuText: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.textPrimary,
        marginLeft: 16,
    },
    drawerDivider: {
        height: 1,
        backgroundColor: Colors.borderLight,
        marginVertical: 20,
        marginHorizontal: 12,
    },
    drawerMenuTextSecondary: {
        fontSize: 15,
        color: Colors.textSecondary,
        marginLeft: 4,
    },
    logoutBtn: {
        marginTop: 'auto',
        marginBottom: 20,
        paddingVertical: 14,
        paddingHorizontal: 12,
        backgroundColor: '#FFF1F0',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#FFA39E',
    },
    logoutText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#F5222D',
        textAlign: 'center',
    },
    drawerFooter: {
        padding: 24,
        borderTopWidth: 1,
        borderTopColor: Colors.borderLight,
    },
    versionText: {
        fontSize: 12,
        color: Colors.textTertiary,
        textAlign: 'center',
    },
});

export default CustomerHomeScreen;

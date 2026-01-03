import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
    Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors, Spacing, BorderRadius, Typography } from '../utils/colors';

const { width } = Dimensions.get('window');

const LoginScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) return;

        try {
            const storedEmail = await AsyncStorage.getItem('userEmail');
            const storedPassword = await AsyncStorage.getItem('userPassword');

            if (email === storedEmail && password === storedPassword) {
                await AsyncStorage.setItem('isLoggedIn', 'true');
                navigation.replace('CustomerHome');
            } else {
                setError(true);
                setTimeout(() => setError(false), 2000);
            }
        } catch (e) {
            console.error('Error logging in:', e);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <View style={styles.content}>
                    {/* Background decoration */}
                    <View style={styles.circle1} />
                    <View style={styles.circle2} />

                    <View style={styles.headerContainer}>
                        <Text style={styles.brandTitle}>Srinivasa</Text>
                        <Text style={styles.brandSubtitle}>Premium Cab Booking</Text>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.loginTitle}>Login</Text>

                        {error && (
                            <View style={styles.errorContainer}>
                                <Text style={styles.errorText}>Invalid credentials. Please try again.</Text>
                            </View>
                        )}

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Email Address</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your email"
                                placeholderTextColor={Colors.textTertiary}
                                value={email}
                                onChangeText={(text) => {
                                    setEmail(text);
                                    if (error) setError(false);
                                }}
                                autoCapitalize="none"
                                keyboardType="email-address"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Password</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your password"
                                placeholderTextColor={Colors.textTertiary}
                                value={password}
                                onChangeText={(text) => {
                                    setPassword(text);
                                    if (error) setError(false);
                                }}
                                secureTextEntry
                            />
                        </View>

                        <TouchableOpacity
                            style={styles.loginButton}
                            onPress={handleLogin}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.loginButtonText}>Login</Text>
                        </TouchableOpacity>

                        <View style={styles.dummyContentContainer}>
                            <Text style={styles.dummyText}>
                                Welcome back! Sign in to continue your journey.{"\n"}
                                Your data stays safely on this device — no servers, no tracking.
                            </Text>
                        </View>

                        <View style={styles.signupContainer}>
                            <Text style={styles.signupText}>New here? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                                <Text style={styles.signupLink}>Create an account</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    keyboardView: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: Spacing.lg,
    },
    circle1: {
        position: 'absolute',
        top: -100,
        right: -100,
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: 'rgba(90, 79, 207, 0.05)', // primary with opacity
    },
    circle2: {
        position: 'absolute',
        bottom: -50,
        left: -50,
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: 'rgba(90, 79, 207, 0.03)', // primary with opacity
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: Spacing.xxl,
    },
    brandTitle: {
        ...Typography.h1,
        color: Colors.primary,
        fontSize: 36,
        letterSpacing: 1,
    },
    brandSubtitle: {
        ...Typography.caption,
        color: Colors.textSecondary,
        marginTop: 4,
        letterSpacing: 2,
        textTransform: 'uppercase',
    },
    card: {
        backgroundColor: Colors.cardBackground,
        borderRadius: BorderRadius.xl,
        padding: Spacing.xl,
        shadowColor: Colors.shadowDark,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 10,
    },
    loginTitle: {
        ...Typography.h2,
        color: Colors.textPrimary,
        marginBottom: Spacing.xl,
        textAlign: 'center',
    },
    errorContainer: {
        backgroundColor: 'rgba(229, 83, 61, 0.1)', // alert with opacity
        padding: Spacing.sm,
        borderRadius: BorderRadius.sm,
        marginBottom: Spacing.md,
    },
    errorText: {
        ...Typography.small,
        color: Colors.alert,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: Spacing.lg,
    },
    label: {
        ...Typography.caption,
        color: Colors.textSecondary,
        marginBottom: Spacing.xs,
        fontWeight: '600',
    },
    input: {
        backgroundColor: Colors.accent,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: BorderRadius.md,
        paddingHorizontal: Spacing.md,
        paddingVertical: Platform.OS === 'ios' ? Spacing.md : Spacing.sm,
        ...Typography.body,
        color: Colors.textPrimary,
    },
    loginButton: {
        backgroundColor: Colors.primary,
        borderRadius: BorderRadius.md,
        paddingVertical: Spacing.md,
        alignItems: 'center',
        marginTop: Spacing.sm,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    loginButtonText: {
        ...Typography.bodyMedium,
        color: Colors.cardBackground,
        fontSize: 18,
        fontWeight: '600',
    },
    dummyContentContainer: {
        marginTop: Spacing.xl,
        alignItems: 'center',
    },
    dummyText: {
        ...Typography.small,
        color: Colors.textTertiary,
        textAlign: 'center',
        lineHeight: 18,
        fontStyle: 'italic',
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: Spacing.xl,
    },
    signupText: {
        ...Typography.caption,
        color: Colors.textSecondary,
    },
    signupLink: {
        ...Typography.caption,
        color: Colors.primary,
        fontWeight: '700',
    },
});

export default LoginScreen;

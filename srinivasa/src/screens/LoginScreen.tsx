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
    Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors, Spacing, BorderRadius, Typography } from '../utils/colors';
import { Formik } from 'formik';
import * as Yup from 'yup';

const { width } = Dimensions.get('window');
const logo = require('../assets/images/logo.png');

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
});

const LoginScreen = ({ navigation }: any) => {
    const [loginError, setLoginError] = useState(false);

    const handleLogin = async (values: any) => {
        try {
            const storedEmail = await AsyncStorage.getItem('userEmail');
            const storedPassword = await AsyncStorage.getItem('userPassword');

            if (values.email === storedEmail && values.password === storedPassword) {
                await AsyncStorage.setItem('isLoggedIn', 'true');
                navigation.replace('CustomerHome');
            } else {
                setLoginError(true);
                setTimeout(() => setLoginError(false), 3000);
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
                    <View style={styles.headerContainer}>
                        <Image source={logo} style={styles.logo} resizeMode="contain" />
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.loginTitle}>Login to your account</Text>

                        {loginError && (
                            <View style={styles.errorContainer}>
                                <Text style={styles.errorText}>Invalid credentials. Please try again.</Text>
                            </View>
                        )}

                        <Formik
                            initialValues={{ email: '', password: '' }}
                            validationSchema={LoginSchema}
                            onSubmit={handleLogin}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                <View>
                                    <View style={styles.inputContainer}>
                                        <Text style={styles.label}>Email Address</Text>
                                        <TextInput
                                            style={[
                                                styles.input,
                                                touched.email && errors.email && styles.inputError
                                            ]}
                                            placeholder="Enter your email"
                                            placeholderTextColor={Colors.textTertiary}
                                            value={values.email}
                                            onChangeText={handleChange('email')}
                                            onBlur={handleBlur('email')}
                                            autoCapitalize="none"
                                            keyboardType="email-address"
                                        />
                                        {touched.email && errors.email && (
                                            <Text style={styles.validationError}>{errors.email}</Text>
                                        )}
                                    </View>

                                    <View style={styles.inputContainer}>
                                        <Text style={styles.label}>Password</Text>
                                        <TextInput
                                            style={[
                                                styles.input,
                                                touched.password && errors.password && styles.inputError
                                            ]}
                                            placeholder="Enter your password"
                                            placeholderTextColor={Colors.textTertiary}
                                            value={values.password}
                                            onChangeText={handleChange('password')}
                                            onBlur={handleBlur('password')}
                                            secureTextEntry
                                        />
                                        {touched.password && errors.password && (
                                            <Text style={styles.validationError}>{errors.password}</Text>
                                        )}
                                    </View>

                                    <TouchableOpacity
                                        style={styles.loginButton}
                                        onPress={() => handleSubmit()}
                                        activeOpacity={0.8}
                                    >
                                        <Text style={styles.loginButtonText}>Login</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </Formik>

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
        // backgroundColor: Colors.background,
    },
    keyboardView: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        // paddingHorizontal: Spacing.lg,
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: Spacing.xl,
    },
    logo: {
        width: 280,
        height: 60,
    },
    card: {
        padding: 22
    },
    loginTitle: {
        ...Typography.h3,
        color: Colors.textPrimary,
        marginBottom: Spacing.xl,
    },
    errorContainer: {
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        padding: Spacing.sm,
        borderRadius: BorderRadius.sm,
        marginBottom: Spacing.md,
    },
    errorText: {
        ...Typography.small,
        color: Colors.alert,
        textAlign: 'center',
    },
    validationError: {
        ...Typography.small,
        color: Colors.alert,
        marginTop: 4,
        marginLeft: 4,
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
    inputError: {
        borderColor: Colors.alert,
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

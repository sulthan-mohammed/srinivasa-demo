import React from 'react';
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
    ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors, Spacing, BorderRadius, Typography } from '../utils/colors';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ImageConfig } from '../utils';

const { width } = Dimensions.get('window');
const logo = require('../assets/images/logo.png');

const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Name too short')
        .required('Full name is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
});

const SignupScreen = ({ navigation }: any) => {
    const handleSignup = async (values: any) => {
        try {
            await AsyncStorage.setItem('userName', values.name);
            await AsyncStorage.setItem('userEmail', values.email);
            await AsyncStorage.setItem('userPassword', values.password);
            await AsyncStorage.setItem('isLoggedIn', 'true');

            navigation.reset({
                index: 0,
                routes: [{ name: 'CustomerHome' }],
            });
        } catch (e) {
            console.error('Error signing up:', e);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

            <View style={styles.topBar}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <ImageConfig.ArrowIcon style={styles.backArrowIcon} />
                    <Text style={styles.backButtonText}>Back to Login</Text>
                </TouchableOpacity>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    <View style={styles.headerContainer}>
                        <Image source={logo} style={styles.logo} resizeMode="contain" />
                    </View>

                    <View style={styles.content}>
                        <Text style={styles.screenTitle}>Create account</Text>

                        <Formik
                            initialValues={{ name: '', email: '', password: '' }}
                            validationSchema={SignupSchema}
                            onSubmit={handleSignup}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                <View>
                                    <View style={styles.inputContainer}>
                                        <Text style={styles.label}>Full Name</Text>
                                        <TextInput
                                            style={[
                                                styles.input,
                                                touched.name && errors.name && styles.inputError
                                            ]}
                                            placeholder="Enter your full name"
                                            placeholderTextColor={Colors.textTertiary}
                                            value={values.name}
                                            onChangeText={handleChange('name')}
                                            onBlur={handleBlur('name')}
                                        />
                                        {touched.name && errors.name && (
                                            <Text style={styles.validationError}>{errors.name}</Text>
                                        )}
                                    </View>

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
                                            placeholder="Create a password"
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
                                        style={styles.signupButton}
                                        onPress={() => handleSubmit()}
                                        activeOpacity={0.8}
                                    >
                                        <Text style={styles.signupButtonText}>Sign Up</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </Formik>

                        <View style={styles.footerInfo}>
                            <Text style={styles.footerText}>
                                By signing up, you agree to our terms of service and privacy policy.
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 22,
        paddingTop: Spacing.xs,
        paddingBottom: Spacing.xl,
        justifyContent: 'center',
    },
    topBar: {
        paddingHorizontal: 22,
        paddingVertical: Spacing.md,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backArrowIcon: {
        width: 40,
        height: 40,
        marginRight: 8,
        transform: [{ rotate: '-90deg' }],
        color: Colors.primary,
    },
    backButtonText: {
        ...Typography.caption,
        color: Colors.primary,
        fontWeight: '700',
        fontSize: 16,
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: Spacing.xl,
    },
    logo: {
        width: 280,
        height: 60,
    },
    content: {
        width: '100%',
    },
    screenTitle: {
        ...Typography.h3,
        color: Colors.textPrimary,
        marginBottom: Spacing.xl,
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
    validationError: {
        ...Typography.small,
        color: Colors.alert,
        marginTop: 4,
        marginLeft: 4,
    },
    signupButton: {
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
    signupButtonText: {
        ...Typography.bodyMedium,
        color: Colors.cardBackground,
        fontSize: 18,
        fontWeight: '600',
    },
    footerInfo: {
        marginTop: Spacing.xl,
        alignItems: 'center',
    },
    footerText: {
        ...Typography.small,
        color: Colors.textTertiary,
        textAlign: 'center',
        lineHeight: 18,
    },
});

export default SignupScreen;

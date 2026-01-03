/**
 * Premium Cab Booking - Design System Colors
 * Calm, predictable, premium aesthetic
 */

export const Colors = {
  // Primary Brand Color - Lavender Purple
  primary: '#5A4FCF',
  primaryLight: '#7B72E0',
  primaryDark: '#4138B2',

  // Secondary - Warm Yellow
  secondary: '#F9A826',
  secondaryLight: '#FBBC56',
  secondaryDark: '#E08E0E',

  // Accent - Soft Lavender
  accent: '#F5F6FA',
  accentLight: '#FFFFFF',
  accentDark: '#EAEAEE',

  // Success - Muted Mint
  success: '#2ECCB0',
  successLight: '#4DD9C0',
  successDark: '#25B399',

  // Alert - Soft Crimson
  alert: '#E5533D',
  alertLight: '#EA6F5E',
  alertDark: '#D13D27',

  // Neutrals
  background: '#F5F6FA',
  cardBackground: '#FFFFFF',
  textPrimary: '#1C1C1E',
  textSecondary: '#5A5A5E',
  textTertiary: '#9CA3AF',
  border: '#EAEAEE',
  borderLight: '#F3F4F6',

  // Map & Route
  routeLine: '#5A4FCF',
  mapOverlay: 'rgba(90, 79, 207, 0.08)',

  // Shadows
  shadowLight: 'rgba(0, 0, 0, 0.05)',
  shadowMedium: 'rgba(0, 0, 0, 0.1)',
  shadowDark: 'rgba(0, 0, 0, 0.15)',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const Typography = {
  h1: {
    fontSize: 32,
    fontWeight: '700' as const,
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: '600' as const,
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  bodyMedium: {
    fontSize: 16,
    fontWeight: '500' as const,
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  small: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
};

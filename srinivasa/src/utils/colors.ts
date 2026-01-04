/**
 * Premium Cab Booking - Design System Colors
 * Calm, predictable, premium aesthetic
 */

export const Colors = {
  // Primary Brand Color - Deep Terracotta
  primary: '#C45748',
  primaryLight: '#D97F71',
  primaryDark: '#A13E30',

  // Secondary - Obsidian Charcoal
  secondary: '#2D2926',
  secondaryLight: '#4D4D4D',
  secondaryDark: '#000000',

  // Accent - Soft Blushed Shell (for badges/highlights)
  accent: '#FDF2F0',
  accentLight: '#FFFFFF',
  accentDark: '#F7E7E5',

  // Success - Emerald Mint
  success: '#10B981',
  successLight: '#34D399',
  successDark: '#059669',

  // Alert - Bright Coral
  alert: '#EF4444',
  alertLight: '#F87171',
  alertDark: '#DC2626',

  // Neutrals
  background: '#FEF9F8',
  cardBackground: '#FFFFFF',
  textPrimary: '#111827',
  textSecondary: '#4B5563',
  textTertiary: '#9CA3AF',
  border: '#E8E1DF',
  borderLight: '#F5EEEB',

  // Map & Route
  routeLine: '#C45748',
  mapOverlay: 'rgba(196, 87, 72, 0.08)',

  // Shadows
  shadowLight: 'rgba(0, 0, 0, 0.05)',
  shadowMedium: 'rgba(0, 0, 0, 0.1)',
  shadowDark: 'rgba(1, 1, 1, 0.15)',
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

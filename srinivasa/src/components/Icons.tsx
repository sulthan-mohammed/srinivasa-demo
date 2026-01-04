import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Colors } from '../utils/colors';

interface IconProps {
    size?: number;
    color?: string;
}

export const FlightIcon: React.FC<IconProps> = ({ size = 24, color = Colors.primary }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
            fill={color}
        />
    </Svg>
);

export const CarIcon: React.FC<IconProps> = ({ size = 24, color = Colors.primary }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"
            fill={color}
        />
    </Svg>
);

export const CalendarIcon: React.FC<IconProps> = ({ size = 24, color = Colors.primary }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"
            fill={color}
        />
    </Svg>
);

export const LocationIcon: React.FC<IconProps> = ({ size = 24, color = Colors.primary }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
            fill={color}
        />
    </Svg>
);

export const PersonIcon: React.FC<IconProps> = ({ size = 24, color = Colors.primary }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
            fill={color}
        />
    </Svg>
);

export const CheckCircleIcon: React.FC<IconProps> = ({ size = 24, color = '#2ECCB0' }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
            fill={color}
        />
    </Svg>
);

export const SOSIcon: React.FC<IconProps> = ({ size = 24, color = '#E5533D' }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"
            fill={color}
        />
    </Svg>
);

export const ArrowForwardIcon: React.FC<IconProps> = ({ size = 24, color = '#FFFFFF' }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z"
            fill={color}
        />
    </Svg>
);

export const CloseIcon: React.FC<IconProps> = ({ size = 24, color = Colors.textSecondary }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
            fill={color}
        />
    </Svg>
);

export const TimeIcon: React.FC<IconProps> = ({ size = 24, color = Colors.textSecondary }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"
            fill={color}
        />
    </Svg>
);

export const RouteIcon: React.FC<IconProps> = ({ size = 24, color = Colors.textSecondary }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M19 15.18V7c0-2.21-1.79-4-4-4s-4 1.79-4 4v10c0 1.1-.9 2-2 2s-2-.9-2-2V8.82C8.16 8.4 9 7.3 9 6c0-1.66-1.34-3-3-3S3 4.34 3 6c0 1.3.84 2.4 2 2.82V17c0 2.21 1.79 4 4 4s4-1.79 4-4V7c0-1.1.9-2 2-2s2 .9 2 2v8.18c-1.16.41-2 1.51-2 2.82 0 1.66 1.34 3 3 3s3-1.34 3-3c0-1.31-.84-2.41-2-2.82z"
            fill={color}
        />
    </Svg>
);

export const MoneyIcon: React.FC<IconProps> = ({ size = 24, color = Colors.textSecondary }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"
            fill={color}
        />
    </Svg>
);

export const StarIcon: React.FC<IconProps> = ({ size = 24, color = '#FFB800' }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z"
            fill={color}
        />
    </Svg>
);

export const NavigationIcon: React.FC<IconProps> = ({ size = 24, color = Colors.primary }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z"
            fill={color}
        />
    </Svg>
);

export const BoltIcon: React.FC<IconProps> = ({ size = 24, color = Colors.success }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M7 2v11h3v9l7-12h-4l4-8H7z"
            fill={color}
        />
    </Svg>
);

export const ShieldIcon: React.FC<IconProps> = ({ size = 24, color = Colors.success }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z"
            fill={color}
        />
    </Svg>
);

export const CheckIcon: React.FC<IconProps> = ({ size = 24, color = Colors.success }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
            fill={color}
        />
    </Svg>
);

export const PhoneIcon: React.FC<IconProps> = ({ size = 24, color = 'white' }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
            fill={color}
        />
    </Svg>
);

export const MessageIcon: React.FC<IconProps> = ({ size = 24, color = 'white' }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"
            fill={color}
        />
    </Svg>
);

export const PickupMarker = () => (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <Path
                d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z"
                fill={Colors.primary}
                stroke="#FFFFFF"
                strokeWidth="1"
            />
        </Svg>
    </View>
);

export const DestinationMarker = () => (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <View style={{
            backgroundColor: Colors.primary,
            padding: 6,
            borderRadius: 6,
            borderWidth: 2,
            borderColor: '#FFFFFF',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 5,
        }}>
            <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <Path
                    d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"
                    fill="#FFFFFF"
                />
            </Svg>
        </View>
    </View>
);

export const TopDownVehicleMarker = ({ type = 'car', color = Colors.primary }: { type?: string, color?: string }) => {
    // Top-down car shape path
    const getPath = () => {
        switch (type) {
            case 'auto':
                return "M6 2h12v4H6V2zm-2 5h16v13H4V7zm2 2v9h12V9H6z";
            case 'suv':
                return "M4 4h16v16H4V4zm2 2v12h12V6H6zm2 2v8h8V8H8z";
            case 'minivan':
                return "M2 6h20v12H2V6zm2 2v8h16V8H4zm2 2v4h12v-4H6z";
            case 'ev':
                return "M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z";
            default:
                return "M7 2h10c1.1 0 2 .9 2 2v16c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2z m1 4h8v12H8V6z";
        }
    };

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <View style={{
                width: 38,
                height: 38,
                borderRadius: 19,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 4,
                borderWidth: 1.5,
                borderColor: color,
            }}>
                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <Path
                        d={getPath()}
                        fill={color}
                        stroke={color}
                        strokeWidth="0.5"
                    />
                </Svg>
            </View>
        </View>
    );
};

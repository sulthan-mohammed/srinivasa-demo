import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path, Circle, Rect, G } from 'react-native-svg';
import { Colors } from '../utils/colors';

const { width, height } = Dimensions.get('window');

interface MockMapProps {
    origin: { latitude: number; longitude: number; label?: string };
    destination: { latitude: number; longitude: number; label?: string };
    driverPos?: { latitude: number; longitude: number };
    showDriver?: boolean;
    style?: any;
}

const MockMap = ({ origin, destination, driverPos, showDriver, style }: MockMapProps) => {
    // We normalize coordinates to a 100x100 grid for the SVG
    // This is a "mock" mapping that doesn't use real geo coordinates

    const MARGIN = 20;
    const SVG_WIDTH = width;
    const SVG_HEIGHT = 400; // Fixed height for map area

    // Mock normalization (simple linear)
    // In a real mock, we'd find the min/max and scale
    // Here we just use fixed offsets for visual demo
    const getPos = (lat: number, lng: number) => {
        // Just for demo, use lat/lng naturally mapped to grid
        // Hyderabad is around 17.38, 78.48
        const x = ((lng - 78.3) / 0.3) * (SVG_WIDTH - 2 * MARGIN) + MARGIN;
        const y = SVG_HEIGHT - (((lat - 17.2) / 0.3) * (SVG_HEIGHT - 2 * MARGIN) + MARGIN);
        return { x, y };
    };

    const start = getPos(origin.latitude, origin.longitude);
    const end = getPos(destination.latitude, destination.longitude);
    const driver = driverPos ? getPos(driverPos.latitude, driverPos.longitude) : null;

    // Create a "curvy" path between points
    const midX = (start.x + end.x) / 2 + (Math.random() - 0.5) * 40;
    const midY = (start.y + end.y) / 2 + (Math.random() - 0.5) * 40;
    const routeD = `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;

    return (
        <View style={[styles.container, style]}>
            <Svg width={SVG_WIDTH} height={SVG_HEIGHT}>
                {/* Map Grid/Background Background */}
                <Rect x="0" y="0" width={SVG_WIDTH} height={SVG_HEIGHT} fill="#F0F2F5" />

                {/* Mock City Grid Lines */}
                {[...Array(10)].map((_, i) => (
                    <Path
                        key={`h-${i}`}
                        d={`M 0 ${i * (SVG_HEIGHT / 10)} L ${SVG_WIDTH} ${i * (SVG_HEIGHT / 10)}`}
                        stroke="#E1E4E8"
                        strokeWidth="1"
                    />
                ))}
                {[...Array(10)].map((_, i) => (
                    <Path
                        key={`v-${i}`}
                        d={`M ${i * (SVG_WIDTH / 10)} 0 L ${i * (SVG_WIDTH / 10)} ${SVG_HEIGHT}`}
                        stroke="#E1E4E8"
                        strokeWidth="1"
                    />
                ))}

                {/* Main Route */}
                <Path
                    d={routeD}
                    fill="none"
                    stroke={Colors.primary}
                    strokeWidth="4"
                    strokeDasharray="8,4"
                    strokeLinecap="round"
                    opacity={0.6}
                />

                {/* Driver to Pickup Route (if needed) */}
                {showDriver && driver && (
                    <Path
                        d={`M ${driver.x} ${driver.y} L ${start.x} ${start.y}`}
                        fill="none"
                        stroke={Colors.secondary}
                        strokeWidth="3"
                        strokeDasharray="4,4"
                    />
                )}

                {/* Pickup Marker */}
                <G>
                    <Circle cx={start.x} cy={start.y} r="8" fill={Colors.secondary} />
                    <Circle cx={start.x} cy={start.y} r="4" fill="white" />
                </G>

                {/* Destination Marker */}
                <G>
                    <Circle cx={end.x} cy={end.y} r="8" fill={Colors.primary} />
                    <Rect x={end.x - 4} y={end.y - 4} width="8" height="8" fill="white" />
                </G>

                {/* Driver Icon */}
                {showDriver && driver && (
                    <G transform={`translate(${driver.x - 12}, ${driver.y - 12})`}>
                        <Rect width="24" height="24" rx="12" fill="white" stroke={Colors.secondary} strokeWidth="2" />
                        <Circle cx="12" cy="12" r="5" fill={Colors.secondary} />
                    </G>
                )}
            </Svg>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#F0F2F5',
        overflow: 'hidden',
    },
});

export default MockMap;

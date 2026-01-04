import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { Image } from 'react-native';
import { Colors } from '../utils/colors';
import { PickupMarker, DestinationMarker } from './Icons';

// Re-import vehicle PNGs for map markers
const VEHICLE_IMAGES: { [key: string]: any } = {
    car: require('../assets/vehicles/mini.png'),
    auto: require('../assets/vehicles/auto.png'),
    ev: require('../assets/vehicles/ev.png'),
    suv: require('../assets/vehicles/suv.png'),
    minivan: require('../assets/vehicles/minivan.png'),
};

const { width, height } = Dimensions.get('window');

// Hyderabad bounding box (City)
const HYD_LAT_MIN = 17.30;
const HYD_LAT_MAX = 17.50;
const HYD_LNG_MIN = 78.30;
const HYD_LNG_MAX = 78.60;

// Airport bounding box
const AIRPORT_LAT = 17.2403;
const AIRPORT_LNG = 78.4294;
const AIRPORT_OFFSET = 0.015;

const VEHICLE_TYPES = ['car', 'auto', 'ev', 'suv', 'minivan'];

interface VehicleData {
    id: number;
    latitude: number;
    longitude: number;
    type: string;
    rotation: number;
    dx: number; // Direction X
    dy: number; // Direction Y
}

interface Location {
    latitude: number;
    longitude: number;
}

interface AirportMapViewProps {
    pickup: Location | null;
    dropoff: Location | null;
    driver?: Location | null;
    apiKey: string;
}

const AirportMapView = ({ pickup, dropoff, driver, apiKey }: AirportMapViewProps) => {
    const mapRef = useRef<MapView>(null);
    const [dummyVehicles, setDummyVehicles] = React.useState<VehicleData[]>([]);

    // Initialize dummy vehicles once
    useEffect(() => {
        const vehicles: VehicleData[] = [];

        // City Vehicles (8)
        for (let i = 0; i < 8; i++) {
            vehicles.push({
                id: i,
                latitude: HYD_LAT_MIN + Math.random() * (HYD_LAT_MAX - HYD_LAT_MIN),
                longitude: HYD_LNG_MIN + Math.random() * (HYD_LNG_MAX - HYD_LNG_MIN),
                type: VEHICLE_TYPES[Math.floor(Math.random() * VEHICLE_TYPES.length)],
                rotation: Math.random() * 360,
                dx: (Math.random() - 0.5) * 0.0001,
                dy: (Math.random() - 0.5) * 0.0001,
            });
        }

        // Airport Area Vehicles (4) - Clustered around the airport terminal
        for (let i = 8; i < 12; i++) {
            vehicles.push({
                id: i,
                latitude: AIRPORT_LAT + (Math.random() - 0.5) * AIRPORT_OFFSET,
                longitude: AIRPORT_LNG + (Math.random() - 0.5) * AIRPORT_OFFSET,
                type: VEHICLE_TYPES[Math.floor(Math.random() * VEHICLE_TYPES.length)],
                rotation: Math.random() * 360,
                dx: (Math.random() - 0.5) * 0.00015,
                dy: (Math.random() - 0.5) * 0.00015,
            });
        }

        setDummyVehicles(vehicles);
    }, []);

    // Move vehicles smoothly
    useEffect(() => {
        const interval = setInterval(() => {
            setDummyVehicles(prev => prev.map(v => {
                // Occasionally change direction slightly
                const newDx = Math.random() > 0.9 ? (Math.random() - 0.5) * 0.0001 : v.dx;
                const newDy = Math.random() > 0.9 ? (Math.random() - 0.5) * 0.0001 : v.dy;

                // Calculate rotation based on direction
                const newRotation = Math.atan2(newDy, newDx) * (180 / Math.PI) + 90;

                return {
                    ...v,
                    latitude: v.latitude + newDy,
                    longitude: v.longitude + newDx,
                    rotation: newRotation,
                    dx: newDx,
                    dy: newDy,
                };
            }));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (pickup && dropoff && mapRef.current) {
            mapRef.current.fitToCoordinates([pickup, dropoff], {
                edgePadding: { top: 100, right: 60, bottom: 100, left: 60 },
                animated: true,
            });
        }
    }, [pickup, dropoff]);

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                    latitude: 17.3850,
                    longitude: 78.4867,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {dummyVehicles.map(v => (
                    <Marker
                        key={`vehicle-${v.id}`}
                        coordinate={{ latitude: v.latitude, longitude: v.longitude }}
                        flat
                        anchor={{ x: 0.5, y: 0.5 }}
                        rotation={v.rotation}
                    >
                        <Image
                            source={VEHICLE_IMAGES[v.type]}
                            style={{ width: 38, height: 38 }}
                            resizeMode="contain"
                        />
                    </Marker>
                ))}

                {pickup && (
                    <Marker
                        coordinate={pickup}
                        anchor={{ x: 0.5, y: 0.5 }}
                    >
                        <PickupMarker />
                    </Marker>
                )}
                {dropoff && (
                    <Marker
                        coordinate={dropoff}
                        anchor={{ x: 0.5, y: 0.5 }}
                    >
                        <DestinationMarker />
                    </Marker>
                )}
                {pickup && dropoff && (
                    <MapViewDirections
                        key={`${pickup.latitude}-${pickup.longitude}-${dropoff.latitude}-${dropoff.longitude}`}
                        origin={pickup}
                        destination={dropoff}
                        apikey={apiKey}
                        strokeWidth={4}
                        strokeColor={Colors.primary}
                        mode="DRIVING"
                        precision="high"
                        optimizeWaypoints={true}
                        onError={(errorMessage) => {
                            console.log('Directions error: ', errorMessage);
                        }}
                    />
                )}
                {driver && pickup && (
                    <>
                        <Marker
                            coordinate={driver}
                            anchor={{ x: 0.5, y: 0.5 }}
                        >
                            <Image
                                source={VEHICLE_IMAGES.car}
                                style={{ width: 42, height: 42 }}
                                resizeMode="contain"
                            />
                        </Marker>
                        <MapViewDirections
                            origin={driver}
                            destination={pickup}
                            apikey={apiKey}
                            strokeWidth={3}
                            strokeColor={Colors.secondary}
                            mode="DRIVING"
                        />
                    </>
                )}
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default AirportMapView;

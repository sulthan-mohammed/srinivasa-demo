import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { Colors } from '../utils/colors';
import { PickupMarker, DestinationMarker } from './Icons';

const { width, height } = Dimensions.get('window');

interface Location {
    latitude: number;
    longitude: number;
}

interface AirportMapViewProps {
    pickup: Location | null;
    dropoff: Location | null;
    apiKey: string;
}

const AirportMapView = ({ pickup, dropoff, apiKey }: AirportMapViewProps) => {
    const mapRef = useRef<MapView>(null);

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

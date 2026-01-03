import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { Colors } from '../utils/colors';

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
                edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
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
                        title="Pickup"
                        pinColor={Colors.primary}
                    />
                )}
                {dropoff && (
                    <Marker
                        coordinate={dropoff}
                        title="Airport"
                        pinColor={Colors.alert}
                    />
                )}
                {pickup && dropoff && (
                    <MapViewDirections
                        origin={pickup}
                        destination={dropoff}
                        apikey={apiKey}
                        strokeWidth={5}
                        strokeColor="#000000"
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

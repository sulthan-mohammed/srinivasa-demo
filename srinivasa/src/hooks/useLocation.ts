import { useState, useEffect } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';

const GOOGLE_MAPS_API_KEY = 'AIzaSyBw9X_i_hwBXa5wZqIVABtUh9mtOun-pbc';

export interface LocationData {
    latitude: number;
    longitude: number;
    address: string;
    area: string;
}

export const useLocation = () => {
    const [location, setLocation] = useState<LocationData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [permissionDenied, setPermissionDenied] = useState(false);

    const requestPermission = async () => {
        if (Platform.OS === 'ios') {
            const auth = await Geolocation.requestAuthorization('whenInUse');
            return auth === 'granted';
        }

        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Location Permission',
                    message: 'This app needs access to your location for cab booking.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
        return false;
    };

    const fetchLocation = async () => {
        setLoading(true);
        setError(null);
        setPermissionDenied(false);

        const hasPermission = await requestPermission();
        if (!hasPermission) {
            setPermissionDenied(true);
            setLoading(false);
            return;
        }

        Geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    // Reverse geocode using Google Maps API
                    const response = await axios.get(
                        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`
                    );

                    if (response.data.results && response.data.results.length > 0) {
                        // Look for a landmark/POI result first for a better address
                        const landmarkResult = response.data.results.find((r: any) =>
                            r.types.includes('point_of_interest') || r.types.includes('establishment')
                        );

                        const address = landmarkResult
                            ? landmarkResult.formatted_address
                            : response.data.results[0].formatted_address;

                        const area = response.data.results[0].address_components.find((c: any) =>
                            c.types.includes('sublocality') || c.types.includes('locality')
                        )?.long_name || 'My Location';

                        setLocation({ latitude, longitude, address, area });
                    } else {
                        setLocation({ latitude, longitude, address: 'My Location', area: 'Current Location' });
                    }
                } catch (err) {
                    console.error('Reverse geocoding error:', err);
                    setLocation({ latitude, longitude, address: 'My Location', area: 'Current Location' });
                }
                setLoading(false);
            },
            (err) => {
                console.error('Geolocation error:', err);
                setError(err.message);
                setLoading(false);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    };

    useEffect(() => {
        fetchLocation();
    }, []);

    return { location, error, loading, permissionDenied, fetchLocation, setPermissionDenied };
};

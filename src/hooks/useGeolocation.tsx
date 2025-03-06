import { GeoLocationState } from "@/api/types";
import { useEffect, useState } from "react";

export function useGeolocation() {
    const [locationData, setLocationData] = useState<GeoLocationState>({
        coordinates: null,
        error: null,
        isLoading: true,
    });

    const getLocation = () => {
        setLocationData((prev) => ({
            ...prev,
            error: null,
            isLoading: true,
        }));

        if (!navigator.geolocation) {
            setLocationData({
                coordinates: null,
                error: "Geolocation is not supported by your browser",
                isLoading: false,
            });

            return;
        }

        navigator.geolocation.getCurrentPosition((pos) => {
            setLocationData({
                coordinates: {
                    lat: pos.coords.latitude,
                    lon: pos.coords.longitude,
                },
                error: null,
                isLoading: false,
            })
        }, (error) => {
            let errorMsg: string;

            switch (error.code) {
                case error.PERMISSION_DENIED:
                    errorMsg = "Location permission denied. Please enable location access."
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMsg = "Location information is unavailable."
                    break;
                case error.TIMEOUT:
                    errorMsg = "Location request timed out."
                    break;
                default:
                    errorMsg = "An unkown error occurred."
            }

            setLocationData({
                coordinates: null,
                error: errorMsg,
                isLoading: false
            });
        }, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        });
    }

    useEffect(() => {
        getLocation();
    }, []);

    return {
        ...locationData,
        getLocation,
    };
} 
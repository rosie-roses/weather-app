"use client";

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { UseGlobalContext } from '@/app/context/global-context';
import { Skeleton } from '@/components/ui/skeleton';

function FlyToActiveCity({ activeCityCoords }) {
    const map = useMap();

    useEffect(() => {
        if (activeCityCoords) {
            const zoomLevel = 13;
            const flyToOptions = {
                duration: 1.5,
            };
            map.flyTo([activeCityCoords.lat, activeCityCoords.lon], zoomLevel, flyToOptions);
        }
    }, [activeCityCoords, map]);

    return null;
}

function Mapbox() {
    const { forecast } = UseGlobalContext();

    const activeCityCoords = forecast?.coord;

    if (!forecast || !forecast?.coord) {
        return (
            <Skeleton className="w-full" />
        );
    }

    return (
        <div className="flex-1 basis-[50%] border rounded-lg">
            <MapContainer
                center={[activeCityCoords.lat || 0, activeCityCoords.lon || 0]}
                zoom={13}
                scrollWheelZoom={false}
                style={{ height: 'calc(100% - 2rem)', width: 'calc(100% - 2rem)' }}
                className="rounded-lg m-4"
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                />
                <FlyToActiveCity activeCityCoords={activeCityCoords} />
            </MapContainer>
        </div>
    );
}

export default Mapbox;
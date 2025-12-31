'use client';

import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function WorldMap() {
    return (
        <MapContainer
            center={[20, 0]}
            zoom={2}
            style={{ height: '100vh', width: '100%' }}
            minZoom={2}
            worldCopyJump={true}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
        </MapContainer>
    );
}
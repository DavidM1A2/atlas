'use client';

import { useEffect, useRef, useSyncExternalStore } from 'react';
import { MapContainer, TileLayer, GeoJSON, ZoomControl } from 'react-leaflet';
import type { Path } from 'leaflet';
import type { FeatureCollection, Geometry } from 'geojson';
import type { Country, CountryProperties } from '@/types/country';
import countriesData from '@/data/countries.json';
import 'leaflet/dist/leaflet.css';

interface WorldMapProps {
    selectedCountry: Country | null;
    onCountrySelect: (country: Country) => void;
    tileUrl: string;
    tileAttribution: string;
}

const defaultStyle = {
    fillColor: 'transparent',
    weight: 1,
    opacity: 0.3,
    color: '#666666',
    fillOpacity: 0,
};

const hoverStyle = {
    fillColor: 'transparent',
    weight: 3,
    opacity: 1,
    color: '#3388ff',
    fillOpacity: 0,
};

const selectedStyle = {
    fillColor: 'transparent',
    weight: 3,
    opacity: 1,
    color: '#ff7800',
    fillOpacity: 0,
};

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

interface LayerWithCountry extends Path {
    countryCode: string;
    countryName: string;
}

export default function WorldMap({ selectedCountry, onCountrySelect, tileUrl, tileAttribution }: WorldMapProps) {
    const mounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
    const selectedLayerRef = useRef<LayerWithCountry | null>(null);
    const layerMapRef = useRef<Map<string, LayerWithCountry>>(new Map());

    // Clear highlight when selection is cleared externally (e.g., pane closed)
    useEffect(() => {
        if (!selectedCountry && selectedLayerRef.current) {
            selectedLayerRef.current.setStyle(defaultStyle);
            selectedLayerRef.current = null;
        }
    }, [selectedCountry]);

    const handleLayerClick = (layer: LayerWithCountry) => {
        // Reset previous selection
        if (selectedLayerRef.current && selectedLayerRef.current !== layer) {
            selectedLayerRef.current.setStyle(defaultStyle);
        }

        // Apply selected style to new layer
        layer.setStyle(selectedStyle);
        selectedLayerRef.current = layer;

        onCountrySelect({
            name: layer.countryName,
            population: 10000000,
            gdp: 500000000000,
            povertyRate: 12.5,
            peopleGroups: 45,
            christianPercent: 65.2,
        });
    };

    const onEachFeature = (
        feature: GeoJSON.Feature<Geometry, CountryProperties>,
        layer: Path
    ) => {
        const props = feature.properties;
        const countryName = props?.name || 'Unknown';
        const countryCode = props?.['ISO3166-1-Alpha-3'] || '';

        // Extend layer with country info
        const extendedLayer = layer as LayerWithCountry;
        extendedLayer.countryCode = countryCode;
        extendedLayer.countryName = countryName;

        // Store in map for external access
        if (countryCode) {
            layerMapRef.current.set(countryCode, extendedLayer);
        }

        layer.on({
            mouseover: () => {
                if (selectedLayerRef.current !== layer) {
                    layer.setStyle(hoverStyle);
                }
            },
            mouseout: () => {
                if (selectedLayerRef.current !== layer) {
                    layer.setStyle(defaultStyle);
                }
            },
            click: () => {
                handleLayerClick(extendedLayer);
            },
        });
    };

    if (!mounted) return null;

    return (
        <MapContainer
            center={[20, 0]}
            zoom={2}
            style={{ height: '100vh', width: '100%' }}
            minZoom={2}
            worldCopyJump={true}
            zoomControl={false}
        >
            <ZoomControl position="bottomleft" />
            <TileLayer
                key={tileUrl}
                url={tileUrl}
                attribution={tileAttribution}
            />
            <GeoJSON
                data={countriesData as FeatureCollection<Geometry, CountryProperties>}
                style={defaultStyle}
                onEachFeature={onEachFeature}
            />
        </MapContainer>
    );
}
'use client';

import { useEffect, useRef, useSyncExternalStore } from 'react';
import { MapContainer, TileLayer, GeoJSON, ZoomControl } from 'react-leaflet';
import type { Path } from 'leaflet';
import type { FeatureCollection, Geometry } from 'geojson';
import type { Country, CountryProperties } from '@/types/country';
import type { LanguageGroup } from '@/types/languageGroup';
import countriesData from '@/data/countries.json';
import LanguageMarkers from './LanguageMarkers';
import {
    DEFAULT_COUNTRY_STYLE,
    HOVER_COUNTRY_STYLE,
    SELECTED_COUNTRY_STYLE,
} from '@/utils/mapStyles';
import { getCountryByName } from '@/utils/backendService';
import 'leaflet/dist/leaflet.css';

interface WorldMapProps {
    selectedCountry: Country | null;
    onCountrySelect: (country: Country) => void;
    tileUrl: string;
    tileAttribution: string;
    languageGroups: LanguageGroup[];
    selectedLanguageGroupId: string | null;
    onLanguageGroupSelect: (languageGroup: LanguageGroup) => void;
}

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

interface LayerWithCountry extends Path {
    countryCode: string;
    countryName: string;
}

export default function WorldMap({
    selectedCountry,
    onCountrySelect,
    tileUrl,
    tileAttribution,
    languageGroups,
    selectedLanguageGroupId,
    onLanguageGroupSelect,
}: WorldMapProps) {
    const mounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
    const selectedLayerRef = useRef<LayerWithCountry | null>(null);
    const layerMapRef = useRef<Map<string, LayerWithCountry>>(new Map());

    // Clear highlight when selection is cleared externally (e.g., pane closed)
    useEffect(() => {
        if (!selectedCountry && selectedLayerRef.current) {
            selectedLayerRef.current.setStyle(DEFAULT_COUNTRY_STYLE);
            selectedLayerRef.current = null;
        }
    }, [selectedCountry]);

    const handleLayerClick = (layer: LayerWithCountry) => {
        // Reset previous selection
        if (selectedLayerRef.current && selectedLayerRef.current !== layer) {
            selectedLayerRef.current.setStyle(DEFAULT_COUNTRY_STYLE);
        }

        // Apply selected style to new layer
        layer.setStyle(SELECTED_COUNTRY_STYLE);
        selectedLayerRef.current = layer;

        const countryData = getCountryByName(layer.countryName);
        onCountrySelect(
            countryData ?? {
                name: layer.countryName,
                population: 0,
                gdp: 0,
                povertyRate: 0,
                peopleGroups: 0,
                christianPercent: 0,
            }
        );
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
                    layer.setStyle(HOVER_COUNTRY_STYLE);
                }
            },
            mouseout: () => {
                if (selectedLayerRef.current !== layer) {
                    layer.setStyle(DEFAULT_COUNTRY_STYLE);
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
                style={DEFAULT_COUNTRY_STYLE}
                onEachFeature={onEachFeature}
            />
            <LanguageMarkers
                languageGroups={languageGroups}
                selectedId={selectedLanguageGroupId}
                onMarkerClick={onLanguageGroupSelect}
            />
        </MapContainer>
    );
}
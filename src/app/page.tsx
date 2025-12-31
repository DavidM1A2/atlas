'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import type { Country } from '@/types/country';
import CountryInfoPane from '@/components/CountryInfoPane';
import AuthHeader from '@/components/AuthHeader';
import TileSelector, { tileOptions } from '@/components/TileSelector';

const WorldMap = dynamic(() => import('@/components/WorldMap'), {
    ssr: false,
});

export default function Home() {
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
    const [selectedTileId, setSelectedTileId] = useState('voyager');

    const selectedTile = tileOptions.find((t) => t.id === selectedTileId) || tileOptions[0];

    const handleCountrySelect = useCallback((country: Country) => {
        setSelectedCountry(country);
    }, []);

    const handleClosePane = useCallback(() => {
        setSelectedCountry(null);
    }, []);

    return (
        <>
            <AuthHeader />
            <TileSelector selectedTile={selectedTileId} onTileChange={setSelectedTileId} />
            <WorldMap
                selectedCountry={selectedCountry}
                onCountrySelect={handleCountrySelect}
                tileUrl={selectedTile.url}
                tileAttribution={selectedTile.attribution}
            />
            {selectedCountry && (
                <CountryInfoPane
                    country={selectedCountry}
                    onClose={handleClosePane}
                />
            )}
        </>
    );
}
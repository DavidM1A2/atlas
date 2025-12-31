'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import type { Country } from '@/types/country';
import CountryInfoPane from '@/components/CountryInfoPane';

const WorldMap = dynamic(() => import('@/components/WorldMap'), {
    ssr: false,
});

export default function Home() {
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

    const handleCountrySelect = useCallback((country: Country) => {
        setSelectedCountry(country);
    }, []);

    const handleClosePane = useCallback(() => {
        setSelectedCountry(null);
    }, []);

    return (
        <>
            <WorldMap selectedCountry={selectedCountry} onCountrySelect={handleCountrySelect} />
            {selectedCountry && (
                <CountryInfoPane
                    country={selectedCountry}
                    onClose={handleClosePane}
                />
            )}
        </>
    );
}
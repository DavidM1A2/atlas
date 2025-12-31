'use client';

import { useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import type { Country } from '@/types/country';
import type { LanguageGroup } from '@/types/languageGroup';
import { useLanguageGroups } from '@/context/LanguageGroupContext';
import CountryInfoPane from '@/components/CountryInfoPane';
import LanguageGroupPane from '@/components/LanguageGroupPane';
import AuthHeader from '@/components/AuthHeader';
import TileSelector, { tileOptions } from '@/components/TileSelector';

const WorldMap = dynamic(() => import('@/components/WorldMap'), {
    ssr: false,
});

type PanelState =
    | { type: 'none' }
    | { type: 'country'; data: Country }
    | { type: 'languageGroup'; data: LanguageGroup };

function getInitialTileId(): string {
    if (typeof window === 'undefined') return 'osm';
    return localStorage.getItem('selectedTileId') || 'osm';
}

export default function Home() {
    const { languageGroups, getLanguageGroupWithEdits } = useLanguageGroups();
    const [panelState, setPanelState] = useState<PanelState>({ type: 'none' });
    const [selectedTileId, setSelectedTileId] = useState(getInitialTileId);

    useEffect(() => {
        localStorage.setItem('selectedTileId', selectedTileId);
    }, [selectedTileId]);

    const selectedTile = tileOptions.find((t) => t.id === selectedTileId) || tileOptions[0];

    const handleCountrySelect = useCallback((country: Country) => {
        setPanelState({ type: 'country', data: country });
    }, []);

    const handleLanguageGroupSelect = useCallback(
        (languageGroup: LanguageGroup) => {
            const withEdits = getLanguageGroupWithEdits(languageGroup.id);
            setPanelState({ type: 'languageGroup', data: withEdits || languageGroup });
        },
        [getLanguageGroupWithEdits]
    );

    const handleClosePane = useCallback(() => {
        setPanelState({ type: 'none' });
    }, []);

    const selectedCountry = panelState.type === 'country' ? panelState.data : null;
    const selectedLanguageGroupId =
        panelState.type === 'languageGroup' ? panelState.data.id : null;

    return (
        <>
            <AuthHeader />
            <TileSelector selectedTile={selectedTileId} onTileChange={setSelectedTileId} />
            <WorldMap
                selectedCountry={selectedCountry}
                onCountrySelect={handleCountrySelect}
                tileUrl={selectedTile.url}
                tileAttribution={selectedTile.attribution}
                languageGroups={languageGroups}
                selectedLanguageGroupId={selectedLanguageGroupId}
                onLanguageGroupSelect={handleLanguageGroupSelect}
            />
            {panelState.type === 'country' && (
                <CountryInfoPane country={panelState.data} onClose={handleClosePane} />
            )}
            {panelState.type === 'languageGroup' && (
                <LanguageGroupPane
                    languageGroup={panelState.data}
                    onClose={handleClosePane}
                />
            )}
        </>
    );
}
'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import type { Country } from '@/types/country';
import type { LanguageGroup } from '@/types/languageGroup';
import type { LanguageGroupFilters } from '@/types/filters';
import { DEFAULT_FILTERS } from '@/types/filters';
import type { ColorCodingState } from '@/types/colorCoding';
import { DEFAULT_COLOR_CODING } from '@/types/colorCoding';
import { useLanguageGroups } from '@/context/LanguageGroupContext';
import CountryInfoPane from '@/components/CountryInfoPane';
import LanguageGroupPane from '@/components/LanguageGroupPane';
import FilterPanel from '@/components/FilterPanel';
import ColorCodingPanel from '@/components/ColorCodingPanel';
import ColorLegend from '@/components/ColorLegend';
import TileSelector from '@/components/TileSelector';
import { tileOptions } from '@/data/tiles';
import { filterLanguageGroups } from '@/utils/filterUtils';
import { useAuth } from '@/context/AuthContext';
import { canUseGlobalFilters } from '@/utils/permissions';

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
    const { user } = useAuth();
    const { languageGroups } = useLanguageGroups();
    const showGlobalFilters = canUseGlobalFilters(user);
    const [panelState, setPanelState] = useState<PanelState>({ type: 'none' });
    const [selectedTileId, setSelectedTileId] = useState(getInitialTileId);
    const [filters, setFilters] = useState<LanguageGroupFilters>(DEFAULT_FILTERS);
    const [colorCoding, setColorCoding] = useState<ColorCodingState>(DEFAULT_COLOR_CODING);
    const [openPanel, setOpenPanel] = useState<'filter' | 'colorCoding' | 'user' | null>(null);

    const handleToggleFilterPanel = useCallback(() => {
        setOpenPanel((prev) => (prev === 'filter' ? null : 'filter'));
    }, []);

    const handleToggleColorCodingPanel = useCallback(() => {
        setOpenPanel((prev) => (prev === 'colorCoding' ? null : 'colorCoding'));
    }, []);

    const handleToggleUserMenu = useCallback(() => {
        setOpenPanel((prev) => (prev === 'user' ? null : 'user'));
    }, []);

    useEffect(() => {
        localStorage.setItem('selectedTileId', selectedTileId);
    }, [selectedTileId]);

    // Reset state when user logs out
    useEffect(() => {
        if (!user) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setFilters(DEFAULT_FILTERS);
            setColorCoding(DEFAULT_COLOR_CODING);
            setOpenPanel(null);
            setPanelState({ type: 'none' });
        }
    }, [user]);

    const selectedTile = tileOptions.find((t) => t.id === selectedTileId) || tileOptions[0];

    // Apply filters to language groups
    const filteredLanguageGroups = useMemo(
        () => filterLanguageGroups(languageGroups, filters),
        [languageGroups, filters]
    );

    const handleCountrySelect = useCallback((country: Country) => {
        setPanelState({ type: 'country', data: country });
    }, []);

    const handleLanguageGroupSelect = useCallback((languageGroup: LanguageGroup) => {
        setPanelState({ type: 'languageGroup', data: languageGroup });
    }, []);

    const handleClosePane = useCallback(() => {
        setPanelState({ type: 'none' });
    }, []);

    const selectedCountry = panelState.type === 'country' ? panelState.data : null;
    const selectedLanguageGroupId =
        panelState.type === 'languageGroup' ? panelState.data.id : null;

    return (
        <>
            <TileSelector selectedTile={selectedTileId} onTileChange={setSelectedTileId} />
            <FilterPanel
                languageGroups={languageGroups}
                filters={filters}
                onFiltersChange={setFilters}
                filteredCount={filteredLanguageGroups.length}
                isOpen={openPanel === 'filter'}
                onToggle={handleToggleFilterPanel}
                isUserMenuOpen={openPanel === 'user'}
                onUserMenuToggle={handleToggleUserMenu}
                showFilters={showGlobalFilters}
            />
            {showGlobalFilters && (
                <ColorCodingPanel
                    colorCoding={colorCoding}
                    onColorCodingChange={setColorCoding}
                    isOpen={openPanel === 'colorCoding'}
                    onToggle={handleToggleColorCodingPanel}
                />
            )}
            <WorldMap
                selectedCountry={selectedCountry}
                onCountrySelect={handleCountrySelect}
                tileUrl={selectedTile.url}
                tileAttribution={selectedTile.attribution}
                languageGroups={filteredLanguageGroups}
                selectedLanguageGroupId={selectedLanguageGroupId}
                onLanguageGroupSelect={handleLanguageGroupSelect}
                colorCoding={colorCoding}
            />
            {showGlobalFilters && <ColorLegend selectedMetrics={colorCoding.selectedMetrics} />}
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

'use client';

import { useMemo } from 'react';
import { Marker } from 'react-leaflet';
import type { LanguageGroup } from '@/types/languageGroup';
import type { ColorCodingState } from '@/types/colorCoding';
import { createLanguageMarkerIcon } from './LanguageMarkerIcon';
import { getMarkerColor } from '@/utils/colorCalculation';

interface LanguageMarkersProps {
    languageGroups: LanguageGroup[];
    selectedId: string | null;
    onMarkerClick: (languageGroup: LanguageGroup) => void;
    colorCoding: ColorCodingState;
}

export default function LanguageMarkers({
    languageGroups,
    selectedId,
    onMarkerClick,
    colorCoding,
}: LanguageMarkersProps) {
    const groupIcons = useMemo(() => {
        const icons = new Map<string, { normal: L.DivIcon; selected: L.DivIcon }>();
        for (const lg of languageGroups) {
            const color = getMarkerColor(lg, colorCoding.selectedMetrics);
            icons.set(lg.id, {
                normal: createLanguageMarkerIcon(color, false),
                selected: createLanguageMarkerIcon(color, true),
            });
        }
        return icons;
    }, [languageGroups, colorCoding.selectedMetrics]);

    return (
        <>
            {languageGroups.flatMap((lg) => {
                const icons = groupIcons.get(lg.id);
                return lg.coordinates.map((coord, index) => (
                    <Marker
                        key={`${lg.id}-${index}`}
                        position={[coord.lat, coord.lng]}
                        icon={lg.id === selectedId ? icons?.selected : icons?.normal}
                        eventHandlers={{
                            click: () => onMarkerClick(lg),
                        }}
                    />
                ));
            })}
        </>
    );
}

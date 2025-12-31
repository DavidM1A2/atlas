'use client';

import { Marker } from 'react-leaflet';
import type { LanguageGroup } from '@/types/languageGroup';
import {
    languageMarkerIcon,
    languageMarkerIconSelected,
} from './LanguageMarkerIcon';

interface LanguageMarkersProps {
    languageGroups: LanguageGroup[];
    selectedId: string | null;
    onMarkerClick: (languageGroup: LanguageGroup) => void;
}

export default function LanguageMarkers({
    languageGroups,
    selectedId,
    onMarkerClick,
}: LanguageMarkersProps) {
    return (
        <>
            {languageGroups.flatMap((lg) =>
                lg.coordinates.map((coord, index) => (
                    <Marker
                        key={`${lg.id}-${index}`}
                        position={[coord.lat, coord.lng]}
                        icon={
                            lg.id === selectedId
                                ? languageMarkerIconSelected
                                : languageMarkerIcon
                        }
                        eventHandlers={{
                            click: () => onMarkerClick(lg),
                        }}
                    />
                ))
            )}
        </>
    );
}

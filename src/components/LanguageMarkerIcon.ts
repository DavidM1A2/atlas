import L from 'leaflet';

export function createLanguageMarkerIcon(color: string, selected: boolean = false): L.DivIcon {
    if (selected) {
        return L.divIcon({
            className: 'language-marker-icon selected',
            html: `<svg width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
                <circle cx="11" cy="11" r="9" fill="${color}" stroke="#fff" stroke-width="3"/>
            </svg>`,
            iconSize: [22, 22],
            iconAnchor: [11, 11],
            popupAnchor: [0, -11],
        });
    }

    return L.divIcon({
        className: 'language-marker-icon',
        html: `<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="8" r="7" fill="${color}" stroke="#fff" stroke-width="2"/>
        </svg>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
        popupAnchor: [0, -8],
    });
}

import type { PathOptions } from 'leaflet';

export const DEFAULT_COUNTRY_STYLE: PathOptions = {
    fillColor: 'transparent',
    weight: 1,
    opacity: 0.3,
    color: '#666666',
    fillOpacity: 0,
};

export const HOVER_COUNTRY_STYLE: PathOptions = {
    fillColor: 'transparent',
    weight: 3,
    opacity: 1,
    color: '#3388ff',
    fillOpacity: 0,
};

export const SELECTED_COUNTRY_STYLE: PathOptions = {
    fillColor: 'transparent',
    weight: 3,
    opacity: 1,
    color: '#ff7800',
    fillOpacity: 0,
};

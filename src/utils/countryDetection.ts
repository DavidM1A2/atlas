import type { FeatureCollection, Polygon, MultiPolygon } from 'geojson';
import type { CountryProperties } from '@/types/country';
import type { LanguageGroup } from '@/types/languageGroup';
import { pointInFeature } from './geometry';
import countriesData from '@/data/countries.json';

const countries = countriesData as FeatureCollection<Polygon | MultiPolygon, CountryProperties>;

/**
 * Detect which country contains the given coordinates
 * Returns the ISO3166-1-Alpha-3 country code, or undefined if not found
 */
export function detectCountryForCoordinates(
    lat: number,
    lng: number
): string | undefined {
    for (const feature of countries.features) {
        if (
            feature.geometry.type === 'Polygon' ||
            feature.geometry.type === 'MultiPolygon'
        ) {
            if (pointInFeature({ lat, lng }, feature)) {
                return feature.properties?.['ISO3166-1-Alpha-3'];
            }
        }
    }
    return undefined;
}

/**
 * Enrich language groups with their country codes based on coordinates
 * Returns unique country codes for all locations
 */
export function enrichLanguageGroupsWithCountry(
    groups: LanguageGroup[]
): LanguageGroup[] {
    return groups.map((group) => {
        const codes = group.coordinates
            .map((coord) => detectCountryForCoordinates(coord.lat, coord.lng))
            .filter((code): code is string => code !== undefined);
        const uniqueCodes = [...new Set(codes)];
        return {
            ...group,
            countryCodes: uniqueCodes.length > 0 ? uniqueCodes : undefined,
        };
    });
}

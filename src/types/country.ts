import type { Feature, Geometry } from 'geojson';

export interface Country {
    name: string;
    code: string;
    population: number;
}

export interface CountryProperties {
    name: string;
    'ISO3166-1-Alpha-2': string;
    'ISO3166-1-Alpha-3': string;
    [key: string]: unknown;
}

export type CountryFeature = Feature<Geometry, CountryProperties>;

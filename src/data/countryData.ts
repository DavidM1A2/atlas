import type { Country } from '@/types/country';

export interface CountryData extends Country {
    isoAlpha3: string;
}

export const mockCountryData: CountryData[] = [
    {
        name: 'Laos',
        isoAlpha3: 'LAO',
        population: 7529000,
        gdp: 18800000000,
        povertyRate: 18.3,
        peopleGroups: 134,
        christianPercent: 2.9,
    },
];

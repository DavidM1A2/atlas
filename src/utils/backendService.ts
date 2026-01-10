import type { Country } from '@/types/country';
import { mockCountryData } from '@/data/countryData';

// ============================================================================
// Countries
// ============================================================================

export function getCountryByName(name: string): Country | null {
    const countryData = mockCountryData.find(
        (c) => c.name.toLowerCase() === name.toLowerCase()
    );

    if (countryData) {
        return {
            name: countryData.name,
            population: countryData.population,
            gdp: countryData.gdp,
            povertyRate: countryData.povertyRate,
            peopleGroups: countryData.peopleGroups,
            christianPercent: countryData.christianPercent,
        };
    }

    return null;
}

export function getCountryByCode(isoAlpha3: string): Country | null {
    const countryData = mockCountryData.find(
        (c) => c.isoAlpha3.toUpperCase() === isoAlpha3.toUpperCase()
    );

    if (countryData) {
        return {
            name: countryData.name,
            population: countryData.population,
            gdp: countryData.gdp,
            povertyRate: countryData.povertyRate,
            peopleGroups: countryData.peopleGroups,
            christianPercent: countryData.christianPercent,
        };
    }

    return null;
}

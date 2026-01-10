import type { LanguageGroup } from '@/types/languageGroup';
import type { Country } from '@/types/country';
import { mockLanguageGroups } from '@/data/languageGroups';
import { mockCountryData } from '@/data/countryData';
import { enrichLanguageGroupsWithCountry } from '@/utils/countryDetection';

// ============================================================================
// Language Groups
// ============================================================================

const enrichedLanguageGroups = enrichLanguageGroupsWithCountry(mockLanguageGroups);

export function getAllLanguageGroups(): LanguageGroup[] {
    return enrichedLanguageGroups;
}

export function getLanguageGroupById(id: string): LanguageGroup | undefined {
    return enrichedLanguageGroups.find((lg) => lg.id === id);
}

export function applyLanguageGroupEdits(
    languageGroup: LanguageGroup,
    edits: Partial<LanguageGroup>
): LanguageGroup {
    return { ...languageGroup, ...edits };
}

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

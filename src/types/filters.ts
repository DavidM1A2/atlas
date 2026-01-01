import type { ChurchPresence, SourceReliability } from './languageGroup';

// Population range options for filtering
export const POPULATION_RANGES = ['<10k', '10-20k', '20-50k', '50k+'] as const;
export type PopulationRange = (typeof POPULATION_RANGES)[number];

// EGIDS vitality tier options (mapped from EGIDS levels)
// Tier 3 = Vigorous (6a or lower), Tier 2 = Threatened (6b), Tier 1 = Shifting/Dying (7+)
export const EGIDS_TIERS = [
    { tier: 3, label: '6a or lower (Vigorous)', levels: ['6a'] },
    { tier: 2, label: '6b (Threatened)', levels: ['6b'] },
    { tier: 1, label: '7+ (Shifting/Dying)', levels: ['7', '8a', '8b', '9', '10'] },
] as const;

// Scripture access tier options
// Tier 3 = Undeveloped, Tier 2 = Some use of concept, Tier 1 = Foundational materials available
export const SCRIPTURE_TIERS = [
    { tier: 3, label: 'Undeveloped', value: 'Undeveloped' },
    { tier: 2, label: 'Some use of concept', value: 'Some Use' },
    { tier: 1, label: 'Foundational materials available', value: 'Foundational' },
] as const;

export interface LanguageGroupFilters {
    churchStatus: ChurchPresence[];
    egidsVitality: number[]; // 1, 2, or 3 (tiers)
    populationRange: PopulationRange[];
    countries: string[]; // country codes
    languageFamilies: string[]; // family names
    sourceReliability: SourceReliability[];
    scriptureAccess: number[]; // 1, 2, or 3 (tiers)
}

export const DEFAULT_FILTERS: LanguageGroupFilters = {
    churchStatus: [],
    egidsVitality: [],
    populationRange: [],
    countries: [],
    languageFamilies: [],
    sourceReliability: [],
    scriptureAccess: [],
};

export function hasActiveFilters(filters: LanguageGroupFilters): boolean {
    return (
        filters.churchStatus.length > 0 ||
        filters.egidsVitality.length > 0 ||
        filters.populationRange.length > 0 ||
        filters.countries.length > 0 ||
        filters.languageFamilies.length > 0 ||
        filters.sourceReliability.length > 0 ||
        filters.scriptureAccess.length > 0
    );
}

export function countActiveFilters(filters: LanguageGroupFilters): number {
    return (
        filters.churchStatus.length +
        filters.egidsVitality.length +
        filters.populationRange.length +
        filters.countries.length +
        filters.languageFamilies.length +
        filters.sourceReliability.length +
        filters.scriptureAccess.length
    );
}

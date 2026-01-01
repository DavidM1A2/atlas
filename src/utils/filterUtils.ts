import type { LanguageGroup, EGIDSLevel, ScriptureAccessLevel } from '@/types/languageGroup';
import type { LanguageGroupFilters, PopulationRange } from '@/types/filters';
import { EGIDS_TIERS, SCRIPTURE_TIERS } from '@/types/filters';
import { mockCountryData } from '@/data/countryData';

// Map country codes to names
const countryCodeToName: Record<string, string> = {};
mockCountryData.forEach((country) => {
    countryCodeToName[country.isoAlpha3] = country.name;
});

/**
 * Get country name from ISO code
 */
export function getCountryName(code: string): string {
    return countryCodeToName[code] || code;
}

/**
 * Get unique country codes from language groups
 */
export function getUniqueCountries(groups: LanguageGroup[]): string[] {
    const countries = new Set<string>();
    groups.forEach((group) => {
        group.countryCodes?.forEach((code) => countries.add(code));
    });
    return Array.from(countries).sort();
}

/**
 * Get unique language families from language groups
 */
export function getUniqueFamilies(groups: LanguageGroup[]): string[] {
    const families = new Set<string>();
    groups.forEach((group) => {
        if (group.classification.family) {
            families.add(group.classification.family);
        }
    });
    return Array.from(families).sort();
}

/**
 * Map EGIDS level to filter tier (1, 2, or 3)
 * Tier 3 = 6a or lower (Vigorous)
 * Tier 2 = 6b (Threatened)
 * Tier 1 = 7+ (Shifting/Dying)
 */
export function egidsToTier(level: EGIDSLevel): number {
    const tier = EGIDS_TIERS.find((t) => (t.levels as readonly string[]).includes(level));
    return tier?.tier ?? 1;
}

/**
 * Map scripture access level to filter tier (1, 2, or 3)
 * Tier 3 = Undeveloped
 * Tier 2 = Some Use
 * Tier 1 = Foundational
 */
export function scriptureToTier(level: ScriptureAccessLevel): number {
    const tier = SCRIPTURE_TIERS.find((t) => t.value === level);
    return tier?.tier ?? 3;
}

/**
 * Get population range label for a given population
 */
export function getPopulationRange(population: number): PopulationRange {
    if (population < 10000) return '<10k';
    if (population < 20000) return '10-20k';
    if (population < 50000) return '20-50k';
    return '50k+';
}

/**
 * Check if a language group matches a single filter category
 * Empty filter array means "no filter" (match all)
 */
function matchesFilter<T>(value: T, filterValues: T[]): boolean {
    return filterValues.length === 0 || filterValues.includes(value);
}

/**
 * Check if any of the language group's values match the filter
 * Used for array-valued fields like countryCodes
 */
function matchesAnyFilter(values: string[] | undefined, filterValues: string[]): boolean {
    if (filterValues.length === 0) return true;
    if (!values || values.length === 0) return false;
    return values.some((v) => filterValues.includes(v));
}

/**
 * Filter language groups based on all active filters
 * A group must match ALL filter categories to be included
 * Within a category, matching ANY selected value is sufficient
 */
export function filterLanguageGroups(
    groups: LanguageGroup[],
    filters: LanguageGroupFilters
): LanguageGroup[] {
    return groups.filter((group) => {
        // Church status filter
        if (!matchesFilter(group.churchPresence, filters.churchStatus)) {
            return false;
        }

        // EGIDS vitality filter (compare tiers)
        if (filters.egidsVitality.length > 0) {
            const groupTier = egidsToTier(group.vitality.egidsLevel);
            if (!filters.egidsVitality.includes(groupTier)) {
                return false;
            }
        }

        // Population range filter
        if (filters.populationRange.length > 0) {
            const groupRange = getPopulationRange(group.population);
            if (!filters.populationRange.includes(groupRange)) {
                return false;
            }
        }

        // Country filter (match any)
        if (!matchesAnyFilter(group.countryCodes, filters.countries)) {
            return false;
        }

        // Language family filter
        if (!matchesFilter(group.classification.family, filters.languageFamilies)) {
            return false;
        }

        // Source reliability filter
        if (!matchesFilter(group.sourceReliability, filters.sourceReliability)) {
            return false;
        }

        // Scripture access filter (compare tiers)
        if (filters.scriptureAccess.length > 0) {
            const groupTier = scriptureToTier(group.scriptureAccess);
            if (!filters.scriptureAccess.includes(groupTier)) {
                return false;
            }
        }

        return true;
    });
}

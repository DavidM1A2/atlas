import type { LanguageGroup } from '@/types/languageGroup';
import type { LanguageGroupFilters, PopulationRange } from '@/types/filters';

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
 * Filter language groups based on active filters
 * A group must match ALL filter categories to be included
 * Within a category, matching ANY selected value is sufficient
 */
export function filterLanguageGroups(
    groups: LanguageGroup[],
    filters: LanguageGroupFilters
): LanguageGroup[] {
    return groups.filter((group) => {
        // Population range filter (only applies if population data is available)
        if (filters.populationRange.length > 0) {
            if (group.population === undefined) {
                return false; // Exclude groups without population data when filtering by population
            }
            const groupRange = getPopulationRange(group.population);
            if (!filters.populationRange.includes(groupRange)) {
                return false;
            }
        }

        return true;
    });
}

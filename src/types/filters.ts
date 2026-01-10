// Population range options for filtering
export const POPULATION_RANGES = ['<10k', '10-20k', '20-50k', '50k+'] as const;
export type PopulationRange = (typeof POPULATION_RANGES)[number];

export interface LanguageGroupFilters {
    populationRange: PopulationRange[];
}

export const DEFAULT_FILTERS: LanguageGroupFilters = {
    populationRange: [],
};

export function countActiveFilters(filters: LanguageGroupFilters): number {
    return filters.populationRange.length;
}

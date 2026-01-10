// Filters for language groups (currently minimal since data model is simplified)
export interface LanguageGroupFilters {
    // Empty for now - will be expanded when more fields are added
}

export const DEFAULT_FILTERS: LanguageGroupFilters = {};

export function countActiveFilters(_filters: LanguageGroupFilters): number {
    return 0;
}

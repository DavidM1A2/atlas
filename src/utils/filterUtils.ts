import type { LanguageGroup } from '@/types/languageGroup';
import type { LanguageGroupFilters } from '@/types/filters';

/**
 * Filter language groups based on active filters
 * Currently returns all groups since the data model has been simplified
 */
export function filterLanguageGroups(
    groups: LanguageGroup[],
    _filters: LanguageGroupFilters
): LanguageGroup[] {
    return groups;
}

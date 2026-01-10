import type { User } from '@/types/auth';
import type { LanguageGroup } from '@/types/languageGroup';

/**
 * Check if a user can edit a specific language group
 * - Admin: can edit all language groups
 * - Editor: can edit all language groups
 * - Field Worker: cannot edit (no country association yet)
 * - Viewer: cannot edit
 * - Anonymous: cannot edit
 */
export function canEditLanguageGroup(
    user: User | null,
    _languageGroup: LanguageGroup
): boolean {
    if (!user) return false;

    // Admin and Editor can edit all
    if (user.role === 'Admin' || user.role === 'Editor') return true;

    // Others cannot edit until country association is implemented
    return false;
}

/**
 * Check if a user can view full details of a language group
 * - Admin: can view all
 * - Editor: can view all
 * - Field Worker: can view all (for now)
 * - Viewer: can view all (for now)
 * - Anonymous: cannot view full details
 */
export function canViewFullDetails(
    user: User | null,
    _languageGroup: LanguageGroup
): boolean {
    if (!user) return false;

    // All authenticated users can view for now
    return true;
}

/**
 * Get the list of tabs a user can access for a language group
 * Currently only 'overview' since other tabs have been removed
 */
export function getAccessibleTabs(
    user: User | null,
    languageGroup: LanguageGroup
): string[] {
    const basicTabs = ['overview'];

    if (canViewFullDetails(user, languageGroup)) {
        return basicTabs;
    }

    return basicTabs;
}

/**
 * Check if a user can use global filters and color coding
 * - Admin: yes
 * - Editor: yes
 * - Field Worker: no
 * - Viewer: no
 * - Anonymous: no
 */
export function canUseGlobalFilters(user: User | null): boolean {
    if (!user) return false;
    return user.role === 'Admin' || user.role === 'Editor';
}

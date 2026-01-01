import type { User } from '@/types/auth';
import type { LanguageGroup } from '@/types/languageGroup';

/**
 * Check if a language group is in the user's assigned region
 */
function isInUserRegion(user: User, languageGroup: LanguageGroup): boolean {
    if (!user.assignedCountries || user.assignedCountries.length === 0) {
        return false;
    }
    if (!languageGroup.countryCodes || languageGroup.countryCodes.length === 0) {
        return false;
    }
    return languageGroup.countryCodes.some((code) =>
        user.assignedCountries!.includes(code)
    );
}

/**
 * Check if a user can edit a specific language group
 * - Admin: can edit all language groups
 * - Editor: can edit all language groups
 * - Field Worker: can edit if in their assigned region
 * - Viewer: cannot edit
 * - Anonymous: cannot edit
 */
export function canEditLanguageGroup(
    user: User | null,
    languageGroup: LanguageGroup
): boolean {
    if (!user) return false;

    // Admin and Editor can edit all
    if (user.role === 'Admin' || user.role === 'Editor') return true;

    // Field Worker can edit if in their assigned region
    if (user.role === 'Field Worker') {
        return isInUserRegion(user, languageGroup);
    }

    // Viewer cannot edit
    return false;
}

/**
 * Check if a user can view full details of a language group
 * (beyond basic info like name and overview)
 * - Admin: can view all
 * - Editor: can view all
 * - Field Worker: can view if in their assigned region
 * - Viewer: can view if in their assigned region
 * - Anonymous: cannot view full details
 */
export function canViewFullDetails(
    user: User | null,
    languageGroup: LanguageGroup
): boolean {
    if (!user) return false;

    // Admin and Editor can view all
    if (user.role === 'Admin' || user.role === 'Editor') return true;

    // Field Worker and Viewer can view if in their assigned region
    if (user.role === 'Field Worker' || user.role === 'Viewer') {
        return isInUserRegion(user, languageGroup);
    }

    return false;
}

/**
 * Get the list of tabs a user can access for a language group
 * - Full access: Overview, Vitality, Church, Resources, Notes
 * - Basic access (anonymous): Overview only
 */
export function getAccessibleTabs(
    user: User | null,
    languageGroup: LanguageGroup
): string[] {
    const basicTabs = ['overview'];
    const allTabs = ['overview', 'vitality', 'church', 'resources', 'notes'];

    if (canViewFullDetails(user, languageGroup)) {
        return allTabs;
    }

    return basicTabs;
}

/**
 * Check if a user can use global filters and color coding
 * - Admin: yes
 * - Editor: yes
 * - Field Worker: no (they only see their region's data)
 * - Viewer: no (they only see their region's data)
 * - Anonymous: no
 */
export function canUseGlobalFilters(user: User | null): boolean {
    if (!user) return false;
    return user.role === 'Admin' || user.role === 'Editor';
}

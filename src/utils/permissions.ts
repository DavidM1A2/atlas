import type { User } from '@/types/auth';
import type { LanguageGroup } from '@/types/languageGroup';

/**
 * Check if a user can edit a specific language group
 * - Admin: can edit all language groups
 * - Field Worker: can edit if ANY of the language group's locations
 *   are in their assigned countries
 * - Others: cannot edit
 */
export function canEditLanguageGroup(
    user: User | null,
    languageGroup: LanguageGroup
): boolean {
    if (!user) return false;

    // Admin can edit all
    if (user.role === 'Admin') return true;

    // Field Worker can edit if assigned to any of the countries
    if (user.role === 'Field Worker') {
        if (!user.assignedCountries || !languageGroup.countryCodes) {
            return false;
        }
        return languageGroup.countryCodes.some((code) =>
            user.assignedCountries!.includes(code)
        );
    }

    return false;
}

import type { LanguageGroup } from '@/types/languageGroup';
import type { ColorMetric } from '@/types/colorCoding';

/**
 * Calculate composite score for color coding
 * Currently returns null since no metrics are available
 */
export function calculateCompositeScore(
    _group: LanguageGroup,
    selectedMetrics: ColorMetric[]
): number | null {
    if (selectedMetrics.length === 0) return null;
    // No metrics available with simplified data model
    return null;
}

/**
 * Convert score (0-1) to color
 */
export function scoreToColor(score: number): string {
    // Red (0) -> Yellow (0.5) -> Green (1)
    const hue = score * 120;
    return `hsl(${hue}, 70%, 45%)`;
}

/**
 * Get marker color for a language group based on selected metrics
 */
export function getMarkerColor(
    group: LanguageGroup,
    selectedMetrics: ColorMetric[]
): string {
    const score = calculateCompositeScore(group, selectedMetrics);
    if (score === null) {
        return '#16a34a'; // Default green when no metrics selected
    }
    return scoreToColor(score);
}

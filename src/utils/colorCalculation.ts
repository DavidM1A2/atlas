import type { LanguageGroup } from '@/types/languageGroup';
import type { ColorMetric } from '@/types/colorCoding';

// Score mapping: 0 = needs attention (red), 1 = doing well (green)

export function getPopulationScore(population: number): number {
    if (population >= 50000) return 1;
    if (population >= 20000) return 0.67;
    if (population >= 10000) return 0.33;
    return 0;
}

export function calculateCompositeScore(
    group: LanguageGroup,
    selectedMetrics: ColorMetric[]
): number | null {
    if (selectedMetrics.length === 0) return null;

    let totalScore = 0;
    let validMetrics = 0;

    for (const metric of selectedMetrics) {
        switch (metric) {
            case 'population':
                if (group.population !== undefined) {
                    totalScore += getPopulationScore(group.population);
                    validMetrics++;
                }
                break;
        }
    }

    if (validMetrics === 0) return null;
    return totalScore / validMetrics;
}

export function scoreToColor(score: number): string {
    // Red (0) -> Yellow (0.5) -> Green (1)
    // HSL: Hue 0 = red, 60 = yellow, 120 = green
    const hue = score * 120;
    return `hsl(${hue}, 70%, 45%)`;
}

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

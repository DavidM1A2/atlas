import type { LanguageGroup, ChurchPresence, EGIDSLevel, ScriptureAccessLevel } from '@/types/languageGroup';
import type { ColorMetric } from '@/types/colorCoding';

// Score mapping: 0 = needs attention (red), 1 = doing well (green)

const CHURCH_PRESENCE_SCORES: Record<ChurchPresence, number> = {
    'None': 0,
    'Emerging': 0.33,
    'Growing': 0.67,
    'Healthy Indigenous-Led': 1,
};

const EGIDS_SCORES: Record<EGIDSLevel, number> = {
    '6a': 1,      // Vigorous - best
    '6b': 0.67,   // Threatened
    '7': 0.5,     // Shifting
    '8a': 0.33,   // Moribund
    '8b': 0.25,   // Nearly Extinct
    '9': 0.1,     // Dormant
    '10': 0,      // Extinct
};

const SCRIPTURE_ACCESS_SCORES: Record<ScriptureAccessLevel, number> = {
    'Undeveloped': 0,
    'Some Use': 0.5,
    'Foundational': 1,
};

export function getChurchPresenceScore(presence: ChurchPresence): number {
    return CHURCH_PRESENCE_SCORES[presence] ?? 0.5;
}

export function getEgidsScore(level: EGIDSLevel): number {
    return EGIDS_SCORES[level] ?? 0.5;
}

export function getPopulationScore(population: number): number {
    if (population >= 50000) return 1;
    if (population >= 20000) return 0.67;
    if (population >= 10000) return 0.33;
    return 0;
}

export function getScriptureAccessScore(access: ScriptureAccessLevel): number {
    return SCRIPTURE_ACCESS_SCORES[access] ?? 0.5;
}

export function calculateCompositeScore(
    group: LanguageGroup,
    selectedMetrics: ColorMetric[]
): number | null {
    if (selectedMetrics.length === 0) return null;

    let totalScore = 0;
    for (const metric of selectedMetrics) {
        switch (metric) {
            case 'churchPresence':
                totalScore += getChurchPresenceScore(group.churchPresence);
                break;
            case 'egidsLevel':
                totalScore += getEgidsScore(group.vitality.egidsLevel);
                break;
            case 'population':
                totalScore += getPopulationScore(group.population);
                break;
            case 'scriptureAccess':
                totalScore += getScriptureAccessScore(group.scriptureAccess);
                break;
        }
    }

    return totalScore / selectedMetrics.length;
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
